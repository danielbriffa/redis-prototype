const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { iocContainer } = require('./IoCContainer');
const { schema } = require('./graphQL/schema');
const Logger = require('./common/Logger');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');

// init configuration
require('./init.js');

// which storage media to use is set in init.js
const storage = iocContainer.getService('Storage');
const adapter = iocContainer.getService('Adapter');

// resolver functions
const root = {
  getCollection: async ({ key }) => {
    try {
      // Fetch message from storage service
      let x = adapter.getMessage(key, await storage.getMessage(key));
      console.log(x);
      return x;
    } catch (error) {
      throw new Error('Error retrieving collection');
    }
  }
};

// Create Express app
const app = express();

// middleware
app.use(requestLogger);
app.use(errorHandler);

// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  Logger.info(`Server is running on http://localhost:${port}`);
});
