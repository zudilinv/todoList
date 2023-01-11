import React, {useEffect, useState} from "react";
import "./App.css";
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesTape = "All" | "Active" | "Completed"

function App() {
    const todoListTitle_1: string = "What to learn"

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false},
    ])

    let removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
    let [filter, setFilter] = useState<FilterValuesTape>("All")

    let changeFilter = (filter: FilterValuesTape) => {
        setFilter(filter)
    }
    // useEffect(() => {
    //     console.log(tasks)
    // }, [tasks])
    let getFilteredTasksForRender =
        (tasks: Array<TaskType>, filter: FilterValuesTape): Array<TaskType> => {
            if (filter === "Active") {
                return tasks.filter(task => task.isDone === false)
            } else if (filter === "Completed") {
                return tasks.filter(task => task.isDone === true)
            } else {
                return tasks
            }
        }

    let filteredTasksForRender = getFilteredTasksForRender(tasks, filter)
    return (
        <div className="App">
            <TodoList
                title={todoListTitle_1}
                tasks={filteredTasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
