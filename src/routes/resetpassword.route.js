import reset from "../controllers/resetpassword.controller.js";


export default (router) => {
  router.route('/resetpassword/:user_id').get(reset.getpassword).post(reset.setpassword);
}