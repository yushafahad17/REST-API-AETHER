const fs = require("fs");
const path = require("path");
const express = require("express");
const helloRoute = require("./routes/helloRoute");
const tiktokRoute = require("./routes/tiktokRoute");
const igstalkRoute = require("./routes/igStalk");
const aiRoute = require("./routes/aiRoute");
const igdlRoute = require("./routes/igdl");
const ghStalk = require("./routes/ghStalk");
const ffstalk = require("./routes/ffstalk");
const cuaca = require("./routes/cuaca");
const allDownloader = require("./routes/allDownloader");
const ronaldo = require("./routes/random/ronaldo");
const messi = require("./routes/random/messi");
const apalah = require("./routes/apalah");
const mlstalk = require("./routes/mlstalk");
const ttstalkRoute = require("./routes/ttStalk");

const swaggerAssetsRoute = require("./routes/swaggerAssetsRoute");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerAssetsRoute);
app.get("/swagger.json", (req, res) => {
  const swaggerPath = path.join(__dirname, "/swagger.json");
  const swaggerJson = fs.readFileSync(swaggerPath, "utf-8");
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerJson);
});

app.use("/", helloRoute);
app.use("/", tiktokRoute);
app.use("/", igstalkRoute);
app.use("/", aiRoute);
app.use("/", igdlRoute);
app.use("/", ghStalk);
app.use("/", allDownloader);
app.use("/", ffstalk);
app.use("/", cuaca);
app.use("/", ronaldo);
app.use("/", messi);
app.use("/", apalah);
app.use("/", mlstalk);
app.use("/", ttstalkRoute);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
  console.log(`Server sedang berjalan, mendengarkan port ${PORT}`);
});
