const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const i18n = require("./config/i18n");
const { connectDB } = require("./config/db");
const { errorConverter, errorHandler } = require("./middleware/errorHandler");
const ApiResponse = require("./utils/ApiResponse");

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(i18n.init);

connectDB();

const userRoutes = require("./routes/userRoutes");

app.use("/api", userRoutes);

app.use((req, res) => {
  res.status(404).json(ApiResponse.error(req.__("errors.system.notFound")));
});

app.use(errorConverter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
