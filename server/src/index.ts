import * as mongoose from "mongoose";

import app from "./app";
import { configs } from "./configs/config";
import { cronRunner } from "./crons";

const PORT = configs.API_PORT || 5110;

app.listen(PORT, async () => {
  await mongoose.connect(configs.MONGODB_URL);
  cronRunner();
  console.log(`Server has started on PORT $${PORT} 🥸`);
});
