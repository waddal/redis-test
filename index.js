require("dotenv").config();

const server = require("./api/server");

const port = process.env.PORT || 9999;

server.listen(port, () => {
  console.log("listening on " + port);
});
