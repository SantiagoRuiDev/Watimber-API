import express from "express";
import cors from "cors";
import config from "./libs/config.js";
import { connectDatabase } from "./libs/connectDatabase.js";
import { createDefaultAdmin } from "./libs/createDefaultAdmin.js";

const app = express();

app.use(express.json());

app.use(cors());

await connectDatabase();
await createDefaultAdmin();

// Importing routes

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import orderRoutes from "./routes/order.routes.js";
import organizationRoutes from "./routes/organization.routes.js";
import imageRoutes from "./routes/images.routes.js";

app.use("/files/images", express.static("files/images"));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/organization", organizationRoutes);
app.use("/api/v1/images", imageRoutes);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
