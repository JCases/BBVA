import dotenv from "dotenv";
import * as http from "http";

import App from "./app";

dotenv.config();

const server = http.createServer(App);

const port = process.env.PORT || 3000;
App.set("port", port);

server.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
