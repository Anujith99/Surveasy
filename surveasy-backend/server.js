import express from "express";

const app = express();

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
