const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query

  if (res.data) {
    return res.status(200).json(res.data);
  } else if (res.err) {
    if (res.err.status) {
      return res.status(res.err.status).json({ error: true, message: res.err.message });
    } else {
      return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  } else {
    return res.status(404).json({ error: true, message: "Data not found" });
  }

  next();
};

export { responseMiddleware };
