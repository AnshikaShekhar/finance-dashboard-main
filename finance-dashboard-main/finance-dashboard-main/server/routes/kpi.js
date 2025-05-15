// routes/kpi.js
import express from "express";
import KPI from "../models/KPI.js";

const router = express.Router();

router.get("/kpis", async (req, res) => {
    try {
        console.log("KPI route hit"); // Debugging log
        const kpis = await KPI.find();
        res.status(200).json(kpis);
    } catch (error) {
        console.log("Error fetching KPIs:", error); // Debugging log
        res.status(404).json({ message: error.message });
    }
});

export default router;
