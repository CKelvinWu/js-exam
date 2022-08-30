import React from 'react';
import { Typography, Modal, Row, Col, Table } from 'antd';
import PropTypes from 'prop-types';
import { Connect } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';
import PageEmpty from 'components/PageEmpty';
import PageSpin from 'components/PageSpin';
import QuestionComment from 'components/Summary/QuestionComment';
import { onCreateResult, onCreateComment } from 'graphql/subscriptions';
import { getTest2 } from './queries';
import AddNewScoreRedux from 'components/Summary/AddNewScoreRedux';
import moment from 'moment';

const toInterviewResult = data => {
  const interviewers = data.users.items.filter(x => x).map(v => v.user);

  const questions = data.records.items.map(v => ({
    id: v.id,
    name: v.ques.name,
  }));
  const comments = [];
  data.records.items.forEach(r => {
    r.comment.items.forEach(c => {
      comments.push({
        questionID: r.id,
        ...c,
      });
    });
  });
  const summaries = data.results.items;
  return { interviewers, questions, comments, summaries };
};

const handleSummarySubscription = (prev, { onCreateResult: newResult }) => {
  if (!prev.getTest.results.items) {
    prev.getTest.results.items = [];
  }
  prev.getTest.results.items.push(newResult);
  return prev;
};
const handleScoreSubscription = (prev, { onCreateComment: newComment }) => {
  const new_data = {
    author: newComment.author,
    completeness: newComment.completeness,
    content: newComment.content,
    hint: newComment.hint,
    quality: newComment.quality,
    time: newComment.time,
  };
  prev.getTest.records.items[0].comment.items.push(new_data);
  return prev;
};

const InterviewSummaryModal = props => (
  <Modal
    title={props.title}
    visible={props.visible}
    onCancel={props.onCancel}
    footer={props.footer}
    width={props.width}
  >
    <Connect
      query={graphqlOperation(getTest2, {
        id: props.testID,
      })}
      subscription={graphqlOperation(onCreateComment)}
      onSubscriptionMsg={handleScoreSubscription}
    >
      {({ data, loading, error }) => {
        const test = data && data.getTest;
        let interviewers = [];
        let questions = [];
        let comments = [];
        let summaries = [];
        let records = [];
        let questionid = '';
        if (data && !loading && !error) {
          const interviewResult = toInterviewResult(test);
          interviewers = interviewResult.interviewers;
          questions = interviewResult.questions;
          comments = interviewResult.comments;
          summaries = interviewResult.summaries;
          records = data.getTest.records.items;
          questionid = data.getTest.records.items[0].id;
          comments.sort((a, b) => a.time.localeCompare(b.time));
        }
        let new_score = '';
        const columns = [
          {
            title: 'Author',
            dataIndex: 'Author',
            key: 'Author',
            sorter: (a, b) => a.Author.localeCompare(b.Author),
            sortDirections: ['descend', 'ascend'],
          },
          {
            title: 'Content',
            dataIndex: 'Content',
            key: 'Content',
          },
          {
            title: 'Time',
            dataIndex: 'Time',
            key: 'Time',
            sorter: (a, b) => a.Time.localeCompare(b.Time),
            sortDirections: ['descend', 'ascend'],
          },
        ];
        new_score = (
          <>
            <AddNewScoreRedux questionid={questionid}></AddNewScoreRedux>
          </>
        );

        ////////////////////////////data part//////////////////
        return (
          <PageSpin spinning={loading}>
            {!loading && error && (
              <PageEmpty description={<span>Error Occuring</span>} />
            )}

            {!loading && !test && (
              <PageEmpty
                description={<span>Data Not Found</span>}
                image="default"
              />
            )}

            {!loading && test && (
              <>
                <Typography.Title level={4}>Overall Score</Typography.Title>
                {comments.map(comment => {
                  const questioncomment = (
                    <>
                      <QuestionComment
                        interviewer={comment.author}
                        questions={[questions[0]]}
                        comments={[comment]}
                      />
                    </>
                  );

                  return questioncomment;
                })}
                <br></br>
                {new_score}
                <br></br>
                <Typography.Title level={4}>Comments</Typography.Title>
                <Row type="flex" justify="space-around">
                  {records.map(record => {
                    const single_question = record.ques;
                    const wrap_data = record.history.items
                      .map(x => x.snapComments)
                      .map(y => y.items)
                      .flat()
                      .map(z => ({
                        Author: z.author,
                        Content: z.content,
                        Time: z.time.substring(11, 16) + ' UTC -4', //If all the data is stored in same timezone, then just mark the timezone when data stored
                      }))
                      .sort((a, b) => a.Time.localeCompare(b.Time));
                    return (
                      <Col key={single_question.id} span={10}>
                        <Row type="flex" align="middle" justify="space-around">
                          <h3 style={{ marginTop: '50px' }}>
                            Questions：{single_question.name}
                          </h3>
                        </Row>
                        <Row>
                          <Table
                            width={40}
                            dataSource={wrap_data}
                            columns={columns}
                            pagination={false}
                            style={{ height: '300px', overflowY: 'auto' }}
                          />
                        </Row>
                      </Col>
                    );
                  })}
                </Row>
              </>
            )}
          </PageSpin>
        );
      }}
    </Connect>
  </Modal>
);
InterviewSummaryModal.propTypes = {
  testID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  footer: PropTypes.object,
  width: PropTypes.number.isRequired,
};

export default InterviewSummaryModal;
