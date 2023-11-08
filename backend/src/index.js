import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoute";
import userRouter from "./routes/userRoute";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRouter);
app.use(userRouter);

app.get("/", (req, res) => {
  res.json({ msg: "Hello world!" });
});

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

export default app;
