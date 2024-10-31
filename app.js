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
const userRoutes = require("./endpoints/userRoutes");
const doencaRoutes = require("./endpoints/doencasRoutes");
const docRoutes = require("./endpoints/docRoutes");
const medicRoutes = require("./endpoints/medicRoutes")
const formMSRoutes = require('./endpoints/formMSRoutes')
const formPSRoutes = require('./endpoints/formPSRoutes')
const formJPRoutes = require('./endpoints/formJPRoutes')

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
app.use("/api/medicacoes", medicRoutes);
app.use('/api/forms/MS',formMSRoutes);
app.use('/api/forms/PS',formPSRoutes);
app.use('/api/forms/JP',formJPRoutes);

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
