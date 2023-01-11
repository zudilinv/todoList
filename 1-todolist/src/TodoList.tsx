import React, {FC} from "react";
import {FilterValuesTape} from "./App";

export type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterValuesTape) => void
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props: TodoListPropsType) => {
    let tasksList = props.tasks.length
        ? props.tasks.map((task: TaskType) => {

            let removeTask = () => props.removeTask(task.id)

            return (
                <li>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>X</button>
                </li>
            )
        })
        : <span>Your tasks list is empty</span>


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter('All')}>All</button>
                <button onClick={()=>props.changeFilter('Active')}>Active</button>
                <button onClick={()=>props.changeFilter('Completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;
//
// let tasksList;
// if ( props.tasks.length === 0) {
//     tasksList = <span>Your tasks list is empty</span>
// }else  {
//     tasksList = props.tasks.map((task:TaskType) => {
//         return (
//             <li><input type="checkbox" checked={task.isDone}/>
//                 <span>{task.title}</span>
//             </li>
//         )
//     })
// }