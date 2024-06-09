import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter

router.post(
  "/",
  createFighterValid,
  (req, res, next) => {
    try {
      const fighter = fighterService.createFighter(req.body);
      res.data = fighter;
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
  updateFighterValid,
  (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedFighter = fighterService.updateFighter(id, req.body);
      res.data = updatedFighter;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
