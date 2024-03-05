const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const cookieparser = require("cookie-parser");
app.use(cookieparser());

var cors = require("cors");
app.use(cors());

// routing connection
const web = require("./routes/web.js");
// database connection
const connectdb = require("./db/connectdb.js");

const fileupload = require("express-fileupload");

app.use(fileupload({ useTempFiles: true }));
//for dataget in api
app.use(express.json());
connectdb();

//load route
app.use("/api", web);
//localhost:4000/api

// server creating
app.listen(process.env.PORT, () => {
  console.log(`server running on localhost:${process.env.PORT}`);
});
