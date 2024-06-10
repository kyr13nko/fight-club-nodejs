import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const { id, createdAt, updatedAt, ...userData } = req.body;

  // Перевірка наявності всіх обов'язкових полів
  const { firstName, lastName, email, phoneNumber, password } = userData;

  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    return res.status(400).json({ error: true, message: "User entity to create isn’t valid" });
  }

  // Перевірка, що id не передається в тілі запиту
  if (id) {
    return res.status(400).json({ error: true, message: "Id should not be provided" });
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

  // Перевірка на наявність зайвих полів
  const allowedFields = Object.keys(USER).filter(
    (field) => field !== "id" && field !== "createdAt" && field !== "updatedAt"
  );
  const invalidFields = Object.keys(userData).filter((field) => !allowedFields.includes(field));

  if (invalidFields.length > 0) {
    return res
      .status(400)
      .json({ error: true, message: `Invalid fields: ${invalidFields.join(", ")}` });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const { id, createdAt, updatedAt, ...userData } = req.body;

  const { firstName, lastName, email, phoneNumber, password } = userData;

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
