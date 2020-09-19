import {
  gql,
  IResolvers,
} from "apollo-server-express";
import { AccountService } from "src/core";

const typeDefs = gql`
  type Account {
    idx: String
    id: String
    name: String
    isAdmin: Boolean
    publicKey: String
    privateKey: String
    accessToken: [OAuth]
  }
  input AccountInput {
    id: String!
    name: String!
    publicKey: String!
    privateKey: String!
    isAdmin: Boolean
  }
  extend type Mutation {
    createAccount(account: AccountInput!): Account
  }
`;

const resolver: IResolvers = {
  Mutation: {
    createAccount: async (parent, { account }, context, info) => {
      return await AccountService.createID(account.id, account.name, account.publicKey, account.privateKey, account.isAdmin);
    },
  }

};

export const AccountSchema = {
  typeDefs,
  resolver,
};
