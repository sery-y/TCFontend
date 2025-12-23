import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

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
import Unauthorized from "./components/Unauthorized";
import TicketsPage from "./pages/TicketPage";
import UnreadTicketsPage from "./pages/UnreadTicketsPage";
import UntreatedTicketsPage from "./pages/UntreatedTicketsPage";
import AgentTicketsPage from "./pages/AgentTicketsPage";
import UsersPage from "./pages/UsersPage";
import AgentPage from "./pages/AgentPage";
import AdminAllTickets from "./pages/AdminAlltickets";
import Knowledgebase from "./pages/Knowledgebase";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/unauthorized", element: <Unauthorized /> },

  // ================= ADMIN =================
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <DashboardAdmin /> },
          { path: "users", element: <UsersPage /> },
          { path: "agents", element: <AgentPage /> },
          { path: "tickets", element: <AdminAllTickets /> },
        ],
      },
    ],
  },

  // ================= AGENT =================
  {
    element: <ProtectedRoute allowedRoles={["agent"]} />,
    children: [
      {
        path: "/agent",
        element: <AgentLayout />,
        children: [
          { path: "dashboard", element: <DashboardAgent /> },
          { path: "tickets", element: <AgentTicketsPage /> },
          { path: "untreatedtickets", element: <UntreatedTicketsPage /> },
          { path: "knowledgebase", element: <Knowledgebase /> },
        ],
      },
    ],
  },

  // ================= CLIENT =================
  {
    element: <ProtectedRoute allowedRoles={["user"]} />,
    children: [
      {
        path: "/client",
        element: <ClientLayout />,
        children: [
          { path: "tickets", element: <TicketsPage /> },
          { path: "tickets/new", element: <DashboardClient /> },
          { path: "unreadtickets", element: <UnreadTicketsPage /> },
        ],
      },
    ],
  },

  {
    path: "*",
    element: (
      <Navigate
        to={
          localStorage.getItem("userRole") === "admin"
            ? "/admin/dashboard"
            : localStorage.getItem("userRole") === "agent"
            ? "/agent/dashboard"
            : "/client/tickets"
        }
        replace
      />
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
