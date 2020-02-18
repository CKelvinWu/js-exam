import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from 'graphql/mutations';

// TODO: On UI this is the pop up of creating terminal
const createComment = async commentData => {
  const { commentRecordId, author, rate, content } = commentData;
  const params = {
    input: {
      commentRecordId,
      author,
      rate,
      content,
      time: new Date(),
    },
  };
  try {
    const { data } = await API.graphql(
      graphqlOperation(mutations.createComment, params),
    );
    return data.createComment;
  } catch (e) {
    throw e;
  }
};

export default createComment;
