import React from 'react';
import {
  Typography,
  Modal,
  Row,
  Col,
  Card,
  Rate,
  Empty,
  Button,
  Form,
  message,
  Input,
  Table,
} from 'antd';
import PropTypes from 'prop-types';
import { Connect } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';
import PageEmpty from 'components/PageEmpty';
import PageSpin from 'components/PageSpin';
import QuestionComment from 'components/Summary/QuestionComment';
import { onCreateResult } from 'graphql/subscriptions';
import { getTest2 } from './queries';
import AddNewScoreForm from 'components/Summary/AddNewScore';

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

const InterviewSummaryModal = props => (
  // this gave me a inspiration: upper area is tfor data storages

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
      subscription={graphqlOperation(onCreateResult)}
      onSubscriptionMsg={handleSummarySubscription}
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
          console.log('processed', records, 'datasource', data);
          questionid = data.getTest.records.items[0].id;
        }
        let comment_count = 1;
        let new_score = '';
        if (comments.length === 0 && data) {
          try {
            new_score = (
              <>
                <AddNewScoreForm questionid={questionid}></AddNewScoreForm>
              </>
            );
          } catch (e) {
            console.log(e);
          }
        } else {
          new_score = '';
        }
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

                <div>{new_score}</div>

                {comments.map(comment => {
                  let questioncomment = '';
                  if (comments.length === comment_count) {
                    //if last comment
                    questioncomment = (
                      <>
                        <QuestionComment
                          interviewer={comment.author}
                          questions={[questions[0]]}
                          comments={[comment]}
                        />
                        <h2>You can enter new comment here</h2>
                        <AddNewScoreForm
                          questionid={questionid}
                        ></AddNewScoreForm>
                      </>
                    );
                  } else {
                    questioncomment = (
                      <QuestionComment
                        interviewer={comment.author}
                        questions={[questions]}
                        comments={[comment]}
                      />
                    );
                  }
                  comment_count = comment_count + 1;
                  return questioncomment;
                })}
                <br></br>
                <br></br>
                <Typography.Title level={4}>Comments</Typography.Title>
                <Row type="flex" justify="space-around">
                  {records.map(record => {
                    console.log(record);
                    const single_question = record.ques;
                    const single_history = record.history.items;
                    const single_comments = single_history.map(
                      x => x.snapComments,
                    );
                    let all_comments = '';
                    let table_data = [];
                    const columns = [
                      {
                        title: 'Author',
                        dataIndex: 'Author',
                        key: 'Author',
                      },
                      {
                        title: 'Content',
                        dataIndex: 'Content',
                        key: 'Content',
                      },
                    ];
                    const single_comments_2 = single_comments.map(x => x.items);
                    const single_comments_3 = single_comments_2.map(x =>
                      x.map(y => {
                        table_data.push({
                          Author: y.author,
                          Content: y.content,
                        });
                        all_comments.concat(
                          y.author,
                          '  :  ',
                          y.content,
                          '  ',
                          '\n',
                        );
                      }),
                    );
                    return (
                      <Col key={single_question.id} span={10}>
                        <Row type="flex" align="middle" justify="space-around">
                          <h3>Questions：{single_question.name}</h3>
                        </Row>
                        <Row>
                          <Table
                            width={40}
                            dataSource={table_data}
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
