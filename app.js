// dependencias
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
require("dotenv").config();

// configuracoes db
const connectDB = require("./config/db");

// firebase
const admin = require("./config/firebase");

// Import Routes
// const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes");
const doencaRoutes = require("./routes/doencasRoutes");
const docRoutes = require("./routes/docRoutes");

// Initialize app
const app = express();

//conectar no bacno
connectDB();

// Middleware
app.use(helmet());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// // Routes
app.use("/api/users", userRoutes);
app.use("/api/doencas", doencaRoutes);
app.use("/api/documentos", docRoutes);
// app.use('/api/auth', authRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
