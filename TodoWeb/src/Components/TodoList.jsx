import { useEffect, useState } from "react";
import { getTodos, postTodo, getTodo, editTodo, deleteTodo } from "../api";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    console.log(data);
    setTodos(data);
  };

  const handleCreate = async () => {
    await postTodo(newTodo);
    setNewTodo("");
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo.id);
    setEditingTodoText(todo.title);
    console.log("ma ya chu");
  };

  const handleUpdate = async (todo) => {
    await editTodo(editingTodo, { ...todos, title: editingTodoText });
    setEditingTodo(null);
    fetchTodos();
  };

  const handleToggle = async (todo) => {
    await editTodo(todo.id, { ...todo, isCompleted: !todo.isCompleted });
    fetchTodos();
  };
  const handleCancel = () => {
    setEditingTodo(!editTodo);
  };

  return (
    <div className="todoContainer">
      <div className="inputSection">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleCreate}>Add</button>
      </div>
      <div className="todoList">
        <ul>
          {todos.map((todo) =>
            editingTodo != todo.id ? (
              <li key={todo.id} style={{ "list-style": "none" }}>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => handleToggle(todo)}
                />
                {todo.title}
                <button onClick={() => handleDelete(todo.id)}>X</button>
                <button onClick={() => handleEdit(todo)}>Edit</button>
              </li>
            ) : (
              <li key={todo.id}>
                <input
                  type="text"
                  value={editingTodoText}
                  onChange={(e) => setEditingTodoText(e.target.value)}
                />
                <button className="save" onClick={() => handleUpdate()}>
                  Save
                </button>
                <button className="Cancel" onClick={() => handleCancel()}>
                  Cancel
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};
export default TodoList;
