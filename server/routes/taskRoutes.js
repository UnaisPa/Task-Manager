import express from "express"
import getTasks from "../controllers/taskController/getTasks.js";
import createTask from "../controllers/taskController/createTask.js";
import updateTask from "../controllers/taskController/updateTask.js";
import deleteTask from "../controllers/taskController/deleteTask.js";


const router = express.Router();
// Define routes for task-related actions


router.get('/get_tasks',getTasks);
router.post('/create_task',createTask);
router.patch('/update_task/:id', updateTask)
router.delete('/delete_task/:id',deleteTask)


export default router
