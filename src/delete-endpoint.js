import database from "./config/db.js"


export const deleteUser = async (userID)=>{
  const [ result ] = await database.query(`
  SELECT * FROM user WHERE user_id = ?;`,[userID])

  if (result){
    //delete user associated data in the todo and task table
    await deleteTodos(userID)

    //delete user data in the user table
    await database.query(`
    DELETE FROM user WHERE user_id = ?`,[userID])
    return "User deleted from the system"
  }
  
  return "invalid user ID"

}

export const deleteTodos = async (userID) => {
  const user_id   = await database.query(`
  SELECT * from todo 
  WHERE user_id = ?
  `, [userID])

  if (user_id.length > 0){

    //get all possible todo list_ID in the userID
  const list_ids = []
  for (let id in user_id)
  {
    list_ids.push(user_id[id].list_id)
  }

  //Deletes all taskes associated with the todo list from task table
  const taskes = await database.query(`
  DELETE FROM task
  WHERE list_id in (${list_ids})
  `)


  //delete selected todo list from  todo table
  await database.query(`
  DELETE FROM todo
  WHERE user_id = ?;
  `,[userID])

  const todo = await database.query(`SELECT * FROM todo`)
  const task = await database.query(`SELECT * FROM task`)
  return { leftoverTodo: todo, leftoverTask:task }

  }
  return "please enter a valid user_ID " 
}

export const deleteSpecificList = async (taskID) => {
  const all_data = await database.query(`SELECT * FROM task WHERE task_ID = ?`,[taskID]);

  if (all_data.length > 0)
  { 
    //delete task from the task table

    const result = await database.query(`
    DELETE FROM task
    WHERE task_id = ?
  `,[taskID])

  console.log(result)

    return "successful deleted this task from the list of tasks to be done"
  }
  return "please provide a valid task ID"
}

// const result = await deleteUser(16)
// console.log(result)

// users = await database.query('SELECT * FROM task')
//console.log('second time ',users)

