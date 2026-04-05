const mongoose = require("mongoose");

const packetSchema = new mongoose.Schema({
    src_ip: { type: String, required: true },  // 🔥 ADD THIS
    status: String,
    features: Array,
    protocol: Number,
    time: Date
});

module.exports = mongoose.model("Packet", packetSchema);