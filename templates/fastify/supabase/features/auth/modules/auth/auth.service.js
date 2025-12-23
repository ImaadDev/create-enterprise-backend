import jwt from "jsonwebtoken";
import { supabasePublic } from "../../config/supabase.js";

/**
 * Login user (ACCESS TOKEN ONLY)
 */
export async function loginUser({ email, password }) {
  const { data, error } = await supabasePublic.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw new Error(error.message);

  const user = data.user;
  const role = user.user_metadata?.role || "user";

  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      role
    }
  };
}


/**
 * Get current authenticated user
 */
export async function getMe(user) {
  return {
    id: user.id,
    email: user.email,
    role: user.role
  };
}
