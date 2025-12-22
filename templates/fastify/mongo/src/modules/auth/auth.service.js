import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./user.model.js";

export async function registerUser({ name, email, password }, jwtSecret) {
  if (!jwtSecret) {
    throw new Error("JWT_SECRET not configured");
  }

  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    jwtSecret,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  };
}

export async function loginUser({ email, password }, jwtSecret) {
  if (!jwtSecret) {
    throw new Error("JWT_SECRET not configured");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    jwtSecret,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  };
}
