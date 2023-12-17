import { forgotpassword } from "../controllers/forgotpassword.controller.js";

export default (router) => {
  router.post("/forgotpassword", forgotpassword);
}