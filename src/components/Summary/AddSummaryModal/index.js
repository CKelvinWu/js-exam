import React from 'react';
import { Modal, Row, Col, Card, Button, message } from 'antd';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { RfRate, RfTextArea } from 'components/RfInput';
import createSummary from 'utils/summary';
import PageEmpty from 'components/PageEmpty';
import PageSpin from 'components/PageSpin';
import QuestionComment from 'components/Summary/QuestionComment';
import { Connect } from 'aws-amplify-react';
import { graphqlOperation } from 'aws-amplify';
import { getTest } from './queries';

const validate = values => {
  const errors = {};
  if (!values.logic) errors.logic = 'logic Required';
  if (!values.language) errors.language = 'JavaScript Familiarity Required';
  if (!values.workwith) errors.workwith = 'Enjoy to work with Required';
  return errors;
};

const rateValueFormatter = v => v || 0;

const toInterviewResult = data => {
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

class AddSummaryModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.props.handleSubmit(this.doSubmitForm);
  }

  doSubmitForm = async formDatas => {
    await createSummary({
      resultTestId: this.props.testID,
      author: localStorage.username,
      ...formDatas,
    });
    message.success('Add Summary successfully');
  };

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={this.props.footer}
        width={this.props.width}
      >
        <Connect query={graphqlOperation(getTest, { id: this.props.testID })}>
          {({ data, loading, error }) => {
            const jeUser =
              localStorage.jeUser && JSON.parse(localStorage.jeUser);
            let interviewer;
            let questions = [];
            let comments = [];
            let summary = {};
            if (data && !loading && !error) {
              const testResult = toInterviewResult(data.getTest);
              interviewer = testResult.interviewers.find(
                v => v.name === jeUser.name,
              );
              questions = testResult.questions;
              comments = testResult.comments.filter(
                c => c.author === jeUser.name,
              );
              summary =
                testResult.summaries.find(s => s.author === jeUser.name) || {};
            }
            return (
              data && (
                <PageSpin spinning={loading}>
                  {!loading && error && (
                    <PageEmpty description={<span>Error Occuring</span>} />
                  )}

                  {!loading && !data.getTest && (
                    <PageEmpty
                      description={<span>Data Not Found</span>}
                      image="default"
                    />
                  )}

                  {!loading && !error && data && (
                    <>
                      <h2>Interview Questions</h2>
                      {interviewer && (
                        <QuestionComment
                          key={interviewer.id}
                          interviewer={interviewer.name}
                          questions={questions}
                          comments={comments}
                        />
                      )}
                      <h2>Summary</h2>
                      <Row type="flex" align="middle" justify="space-around">
                        <Col span={16}>
                          <form onSubmit={this.handleSubmit}>
                            <Card>
                              <h4>Technical Skills：</h4>
                              <Field
                                name="logic"
                                component={RfRate}
                                label="logic"
                                format={rateValueFormatter}
                                value={summary.logic}
                              />
                              <Field
                                name="language"
                                component={RfRate}
                                label="language"
                                format={rateValueFormatter}
                                value={summary.language}
                              />
                              <Field
                                name="techreview"
                                component={RfTextArea}
                                label="techreview"
                                value={summary.techreview}
                              />
                              <h4 style={{ marginTop: '12px' }}>
                                Personality：
                              </h4>
                              <Field
                                name="workwith"
                                component={RfRate}
                                label="workwith"
                                format={rateValueFormatter}
                                value={summary.workwith}
                              />
                              <Field
                                name="perstyreview"
                                component={RfTextArea}
                                label="perstyreview"
                                value={summary.perstyreview}
                              />
                            </Card>
                            <Button
                              htmlType="submit"
                              type="primary"
                              style={{ marginTop: '16px', float: 'right' }}
                              disabled={this.props.submitting}
                            >
                              Add Summary
                            </Button>
                          </form>
                        </Col>
                      </Row>
                    </>
                  )}
                </PageSpin>
              )
            );
          }}
        </Connect>
      </Modal>
    );
  }
}

AddSummaryModal.propTypes = {
  testID: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  footer: PropTypes.object,
  width: PropTypes.number.isRequired,
};

export default reduxForm({
  // pass from parent for embed same form multiple times
  // https://stackoverflow.com/questions/37456526/how-to-embed-the-same-redux-form-multiple-times-on-a-page/37464048#37464048
  form: 'InterviewerSummary',
  validate,
  enableReinitialize: true,
})(AddSummaryModal);
