import { API, graphqlOperation } from 'aws-amplify';

export const getTest = `query GetTest($id: ID!) {
    getTest(id: $id) {
      id
      subjectId
      records {
        items {
          id
          ques {
            name
          }
          comment {
            items {
              author
              completeness
              content
              hint
              quality
            }
          }
        }
      }
      users {
        items {
          user {
            id
            name
          }
        }
      }
      results {
        items {
          author
          logic
          language
          perstyreview
          techreview
          workwith
        }
      }
    }
  }`;

export const getTest2 = `query GetTest($id: ID!) {
    getTest(id: $id) {
      id
      subjectId
      records {
        items {
          id
          ques {
            name
          }
          comment {
            items {
              author
              completeness
              content
              hint
              quality
            }
          }
          history {
            items {
              time
              code
              snapComments{
                items {
                  time
                  author
                  content
                }
              }
            }
          }
        }
      }
      users {
        items {
          user {
            id
            name
          }
        }
      }
      results {
        items {
          author
          logic
          language
          perstyreview
          techreview
          workwith
        }
      }
    }
  }`;

export function getallsnapcomments(testid) {
  const result = API.graphql(graphqlOperation(getTest2, { id: testid }));
  return result;
}
