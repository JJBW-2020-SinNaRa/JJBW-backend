import {
  gql,
  IResolvers,
} from "apollo-server-express";
import {
  AccountService,
  BadgeService,
  TokenService,
} from "src/core";

const typeDefs = gql`
  type TimeStamp {
    createdAt: DateTime
    updatedAt: DateTime
  }
  type Badge {
    idx: Int
    name: String
    obtain: String
    badgeURL: String
    account: Account
    timestamp: TimeStamp
  }
  extend type Query {
    getBadges(token: String!): [Badge]
    getBadge(token: String!, idx: Int): Badge
  }
`;

const resolvers: IResolvers = {
  Query: {
    getBadges: async (parent, params, context, info) => {
      const { idx } = TokenService.verifyToken(params["token"]) as any;
      const account = await AccountService.findOneByIDX(parseInt(idx));
      if (account != null) {
        return await BadgeService.getBadges(account);
      }
      return null;
    },
    getBadge: async (parent, params, context, info) => {
      const { idx } = TokenService.verifyToken(params["token"]) as any;
      const account = await AccountService.findOneByIDX(parseInt(idx));
      if (account != null) {
        return await BadgeService.getBadge(parseInt(params.idx));
      }
      return null;
    },
  },
};

export const BadgeSchema = {
  typeDefs,
  resolvers,
};
