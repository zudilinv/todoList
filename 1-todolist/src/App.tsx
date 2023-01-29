import React, {useState} from "react";
import "./App.css";
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesTape = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesTape
}
export type TaskStateType = {
    [todoList: string]: Array<TaskType>
}

function App() {
    //BLL:
    const todoListId_1: string = v1()
    const todoListId_2: string = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
            {id: v1(), title: "React", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Juice", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
        ]
    })

    //BLL:

    // const todoListTitle_1: string = "What to learn"
    //
    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "HTML", isDone: true},
    //     {id: v1(), title: "CSS", isDone: true},
    //     {id: v1(), title: "JS/TS", isDone: false},
    //     {id: v1(), title: "React", isDone: false},
    // ])

    const [filter, setFilter] = useState<FilterValuesTape>("all")
    const removeTask = (taskId: string, todoListId: string) => {
        // const tasksForUpdate = tasks[todoListId]
        // const updatedTasks = tasksForUpdate.filter(t => t.id !== taskId)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }
    const changeFilter = (filter: FilterValuesTape, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,  //title: title,
            isDone: false
        }
        // const tasksForUpdate = tasks[todoListId]
        // const updatedTasks = [...tasksForUpdate, newTask]
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: [...tasks[todoListId], newTask]});
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))      //isDone  =  isDone: isDone
        //Если два статуса: setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: !t.isDone} : t))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        const copyTasks = {...tasks}
        delete tasks[todoListId]
        setTasks(copyTasks)
    }
    let getFilteredTasksForRender =
        (tasks: Array<TaskType>, filter: FilterValuesTape): Array<TaskType> => {
            switch (filter) {
                case "active":
                    return tasks.filter(task => task.isDone === false)
                case "completed":
                    return tasks.filter(task => task.isDone === true)
                default:
                    return tasks
            }
        }

    const todoListItems = todoLists.map(tl => {
        const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)
        return (
            <TodoList
                key={tl.id}
                title={tl.title}
                todoListId={tl.id}
                filter={tl.filter}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                tasks={filteredTasksForRender}
                removeTodoList={removeTodoList}
                changeTaskStatus={changeTaskStatus}
            />
        )
    })
    return (
        <div className="App">
            {todoListItems}
        </div>
    );
}
export default App;
// useEffect(() => {
//     console.log(tasks)
// }, [tasks])