const { buildSchema } = require('graphql');

// Define GraphQL schema
const schema = buildSchema(`
  scalar JSON

  type Query {
    getCollection(key: String!): Collection
    getLookup(key: String!): Lookup
  }

  type Collection {
    name: String!
    data: [JSON]!
  }

  type Lookup {
    name: String!
    data: [LookupItem]!
  }

  type LookupItem {
    key: String!
    value: String!
    meta: [JSON]!
  }
`);

module.exports = { schema };
