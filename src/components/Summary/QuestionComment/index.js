import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Rate, Icon, Divider } from 'antd';

class QuestionComment extends React.Component {
  render() {
    const { interviewer, questions, comments } = this.props;
    return (
      <>
        <h3>Interviewer：{interviewer}</h3>
        {questions.map((ques, index) => {
          const comment = comments.find(c => c.questionID === ques.id);
          if (typeof comment !== 'undefined') {
            return (
              <Row
                key={comment.questionID}
                type="flex"
                align="middle"
                style={{ marginTop: '20px' }}
              >
                <Col span={8} offset={3}>
                  <h4>overall score</h4>
                </Col>
                {comment ? (
                  <>
                    <Col span={4}>
                      <h4 style={{ display: 'inline' }}> Code quality </h4>
                    </Col>
                    <Col span={8}>
                      <Rate
                        value={comment.quality}
                        onChange={() => {
                          console.log(interviewer, questions, comments);
                        }}
                      />
                    </Col>
                    <Col span={4} offset={11}>
                      <h4 style={{ display: 'inline' }}> Compeleteness </h4>
                    </Col>
                    <Col span={8}>
                      <Rate value={comment.completeness} />
                    </Col>
                    <Col span={4} offset={11}>
                      <h4 style={{ display: 'inline' }}> How much hints </h4>
                    </Col>
                    <Col span={8}>
                      <Rate
                        value={comment.hint}
                        character={<Icon type="bulb" theme="filled" />}
                        style={{ color: 'grey' }}
                      />
                    </Col>
                  </>
                ) : (
                  <>
                    <Col span={4}>
                      <h4 style={{ display: 'inline', color: 'red' }}>
                        {' '}
                        Not Available !{' '}
                      </h4>
                    </Col>
                  </>
                )}
              </Row>
            );
          } // the if statement
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
