import React from 'react';
import { Rate, Row, Col, Input, Button, message, Form } from 'antd';
import { reduxForm, Field, getFormValues, initialize, reset } from 'redux-form';
import createComment from 'utils/comment/comment';
import { connect } from 'react-redux';
const { TextArea } = Input;

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
      <Rate allowHalf {...input} {...rest} children={children} />
    </FormItem>
  );
};

const FieldizeComment = (height, width) => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  ...rest
}) => {
  const FormItem = Form.Item;
  const hasError = meta.touched && meta.invalid;
  const heightpx = height.toString() + 'px';
  const widthpx = width.toString() + 'px';
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <TextArea
        bordered={false}
        {...input}
        {...rest}
        children={children}
        style={{
          height: heightpx,
          width: widthpx,
          overflowY: 'auto',
        }}
      ></TextArea>
    </FormItem>
  );
};
const FieldizeInput = (height, width) => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  ...rest
}) => {
  const FormItem = Form.Item;
  const hasError = meta.touched && meta.invalid;
  const heightpx = height.toString() + 'px';
  const widthpx = width.toString() + 'px';
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Input
        bordered={false}
        {...input}
        {...rest}
        children={children}
        style={{
          height: heightpx,
          width: widthpx,
          overflowY: 'auto',
        }}
      ></Input>
    </FormItem>
  );
};
const RateScore = FieldizeRate();
const CommentScore = FieldizeComment(200, 400);
const NameScore = FieldizeInput(40, 200);
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
    this.handleSubmit = event => {
      event.preventDefault();
      this.submitForm();
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    this.submitForm();
  };
  componentWillUnmount() {
    this.props.reset();
  }

  onDetectNullValue = e => {
    setTimeout(
      () => {
        try {
          if (
            this.props.formStates.name !== undefined &&
            this.props.formStates.quality !== undefined &&
            this.props.formStates.completeness !== undefined &&
            this.props.formStates.hint !== undefined
          ) {
            console.log(this.props.formStates.hint !== undefined);
            this.setState({ DisableSubmit: false });
          }
        } catch (e) {
          this.setState({ DisableSubmit: true });
        }
      },

      '50',
    );
  };
  //setting timeout to make data get enough time stored in redux store

  render() {
    const shouldEnableSubmitButton =
      this.props.formStates?.name &&
      Number.isFinite(this.props.formStates?.quality) &&
      Number.isFinite(this.props.formStates?.completeness) &&
      Number.isFinite(this.props.formStates?.hint);
    console.log(this.props.uppervisible);
    return (
      <>
        <Row type="flex" align="middle">
          <h2 style={{ fontSize: '20px', marginTop: '-10px' }}>
            Interviewer：
          </h2>
          <Field
            name="name"
            component={NameScore}
            type="text"
            placeholder="please leave your name"
            style={{ width: '240px', height: '50px', marginTop: '-10px' }}
            onChange={this.onDetectNullValue}
          />
        </Row>
        <form>
          <Row type="flex" align="middle">
            <Col type="flex">
              <Row type="flex">
                <h4 style={{ display: 'inline', marginTop: '120px' }}>
                  Skills
                </h4>
                <Field
                  style={{ marginLeft: '145px', marginTop: '110px' }}
                  name="quality"
                  component={RateScore}
                  onChange={this.onDetectNullValue}
                />
              </Row>
              <Row type="flex">
                <h4 style={{ display: 'inline', marginTop: '10px' }}>
                  Potential
                </h4>
                <Field
                  style={{ marginLeft: '120px', marginBottom: '-130px' }}
                  name="completeness"
                  component={RateScore}
                  onChange={this.onDetectNullValue}
                />
              </Row>
              <Row type="flex">
                <h4 style={{ display: 'inline', marginTop: '10px' }}>
                  Adaptability
                </h4>
                <Field
                  name="hint"
                  style={{ marginLeft: '100px' }}
                  component={RateScore}
                  onChange={this.onDetectNullValue}
                />
              </Row>
            </Col>
            <>
              <Col
                type="flex"
                span={10}
                offset={5}
                style={{ marginTop: '-60px' }}
              >
                <h2 style={{ marginBottom: '150px' }}>Comment </h2>

                <Field
                  name="comment"
                  component={CommentScore}
                  type="text"
                  placeholder="please leave your comment"
                  style={{ marginTop: '500px' }}
                />
              </Col>
              <Row>
                <Button
                  align="middle"
                  style={{
                    marginTop: '50px',
                    marginLeft: '150px',
                    width: '100px',
                  }}
                  disabled={!shouldEnableSubmitButton}
                  htmlType="submit"
                  onClick={this.handleSubmit}
                  onKeyPress={e => {
                    if (e.key === 'Enter') e.preventDefault();
                  }}
                >
                  Add Score
                </Button>
              </Row>
            </>
          </Row>
        </form>
      </>
    );
  }
}

//const testreduxstate=connect(mapStateToProps, null)(AddNewScoreFormRedux);
function mapStateToProps(state) {
  return {
    formStates: getFormValues('AddScore')(state),
  };
}
export default connect(mapStateToProps)(
  reduxForm({ form: 'AddScore' })(AddNewScoreFormRedux),
);
