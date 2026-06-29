import { useState } from "react";


export default function App() {
const [input, setInput] = useState("")
const [todos, setTodos] = useState([])

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
      todo => todo.id === id ? {...todo, completed: !todo.completed} : todo
    )
  )
}


  return (
    <div>
      <h1>Todo App</h1>

      <input type="text" 
      value={ input } 
      onChange={ handleChange } 
      placeholder="Enter todo"/>

      <button onClick={(handleClick)}>
        Add
      </button>
     <ul>
      {
        todos.map((todo) => (
          <li key={todo.id}
          onClick ={() => handleToggle(todo.id)}
        style = {
          {
            textDecoration: todo.completed ? "line-through" : "none"
          }
        }
         >
            {todo.text}

            <button onClick={(e) => 
            { e.stopPropagation()
              (handleDelete(todo.id))}}>
                  Delete
            </button>

          </li>
        ))
      }
     </ul>

    </div>
  )
}