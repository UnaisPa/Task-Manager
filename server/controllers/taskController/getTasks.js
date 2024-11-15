import Task from "../../models/TaskSchema.js";

const getTasks = async (req, res) => {
    try {
       const tasks = await Task.find();
       res.status(201).json({ status: true, tasks});

    } catch (err) {
        // Handle errors (e.g., email already exists)
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

export default getTasks