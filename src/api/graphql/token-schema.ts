import {
  gql,
  IResolvers,
} from "apollo-server-express";
import { AccountService, TokenService } from "src/core";

const typeDefs = gql`
  type Payload {
    idx: Int
  }
  type OAuth {
    token: String
    payload: Payload
    expiredAt: DateTime
    account: Account
  }
  extend type Mutation {
    getAccessTokenByID(id: String!): OAuth!
  }
`;

const resolver: IResolvers = {
  Mutation: {
    getAccessTokenByID: async (parent, params, context, info) => {
      const account = await AccountService.findOneByID(params.id);
      if (account != null) {
        return await TokenService.generateAccessToken(account);
      }
    },
  },
};

export const TokenSchema = {
  typeDefs,
  resolver,
};
