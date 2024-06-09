import { Router } from "express";
import { fightersService } from "../services/fightService.js";
import { createUserValid, updateUserValid } from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// OPTIONAL TODO: Implement route controller for fights

// Маршрут для створення бою
router.post(
  "/",
  (req, res, next) => {
    try {
      const fight = fightService.createFight(req.body);
      res.data = fight;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
