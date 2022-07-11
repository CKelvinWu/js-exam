import { API, graphqlOperation } from 'aws-amplify';

import * as mutations from 'graphql/mutations';

import * as subscriptions from 'graphql/subscriptions';

const listQuestions = async type => {
  const query = `
    query {
      listQuestions (
        filter: {
          type:{
            eq: "${type}"
          }
        }
        limit: 1000
      ) {
        items {
          id,
          name,
          type
        }
      }
    }`;
  const result = await API.graphql(graphqlOperation(query));
  return result.data.listQuestions;
};

const createQuestion = async data => {
  const { tags, name, content, test, type } = data;
  const params = {
    input: {
      name,
      content,
      test,
      tags,
      type,
    },
  };
  const query = `mutation CreateQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
      name
      content
      test
      type
      tags
    }
  }`;
  const result = await API.graphql(graphqlOperation(query, params));
  return result;
};

const getQuestion = async id => {
  const query = `query {
    getQuestion(id: "${id}") {
      name
      content
      test
      tags
    }
  }`;
  const { data } = await API.graphql(graphqlOperation(query));
  return data.getQuestion;
};

const updateQuestion = async data => {
  const { id, name, content, test, tags } = data;
  const params = {
    input: {
      id,
      name,
      content,
      test,
      tags,
    },
  };
  const query = `mutation UpdateQuestion($input: UpdateQuestionInput!) {
    updateQuestion(input: $input) {
      id
      name
      content
      test
      tags
    }
  }`;
  const result = await API.graphql(graphqlOperation(query, params));
  return result;
};

const deleteQuestion = async params => {
  const result = await API.graphql(
    graphqlOperation(mutations.deleteQuestion, params),
  );
  return result;
};

const dispatchQuestion = async question => {
  const params = {
    input: {
      type: question.type,
      name: question.name,
      content: question.content,
      test: question.test,
    },
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.createQuestionSnapshot, params),
  );
  return data.createQuestionSnapshot;
};

const subscribeOnCreateQuestionSnapshot = callback => {
  API.graphql(
    graphqlOperation(subscriptions.onCreateQuestionSnapshot),
  ).subscribe({
    next: ({ value }) => {
      callback(value.data.onCreateQuestionSnapshot);
    },
  });
};

export {
  listQuestions,
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  dispatchQuestion,
  subscribeOnCreateQuestionSnapshot,
};
