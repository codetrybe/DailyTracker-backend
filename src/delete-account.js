import app from "./app.js";
import { successResponse } from "./utils/libs/response";
import connection from "./config/db.js";

/**
 * @id: userid
 */

app.get("/delete/:id", (req, res) => {
  let userid = req.params.id;
  console.log(req.method);
  // i assumed the user would have unique id named userid
  let sql = `DELETE FROM users WHERE userid=${userid}`;
  connection.query(sql, (error, user) => {
    console.log(req.method);
    if (error) {
      console.log("Error deleting user account :", error);
      return res.status(500).json({ error: "Internal Server Error" });
    } else console.log(`user account has been deleted`);
  });
  connection.end;
  return successResponse(res, "user account deleted successfully🚀");
});
