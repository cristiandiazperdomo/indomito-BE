import express from "express";
import path from "path";
import { router as UserRoutes } from "./routes/UsersRoutes";
import { router as ProductRoutes } from "./routes/ProductRoutes";
import { router as CategoryRoutes } from "./routes/CategoryRoutes";
import { router as IngredientRoutes } from "./routes/IngredientRoutes";
import { router as OrderRoutes } from "./routes/OrderRoutes";
import { router as ProductDocumentRoutes } from "./routes/ProductDocumentRoutes";
import { router as UserDocumentRoutes } from "./routes/UserDocumentRoutes";

export const app = express();

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../../../uploads")));

app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);
app.use("/categories", CategoryRoutes);
app.use("/ingredients", IngredientRoutes);
app.use("/orders", OrderRoutes);
app.use("/product-documents", ProductDocumentRoutes);
app.use("/user-documents", UserDocumentRoutes);

app.get("/status", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "backend",
  });
});
