import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatTime } from 'utils/format';

import { List, Avatar, Icon, Button, Modal, Tooltip } from 'antd';
import { deleteTestAction } from 'redux/test/actions';
import AddSummaryModal from 'components/Summary/AddSummaryModal';
import InterviewSummaryModal from 'components/Summary/InterviewSummaryModal';
import style from './TestList.module.scss';

class TestList extends React.Component {
  state = {
    delConfirmModalVisible: false,
    delTest: null,
    delAnime: false,
    testResultModalVisible: false,
    testResultModalTarget: '',
    addSummaryModalVisible: false,
    addSummaryModalTarget: '',
    testId: '',
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.state.delAnime && !nextState.delAnime);
  }

  handleDeleteButton = test => () => {
    this.setState({ delConfirmModalVisible: true, delTest: test });
  };

  hideDelConfirmModal = () => {
    this.setState({
      delConfirmModalVisible: false,
    });
  };

  handleOnOkDelConfirmModal = async () => {
    const { delTest } = this.state;
    const { deleteTestAction } = this.props;
    this.hideDelConfirmModal();
    // show the delete animation first and then do the delete action
    this.setState({ delAnime: true });
    setTimeout(async () => {
      await deleteTestAction(delTest);
      this.setState({ delAnime: false });
    }, 500);
  };

  showTestResultModal = e => {
    this.setState({
      testResultModalVisible: true,
      testResultModalTarget: e.target.getAttribute('candidate'),
      testId: e.target.getAttribute('testid'),
    });
  };

  testResultModalCancel = () => {
    this.setState({
      testResultModalVisible: false,
    });
  };

  showAddSummaryModal = e => {
    console.log(e.target);
    this.setState({
      addSummaryModalVisible: true,
      addSummaryModalTarget: e.target.getAttribute('candidate'),
      testId: e.target.getAttribute('testid'),
    });
  };

  addSummaryModalCancel = () => {
    this.setState({
      addSummaryModalVisible: false,
    });
  };

  render() {
    const { testListData } = this.props;
    const {
      delTest,
      delConfirmModalVisible,
      delAnime,
      testResultModalVisible,
      testResultModalTarget,
      addSummaryModalVisible,
      addSummaryModalTarget,
      testId,
    } = this.state;
    const jeUser = localStorage.jeUser && JSON.parse(localStorage.jeUser);

    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={testListData}
          renderItem={item => {
            const actions = [];
            const atLeastOneEndRecord =
              item.records.items.filter(v => v.status === 'closed').length > 0;
            const isInterviewer =
              item.users.items &&
              item.users.items.map(v => v && v.user.id).includes(jeUser.id) &&
              !item.results.items.map(v => v.author).includes(jeUser.name);
            const isHost = item.host && item.host.id === jeUser.id;
            if (isHost) {
              actions.push(
                <Button
                  type="button"
                  className={style.floatTop}
                  onClick={this.handleDeleteButton(item)}
                >
                  <Icon type="delete" theme="twoTone" twoToneColor="#f00" />
                </Button>,
              );
            }
            if (atLeastOneEndRecord) {
              if (isInterviewer) {
                actions.push(
                  <Tooltip
                    placement="top"
                    title="write summary"
                    onClick={this.handleSummaryEdit}
                  >
                    <Button
                      type="link"
                      icon="form"
                      candidate={item.subjectId}
                      testid={item.id}
                      onClick={this.showAddSummaryModal}
                    >
                      Write Summary
                    </Button>
                  </Tooltip>,
                );
              }
              actions.push(
                <Button
                  type="link"
                  icon="bar-chart"
                  onClick={this.showTestResultModal}
                  candidate={item.subjectId}
                  testid={item.id}
                >
                  Open Summary
                </Button>,
                <Link to={{ pathname: `/admin/playback/${item.id}` }}>
                  <Button type="link" icon="play-square">
                    Playback
                  </Button>
                </Link>,
              );
            } else {
              actions.push(
                <Button style={{ cursor: 'default' }} type="link">
                  <Icon spin type="sync" />
                  Ongoing
                </Button>,
              );
            }

            return (
              <List.Item
                className={
                  delAnime && delTest && delTest.id === item.id
                    ? style.delAnime
                    : ''
                }
                actions={actions}
              >
                <List.Item.Meta
                  avatar={<Avatar icon="code" className={style.avatar} />}
                  title={item.subjectId}
                  description={formatTime(item.timeBegin)}
                />
              </List.Item>
            );
          }}
        />
        <InterviewSummaryModal
          testID={testId}
          title={`Candidate：${testResultModalTarget}`}
          visible={testResultModalVisible}
          onCancel={this.testResultModalCancel}
          footer={null}
          width={1000}
        ></InterviewSummaryModal>
        <AddSummaryModal
          testID={testId}
          title={addSummaryModalTarget}
          visible={addSummaryModalVisible}
          onCancel={this.addSummaryModalCancel}
          footer={null}
          width={800}
        ></AddSummaryModal>
        <Modal
          title=""
          visible={delConfirmModalVisible}
          okType="danger"
          okText="Delete"
          onOk={this.handleOnOkDelConfirmModal}
          onCancel={this.hideDelConfirmModal}
        >
          Are you sure you want to delete test{' '}
          <b>{delTest ? delTest.subjectId : ''}</b> ?
        </Modal>
      </>
    );
  }
}
TestList.propTypes = {
  testListData: PropTypes.array,
};

const mapDispatchToProps = dispatch => ({
  deleteTestAction: delTest => dispatch(deleteTestAction(delTest)),
});
export default connect(null, mapDispatchToProps)(TestList);
