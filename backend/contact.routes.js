const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
    const { name, email, message } = req.body;

    db.query(
        "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
        [name, email, message],
        () => res.json({ message: "Message sent" })
    );
});

module.exports = router;
