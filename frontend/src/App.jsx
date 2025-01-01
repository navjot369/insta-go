import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from "./routes.jsx";

function App() {
  console.log(import.meta.env.VITE_API_BASE_URL);
  const router = createBrowserRouter(routes);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App;
