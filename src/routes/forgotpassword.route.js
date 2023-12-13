import forgot from "../controllers/forgotpassword.controller.js";

export default (router) => {
  router.get("/forgotpassword", forgot.getemail);
  router.post("/forgotpassword", forgot.generatetoken);
}