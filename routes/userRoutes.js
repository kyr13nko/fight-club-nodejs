import { Router } from "express";
import { userService } from "../services/userService.js";
import { createUserValid, updateUserValid } from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    try {
      const user = userService.createUser(req.body);
      res.data = user;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.patch(
  "/:id",
  updateUserValid,
  (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedUser = userService.updateUser(id, req.body);
      res.data = updatedUser;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
