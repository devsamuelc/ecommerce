const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email">
            <input name="password" placeholder="password">
            <input name="passwordconfirmation" placeholder="password confirmation">
            <button>Sign Up</button>
        </form>
    </div>
    `);
});

app.post("/", (req, res) => {
  // get access to sign up data
  console.log(req.body);
  res.send("Account created!");
});

app.listen(3000, () => {
  console.log("listening");
});
