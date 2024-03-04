import { delete_review, edit_review, post_review } from "../controllers/review.js";


export default (router) => {
  router.route('/review').post(post_review).delete(delete_review)
  router.put('/review/edit', edit_review)
}