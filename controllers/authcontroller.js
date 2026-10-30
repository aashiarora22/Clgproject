
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        message: "Please fill all fields"
      });
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(400).send({
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "student"
    });

    await user.save();

    res.status(201).send({
      message: "Registration successful"
    });
  } catch (err) {
    res.status(500).send({
      message: "Registration failed"
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        message: "Invalid email or password"
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).send({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    res.send({
      message: "Login successful",
      token: token
    });

  } catch (err) {
    res.status(500).send({
      message: "Login failed"
    });
  }
}


async function me(req, res) {
  const user = await User.findById(req.user.id).select("-password");

  res.send({
    message: "User details",
    user: user
  });
}


module.exports = { register, login, me };
