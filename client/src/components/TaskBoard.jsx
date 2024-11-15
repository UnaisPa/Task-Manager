
// import React, { useState } from "react";
// import { ReactSortable } from "react-sortablejs";

// const initialColumns = {
//   todo: [
//     { id: "task-1", name: "Task 1" },
//     { id: "task-2", name: "Task 2" },
//   ],
//   inProgress: [
//     { id: "task-3", name: "Task 3" },
//   ],
//   done: [
//     { id: "task-4", name: "Task 4" },
//   ],
// };

// const TaskBoard = () => {
//   const [columns, setColumns] = useState(initialColumns);

//   const handleUpdate = (newState, columnId) => {
//     setColumns((prevColumns) => ({
//       ...prevColumns,
//       [columnId]: newState,
//     }));
//   };

//   return (
//     <div style={{ display: "flex", gap: "20px" }}>
//       {Object.keys(columns).map((columnId) => (
//         <div
//           key={columnId}
//           style={{
//             width: "200px",
//             padding: "10px",
//             border: "1px solid #ccc",
//             borderRadius: "8px",
//             minHeight: "200px",
//           }}
//         >
//           <h3>{columnId}</h3>
//           <ReactSortable
//             list={columns[columnId]}
//             setList={(newState) => handleUpdate(newState, columnId)}
//             group={{ name: "shared", pull: true, put: true }} // Enabling full cross-column dragging
//             animation={150}
//           >
//             {columns[columnId].map((item) => (
//               <div
//                 key={item.id}
//                 style={{
//                   margin: "8px 0",
//                   padding: "10px",
//                   backgroundColor: "#f5f5f5",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 {item.name}
//               </div>
//             ))}
//           </ReactSortable>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TaskBoard;


import React, { useState, useEffect } from "react";
import AddTaskPopup from "./AddTaskPopup";
import { ReactSortable } from "react-sortablejs";
import axios from "../axios.js";
import { toast } from "react-toastify";

const TaskBoard = () => {
    const [columns, setColumns] = useState({
        todo: [],
        inProgress: [],
        done: [],
    });
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Fetch tasks from database on initial render
        axios.get('api/tasks/get_tasks').then((response) => {
            if (response.data.status) {
                const tasks = response.data.tasks;
                const groupedTasks = { todo: [], inProgress: [], done: [] };
                tasks.forEach((task) => {
                    groupedTasks[task.column].push(task);
                });
                setColumns(groupedTasks);

            } else {
                toast.error('Failed to fetch tasks')
            }
        }).catch((err) => {
            console.log(err);
            toast.error(err.response.data.message ? err.response.data.message : 'Failed to fetch tasks from server')
        })

    }, []);

    const addTask = (name) => {
        axios
            .post('api/tasks/create_task', { name })
            .then((response) => {

                if (response.data.status) {
                    const newTask = response.data.task;
                    setColumns((prevColumns) => ({
                        ...prevColumns,
                        todo: [...prevColumns.todo, newTask],
                    }));
                } else {
                    toast.error("Failed to create task")
                }
            })
            .catch((error) => {
                console.error("Failed to add task", error);
            });
    };

    const handleColumnUpdate = (newColumnId, taskId) => {
        console.log("taskId", taskId)
        axios
            .patch(`api/tasks/update_task/${taskId}`, { column: newColumnId })
            .catch((error) => {
                toast.error('failed to update!')

                console.error("Failed to update task column", error);
            });
    };

    const handleListChange = (newTasks, columnId) => {
        setColumns((prevColumns) => ({
            ...prevColumns,
            [columnId]: newTasks,
        }));

        // Update each task's column in the database
        newTasks.forEach((task) => {
            if (task.column !== columnId) {
                // console.log(task,"task")
                handleColumnUpdate(columnId, task._id);
            }
        });
    };

    return (
        <div className="" >
            <button className="border rounded-md px-3 py-1 bg-blue-600 text-white mx-[50px] my-4"  onClick={() => setShowPopup(true)}>Add Task</button>
            {showPopup && <AddTaskPopup setOpen={setShowPopup} open={showPopup} onClose={() => setShowPopup(false)} onSave={addTask} />}
            <div className=" flex gap-x-5 sm:px-[50px]" >
                {Object.keys(columns).map((columnId) => (
                    <div className="border w-1/3 p-[10px] rounded-lg"
                        key={columnId}
                    // style={{
                    //     width: "200px",
                    //     padding: "10px",
                    //     border: "1px solid #ccc",
                    //     borderRadius: "8px",
                    //     minHeight: "200px",
                    // }}
                    >
                        <h3 className="border font-semibold rounded-md py-1 text-center bg-blue-400" >{columnId.toUpperCase()}</h3>
                        {columns[columnId] ? <ReactSortable
                            list={columns[columnId]}
                            // setList={(newState) =>
                            //     setColumns((prevColumns) => ({ ...prevColumns, [columnId]: newState }))
                            // }
                            setList={(newTasks) => handleListChange(newTasks, columnId)}
                            group="shared"
                            animation={150}
                        >
                            {columns[columnId].length > 0 && columns[columnId].map((task) => (
                                <div className="border rounded-md bg-slate-200 cursor-move" key={task.id} style={{ padding: "10px", margin: "8px 0" }}>
                                    {task.name}
                                </div>
                            ))}
                        </ReactSortable> : <>
                            <div className="flex justify-center h-[120px] items-center" >
                                <p className="text-slate-400" >No task added yet</p>
                            </div></>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskBoard;
