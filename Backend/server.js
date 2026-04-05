const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
let ipTracker = {};

require("./db/connection");
const Packet = require("./db/schema");

// ✅ SINGLE POST ROUTE
app.post("/packet", async (req, res) => {
    try {
        const data = req.body;

        // 🔥 FIX: ensure src_ip always exists
        const ip = data.src_ip || "unknown";

        ipTracker[ip] = (ipTracker[ip] || 0) + 1;

        const packet = new Packet({
            ...data,
            src_ip: ip   // ✅ FORCE ADD
        });

        await packet.save();

        res.send("OK");

    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Error");
    }
});
// ✅ GET route to view packets in browser
app.get("/packets", async (req, res) => {
    const packets = await Packet.find().sort({ time: -1 }).limit(50);
    res.json(packets);
});

app.listen(3000, () => {
    console.log("🚀 Server running on port 3000");
});
