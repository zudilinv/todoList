import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";
import {FilterValuesTape} from "./App";

export type TodoListPropsType = {
    title: string
    todoListId: string
    tasks: Array<TaskType>
    filter: FilterValuesTape
    removeTodoList: (todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesTape, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false)

    const handlerCreator = (filter: FilterValuesTape) => () => props.changeFilter(filter, props.todoListId);
    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addTask(trimmedTitle, props.todoListId)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const removeTodoListHandler = () => props.removeTodoList(props.todoListId)
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()
    const errorInputClass = error ? "inputError" : undefined

    const errorMessage = error && <p style={{color: "red"}}>Title is required</p>

    const tasksList = props.tasks.length

        ? props.tasks.map((task: TaskType) => {
            const removeHandler = () => props.removeTask(task.id, props.todoListId)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)

            const taskClass = task.isDone ? "taskIsDone" : "task"

            // const taskClass = ["task"]
            //     task.isDone && taskClass.puch("done")
            //     <li key={task.id} className={taskClass.join(" ")}>


            return (

                <li key={task.id} className={taskClass}>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeHandler}>X</button>
                </li>
            )
        })
        : <span>Your tasks list is empty</span>
    return (
        <div>
                <h3>{props.title}<button onClick={removeTodoListHandler}>X</button></h3>
            <div>
                <input
                    value={title}
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={errorInputClass}/>
                <button onClick={addTaskHandler}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "activeButton" : ""}
                    onClick={handlerCreator("all")}>All
                </button>
                <button
                    className={props.filter === "active" ? "activeButton" : ""}
                    onClick={handlerCreator("active")}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "activeButton" : ""}
                    onClick={handlerCreator("completed")}>Completed
                </button>

                {/*<button onClick={onAllClick}>All</button>*/}
                {/*<button onClick={onActiveAllClick}>Active</button>*/}
                {/*<button onClick={onCompletedClick}>Completed</button>*/}
                {/*const onAllClick = ()=>props.changeFilter('All');*/}
                {/*const onActiveAllClick = ()=>props.changeFilter('Active');*/}
                {/*const onCompletedClick = ()=>props.changeFilter('Completed');*/}
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