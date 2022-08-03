import React from 'react';
import { Typography, Modal, Row, Col, Card, Rate, Empty, Result } from 'antd';
import PropTypes from 'prop-types';
import { Connect } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';
import PageEmpty from 'components/PageEmpty';
import PageSpin from 'components/PageSpin';
import QuestionComment from 'components/Summary/QuestionComment';
import { onCreateResult } from 'graphql/subscriptions';
import { getTest, listTest, getTest2, getallsnapcomments } from './queries';

//import _ from 'lodash';

const toInterviewResult = data => {
  const non_null = data.users.items.filter(x => x != null);
  data.users.items = non_null;
  const interviewers = data.users.items.map(v => v.user);
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
  // this gave me a inspiration: upper area is tfor data storage

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
        if (data && !loading && !error) {
          const interviewResult = toInterviewResult(test);
          interviewers = interviewResult.interviewers;
          questions = interviewResult.questions;
          comments = interviewResult.comments;
          summaries = interviewResult.summaries;
          records = data.getTest.records.items;
          console.log('all', records);
        }

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
                <Typography.Title level={4}>
                  Overall Score by Interviewer
                </Typography.Title>
                {interviewers.map(interviewer => (
                  <QuestionComment
                    key={interviewer.id}
                    interviewer={interviewer.name}
                    questions={questions}
                    comments={comments.filter(
                      c => c.author === interviewer.name,
                    )}
                  />
                ))}
                <Typography.Title level={4}>
                  Comments by questions
                </Typography.Title>
                <Row type="flex" justify="space-around">
                  {records.map(record => {
                    const single_question = record.ques;
                    const single_history = record.history.items;
                    const single_comments = single_history.map(
                      x => x.snapComments,
                    );
                    console.log(single_question.name, single_comments);
                    let all_comments = '';
                    const single_comments_2 = single_comments.map(x => x.items);
                    console.log(single_comments_2);
                    const single_comments_3 = single_comments_2.map(x =>
                      x.map(y =>
                        all_comments.concat(
                          y.author,
                          '  :  ',
                          y.content,
                          '  ',
                          '\n',
                        ),
                      ),
                    );
                    console.log(single_comments_3);
                    return (
                      <Col
                        key={single_question.id}
                        span={20 / single_comments_3.length}
                      >
                        <Row type="flex" align="middle" justify="space-around">
                          <h3>Questions：{single_question.name}</h3>
                        </Row>
                        <Row>
                          {record ? (
                            <Card>
                              <Card
                                bordered={false}
                                title="Comments of Interviewers："
                                type="inner"
                              >
                                <Card type="inner">
                                  <p>{single_comments_3}</p>
                                </Card>
                              </Card>
                            </Card>
                          ) : (
                            <Empty description="No Comment Yet..." />
                          )}
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
/*
{interviewers.map(interviewer => {
                    const summary = summaries.find(
                      v => v.author === interviewer.name,
                    );
                    return (
                      <Col key={interviewer.id} span={20 / interviewers.length}>
                        <Row type="flex" align="middle" justify="space-around">
                          <h3>Interviewer：{interviewer.name}</h3>
                        </Row>
                        <Row>
                          {summary ? (
                            <Card>
                              <Card
                                bordered={false}
                                title="Technical Skills："
                                type="inner"
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                  }}
                                >
                                  <h4 style={{ width: '49%' }}>Logic</h4>
                                  <Rate value={summary.logic} />
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                  }}
                                >
                                  <h4 style={{ width: '49%' }}>
                                    JavaScript Familiarity
                                  </h4>
                                  <Rate value={summary.language} />
                                </div>
                                <Card type="inner">
                                  <p>{summary.techreview}</p>
                                </Card>
                              </Card>
                              <Card
                                bordered={false}
                                title="Personality："
                                type="inner"
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                  }}
                                >
                                  <h4 style={{ width: '49%' }}>
                                    Good to work with
                                  </h4>
                                  <Rate value={summary.workwith} />
                                </div>
                                <Card type="inner">
                                  <p>{summary.perstyreview}</p>
                                </Card>
                              </Card>
                            </Card>
                          ) : (
                            <Empty description="No Comment Yet..." />
                          )}
                        </Row>
                      </Col>
                    );
                  })}*/
