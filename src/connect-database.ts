import {
  createConnection,
} from "typeorm";
import {
  AccessToken,
  Account,
  Badge,
  Report,
} from "src/core";
import type {
  Connection,
  ConnectionOptions,
  EntitySchema,
} from "typeorm";

const isProduction = process.env.NODE_ENV === "production";
const entities: (string | Function | EntitySchema<any>)[] = [
  Account,
  AccessToken,
  Badge,
  Report,
];
const connectionOption: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: !isProduction,
  synchronize: !isProduction,
  entities: entities,
};

let connection: Connection;

export const connectDatabase = async () => {
  connection = await createConnection(connectionOption);
  if (connection.isConnected) {
    console.info(`Database ${connection.name} connected.`);
  }
};

export const disconnectDatabase = async () => {
  if (connection.isConnected) {
    return connection.close();
  }
};