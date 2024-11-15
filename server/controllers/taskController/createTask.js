import Task from "../../models/TaskSchema.js";

const createTask = async (req, res) => {
    try {
        const { name } = req.body;
        const task = new Task({ name });
        await task.save();
        // res.status(201).json(task);
        res.status(200).json({ status: true, task });

    } catch (err) {
        // Handle errors (e.g., email already exists)
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

export default createTask