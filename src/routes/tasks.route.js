import { add_task, get_all_tasks, get_single_task, edit_task, delete_task } from '../controllers/tasks.controller.js';
import { userAuth } from '../middlewares/authorization/user.auth..js';
import { addTaskValidator } from '../middlewares/validation/task.validation.js';
import { editTaskValidator } from '../middlewares/validation/task.validation.js';

export default (router) => {

	/** 
	 * TODO: - Add the auth middleware here
	 */
	router.post('/:list_id/task', userAuth, addTaskValidator, add_task);
	router.get('/tasks', get_all_tasks);
	router.get('/tasks/:task_id', get_single_task);
	router.put('/tasks/:task_id', editTaskValidator, edit_task);
	router.delete('/tasks/:task_id', delete_task);
	return router;
	
}