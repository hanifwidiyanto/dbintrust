import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

// auth route
import authRoute from "./routes/auth/auth.js";

// content route
import opinionRoute from "./routes/content/opinion.js";
import videoRoute from "./routes/content/video.js";

// home route
import adHomeRoute from "./routes/home/ad.js";
import headlineHomeRoute from "./routes/home/headline.js";
import homeRoute from "./routes/home/page.js";
import trendHomeRoute from "./routes/home/trend.js";
import quickLinkHomeRoute from "./routes/home/quickLink.js";

// page route
import adPageRoute from "./routes/page/ad.js";
import headlinePageRoute from "./routes/page/headline.js";
import pageRoute from "./routes/page/page.js";
import trendPageRoute from "./routes/page/trend.js";
import quickLinkPageRoute from "./routes/page/quickLink.js";

// post route
import adPostRoute from "./routes/post/ad.js";
import postRoute from "./routes/post/post.js";
import writerRoute from "./routes/post/writer.js";

import { notFound, errorHandler } from "./middleware/error.js";

import db from "./config/database.js";

dotenv.config();

(async () => {
  await db.sync();
})();

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// auth route
app.use("/api/users", authRoute);

// content route
app.use("/api/content", opinionRoute);
app.use("/api/content", videoRoute);

// home route
app.use("/api/home", homeRoute);
app.use("/api/home", adHomeRoute);
app.use("/api/home", headlineHomeRoute);
app.use("/api/home", trendHomeRoute);
app.use("/api/home", quickLinkHomeRoute);

// page route
app.use("/api/page", pageRoute);
app.use("/api/page", adPageRoute);
app.use("/api/page/", headlinePageRoute);
app.use("/api/page/", trendPageRoute);
app.use("/api/page/", quickLinkPageRoute);

// post route
app.use("/api/post/", adPostRoute);
app.use("/api/post/", postRoute);
app.use("/api/post/", writerRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server running on port " + port);
});

export default app;
