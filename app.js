const { useState, useEffect, createContext, useContext } = React;

const ThemeContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme; 
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  function addUser(name) {
    if (!name.trim()) return;
    setUsers([...users, { name: name.trim(), tasks: [] }]);
  }

  function selectUser(index) {
    setSelectedUserIndex(index);
  }

  function deselectUser() {
    setSelectedUserIndex(null);
  }

  function addTask(text) {
    if (!text.trim() || selectedUserIndex === null) return;
    const updatedUsers = [...users];
    updatedUsers[selectedUserIndex].tasks.push({ text: text.trim(), completed: false });
    setUsers(updatedUsers);
  }

  function toggleTask(index) {
    const updatedUsers = [...users];
    const task = updatedUsers[selectedUserIndex].tasks[index];
    task.completed = !task.completed;
    setUsers(updatedUsers);
  }

  function deleteTask(index) {
    const updatedUsers = [...users];
    updatedUsers[selectedUserIndex].tasks.splice(index, 1);
    setUsers(updatedUsers);
  }

  function editTask(index, newText) {
    if (!newText.trim()) return;
    const updatedUsers = [...users];
    updatedUsers[selectedUserIndex].tasks[index].text = newText.trim();
    setUsers(updatedUsers);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>
        <Sidebar
          users={users}
          selectedUserIndex={selectedUserIndex}
          onAddUser={addUser}
          onSelectUser={selectUser}
          onDeselectUser={deselectUser}
        />
        <main className="main">
          <div className="card">
            <h1 id="mainTitle">
              {selectedUserIndex === null
                ? "Selecciona un usuario"
                : `Tareas de ${users[selectedUserIndex].name}`}
            </h1>
            {selectedUserIndex !== null && (
              <TaskSection
                tasks={users[selectedUserIndex].tasks}
                onAddTask={addTask}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                onEditTask={editTask}
              />
            )}
          </div>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

function Sidebar({ users, selectedUserIndex, onAddUser, onSelectUser, onDeselectUser }) {
  const { toggleTheme } = useContext(ThemeContext);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddUser(name);
    setName("");
  }

  return (
    <aside className="sidebar card">
      <h2>Usuarios</h2>
      <ul id="userList">
        {users.map((user, index) => (
          <li
            key={index}
            style={{
              fontWeight: selectedUserIndex === index ? "bold" : "normal",
              cursor: "pointer",
            }}
            onClick={() => onSelectUser(index)}
          >
            {user.name}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          id="newUserInput"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nuevo usuario..."
        />
        <button type="submit">Añadir Usuario</button>
      </form>
      {selectedUserIndex !== null && (
        <UserInfo
          user={users[selectedUserIndex]}
          onDeselectUser={onDeselectUser}
        />
      )}
      <button onClick={toggleTheme} style={{ marginTop: "auto" }}>
        🌙/☀️ Tema
      </button>
    </aside>
  );
}

function UserInfo({ user, onDeselectUser }) {
  const completedTasks = user.tasks.filter((task) => task.completed).length;

  return (
    <div id="userInfo">
      <hr />
      <p id="userName">{user.name}</p>
      <p id="userStats">
        Tareas: {completedTasks} / {user.tasks.length} completadas
      </p>
      <button onClick={onDeselectUser}>Deseleccionar</button>
    </div>
  );
}

function TaskSection({ tasks, onAddTask, onToggleTask, onDeleteTask, onEditTask }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddTask(text);
    setText("");
  }

  return (
    <div id="taskSection">
      <ul id="taskList">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            onToggle={() => onToggleTask(index)}
            onDelete={() => onDeleteTask(index)}
            onEdit={(newText) => onEditTask(index, newText)}
          />
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          id="newTaskInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nueva tarea..."
        />
        <button type="submit">Añadir Tarea</button>
      </form>
    </div>
  );
}

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <li className={task.completed ? "completed" : ""}>
      <span onClick={onToggle}>{task.text}</span>
      <div className="actions">
        <button
          onClick={() => {
            const newText = prompt("Editar tarea:", task.text);
            if (newText !== null) onEdit(newText);
          }}
        >
          ✏️
        </button>
        <button onClick={onDelete}>🗑️</button>
      </div>
    </li>
  );
}

const app = document.getElementById("app");
const root = ReactDOM.createRoot(app);
root.render(<App />);