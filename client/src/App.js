
// import { createTasks, deleteTasks, readTasks, updateTasks } from "./functions/index"
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Homepage/HomePage";
import TaskPage from "./Pages/Homepage/TaskPage";
function App() {
  // const [Todo, setTodo] = useState({ title: '', content: '' });
  // const [Todos, setTodos] = useState(null);
  // const [currentId, setCurrentId] = useState(0);
  // useEffect(() => {
  //   let currentTodo = currentId !== 0 ? Todos.find((todo) => { return (todo._id === currentId) }) : { title: '', content: '' }
  //   setTodo({ title: currentTodo.title, content: currentTodo.content });
  // }, [currentId])

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     const Results = await readTasks();
  //     setTodos(Results);
  //   }
  //   fetchdata()
  // }, [currentId])


  // function clear() {
  //   setCurrentId(0);
  //   setTodo({ title: '', content: '' })
  // }
  // const onSubmithandler = async (e) => {
  //   e.preventDefault();
  //   if (currentId === 0) {
  //     if(Todo.content === "" || Todo.title==="")
  //     return
  //     const result = await createTasks(Todo);
  //     setTodos([...Todos, result]);
  //     clear();
  //   }
  //   else {
  //     await updateTasks(currentId, Todo);
  //     clear();
  //   }
  // }

  // const removeTodo = async (id) => {
  //   await deleteTasks(id);
  //   const Todoscopy = [...Todos];
  //   Todoscopy.filter(todo => todo._id !== id);
  //   setTodos(Todoscopy);
  //   clear();
  // }

  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route path="/tasks" element={<TaskPage />}></Route>
      </Routes>
    </>);
}

export default App;
