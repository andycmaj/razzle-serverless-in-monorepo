import express from "express";
import bodyParser from "body-parser";
import { debug } from "shared/log";
import { router } from "./routes";

export const buildApiServer = () => {
  const server = express();

  // Security
  server.disable("x-powered-by");
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.use(async (req: express.Request, res: express.Response, next) => {
    debug("Api:Configured");
    next();
  });

  // Sub routes of /api. register after passport middlewarez
  server.use("/", router);

  return server;
};
