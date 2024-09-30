const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Setting up the server
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Setting up routing
app.use("/user", require("./routes/User"));
app.use("/payment", require("./routes/Payment"));
app.use("/request", require("./routes/AppointmentRequest"));
app.use("/schedule", require("./routes/AppointmentSchedule"));
app.use("/todo", require("./routes/Todo"));
app.use("/note", require("./routes/Note"));
app.use("/goal", require("./routes/Goal"));
app.use("/feedback", require("./routes/Feedback"));
app.use("/email", require("./routes/Email"));
app.use("/contact", require("./routes/Contact"));
app.use("/calender", require("./routes/Calender"));

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});

// Setting up the database connection
const URL = process.env.MONGODB_URL;

mongoose.set("strictQuery", true);
mongoose
  .connect(URL)
  .then(() => console.log("MongoDB connection established successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));
