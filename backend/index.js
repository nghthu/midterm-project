import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const errStatus = err.statusCode || 500;
  res.status(errStatus).json({
    error: err,
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
