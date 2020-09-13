import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {
  ApolloServer,
  ApolloServerExpressConfig,
  ServerRegistration
} from "apollo-server-express";
import {
  schema,
} from "./schema";
import {
  contextHandler,
} from "./middlewares";

const app = express();
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cookieParser());

const apolloConfig: ApolloServerExpressConfig = {
  context: contextHandler,
  playground: process.env.NODE_ENV !== "production",
  schema: schema,
};
const registration: ServerRegistration = {
  app: app,
  path: "/graph",
  cors: false,
};
const apollo = new ApolloServer(apolloConfig);
apollo.applyMiddleware(registration);

export {
  app,
};
