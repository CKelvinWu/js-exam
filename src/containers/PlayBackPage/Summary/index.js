import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Comment, Avatar, List, Rate, Icon, Row, Col } from 'antd';

import { rateDesc, hintDesc } from './constant';
import { API, graphqlOperation } from 'aws-amplify';
import { createResult, updateComment } from 'graphql/mutations';
import { listComments } from 'graphql/queries';

const Summary = ({ summaryList, visible, onCancel, summaryid }) => (
  <Modal
    title={`${summaryList.length} summary`}
    visible={visible}
    onCancel={onCancel}
    footer={null}
  >
    {summaryList.length > 0 && (
      <SummaryList data={summaryList} itid={summaryid} />
    )}
  </Modal>
);

const SummaryList = ({ data, itid }) => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <React.Fragment>
        <Row type="flex" align="middle">
          <Col span={6}>Code Quality</Col>
          <Col span={18}>
            <Rate
              tooltips={rateDesc}
              value={item.quality}
              onChange={async newValue => {
                let {
                  id,
                  author,
                  completeness,
                  content,
                  hint,
                  quality,
                  time,
                } = item;
                quality = newValue;
                const searchid = itid.comment.items[0].time;
                const listq = `query {
                  listComments (
                    filter: {
                      time:{
                        eq:"${searchid}"
                      }
                    }
            
                  ) {
                    items {
                      id,
                      content,
                      time
                    }
                  }
                }`;
                /////
                try {
                  const result = await API.graphql(graphqlOperation(listq));
                  //console.log(result.data.listComments.items[0].id)
                  id = result.data.listComments.items[0].id;
                } catch (e) {
                  throw e;
                }

                /////
                const new_params = {
                  input: {
                    id,
                    author,
                    completeness,
                    content,
                    hint,
                    quality,
                    time,
                  },
                };

                const query = `mutation UpdateComment($input: UpdateCommentInput!) {
                updateComment(input: $input) {
                  id
                  author
                  completeness
                  content
                  hint
                  quality
                  time
                }
              }`;
                try {
                  const { data } = await API.graphql(
                    graphqlOperation(query, new_params),
                  );
                  console.log('successful');
                } catch (e) {
                  throw e;
                }
              }}
            />
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={6}>Completeness</Col>
          <Col span={18}>
            <Rate
              tooltips={rateDesc}
              value={item.completeness}
              onChange={async newValue => {
                let {
                  id,
                  author,
                  completeness,
                  content,
                  hint,
                  quality,
                  time,
                } = item;
                completeness = newValue;
                const searchid = itid.comment.items[0].time;
                const listq = `query {
                  listComments (
                    filter: {
                      time:{
                        eq:"${searchid}"
                      }
                    }
            
                  ) {
                    items {
                      id,
                      content,
                      time
                    }
                  }
                }`;
                /////
                try {
                  const result = await API.graphql(graphqlOperation(listq));
                  //console.log(result.data.listComments.items[0].id)
                  id = result.data.listComments.items[0].id;
                } catch (e) {
                  throw e;
                }

                /////
                const new_params = {
                  input: {
                    id,
                    author,
                    completeness,
                    content,
                    hint,
                    quality,
                    time,
                  },
                };

                const query = `mutation UpdateComment($input: UpdateCommentInput!) {
                updateComment(input: $input) {
                  id
                  author
                  completeness
                  content
                  hint
                  quality
                  time
                }
              }`;
                try {
                  const { data } = await API.graphql(
                    graphqlOperation(query, new_params),
                  );
                  console.log('successful');
                } catch (e) {
                  throw e;
                }
              }}
            />
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={6}>Hints Given</Col>
          <Col span={18}>
            <Rate
              character={<Icon type="bulb" theme="filled" />}
              style={{ color: 'grey' }}
              tooltips={hintDesc}
              value={item.hint}
              onChange={async newValue => {
                let {
                  id,
                  author,
                  completeness,
                  content,
                  hint,
                  quality,
                  time,
                } = item;
                quality = newValue;
                const searchid = itid.comment.items[0].time;
                const listq = `query {
                    listComments (
                      filter: {
                        time:{
                          eq:"${searchid}"
                        }
                      }
              
                    ) {
                      items {
                        id,
                        content,
                        time
                      }
                    }
                  }`;
                /////
                try {
                  const result = await API.graphql(graphqlOperation(listq));
                  //console.log(result.data.listComments.items[0].id)
                  id = result.data.listComments.items[0].id;
                } catch (e) {
                  throw e;
                }

                /////
                const new_params = {
                  input: {
                    id,
                    author,
                    completeness,
                    content,
                    hint,
                    quality,
                    time,
                  },
                };

                const query = `mutation UpdateComment($input: UpdateCommentInput!) {
                  updateComment(input: $input) {
                    id
                    author
                    completeness
                    content
                    hint
                    quality
                    time
                  }
                }`;
                try {
                  const { data } = await API.graphql(
                    graphqlOperation(query, new_params),
                  );
                  console.log('successful');
                } catch (e) {
                  throw e;
                }
              }}
            />
          </Col>
        </Row>
        <Comment
          author={item.author}
          content={item.content}
          avatar={<Avatar>{item.author[0].toUpperCase()}</Avatar>}
          onChange={async newValue => {
            console.log(item, newValue);
            const new_params = item;
            new_params.content = newValue;
            console.log(new_params);
            try {
              const { data } = await API.graphql(
                graphqlOperation(updateComment, new_params),
              );
            } catch (e) {
              throw e;
            }
          }}
        />
      </React.Fragment>
    )}
  />
);

Summary.propTypes = {
  summaryList: PropTypes.array,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
};

SummaryList.propTypes = {
  data: PropTypes.array,
};
export default Summary;
