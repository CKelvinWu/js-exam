import React, { PureComponent } from 'react';
import { Rate } from 'antd';

import reduxForm from 'redux-form/es/reduxForm';
import Field from 'redux-form/es/Field';
import { Button, message, Form } from 'antd';
import createComment from 'utils/comment/comment';

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
      <Rate allowHalf {...input} {...rest} children={children} />
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
      console.log(data);
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
      console.log('send para', params);
      await createComment(params);
      message.success('Add Overall Score successfully');
      this.props.reset();
    });
  }
  onDetectNullAuthor = e => {
    console.log(e.target.value);
    if (e.target.value.length === 0) {
      this.setState({ DisableSubmit: true });
      console.log(this.state.DisableSubmit);
    } else {
      this.setState({ DisableSubmit: false });
      console.log(this.state.DisableSubmit);
    }
  };
  render() {
    return (
      <div>
        <label>REDUX area test</label>
        <form onSubmit={this.submitForm}>
          <div>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder="please leave your name"
              onChange={this.onDetectNullAuthor}
            />
          </div>
          <Field name="quality" component={RateScore} />
          <Field name="completeness" component={RateScore} />
          <Field name="hint" component={RateScore} />
          <div>
            <Field
              name="comment"
              component="input"
              type="text"
              placeholder="please leave your comment"
            />
          </div>
          <Button htmlType="submit" visible={this.state.DisableSubmit}>
            {' '}
            Add Score{' '}
          </Button>
        </form>
      </div>
    );
  }
}
export default reduxForm({ form: 'AddScore' })(AddNewScoreFormRedux);
