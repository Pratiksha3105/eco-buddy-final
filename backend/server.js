import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import reportRoutes from "./Reportroute.js";
import adminRoutes from "./adminRoutes.js";
import { exec } from "child_process";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ CONNECTED TO MONGODB ATLAS"))
.catch((err) => console.log("❌ ATLAS CONNECTION ERROR:", err.message));

// ✅ Routes
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Python Heatmap Route
app.get("/api/heatmap", (req, res) => {

    exec('"./myenv/Scripts/python.exe" ../pathway_engine/hotspot_detector.py',
        (error, stdout, stderr) => {

        if (error) {
            console.error("❌ Heatmap Python Error:", error);
            return res.status(500).send("Heatmap execution error");
        }

        if (stderr) {
            console.error("⚠ Python stderr:", stderr);
        }

        try {
            const data = JSON.parse(stdout);
            res.json(data);
        } catch (err) {
            console.error("❌ JSON Parse Error:", err);
            res.status(500).send("Invalid heatmap JSON output");
        }
    });
});

// ✅ Default route
app.get("/", (req, res) => {
    res.send("🌱 Eco-Buddy Backend Running Successfully");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});