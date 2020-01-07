import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { transform } from '@babel/standalone';
import { Modal } from 'antd';
import get from 'lodash/get';

import createWrappedConsole from 'utils/consoleFactory';
import {
  subscribeOnCreateRecord,
  subscribeOnUpdateRecordByRecordId,
  RECORD_STATUS,
} from 'utils/record';
import { getRoomInfo, updateRoomInfo } from 'redux/room/actions';
import { setCurrentRecord } from 'redux/record/actions';
import { autoLogin } from 'redux/login/actions';

import PageSpin from 'components/PageSpin';
import PageEmpty from 'components/PageEmpty';
import FullScreenMask from 'components/FullScreenMask';
import ReactPage from 'components/CodingView/React';
import JavaScriptPage from 'components/CodingView/JavaScript';
import ConceptPage from 'components/CodingView/Concept';

import { changeCode, resetCode } from 'redux/code/actions';
import { addConsole, resetConsole } from 'redux/consoleMsg/actions';
import { addTape, resetTape } from 'redux/tape/actions';

import styles from './ExamPage.module.scss';
import { updateRecordData } from './actions';
import { EXAM_USER_NAME, QUESTION_TYPE } from './constants';
import ControlWidget from './ControlWidget';
import { createSnapComment } from '../../redux/snapComment/actions';

const GetPageComponent = args => {
  switch (args.categoryIndex) {
    case 1: {
      return <ReactPage {...args} />;
    }
    case 2: {
      return <ConceptPage {...args} />;
    }
    default: {
      return <JavaScriptPage {...args} />;
    }
  }
};

class ExamPage extends Component {
  state = {
    categoryIndex: 0,
    isLoading: false,
    enableEnter: true,
    isExaming: false,
  };

  roomId = this.props.match.params.roomId;

  wrappedConsole = createWrappedConsole(console, this.props.actions.addConsole);

  async componentDidMount() {
    await this.autoLogin();
    await this.getRoom();
    this.subscribeCreateRecord();
  }

  componentWillReceiveProps(nextProps) {
    const { record } = this.props;
    const { record: nextRecord } = nextProps;
    if (!get(record, 'status') && get(nextRecord, 'status') === 'inprogress') {
      this.setState({
        isExaming: true,
      });
    }
  }

  autoLogin = async () => {
    this.setState({ isLoading: true });
    await this.props.actions.autoLogin();
    localStorage.setItem('username', EXAM_USER_NAME);
    this.setState({ isLoading: false, enableEnter: true });
  };

  getRoom = async () => {
    this.setState({
      isLoading: true,
    });
    await this.props.actions.getRoomInfo(this.roomId);
    if (this.props.room.description) {
      await this.passwordSetting();
      window.addEventListener('keydown', e => {
        if (e.ctrlKey && e.keyCode === 13) {
          this.onRunCode();
        }
      });
    } else {
      this.setState({
        enableEnter: false,
        isExaming: true,
      });
    }
    this.setState({ isLoading: false });
  };

  passwordSetting = async () => {
    const { roomId } = this;
    const { record, room } = this.props;
    if (!room.password) {
      await this.props.actions.updateRoomInfo(roomId);
      this.getRecordOnEntry(record);
    } else if (localStorage.examRoomPassword === room.password) {
      this.getRecordOnEntry(record);
    } else {
      this.setState({
        enableEnter: false,
      });
    }
  };

  getRecordOnEntry = record => {
    if (record.ques) {
      this.setState({
        categoryIndex: QUESTION_TYPE[record.ques.type],
      });
      this.handleCodeChange(record.syncCode || '');
      this.onRunCode();
    }
  };

  handleCodeChange = newCode => {
    const { rawCode } = this.props.code;
    const { id } = this.props.record;
    if (newCode && newCode !== rawCode) {
      this.props.actions.changeCode({ rawCode: newCode });
      this.props.actions.updateRecordData({ id, syncCode: newCode });
    }
  };

  onRunCode = () => {
    const { rawCode } = this.props.code;
    const { ques } = this.props.record;
    const fullCode = `${rawCode} ${ques.test}`;
    this.props.actions.addRunSnapComment();
    try {
      const { code: compiledCode } = transform(fullCode, {
        presets: [
          'es2015',
          ['stage-2', { decoratorsBeforeExport: true }],
          'react',
        ],
        plugins: ['proposal-object-rest-spread'],
      });
      this.props.actions.changeCode({ compiledCode });
    } catch (e) {
      this.props.actions.resetConsole();
      this.wrappedConsole.log(e);
    }
  };

  onReset = () => {
    const { content } = this.props.record.ques;
    this.handleCodeChange(content);
    this.props.actions.resetTape();
    this.props.actions.resetConsole();
  };

  subscribeCreateRecord = () => {
    subscribeOnCreateRecord(data => {
      const { room, ques } = data;
      if (room.id === this.props.room.id) {
        // unsubscribe the old record
        if (this.subscriptionForUpdateRecordByRecordId) {
          this.subscriptionForUpdateRecordByRecordId.unsubscribe();
        }

        this.props.actions.setCurrentRecord(data);
        this.setState({
          categoryIndex: QUESTION_TYPE[data.ques.type],
          isExaming: true,
        });
        this.handleCodeChange(ques.content);
        this.props.actions.resetTape();
        this.props.actions.resetConsole();
        this.onRunCode();

        this.subscribeRecordUpdate();
      }
    });
  };

  subscribeRecordUpdate = () => {
    this.subscriptionForUpdateRecordByRecordId = subscribeOnUpdateRecordByRecordId(
      this.props.record.id,
      data => {
        const { room } = data;
        if (room.id === this.props.room.id) {
          if (
            data.status === RECORD_STATUS.closed &&
            this.props.record.status !== RECORD_STATUS.closed
          ) {
            this.setState({
              isExaming: false,
            });
          }
        }
      },
    );
  };

  showResetAlert = () => {
    const self = this;
    Modal.confirm({
      title: 'Do you want to reset your code?',
      onOk() {
        self.onReset();
      },
      onCancel() {},
    });
  };

  render() {
    const {
      handleCodeChange,
      wrappedConsole,
      onRunCode,
      showResetAlert,
    } = this;
    const { categoryIndex, isLoading, isExaming, enableEnter } = this.state;
    const { room, record, code, consoleMsg, tape, actions: {addTape, resetTape, resetConsole} } = this.props;

    return (
      <div>
        <PageSpin spinning={isLoading} className={styles.spin}>
          {enableEnter && (
            <React.Fragment>
              <ControlWidget
                roomDescription={room.description}
                intervieweeName={room.subjectId}
                onRunCode={onRunCode}
                onReset={showResetAlert}
              />
              <GetPageComponent
                categoryIndex={categoryIndex}
                handleCodeChange={handleCodeChange}
                wrappedConsole={wrappedConsole}
                addTape={addTape}
                resetTape={resetTape}
                resetConsole={resetConsole}
                code={code.rawCode}
                compiledCode={code.compiledCode}
                consoleMsg={consoleMsg}
                tape={tape}
                test={record.ques && record.ques.test}
              />
            </React.Fragment>
          )}

          {!enableEnter && (
            <PageEmpty
              description={
                <span>
                  You don&apos;t have authorization to enter this room
                </span>
              }
            />
          )}
        </PageSpin>

        <FullScreenMask isShow={!isExaming} text="Waiting for questions..." />
      </div>
    );
  }
}

ExamPage.propTypes = {
  room: PropTypes.object,
  record: PropTypes.object,
  code: PropTypes.object,
  consoleMsg: PropTypes.array,
  tape: PropTypes.array,
  actions: PropTypes.object,
  match: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  actions: {
    getRoomInfo: id => dispatch(getRoomInfo(id)),
    updateRoomInfo: (id, password) => dispatch(updateRoomInfo(id, password)),
    updateRecordData: recordData => dispatch(updateRecordData(recordData)),
    setCurrentRecord: recordData => dispatch(setCurrentRecord(recordData)),
    changeCode: code => dispatch(changeCode(code)),
    resetCode: () => dispatch(resetCode()),
    addConsole: (...args) => dispatch(addConsole(...args)),
    resetConsole: () => dispatch(resetConsole()),
    addTape: data => dispatch(addTape(data)),
    resetTape: () => dispatch(resetTape()),
    autoLogin: () => dispatch(autoLogin()),
    addRunSnapComment: () =>
      dispatch(createSnapComment({ content: 'interviewee run code' })),
  },
});

const mapStateToProps = state => ({
  room: state.room,
  record: state.record,
  code: state.code,
  consoleMsg: state.consoleMsg,
  tape: state.tape,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ExamPage);
