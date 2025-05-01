# M6-UF3-PF-NataliaSoria

Arquitectura de la Aplicación:

1. App: Es el componente raíz que contiene el estado global de la aplicación, se encarga de proporcionar el contexto del tema a los componentes hijos.
2. Sidebar: Este componente representa el menú izquierdo. Aquí se muestra la lista de usuarios, un formulario para agregar nuevos usuarios y un botón para cambiar el tema. También incluye la información del usuario seleccionado, pero los detalles los hemos agregado en userInfo.
3. UserInfo: Este componente muestra los detalles del usuario seleccionado, como su nombre y las tareas (completadas y totales). También tiene un botón para deseleccionar al usuario.
4. TaskSection: Este componente gestiona la lista de tareas del usuario seleccionado. Incluye un formulario para agregar nuevas tareas y renderiza cada tarea utilizando el componente TaskItem.
5. TaskItem: Representa una tarea individual. Permite marcarla como completada, editar su texto o eliminarla.

Uso del Contexto

El contexto ThemeContext se utiliza para gestionar el tema de la aplicación (claro/oscuro) y compartirlo entre los componentes sin necesidad de pasar props manualmente. Esto simplifica la comunicación entre componentes y asegura que el tema se pueda cambiar desde cualquier parte de la aplicación.

(app.js)
1. Creación del Contexto: const ThemeContext = createContext()
2. Provisión del Contexto: En el componente App, el contexto se proporciona a través de un ThemeContext.Provider. Esto permite que los componentes hijos accedan al tema actual (theme) y a la función para cambiarlo (toggleTheme). 
  <img width="235" alt="image" src="https://github.com/user-attachments/assets/e8f4d065-70ad-4ff1-b243-7c6408b3b6c6" />

3. Consumo del Contexto: En el componente Sidebar, se utiliza el useContext para acceder al contexto del tema. Esto permite que el botón de cambio de tema funcione correctamente.
  const { toggleTheme } = useContext(ThemeContext);
  <button onClick={toggleTheme} style={{ marginTop: "auto" }}>
     🌙/☀️ Tema
  </button>


Estados Principales

La aplicación utiliza varios estados para gestionar los datos dinámicos:
1. users: Lista de usuarios, cada uno con su propia lista de tareas.
2. selectedUserIndex: Índice del usuario actualmente seleccionado.
3. theme: Tema actual de la aplicación (light o dark).

Flujo de Datos

1. Agregar Usuarios: El formulario en Sidebar permite agregar un nuevo usuario. La función addUser actualiza el estado users con el nuevo usuario.
2. Seleccionar Usuario: Al hacer clic en un usuario de la lista, se actualiza el estado selectedUserIndex. Esto permite que los componentes UserInfo y TaskSection muestren la información del usuario seleccionado.
3. Gestionar Tareas: En TaskSection, se pueden agregar, completar, editar o eliminar tareas. Estas acciones actualizan la lista de tareas del usuario seleccionado dentro del estado users.
4. Cambio de Tema: El botón de cambio de tema en Sidebar actualiza el estado theme. Esto sincroniza la clase del <body> con el tema actual (light o dark), aplicando los estilos correspondientes.

