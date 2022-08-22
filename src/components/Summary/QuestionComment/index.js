import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Rate, Icon, Divider, Typography, Comment } from 'antd';

class QuestionComment extends React.Component {
  render() {
    const { interviewer, questions, comments } = this.props;
    if (!comments || !comments.length) {
      return (
        <h4 style={{ display: 'inline', color: 'red' }}>Not Available !</h4>
      );
    }

    return (
      <>
        <h3 style={{ fontSize: 20 }}>Interviewer：{interviewer}</h3>
        {questions.map((ques, index) => {
          return (
            <Row key={ques.id} type="flex" align="middle">
              <Col>
                <Row>
                  <h4 style={{ display: 'inline' }}>
                    {' '}
                    Skills
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                  </h4>
                  <Rate value={comments[0].quality} />
                </Row>
                <Row>
                  <h4 style={{ display: 'inline' }}>
                    {' '}
                    Potential &nbsp; &nbsp;{' '}
                  </h4>
                  <Rate value={comments[0].completeness} />
                </Row>
                <Row>
                  <h4 style={{ display: 'inline' }}> Adaptability </h4>
                  <Rate value={comments[0].hint} />
                </Row>
              </Col>
              <>
                <Col span={10} offset={5}>
                  <h2 style={{ marginTop: -10 }}>Comment </h2>

                  <Comment
                    style={{
                      height: '200px',
                      width: '400px',
                      overflowY: 'auto',
                    }}
                    type="flex"
                    content={comments[0].content}
                  />
                </Col>
              </>
            </Row>
          );
          // the if statement
        })}
        <Divider dashed />
      </>
    );
  }
}
QuestionComment.propTypes = {
  interviewer: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default QuestionComment;
