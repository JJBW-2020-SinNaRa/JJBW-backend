import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
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
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(cors({
    origin: (origin, callback) => {
      return callback(null, true);
    },
    credentials: true,
  }))
  .use("/public", express.static(path.resolve(__dirname, "../../public")))
  .use(express.static(path.resolve(__dirname, "../../../JJBW-frontend/build")))
  .get("*", (req, res, next) => {
    if (req.path === "/graph" && process.env.NODE_ENV !== "production") {
      return next();
    }
    return res.sendFile(path.resolve(__dirname, "../../../JJBW-frontend/build/index.html"))
  })

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
