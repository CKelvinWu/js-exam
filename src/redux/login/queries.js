export const listJEUsers = `
  query ListJEUsers(
    $filter: ModelJEUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJEUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        room {
            id
        }
      }
      nextToken
    }
  }
`;
