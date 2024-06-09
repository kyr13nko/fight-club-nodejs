import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation

  const { firstName, lastName, email, phoneNumber, password } = req.body;

  // Перевірка наявності всіх обов'язкових полів
  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    return res.status(400).json({ error: true, message: "User entity to create isn’t valid" });
  }

  // Валідація формату email
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: true, message: "Invalid email format" });
  }

  // Валідація формату номера телефону
  if (!/^(\+380)\d{9}$/.test(phoneNumber)) {
    return res.status(400).json({ error: true, message: "Invalid phone number format" });
  }

  // Валідація пароля
  if (password.length < 3) {
    return res
      .status(400)
      .json({ error: true, message: "Password must be at least 3 characters long" });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update

  const { firstName, lastName, email, phoneNumber, password } = req.body;

  // Перевірка наявності хоча б одного поля для оновлення
  if (!firstName && !lastName && !email && !phoneNumber && !password) {
    return res
      .status(400)
      .json({ error: true, message: "At least one field must be present for update" });
  }

  // Валідація формату email
  if (email && !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: true, message: "Invalid email format" });
  }

  // Валідація формату номера телефону
  if (phoneNumber && !/^(\+380)\d{9}$/.test(phoneNumber)) {
    return res.status(400).json({ error: true, message: "Invalid phone number format" });
  }

  // Валідація пароля
  if (password && password.length < 3) {
    return res
      .status(400)
      .json({ error: true, message: "Password must be at least 3 characters long" });
  }

  next();
};

export { createUserValid, updateUserValid };
