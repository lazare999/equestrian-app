import {
  RouterProvider,
  createBrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout/Index";
import AdminLayout from "./admin/adminComponents/AdminLayout/Index";
import SignIn from "./admin/pages/SignIn/Index";
import AddShowjumpingEvents from "./admin/pages/AddShowjumpingEvents";
import AddStables from "./admin/pages/addStables/Index";

import Home from "./pages/Home/Index";
import Showjumping from "./pages/Showjumping/Index";
import EventDetailsPage from "./pages/EventDetailsPage/Index";
import Stables from "./pages/Stables/Index";
import StablesDetailsPage from "./pages/StablesDetailsPage/Index";
import About from "./pages/About/Index";

const MainRouteWrapper = ({ children }) => <Layout>{children}</Layout>;

const AdminRouteWrapper = ({ children }) => (
  <AdminLayout>{children}</AdminLayout>
);

const router = createBrowserRouter([
  // admin
  { path: "/admin", element: <SignIn /> },
  {
    path: "/admin/*",
    element: (
      <AdminRouteWrapper>
        <Routes>
          <Route
            path="add-showjumping-event"
            element={<AddShowjumpingEvents />}
          />
          <Route path="add-stables" element={<AddStables />} />
        </Routes>
      </AdminRouteWrapper>
    ),
  },
  // main
  {
    path: "*",
    element: (
      <MainRouteWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showjumping-events" element={<Showjumping />} />
          <Route path="/event-detail/:eventId" element={<EventDetailsPage />} />
          <Route path="/stables" element={<Stables />} />
          <Route
            path="/stables/details/:stableId"
            element={<StablesDetailsPage />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </MainRouteWrapper>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
