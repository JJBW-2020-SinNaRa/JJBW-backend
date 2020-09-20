import {
  gql,
  IResolvers,
} from "apollo-server-express";
import {
  AccountService,
  ReportService,
  TokenService,
} from "src/core";
import {
  upload,
} from "./trash-schema";

const typeDefs = gql`
  type Report {
    reard: Float
    description: String
    location: String
    type: String
    discoveredAt: String
    image: String
    foundPhotos: String
    reporter: Account
    scenePhoto: String
    wastePhoto: String
    cleaner: Account
    isPaid: Boolean
    timestamp: TimeStamp
  }
  extend type Query {
    reports: [Report]
    report(idx: Int!): Report
  }
  extend type Mutation {
    createReport(token: String!, reward: String!, location: String!, type: String!, discoveredAt: String!, image: Upload): Report
  }
`;


const resolvers: IResolvers = {
  Query: {
    report: async (parent, params, context, info) => {
      return await ReportService.findOne(parseInt(params.idx));
    },
    reports: async (parent, params, context, info) => {
      return await ReportService.findMany();
    },
  },
  Mutation: {
    createReport: async (parent, params, conetxt, info) => {
      const { idx } = TokenService.verifyToken(params["token"]) as any;
      const account = await AccountService.findOneByIDX(parseInt(idx));
      let image: string | undefined = undefined;
      if (params.image != null) {
        const file = await upload(await params.image);
        image = file.filename;
      }
      if (account != null) {
        return await ReportService.createReport(params.reward, params.description, params.location, params.type, params.discoveredAt, image, account)
      }
    },
  },
};

export const ReportSchema = {
  typeDefs,
  resolvers,
};
