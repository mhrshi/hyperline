const { app, express, httpServer } = require("./globals");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");
const compression = require("compression");

const PORT = process.env.PORT || 5000;

app
  .use(cors())
  .use(helmet())
  .use(compression())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "..", "next", "out")));
httpServer.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "next", "out", "index.html"), (error) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
});

require("./io");
