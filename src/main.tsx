import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import AdminLayout from "./layouts/AdminLayout";
import AgentLayout from "./layouts/AgentLayout";
import ClientLayout from "./layouts/ClientLayout";

import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardAgent from "./pages/agent/DashboardAgent";
import DashboardClient from "./pages/client/DashboardClient";

import ProtectedRoute from "./components/ProtectedRoute";

import TicketFormModal from "./components/ClientForm";
import TicketsPage from "./pages/TicketPage";
import UnreadTicketsPage from "./pages/UnreadTicketsPage";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{ path: "dashboard", element: <DashboardAdmin /> }],
  },

  {
    path: "/agent",
    element: <AgentLayout />,
    children: [
      { path: "dashboard", element: <DashboardAgent /> },
      { path: "tickets", element: <TicketsPage /> },
    ],
  },

  {
    path: "/client",
    element: <ClientLayout />,
    children: [
      { path: "dashboard", element: <DashboardClient /> },
      { path: "tickets", element: <TicketsPage /> },
      { path: "tickets/new", element: <DashboardClient /> },
      { path: "unread", element: <UnreadTicketsPage /> }, //
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
