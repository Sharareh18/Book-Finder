const typeDefs = `
type Query {
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID!
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }
  type Book {
    authors: [String]
    description: String
    bookId: String!
    image: String
    link: String
    title: String!
    _id: ID!
  }
    input BookInput {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

// like act 26
type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(book: BookInput): User
    deleteBook(bookId: String!): User
}
`;

module.exports = typeDefs;