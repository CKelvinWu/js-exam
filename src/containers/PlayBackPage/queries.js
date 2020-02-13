export const getTest = `query GetTest($id: ID! $limit: Int) {
  getTest(id: $id) {
    id
    subjectId
    timeBegin
    timeEnd
    records(limit: $limit) {
      items {
        id
        subjectId
        syncCode
        timeBegin
        timeEnd
        comment {
          items {
            author
            time
            rate {
              quality
              speed
              completeness
            }
            content
          }
          nextToken
        }
        ques {
          type 
          content
          name
          test
        }
      }
      nextToken
    }
  }
}`;
