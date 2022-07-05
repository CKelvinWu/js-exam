/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateJEUserByJEUserId = /* GraphQL */ `
  subscription OnUpdateJEUserByJEUserId($id: String) {
    onUpdateJEUserByJEUserId(id: $id) {
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
export const onUpdateTeamByTeamId = /* GraphQL */ `
  subscription OnUpdateTeamByTeamId($id: String) {
    onUpdateTeamByTeamId(id: $id) {
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
export const onUpdateTestByTestId = /* GraphQL */ `
  subscription OnUpdateTestByTestId($id: String) {
    onUpdateTestByTestId(id: $id) {
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
export const onUpdateRoomByRoomId = /* GraphQL */ `
  subscription OnUpdateRoomByRoomId($id: String) {
    onUpdateRoomByRoomId(id: $id) {
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
export const onUpdateRecordByRecordId = /* GraphQL */ `
  subscription OnUpdateRecordByRecordId($id: String) {
    onUpdateRecordByRecordId(id: $id) {
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
export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom {
    onCreateRoom {
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
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom {
    onUpdateRoom {
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
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom {
    onDeleteRoom {
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
export const onCreateJEUser = /* GraphQL */ `
  subscription OnCreateJEUser {
    onCreateJEUser {
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
export const onUpdateJEUser = /* GraphQL */ `
  subscription OnUpdateJEUser {
    onUpdateJEUser {
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
export const onDeleteJEUser = /* GraphQL */ `
  subscription OnDeleteJEUser {
    onDeleteJEUser {
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
export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam {
    onCreateTeam {
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
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam {
    onUpdateTeam {
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
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam {
    onDeleteTeam {
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
export const onCreateTest = /* GraphQL */ `
  subscription OnCreateTest {
    onCreateTest {
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
export const onUpdateTest = /* GraphQL */ `
  subscription OnUpdateTest {
    onUpdateTest {
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
export const onDeleteTest = /* GraphQL */ `
  subscription OnDeleteTest {
    onDeleteTest {
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
export const onCreateTestJEUser = /* GraphQL */ `
  subscription OnCreateTestJEUser {
    onCreateTestJEUser {
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
export const onUpdateTestJEUser = /* GraphQL */ `
  subscription OnUpdateTestJEUser {
    onUpdateTestJEUser {
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
export const onDeleteTestJEUser = /* GraphQL */ `
  subscription OnDeleteTestJEUser {
    onDeleteTestJEUser {
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
export const onCreateRecord = /* GraphQL */ `
  subscription OnCreateRecord {
    onCreateRecord {
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
export const onUpdateRecord = /* GraphQL */ `
  subscription OnUpdateRecord {
    onUpdateRecord {
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
export const onDeleteRecord = /* GraphQL */ `
  subscription OnDeleteRecord {
    onDeleteRecord {
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
export const onCreateResult = /* GraphQL */ `
  subscription OnCreateResult {
    onCreateResult {
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
export const onUpdateResult = /* GraphQL */ `
  subscription OnUpdateResult {
    onUpdateResult {
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
export const onDeleteResult = /* GraphQL */ `
  subscription OnDeleteResult {
    onDeleteResult {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
export const onCreateHistory = /* GraphQL */ `
  subscription OnCreateHistory {
    onCreateHistory {
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
export const onUpdateHistory = /* GraphQL */ `
  subscription OnUpdateHistory {
    onUpdateHistory {
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
export const onDeleteHistory = /* GraphQL */ `
  subscription OnDeleteHistory {
    onDeleteHistory {
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
export const onCreateSnapComment = /* GraphQL */ `
  subscription OnCreateSnapComment {
    onCreateSnapComment {
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
export const onUpdateSnapComment = /* GraphQL */ `
  subscription OnUpdateSnapComment {
    onUpdateSnapComment {
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
export const onDeleteSnapComment = /* GraphQL */ `
  subscription OnDeleteSnapComment {
    onDeleteSnapComment {
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
export const onCreateQuestionSnapshot = /* GraphQL */ `
  subscription OnCreateQuestionSnapshot {
    onCreateQuestionSnapshot {
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
export const onUpdateQuestionSnapshot = /* GraphQL */ `
  subscription OnUpdateQuestionSnapshot {
    onUpdateQuestionSnapshot {
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
export const onDeleteQuestionSnapshot = /* GraphQL */ `
  subscription OnDeleteQuestionSnapshot {
    onDeleteQuestionSnapshot {
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
export const onCreateQuestionSet = /* GraphQL */ `
  subscription OnCreateQuestionSet {
    onCreateQuestionSet {
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
export const onUpdateQuestionSet = /* GraphQL */ `
  subscription OnUpdateQuestionSet {
    onUpdateQuestionSet {
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
export const onDeleteQuestionSet = /* GraphQL */ `
  subscription OnDeleteQuestionSet {
    onDeleteQuestionSet {
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
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
