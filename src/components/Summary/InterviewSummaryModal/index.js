import React from 'react';
import { Typography, Modal, Row, Col, Card, Rate, Empty } from 'antd';
import PropTypes from 'prop-types';
import { Connect } from 'aws-amplify-react';
import { graphqlOperation } from 'aws-amplify';
import PageEmpty from 'components/PageEmpty';
import PageSpin from 'components/PageSpin';
import QuestionComment from 'components/Summary/QuestionComment';
import { onCreateResult } from 'graphql/subscriptions';
import { getTest } from './queries';

const toInterviewResult = data => {
  console.log(data.users.items);
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
  <Modal
    title={props.title}
    visible={props.visible}
    onCancel={props.onCancel}
    footer={props.footer}
    width={props.width}
  >
    <Connect
      query={graphqlOperation(getTest, {
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
        if (data && !loading && !error) {
          console.log(data);
          const interviewResult = toInterviewResult(test);
          console.log('this is result', interviewResult);
          interviewers = interviewResult.interviewers;
          questions = interviewResult.questions;
          comments = interviewResult.comments;
          summaries = interviewResult.summaries;
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
                  Interview Questions
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
                <Typography.Title level={4}>Summary</Typography.Title>
                <Row type="flex" justify="space-around">
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
