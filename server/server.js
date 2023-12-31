// const express = require('express');
// const path = require('path');
// const db = require('./config/connection');
// const routes = require('./routes');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });


const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { authMiddleware } = require('./utils/auth'); 

// Importing GraphQL schema and resolvers
const typeDefs = require('./schemas');
const resolvers = require('./schemas'); 

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Apply auth middleware to all routes
app.use(authMiddleware);

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
}
);

const startApolloServer = async () => {
  await server.start();
  await server.applyMiddleware({ app });
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
};

db.once('open', () => {
  app.listen(PORT, () => 
  console.log(`Now listening on localhost:${PORT}`));
});

startApolloServer();