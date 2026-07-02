import { useState, useEffect } from "react";


export default function App() {
  const [input, setInput] = useState("")
  //const [todos, setTodos] = useState([])
 
 const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem("todos")
  if (!saved) return []

  try {
    return JSON.parse(saved)
  } catch (error) {
    return []
  }
 }

 )

  const [filter, setFilter] = useState("All")

 useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))
 }, [todos]

 )

  function handleChange(e) {
    setInput(e.target.value)
  }

  function handleClick() {

    if (input.trim() === "") return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input,
        completed: false

      }])
    setInput("")
    console.log(todos)
  }


  function handleDelete(id) {
    setTodos(todos.filter(
      todo => todo.id != id
    ))


  }

  function handleToggle(id) {
    setTodos(
      todos.map(
        todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const filteredTodo = todos.filter(
    todo => {
      if (filter === "All") return true;
      if (filter === "Active") return !todo.completed;
      if (filter === "Completed") return todo.completed

      return false;
    }


  )

  const activeCount = todos
    .filter(todo => !todo.completed)
    .length

function handleKeyDown(e) {
  if (e.key === "enter") {
    handleClick
  }
}

  return (
    <div>
      <h1>Todo App</h1>

      <input type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter todo" 
        onKeyDown={handleKeyDown}
        />

      <button onClick={handleClick}>
        Add
      </button>

      <div>

        <button onClick={() => setFilter("All")}
          style={{
            fontWeight: filter === "All" ? "bold" : "normal",
            color: filter === "All" ? "blue" : "black"
          }}
        >
          ALL
        </button>

        <button onClick={() => setFilter("Active")}
          style={{
            fontWeight: filter === "Active" ? "bold" : "normal",
            color: filter === "Active" ? "blue" : "black"
          }}
        >
          Active
        </button>

        <button onClick={() => setFilter("Completed")}
          style={{
            fontWeight: filter === "Completed" ? "bold" : "normal",
            color: filter === "Completed" ? "blue" : "black"
          }}
        >
          Completed
        </button>

        <button onClick={() => setTodos(todos.filter(todo => !todo.completed))}
          
        >
          Clear Completed
        </button>

      </div>

      <p>{activeCount} items left</p>

      <ul>
        {
          filteredTodo.map((todo) => (
            <li key={todo.id}
              onClick={() => handleToggle(todo.id)}
              style={
                {
                  textDecoration: todo.completed ? "line-through" : "none"
                }
              }
            >
              {todo.text}

              <button onClick={(e) => {
                e.stopPropagation()
                handleDelete(todo.id)
              }}>
                Delete
              </button>

            </li>
          ))
        }
      </ul>

    </div>
  )
}