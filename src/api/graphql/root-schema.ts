import {
  gql,
  IResolvers,
} from "apollo-server-express";

const typeDefs = gql`
  scalar Upload
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type Subscription {
    _: String
  }
`;

const resolver: IResolvers = {
  Query: {
    _: () => "",
  },
  Mutation: {
    _: () => "",
  },
  Subscription: {
    _: () => "",
  }
};

export const RootSchema = {
  typeDefs,
  resolver,
};
