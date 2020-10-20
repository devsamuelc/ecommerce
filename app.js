const express = require("express");
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['81j3oasdi19dj8918je9183129d1273']
}))

app.get("/signup", (req, res) => {
  res.send(`
    <div>
    Your id is: ${req.session.userId}
        <form method="POST">
            <input name="email" placeholder="email">
            <input name="password" placeholder="password">
            <input name="passwordConfirmation" placeholder="password confirmation">
            <button>Sign Up</button>
        </form>
    </div>
    `);
});

app.post("/signup", async (req, res) => {
  // get access to sign up data
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email: email });
  if (existingUser){
      return res.send('E-mail already in use!');
  };

  if (password !== passwordConfirmation) {
      return res.send('Passwords are not identical!');
  };

  // create a user in the repo
  const user = await usersRepo.create({ email, password });

  // store user's id inside of the user's cookie
  req.session.userId = user.id;

  res.send("Account created!");
});

app.get('/signout', (req,res) => {
    req.session = null;
    res.send('You are logged out');
})

app.get('/signin', (req ,res) => {
    res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email">
            <input name="password" placeholder="password">
            <button>Sign In</button>
        </form>
    </div>
    `)
})

app.post('/signin', async(req,res) => {
    const { email, password } = req.body;

    const user = await usersRepo.getOneBy({ email: email });

    if (!user) {
        return res.send('email not found');
    }

    const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
    )
    if (!validPassword) {
        return res.send('wrong password');
    }

    req.session.userId = user.id;

    res.send('You are signed in.');
})

app.listen(3000, () => {
  console.log("listening");
});
