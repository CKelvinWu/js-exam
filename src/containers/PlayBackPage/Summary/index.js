import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Comment,
  Avatar,
  List,
  Rate,
  Icon,
  Row,
  Col,
  Input,
  Button,
  Form,
  message,
} from 'antd';

import { rateDesc, hintDesc } from './constant';
import { API, graphqlOperation } from 'aws-amplify';
import { get, update } from 'lodash';

const get_commentid = async commenttime => {
  const listq = `query {
    listComments (
      filter: {
        time:{
          eq:"${commenttime}"
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
    const id = result.data.listComments.items[0].id;
    console.log(id);
    return id;
  } catch (e) {
    throw e;
  }
};

const updateComment = async (newValue, timeid, item, type) => {
  let { id, author, completeness, content, hint, quality, time } = item;
  if (type == 'quality') {
    quality = newValue;
  }
  if (type == 'completness') {
    completeness = newValue;
  }
  if (type == 'hint') {
    hint = newValue;
  }
  if (type == 'comment') {
    content = newValue;
  }

  const searchid = timeid.comment.items[0].time;
  id = await get_commentid(searchid);

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
    const { data } = await API.graphql(graphqlOperation(query, new_params));
    console.log('successful');
  } catch (e) {
    throw e;
  }
};

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
let new_comment = '';
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
              onChange={newValue => {
                updateComment(newValue, itid, item, 'quality');
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
              onChange={newValue => {
                updateComment(newValue, itid, item, 'completness');
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
              onChange={newValue => {
                updateComment(newValue, itid, item, 'hint');
              }}
            />
          </Col>
        </Row>
        <Comment
          author={item.author}
          content={item.content}
          avatar={<Avatar>{item.author[0].toUpperCase()}</Avatar>}
        />

        <Form
          onSubmit={newValue => {
            updateComment(new_comment, itid, item, 'comment');
          }}
        >
          <label>
            If you have new comment please write here:
            <input
              placeholder={item.content}
              type="text"
              onChange={new_val => {
                new_comment = new_val.target.value;
                //console.log(new_comment)
              }}
            />
          </label>
          <input type="submit" value="Submit" />
        </Form>
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
