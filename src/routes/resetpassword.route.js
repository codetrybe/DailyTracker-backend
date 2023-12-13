import reset from "../controllers/resetpassword.controller.js";


export default (router) => {
  router.get('/resetpassword/:id/:token', reset.getpassword);
  router.post('/resetpassword/:id/:token', reset.setpassword);
}