import "./App.css";

import AddShowjumpingEvents from "./admin/pages/AddShowjumpingEvents";
import SignIn from "./admin/pages/SignIn/Index";
import Home from "./pages/Home/Index";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Showjumping from "./pages/Home/Showjumping/Index";
import Showjumping from "./pages/Showjumping/Index";
// import EventDetailsPage from "./pages/Home/EventDetailsPage/Index";
import EventDetailsPage from "./pages/EventDetailsPage/Index";

const router = createBrowserRouter([
  //admin
  { path: "/admin", element: <SignIn /> },
  { path: "/add-showjumping-event", element: <AddShowjumpingEvents /> },
  //main
  { path: "/", element: <Home /> },
  { path: "showjumping-events", element: <Showjumping /> },
  { path: "/event-detail/:eventId", element: <EventDetailsPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
