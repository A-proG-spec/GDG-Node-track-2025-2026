import { app } from "./app.js";
const PORT = 5000;
app.listen(PORT, () => {
  console.log("server is listening on port ", PORT);
});
