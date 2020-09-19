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
} from "./graphql";

export const schema = makeExecutableSchema({
  typeDefs: [
    ...typeDefs,
    RootSchema.typeDefs,
    TokenSchema.typeDefs,
    AccountSchema.typeDefs,
    TrashSchema.typeDefs,
  ],
  resolvers: [
    resolvers,
    RootSchema.resolver,
    TokenSchema.resolver,
    AccountSchema.resolver,
    TrashSchema.resolvers,
  ],
});
