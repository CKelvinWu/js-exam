import React from 'react';
import {
  Typography,
  Modal,
  Row,
  Col,
  Card,
  Rate,
  Empty,
  Result,
  Button,
  Form,
  message,
  Input,
} from 'antd';
import PropTypes from 'prop-types';
import { Connect, propStyle } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';
import PageEmpty from 'components/PageEmpty';
import PageSpin from 'components/PageSpin';
import QuestionComment from 'components/Summary/QuestionComment';
import { onCreateResult } from 'graphql/subscriptions';
import { getTest, listTest, getTest2, getallsnapcomments } from './queries';
import createComment from 'utils/comment/comment';

//import _ from 'lodash';
//This is react stateless function component but the hook function is blocked
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
          console.log(records[0].comment.items);
        }
        let comment_count = 1;
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
                <Typography.Title level={4}>
                  Overall Score by Interviewer
                </Typography.Title>

                {comments.map(comment => {
                  let questioncomment = '';
                  if (comments.length === comment_count) {
                    let comment_name = '';
                    let comment_text = '';
                    let formdata = {
                      author: comment_name,
                      quality: 2,
                      completeness: 2,
                      hints: 2,
                      content: comment_text,
                    };

                    console.log('counter works!');
                    questioncomment = (
                      <div>
                        {' '}
                        <QuestionComment
                          interviewer={comment.author}
                          questions={[questions[0]]}
                          comments={[comment]}
                        />
                        You can enter new comment here
                        <Form
                          onSubmit={async () => {
                            console.log(formdata);
                            const id = data.getTest.records.items[0].id;
                            const params = {
                              commentRecordId: id,
                              author: formdata.author,
                              quality: formdata.quality,
                              hint: formdata.hints,
                              completeness: formdata.completeness,
                              tags: 'no more comment',
                              content: 'overall_score',
                            };
                            console.log(params);
                            await createComment(params);
                            message.success('Add Overall Score successfully');
                          }}
                          align={'middle'}
                        >
                          <Col>
                            <Rate
                              onChange={new_val => {
                                formdata.quality = new_val;
                                console.log(formdata);
                              }}
                            >
                              Code quality
                            </Rate>
                          </Col>
                          <Col>
                            <Rate
                              onChange={new_val => {
                                formdata.compeleteness = new_val;
                                console.log(formdata);
                              }}
                            >
                              Compeleteness
                            </Rate>
                          </Col>
                          <Col>
                            <Rate
                              onChange={new_val => {
                                formdata.hints = new_val;
                                console.log(formdata);
                              }}
                            >
                              How much hints
                            </Rate>
                          </Col>
                          <Col>
                            <Input
                              onChange={e => {
                                comment_name = e;
                              }}
                            />
                            Please leave your name
                          </Col>
                          <Col>
                            <Input
                              onChange={e => {
                                comment_text = e;
                              }}
                            />
                            Please leave your comment
                          </Col>
                          <Button type="primary" htmlType="submit">
                            Add a Score
                          </Button>
                        </Form>
                      </div>
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
                  console.log(comment_count, comments.length);
                  console.log(comments.length == comment_count);
                  return questioncomment;
                })}
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
                    let all_comments = '';
                    const single_comments_2 = single_comments.map(x => x.items);
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
                    return (
                      <Col key={single_question.id} span={50}>
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
                                  <p style={{ whiteSpace: 'pre-line' }}>
                                    {single_comments_3}
                                  </p>
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
