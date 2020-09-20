import {
  makeExecutableSchema,
} from "apollo-server-express";
import {
  typeDefs,
  resolvers,
} from "graphql-scalars";
import {
  AccountSchema,
  RootSchema,
  TokenSchema,
  TrashSchema,
  BadgeSchema,
  ReportSchema,
} from "./graphql";

export const schema = makeExecutableSchema({
  typeDefs: [
    ...typeDefs,
    RootSchema.typeDefs,
    TokenSchema.typeDefs,
    AccountSchema.typeDefs,
    TrashSchema.typeDefs,
    BadgeSchema.typeDefs,
    ReportSchema.typeDefs,
  ],
  resolvers: [
    resolvers,
    RootSchema.resolver,
    TokenSchema.resolver,
    AccountSchema.resolver,
    TrashSchema.resolvers,
    BadgeSchema.resolvers,
    ReportSchema.resolvers,
  ],
});
