const gql = require('graphql-tag');

module.exports = gql`
  type Customer {
    id: ID!
    name: String
    phoneNo:String
  }

  input CreateCustomerInput {
    name: String !
    phoneNo: String !
  }

  extend type Mutation {
    createCustomer(customer: CreateCustomerInput!): Customer
  }
  
  extend type Query {
    customer: String
  }
`;
