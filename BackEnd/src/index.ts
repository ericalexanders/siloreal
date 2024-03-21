import "dotenv/config"
import express from "express";
import cors from "cors";

import { router } from "@routes/v1";
import { swaggerDocs as swaggerDocsV1 } from "@routes/v1/swagger";
import { errorHandler } from "@utils/handleErrors";

const PORT = process.env.PORT || "8080";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  swaggerDocsV1(app, PORT);
});
