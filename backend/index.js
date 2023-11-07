import express from "express";
import authRouter from "./src/routes/authRoute";
import userRouter from "./src/routes/userRoute";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRouter);
app.use(userRouter);

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
  console.log(`Server is listening on http://localhost:${PORT}/`);
});
