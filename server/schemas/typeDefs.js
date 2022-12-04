const { gql } = require('apollo-server-express');


//savedBooks value is definitely wrong - not sure about id either
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    authors: String
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(authors: String!, decription: String!, title: String!, bookId: String!, image: String!, link: String!): User
    removeBook(bookId: String!): User
  }
`;

//Not sure on the ID portions - need help here

//look into creatign an input type to handle all parameters

module.exports = typeDefs;
