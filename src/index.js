import app from "./app.js";
import connectDB from "./configs/db.js";
import { PORT } from "./configs/env.index.js";
import { startNotificationConsumer } from "./configs/kafka.js";
import SocketService from "./services/SocketServices.js";

connectDB().then(() => {
  // startNotificationConsumer();
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  const socketService = new SocketService();
  socketService.io.attach(server);
  socketService.initializeListeners();
}).catch((error) => {
  console.log("DATABASE CONNECTION ERROR", error);
  process.exit(1);
});
