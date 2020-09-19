import {
  gql,
  IResolvers,
} from "apollo-server-express";
import path from "path";
import fs, { createWriteStream } from "fs";

const typeDefs = gql`
  scalar Upload

  type File {
    filename: String
    mimetype: String
    encoding: String
  }
  extend type Mutation {
    uploadSingle(file: Upload!): File!
  }
`;

const upload = ({ createReadStream, filename, mimetype, encoding, }: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadDir = path.resolve(__dirname, '../../../public');
    const filepath = `${uploadDir}/${filename}`;
    const stream = createReadStream();
    stream.pipe(createWriteStream(filepath))
      .on("finish", () => resolve({ filename, mimetype, encoding }))
      .on("error", reject);
  });
};

const resolvers: IResolvers = {
  Mutation: {
    uploadSingle: async (parent, params, context, info) => {
      const { filename, mimetype, encoding } = await upload(await params.file);
      console.log(filename)
      return { filename, mimetype, encoding };
    }
  }
};

export const TrashSchema = {
  typeDefs,
  resolvers,
};
