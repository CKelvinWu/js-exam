import React, { PureComponent } from 'react';
import { Rate, Row, Col, Divider, Typography } from 'antd';

import reduxForm from 'redux-form/es/reduxForm';
import Field from 'redux-form/es/Field';
import { Button, message, Form } from 'antd';
import createComment from 'utils/comment/comment';
const { Text, Link } = Typography;

//
const FieldizeRate = () => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  ...rest
}) => {
  const FormItem = Form.Item;
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Rate style={{}} allowHalf {...input} {...rest} children={children} />
    </FormItem>
  );
};
const RateScore = FieldizeRate();
//Reference: https://codesandbox.io/s/jzyl70wpk?file=/SimpleForm.js:611-1048

class AddNewScoreFormRedux extends React.Component {
  constructor(props) {
    super(props);
    this.state = { DisableSubmit: true };
    this.submitForm = this.props.handleSubmit(async data => {
      const id = this.props.questionid;
      const params = {
        commentRecordId: id,
        author: data.name,
        quality: data.quality,
        hint: data.hint,
        completeness: data.completeness,
        tags: 'no more comment',
        content: data.comment,
      };
      await createComment(params);
      message.success('Add Overall Score successfully');
      this.props.reset();
    });
  }
  onDetectNullAuthor = e => {
    if (e.target.value.length === 0) {
      this.setState({ DisableSubmit: true });
    } else {
      this.setState({ DisableSubmit: false });
    }
  };
  render() {
    return (
      <>
        <Row type="flex" align="middle">
          <h3 style={{ fontSize: 20, align: 'middle' }}>Interviewer：</h3>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="please leave your name"
            onChange={this.onDetectNullAuthor}
            style={{ width: '240px', marginTop: '-10px' }}
          />
        </Row>
        <form onSubmit={this.submitForm}>
          <Row type="flex" align="middle">
            <Col type="flex">
              <Row type="flex">
                <h4 style={{ display: 'inline', marginButtom: '20px' }}>
                  Skills
                </h4>
                <Field
                  style={{ marginLeft: '140px', marginButtom: '60px' }}
                  name="quality"
                  component={RateScore}
                />
              </Row>
              <Row type="flex">
                <h4 style={{ display: 'inline' }}> Potential</h4>
                <Field
                  style={{ marginLeft: '120px', marginButtom: '-120px' }}
                  name="completeness"
                  component={RateScore}
                />
              </Row>
              <Row type="flex">
                <h4 style={{ display: 'inline' }}> Adaptability </h4>
                <Field
                  name="hint"
                  style={{ marginLeft: '100px' }}
                  component={RateScore}
                />
              </Row>
            </Col>
            <>
              <Col
                type="flex"
                span={10}
                offset={5}
                style={{ marginTop: '-40px' }}
              >
                <h2 style={{ marginButtom: '200px' }}>Comment </h2>

                <Field
                  name="comment"
                  component="input"
                  type="text"
                  placeholder="please leave your comment"
                  style={{ height: '200px', width: '400px' }}
                />
              </Col>
              <Row>
                <Button
                  align="middle"
                  style={{ marginTop: '150px', marginLeft: '150px' }}
                  htmltype=""
                  disabled={this.state.DisableSubmit}
                >
                  {' '}
                  Add Score{' '}
                </Button>
              </Row>
            </>
          </Row>
        </form>
      </>
    );
  }
}
export default reduxForm({ form: 'AddScore' })(AddNewScoreFormRedux);
