const express = require('express');
const path = require('path');
const db = require('./config/connection');

// const routes = require('./routes'); - DONT NEED ROUTES DUE TO REACT ROUTER, I THINK

//NEW STUFF INCLUDED - I DONT THINK THE ORDER MATTERS IN HOW HIGH THEY ARE IN THE CODE
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const { ApolloServer } = require('apollo-server-express');



//Implement the Apollo Server and apply it to the Express server as middleware.  DONE

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//DONT NEED TO USE THE ROUTES NOW



const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };

  startApolloServer(typeDefs, resolvers);