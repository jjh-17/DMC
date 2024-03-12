
import { RouterProvider } from "react-router-dom";
import routes from "./src/router/routes";

function App() {


  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
