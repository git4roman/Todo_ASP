import { useEffect, useState } from "react";
import { getTodos } from "../api";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    console.log(data);
    setTodos(data);
  };

  return (
    <div className="todoContainer">
      <div className="inputSection">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button>Add</button>
      </div>
      <div className="todoList">
        <ul>
          {todos.map((todo) => (
            <li style={{ "list-style": "none" }}>
              <input type="checkbox" name="todoCheck" id="todoCheck" />
              {todo.title}
              <button>X</button>
              <button>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TodoList;
