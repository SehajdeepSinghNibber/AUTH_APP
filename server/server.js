import connectDB from "./src/db/connectDB.js";
import config from "./src/config/config.js";
import app from "./src/app.js";

const PORT = config.PORT || 8000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("Server is listening at PORT:", PORT);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
