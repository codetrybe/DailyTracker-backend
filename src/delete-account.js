import app from "./app";
import { successResponse } from "./utils/libs/response";

app.get("/del", (req, res) => {
  return successResponse(
    res,
    "the del route🚀"
  );
});
