import { supabase } from "../../infrastructure/Supabase/supabase.js";

/**
 * Si hay cookie válida, adjunta req.user; si no, continúa sin error.
 */
export const OptionalAuthMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      req.user = null;
      return next();
    }

    req.user = user;
    return next();
  } catch {
    req.user = null;
    return next();
  }
};
