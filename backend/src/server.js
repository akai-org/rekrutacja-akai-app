import "dotenv/config";
import express from 'express';
import { createDBConnection } from './setup/db.js';
import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", authRoutes);

app.listen(port, async () => {
    await createDBConnection();
    console.log(`Server is running on port ${port}`);
});
