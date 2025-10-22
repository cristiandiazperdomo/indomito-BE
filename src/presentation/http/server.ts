import "reflect-metadata";
import { app } from "./app";
import { dbSync } from "../../config/database";

(async () => {
  await dbSync();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
