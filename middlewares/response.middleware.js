const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query

  // Перевіряємо чи є дані для відправки
  if (res.data) {
    return res.status(200).json({ error: false, data: res.data });
  }
  // Перевіряємо чи є помилка
  else if (res.err) {
    const statusCode = res.err.status || 400;
    return res.status(statusCode).json({ error: true, message: res.err.message });
  }
  // Якщо дані не знайдено
  else {
    return res.status(404).json({ error: true, message: "Data not found" });
  }

  next();
};

export { responseMiddleware };
