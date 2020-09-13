import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
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
  .use(cookieParser())
  .use(cors({
    origin: (origin, callback) => {
      if (!origin || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      if (/^(https?:\/\/)?([\w\d-\.]*\.)?example.com/.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed CORS."), false);
    },
    credentials: true,
  }));

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
