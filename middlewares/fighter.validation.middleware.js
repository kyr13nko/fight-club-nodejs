import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation

  const { name, power, defense } = req.body;

  // Перевірка наявності всіх обов'язкових полів
  if (!name || !power || !defense) {
    return res.status(400).json({ error: true, message: "Fighter entity to create isn’t valid" });
  }

  // Валідація числових полів
  if (isNaN(power) || isNaN(defense) || power < 1 || power > 100 || defense < 1 || defense > 10) {
    return res.status(400).json({ error: true, message: "Invalid value for power or defense" });
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validator for fighter entity during update

  const { name, power, defense } = req.body;

  // Перевірка наявності хоча б одного поля для оновлення
  if (!name && !power && !defense) {
    return res
      .status(400)
      .json({ error: true, message: "At least one field must be present for update" });
  }

  // Валідація числових полів
  if (
    (power !== undefined && (isNaN(power) || power < 1 || power > 100)) ||
    (defense !== undefined && (isNaN(defense) || defense < 1 || defense > 10))
  ) {
    return res.status(400).json({ error: true, message: "Invalid value for power or defense" });
  }

  next();
};

export { updateFighterValid };

export { createFighterValid, updateFighterValid };
