import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Icon, Dropdown, Menu, message, Popconfirm } from 'antd';

import PageControlBar from 'components/PageControlBar';
import CategorySelector from 'components/Selectors/CategorySelector';
import QuestionSelector from 'components/Selectors/QuestionSelector';
import { RECORD_STATUS } from 'utils/record';

import styles from './ControlWidget.module.scss';

const InputGroup = Input.Group;

function getRecordStatus(question, record) {
  if (!question || !record) return null;
  if (question.name === record.ques.name) {
    return record.status;
  }
  return null; // not dispatched yet
}

const ControlWidget = ({
  record,
  intervieweeName,
  roomDescription,
  categoryIndex,
  questionIndex,
  onDispatchQuestion,
  onEndExam,
  onChangeCategory,
  onChangeQuestion,
  questionList,
  isHost,
  showDelConfirmModal,
}) => {
  const recordStatus = getRecordStatus(questionList[questionIndex], record);
  const isInRecording = recordStatus === RECORD_STATUS.inprogress;
  const menu = (
    <Menu>
      <Menu.Item
        key="link"
        onClick={() => {
          const link = `${window.location.origin}${
            window.location.pathname
          }${window.location.hash.replace('admin/dispatch', 'exam')}`;
          navigator.clipboard.writeText(link).then(() => {
            message.success(`Successfully copied the link!`);
          });
        }}
      >
        <Icon type="share-alt" /> Copy Exam Link
      </Menu.Item>
      {isHost && (
        <Menu.Item key="delete" onClick={showDelConfirmModal}>
          <Icon type="delete" style={{ color: 'red' }} /> Delete Room
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <PageControlBar>
      <div>
        {isHost && (
          <InputGroup
            compact
            style={{ width: 'auto', display: 'inline-block' }}
          >
            <CategorySelector
              disabled={isInRecording}
              onChange={onChangeCategory}
              categoryIndex={categoryIndex}
            />
            <QuestionSelector
              disabled={isInRecording}
              onChange={onChangeQuestion}
              questionIndex={questionIndex}
              list={questionList}
            />
            {isInRecording && (
              <Popconfirm
                placement="bottom"
                title="Are you sure to end the exam?"
                onConfirm={onEndExam}
                okType="danger"
                okText="End it"
                cancelText="No"
              >
                <Button type="danger" style={{ marginLeft: 5 }}>
                  End Exam
                  <Icon type="right" />
                </Button>
              </Popconfirm>
            )}
            {!isInRecording && (
              <Button
                type="primary"
                style={{ marginLeft: 5 }}
                onClick={onDispatchQuestion}
              >
                Dispatch
                <Icon type="right" />
              </Button>
            )}
          </InputGroup>
        )}
      </div>
      <div>
        <span>還沒run</span>
      </div>
      <div>
        <div className={styles.roomInfoBar}>
          <Dropdown overlay={menu} placement="bottomLeft">
            <span className={styles.roomInfoBar_room}>
              Room:
              <span className={styles.roomInfoBar_label}>
                {roomDescription}
              </span>
              <Icon type="down" />
            </span>
          </Dropdown>
          <span>
            Interviewee:
            <span className={styles.roomInfoBar_label}>{intervieweeName}</span>
          </span>
        </div>
      </div>
    </PageControlBar>
  );
};

ControlWidget.propTypes = {
  isHost: PropTypes.bool.isRequired,
  record: PropTypes.object.isRequired,
  intervieweeName: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  roomDescription: PropTypes.string.isRequired,
  categoryIndex: PropTypes.number.isRequired,
  questionIndex: PropTypes.number.isRequired,
  onDispatchQuestion: PropTypes.func.isRequired,
  onEndExam: PropTypes.func.isRequired,
  onChangeCategory: PropTypes.func.isRequired,
  onChangeQuestion: PropTypes.func.isRequired,
  questionList: PropTypes.arrayOf(PropTypes.object).isRequired,
  showDelConfirmModal: PropTypes.func.isRequired,
};

export default ControlWidget;
