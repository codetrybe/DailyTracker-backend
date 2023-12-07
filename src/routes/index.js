import { Router } from "express";
import { deleteUser, deleteTodos, deleteSpecificList } from "../delete-endpoint.js";

const router = Router();


router.delete('/users', (req, res)=>{
  res.send('user page hitted');
})

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const status = await deleteUser(id);
  res.send(status)
  console.log(status)
})


router.delete('/todo/', async (req, res) => {
  //const { id } = req.params;
  const leftoverTodo  = await this.deleteTodos(id)
  res.send(leftoverTodo)
  console.log(leftoverTodo)
})

router.delete('/todo/:list_id', async (req, res) => {
  const { list_id } = req.params;
  console.log(list_id)
  const rv = await deleteSpecificList(list_id);
  res.send(rv)
  console.log(rv)
})


router.get('/event', (req, res) => {
  const { id } = req.params
  res.send(id)
  console.log(id)
})


router.get('/event/:event-id', (req, res) => {
  const { id } = req.params
  res.send(id)
  console.log(id)
})

router.get('/clear', (req, res) => {
  const { id } = req.params
  res.send(id)
  console.log(id)
})

export default router;