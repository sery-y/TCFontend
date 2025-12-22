import { useLocation, useNavigate } from "react-router-dom";
import TicketFormModal from "../../components/ClientForm";

export default function DashboardClient() {
  const location = useLocation();
  const navigate = useNavigate();

  // Modal is open only if the route is /client/tickets/new
  const isModalOpen = location.pathname === "/client/tickets/new";

  const handleCloseModal = () => {
    navigate("/client/dashboard"); // navigate back to dashboard
  };

  const handleSubmit = (data: any) => {
    console.log("Ticket submitted:", data);
    handleCloseModal();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>

      {/* Ticket Form Modal */}
      <TicketFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
