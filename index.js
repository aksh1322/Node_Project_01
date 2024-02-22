// boiler plate code is ready

const dotenv = require(`dotenv`).config();
// const app = require("express"); or
const express = require("express");
const users = require("./MOCK_DATA.json");
const bodyParser = require("body-parser");
const account = [];

app.use(express.json());                 //MIDDLEWARE

const app = express();
const PORT = process.env.PORT;
console.log(PORT);

// routes
app.get(`/api/users`, (req, res) => {
  return res.json(users);
});

// dynamic path parameter

app.get(`/api/users/:id`, (req, res) => {
  // const id = req.params.id;             // issue = this is string
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

// just to get output of 1 field only

app.get("/users", (req, res) => {
  /*
    <ul>
        <li>Ankit</li>
  */
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}`;
  res.send(html);
});

app.post(`/api/users/signUp`, (req, res) => {
  const userData = req.body; // Retrieve data from the request body
  console.log("Data received :", userData);

  // ToDo : Create new user
  //return res.json({ status: a });

  const newUser = createUser(userData);
  res.json({ status: "success", data: userData });
});

app.patch(`/api/users/:id`, (req, res) => {
  // ToDo : Edit the user with id
  return res.json({ status: "pending" });
});

app.delete(`/api/users/:id`, (req, res) => {
  // ToDo : Delete the user with id
  return res.json({ status: "pending" });
});

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));

app.use(bodyParser.json());
