import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter

router.get(
  "/",
  (req, res, next) => {
    try {
      const fighters = fighterService.getAllFighters();
      res.data = fighters;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const fighterId = req.params.id;
      const fighter = fighterService.getFighterById(fighterId);
      if (!fighter) {
        res.status(404).json({ error: true, message: "Fighter not found" });
        return;
      }
      res.data = fighter;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

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
      const fighterId = req.params.id;
      const updatedFighter = fighterService.updateFighter(fighterId, req.body);
      res.data = updatedFighter;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const fighterId = req.params.id;
      const deletedFighter = fighterService.deleteFighter(fighterId);
      res.data = deletedFighter;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
