import express from "express";
import Report from "./reportModel.js";

const router = express.Router();

// ⭐ UPDATE STATUS API
router.put("/updateStatus/:id", async (req, res) => {
    try {

        const { status } = req.body;

        const updated = await Report.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true }
        );

        res.json({
            message: "Status updated successfully",
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating status",
            error: error.message
        });
    }
});

// ⭐ OPTIONAL: GET ALL REPORTS FOR ADMIN
router.get("/all", async (req, res) => {
    try {
        const reports = await Report.find().sort({ dateReported: -1 });
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;