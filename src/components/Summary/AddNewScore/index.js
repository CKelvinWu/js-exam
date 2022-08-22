import React from 'react';
import { Typography, Row, Col, Rate, Button, Form, message, Input } from 'antd';
import PropTypes from 'prop-types';
import createComment from 'utils/comment/comment';

class AddNewScoreForm extends React.Component {
  render() {
    let comment_name = '';
    let comment_text = '';
    let formdata = {
      author: comment_name,
      quality: 2,
      completeness: 2,
      hints: 2,
      content: comment_text,
    };
    return (
      <>
        <div>
          {' '}
          You can enter new comment here
          <Form
            onSubmit={async () => {
              const id = this.props.questionid;
              formdata.author = comment_name;
              formdata.content = comment_text;
              const params = {
                commentRecordId: id,
                author: formdata.author,
                quality: formdata.quality,
                hint: formdata.hints,
                completeness: formdata.completeness,
                tags: 'no more comment',
                content: formdata.content,
              };
              await createComment(params);
              message.success('Add Overall Score successfully');
            }}
            align={'left'}
          >
            <Col>
              <Row>
                <Input
                  style={{ width: 200 }}
                  onChange={e => {
                    comment_name = e.target.value;
                  }}
                  placeholder="Please leave your name"
                />
              </Row>
              <br></br>
              <Row>
                <Col>
                  Skills &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                  <Rate
                    allowHalf
                    onChange={new_val => {
                      formdata.quality = new_val;
                    }}
                  ></Rate>
                </Col>
              </Row>
              <Row>
                <Col>
                  Potential &nbsp; &nbsp;
                  <Rate
                    allowHalf
                    onChange={new_val => {
                      formdata.compeleteness = new_val;
                    }}
                  ></Rate>
                </Col>
              </Row>
              <Row>
                <Col>
                  Adaptability
                  <Rate
                    allowHalf
                    onChange={new_val => {
                      formdata.hints = new_val;
                    }}
                  ></Rate>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Input
                  style={{ width: 200, height: 100 }}
                  onChange={e => {
                    comment_text = e.target.value;
                  }}
                  placeholder={'Please leave your comment'}
                />
              </Row>

              <Row>
                <br></br>
                <br></br>
                <Button type="primary" htmlType="submit">
                  Add a Score
                </Button>
              </Row>
            </Col>
          </Form>
        </div>
      </>
    );
  }
}
AddNewScoreForm.propTypes = {
  questionid: PropTypes.string.isRequired,
};
export default AddNewScoreForm;
