import express from "express";
import cors from "cors";
import "express-async-errors";
import authRouter from "./routes/authRoute";
import userRouter from "./routes/userRoute";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.json({ msg: "Hello world!" });
});

// Custom error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const status = res.statusCode || 500;
  console.error(err);
  res.status(status).json({
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}/`);
});

export default app;
