import {
  createServer,
  Server,
} from "http";
import {
  app,
} from "./api/app";
import {
  connectDatabase,
} from "./connect-database";

let server: Server;
const port = parseInt(process.env.PORT) || 4000;

const start = async () => {
  await connectDatabase();
  server = createServer(app);
  server.listen(port, () => {
    console.info(`Application started at ${port}.`);
  });
};

start().catch((e) => {
  console.error(e);
});
