import express from "express";
import cors from "cors";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//returns the full menu as Json
app.get("/api/menu", async (req, res) => {
    try {
        const raw = await readFile(path.join(__dirname, "menu.json"), "utf-8");
        const menu = JSON.parse(raw);
        res.json(menu);
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Can't load manu" });
    }
});

//recieve data from browser
app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "missing fields" });
    }

    const entry = { name, email, message, recievedAt: new Date().toISOString() };

    const filePath = path.join(__dirname, "messages.json");
    let messages = [];

    try {
        const raw = await readFile(filePath, "utf-8");
        messages = JSON.parse(raw);
    }
    catch {


    }
    messages.push(entry);
    await writeFile(filePath, JSON.stringify(messages, null, 2));

    res.status(201).json({ success: "recieved", entry });

});


app.listen(PORT, () => {
    console.log(`Menu API running at http://localhost:${PORT}/api/menu`);
});
