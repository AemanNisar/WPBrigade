import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const statesJsonPath = path.resolve(__dirname, "../../data/states.json");

export const statesData = JSON.parse(fs.readFileSync(statesJsonPath, "utf-8"));
