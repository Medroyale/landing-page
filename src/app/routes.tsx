import { createBrowserRouter, type RouteObject } from "react-router-dom"
import App from "./App"
// import Careers from "@/pages/careers/Careers"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
  // {
  //   path: "/careers",
  //   element: <Careers />,
  // },
]

export const router = createBrowserRouter(routes)
export default routes