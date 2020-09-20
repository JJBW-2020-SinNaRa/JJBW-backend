import {
  gql,
  IResolvers,
} from "apollo-server-express";
import path from "path";
import { createWriteStream } from "fs";

const typeDefs = gql`
  type File {
    filename: String
    mimetype: String
    encoding: String
  }
  extend type Mutation {
    uploadSingle(file: Upload!): File!
  }
`;

export const upload = ({ createReadStream, filename, mimetype, encoding, }: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadDir = path.resolve(__dirname, '../../../public');
    const newName = new Date().getTime().toString() + "." + mimetype.split("/")[1];
    const filepath = `${uploadDir}/${newName}`;
    const stream = createReadStream();
    stream.pipe(createWriteStream(filepath))
      .on("finish", () => {
        resolve({ newName, mimetype, encoding })
      })
      .on("error", reject);
  });
};

const resolvers: IResolvers = {
  Mutation: {
    uploadSingle: async (parent, params, context, info) => {
      const { filename, mimetype, encoding } = await upload(await params.file);
      return { filename, mimetype, encoding };
    }
  }
};

export const TrashSchema = {
  typeDefs,
  resolvers,
};
