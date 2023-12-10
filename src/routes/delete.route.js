import { deleteUser } from "../delete-endpoint";


export default (router) => {
	router.delete("/users/:user_id", deleteUser);
}