import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({ origin: process.env.ALLOWED_ORIGIN, optionsSuccessStatus: 200 })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "This is the base route" });
});

let port = process.env.port || 5000;

app.listen(port, (err) => {
  if (err) {
    console.log("Error when starting up server");
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
