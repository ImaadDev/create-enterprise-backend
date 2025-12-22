import { registerUser, loginUser } from "./auth.service.js";
import { env } from "../../config/env.js";
import { User } from "./user.model.js";


export async function register(req, reply) {
  try {
    const result = await registerUser(req.body, env.JWT_SECRET);
    reply.code(201).send(result);
  } catch (err) {
    reply.code(400).send({ message: err.message });
  }
}

export async function login(req, reply) {
  try {
    const result = await loginUser(req.body, env.JWT_SECRET);
    reply.send(result);
  } catch (err) {
    reply.code(400).send({ message: err.message });
  }
}


export async function me(req, reply) {
  const userId = req.user.id;

  const user = await User.findById(userId).select("-password");

  reply.send(user);
}

