import { add_task, get_all_tasks, get_single_task, edit_task, delete_task } from '../controllers/tasks.controller';

export default (router) => {

	/** 
	 * TODO: - Add all other routes for tasks
	 */
	router.post('/tasks', add_task);
	router.get('/tasks', get_all_tasks);
	router.get('/tasks/:task_id', get_single_task);
	router.put('/tasks/:task_id', edit_task);
	router.delete('/tasks/:task_id', delete_task);
	return router;
}