import Task from "../../models/TaskSchema.js";

const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(201).json({ status: true, message:'Task deleted'});

    } catch (err) {
        // Handle errors (e.g., email already exists)
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

export default deleteTask