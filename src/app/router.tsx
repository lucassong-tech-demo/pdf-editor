import { createBrowserRouter } from "react-router-dom"
import { LandingPage } from "../pages/landing"
import { EditorEntryPage } from "../pages/editor"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/editor",
    element: <EditorEntryPage mode="upload" />,
  },
  {
    path: "/editor/new",
    element: <EditorEntryPage mode="new" />,
  },
])
