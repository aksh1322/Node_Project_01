// boiler plate code is ready

const express = require("express");
//const app = require("express");
const users = require("./MOCK_DATA.json");
const dotenv = require(`dotenv`).config();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing

//  ...........................  //

//  ...........................  //

// Dummy database to store registered users
const account = [];

//  ...........................  //

//  ...........................  //

//app.use(express.json());                 //MIDDLEWARE

const app = express();
const PORT = process.env.PORT;
console.log(PORT);

//  ...........................  //

//  ...........................  //

// routes
app.get(`/api/users`, (req, res) => {
  return res.json(users);
});

//  ...........................  //

//  ...........................  //

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

//  ...........................  //

//  ...........................  //

app.post(`/api/users/signUp`, async (req, res) => {
  const { name, username, email, phoneNumber, password } = re.body;

  // Simple validation
  if (!username || !email || !phoneNumber || !password) {
    return res
      .status(400)
      .json({ error: "Please provide username, email, and password" });
  }

  // Check if the email is already registered
  if (account.some((user) => user.email === email)) {
    return res.status(400).json({ error: "Email already registered" });
  }

  // Create a new user object
  const newUser = { name, username, email, phoneNumber, password };

  // Store the new user
  account.push(newUser);

  //hashing pw
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Use bcrypt to hash the password

    // Create a new user object with the hashed password
    const newUser = { username, email, password: hashedPassword }; // Store the hashed password

    // Store the new user
    users.push(newUser);

    // Respond with a success message
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    // Handle any errors
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }

  // Respond with a success message
  res.status(201).json({ message: "SignUp Successful", user: newUser });
});

//  ...........................  //

//  ...........................  //

app.patch(`/api/users/:id`, async (req, res) => {
  const id = Number(req.params.id);
  const { username, email, phoneNumber, password } = req.body;

  try {
    // Find the index of the user with the given ID
    const userIndex = users.findIndex((user) => user.id === id);

    // If user not found, return 404 error
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data
    if (username) users[userIndex].username = username;
    if (email) users[userIndex].email = email;
    if (phoneNumber) users[userIndex].phoneNumber = phoneNumber;
    if (password) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      users[userIndex].password = hashedPassword;
    }

    res.json({ message: "User updated successfully", user: users[userIndex] });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  ...........................  //

//  ...........................  //

app.delete(`/api/users/:id`, (req, res) => {
  const id = Number(req.params.id);

  try {
    // Find the index of the user with the given ID
    const userIndex = users.findIndex((user) => user.id === id);

    // If user not found, return 404 error
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the user from the users array
    users.splice(userIndex, 1);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  ...........................  //

//  ...........................  //

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));

app.use(bodyParser.json());
