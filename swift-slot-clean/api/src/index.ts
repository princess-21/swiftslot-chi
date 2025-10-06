import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bookingRoutes from "./routes/bookings";
import vendorRoutes from "./routes/vendors"; 
import sequelize from "./config/db";




const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => res.send("API is running"));


app.use("/api/bookings", bookingRoutes);

app.use("/api/vendors", vendorRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("Database connection failed:", err));
