/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRoom = /* GraphQL */ `
  query GetRoom($id: ID!) {
    getRoom(id: $id) {
      id
      test {
        id
        subjectId
        description
        timeBegin
        timeEnd
        status
        tags
        createdAt
        updatedAt
      }
      subjectId
      description
      host {
        id
        name
        createdAt
        updatedAt
      }
      createTime
      password
      users {
        nextToken
      }
      currentRecord {
        id
        subjectId
        syncCode
        timeBegin
        timeEnd
        status
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRooms = /* GraphQL */ `
  query ListRooms(
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        subjectId
        description
        createTime
        password
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getJEUser = /* GraphQL */ `
  query GetJEUser($id: ID!) {
    getJEUser(id: $id) {
      id
      name
      room {
        id
        subjectId
        description
        createTime
        password
        createdAt
        updatedAt
      }
      team {
        id
        name
        description
        createdAt
        updatedAt
      }
      tests {
        nextToken
      }
      hostTest {
        id
        subjectId
        description
        timeBegin
        timeEnd
        status
        tags
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listJEUsers = /* GraphQL */ `
  query ListJEUsers(
    $filter: ModelJEUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJEUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      name
      description
      users {
        nextToken
      }
      questionSet {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTest = /* GraphQL */ `
  query GetTest($id: ID!) {
    getTest(id: $id) {
      id
      room {
        id
        subjectId
        description
        createTime
        password
        createdAt
        updatedAt
      }
      team {
        id
        name
        description
        createdAt
        updatedAt
      }
      subjectId
      users {
        nextToken
      }
      host {
        id
        name
        createdAt
        updatedAt
      }
      description
      timeBegin
      timeEnd
      records {
        nextToken
      }
      results {
        nextToken
      }
      status
      tags
      createdAt
      updatedAt
    }
  }
`;
export const listTests = /* GraphQL */ `
  query ListTests(
    $filter: ModelTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        subjectId
        description
        timeBegin
        timeEnd
        status
        tags
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTestJEUser = /* GraphQL */ `
  query GetTestJEUser($id: ID!) {
    getTestJEUser(id: $id) {
      id
      userID
      testID
      user {
        id
        name
        createdAt
        updatedAt
      }
      test {
        id
        subjectId
        description
        timeBegin
        timeEnd
        status
        tags
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTestJEUsers = /* GraphQL */ `
  query ListTestJEUsers(
    $filter: ModelTestJEUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestJEUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        testID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRecord = /* GraphQL */ `
  query GetRecord($id: ID!) {
    getRecord(id: $id) {
      id
      subjectId
      syncCode
      interviewer {
        id
        name
        createdAt
        updatedAt
      }
      timeBegin
      timeEnd
      status
      comment {
        nextToken
      }
      history {
        nextToken
      }
      ques {
        type
        name
        content
        test
      }
      question {
        id
        type
        name
        content
        test
        createdAt
        updatedAt
      }
      test {
        id
        subjectId
        description
        timeBegin
        timeEnd
        status
        tags
        createdAt
        updatedAt
      }
      room {
        id
        subjectId
        description
        createTime
        password
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRecords = /* GraphQL */ `
  query ListRecords(
    $filter: ModelRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        subjectId
        syncCode
        timeBegin
        timeEnd
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getResult = /* GraphQL */ `
  query GetResult($id: ID!) {
    getResult(id: $id) {
      id
      logic
      language
      workwith
      techreview
      perstyreview
      author
      role
      test {
        id
        subjectId
        description
        timeBegin
        timeEnd
        status
        tags
        createdAt
        updatedAt
      }
      time
      createdAt
      updatedAt
    }
  }
`;
export const listResults = /* GraphQL */ `
  query ListResults(
    $filter: ModelResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        logic
        language
        workwith
        techreview
        perstyreview
        author
        role
        time
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      author
      time
      content
      hint
      quality
      completeness
      tags
      record {
        id
        subjectId
        syncCode
        timeBegin
        timeEnd
        status
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        author
        time
        content
        hint
        quality
        completeness
        tags
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHistory = /* GraphQL */ `
  query GetHistory($id: ID!) {
    getHistory(id: $id) {
      id
      time
      code
      record {
        id
        subjectId
        syncCode
        timeBegin
        timeEnd
        status
        createdAt
        updatedAt
      }
      snapComments {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listHistorys = /* GraphQL */ `
  query ListHistorys(
    $filter: ModelHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHistorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        time
        code
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSnapComment = /* GraphQL */ `
  query GetSnapComment($id: ID!) {
    getSnapComment(id: $id) {
      id
      time
      author
      content
      history {
        id
        time
        code
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSnapComments = /* GraphQL */ `
  query ListSnapComments(
    $filter: ModelSnapCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSnapComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        time
        author
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getQuestionSnapshot = /* GraphQL */ `
  query GetQuestionSnapshot($id: ID!) {
    getQuestionSnapshot(id: $id) {
      id
      type
      name
      content
      test
      record {
        id
        subjectId
        syncCode
        timeBegin
        timeEnd
        status
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listQuestionSnapshots = /* GraphQL */ `
  query ListQuestionSnapshots(
    $filter: ModelQuestionSnapshotFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestionSnapshots(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        name
        content
        test
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getQuestionSet = /* GraphQL */ `
  query GetQuestionSet($id: ID!) {
    getQuestionSet(id: $id) {
      id
      team {
        id
        name
        description
        createdAt
        updatedAt
      }
      questions {
        nextToken
      }
      name
      description
      tags
      createdAt
      updatedAt
    }
  }
`;
export const listQuestionSets = /* GraphQL */ `
  query ListQuestionSets(
    $filter: ModelQuestionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestionSets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        tags
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      type
      questionSet {
        id
        name
        description
        tags
        createdAt
        updatedAt
      }
      name
      content
      test
      tags
      createdAt
      updatedAt
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        name
        content
        test
        tags
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
