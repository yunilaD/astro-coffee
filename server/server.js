import express from "express";
import cors from "cors";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

app.use(cors());

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

app.listen(PORT, () => {
    console.log(`Menu API running at http://localhost:${PORT}/api/menu`);
});
