import Task from "../../models/TaskSchema.js";

const updateTask = async (req, res) => {
    try {
        const { column } = req.body;
        const id = req.params.id
        const task = await Task.findByIdAndUpdate(id, { column }, { new: true });
        // res.json(task);
        res.status(201).json({ status: true, task });

    } catch (err) {
        // Handle errors (e.g., email already exists)
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

export default updateTask