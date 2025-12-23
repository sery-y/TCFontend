import TicketDetail from "../components/TicketDetail";
import { useEffect, useState } from "react";
import { User, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Ticket {
  id: number;
  sujet: string;
  description: string;
  user_id: string;
  status?: string;
}

export default function TicketsPage() {
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  const userId = localStorage.getItem("userId");

  // ================= FETCH AND FILTER TICKETS =================
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/v1/tickets/", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch tickets");

        let data: Ticket[] = await res.json();

        // Filter tickets for logged-in user
        if (userId) {
          data = data.filter(
            (t) => String(t.user_id).trim() === String(userId).trim()
          );
        }

        setTickets(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [userId]);

  // ================= STATUS CONFIG =================
  const getStatusConfig = (status?: string) => {
    const normalized = status?.toLowerCase() ?? "en_traitement";
    const configs: Record<string, { color: string; text: string }> = {
      en_traitement: { color: "bg-yellow-500", text: "En Traitement" },
      in_progress: { color: "bg-yellow-500", text: "In Progress" },
      completed: { color: "bg-green-500", text: "Completed" },
      not_completed: { color: "bg-red-500", text: "Not Completed" },
    };
    return configs[normalized] || configs["en_traitement"];
  };

  // ================= FILTERED TICKETS =================
  const filteredTickets = tickets.filter((ticket) => {
    const ticketStatus = ticket.status?.toLowerCase() ?? "en_traitement";

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "en_traitement"
        ? ticketStatus === "en_traitement" || ticketStatus === "in_progress"
        : ticketStatus === filterStatus);

    const matchesSearch =
      ticket.sujet?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const startIndex = (currentPage - 1) * ticketsPerPage;
  const endIndex = startIndex + ticketsPerPage;
  const currentTickets = filteredTickets.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= STATUS COUNTS =================
  const statusCounts = {
    all: tickets.length,
    en_traitement: tickets.filter(
      (t) => (t.status ?? "en_traitement") === "en_traitement"
    ).length,
    in_progress: tickets.filter((t) => t.status === "in_progress").length,
    completed: tickets.filter((t) => t.status === "completed").length,
    not_completed: tickets.filter((t) => t.status === "not_completed").length,
  };

  // ================= LOADING / ERROR =================
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading tickets...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">My Tickets</h1>

          {/* Search */}
          <div className="relative mb-6">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tickets by subject or description..."
              className="w-full pl-12 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            {[
              { key: "all", label: "All", count: statusCounts.all },
              {
                key: "en_traitement",
                label: "En Traitement",
                count: statusCounts.en_traitement,
              },
              {
                key: "in_progress",
                label: "In Progress",
                count: statusCounts.in_progress,
              },
              {
                key: "completed",
                label: "Completed",
                count: statusCounts.completed,
              },
              {
                key: "not_completed",
                label: "Not Completed",
                count: statusCounts.not_completed,
              },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setFilterStatus(f.key);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-xl ${
                  filterStatus === f.key
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                }`}
              >
                {f.label} ({f.count})
              </button>
            ))}
          </div>
        </div>

        {/* Tickets */}
        <div className="space-y-4">
          {currentTickets.map((ticket) => {
            const status = getStatusConfig(ticket.status);
            return (
              <div
                key={ticket.id}
                onClick={() => {
                  setSelectedTicketId(ticket.id);
                  setShowTicketDetail(true);
                }}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border relative"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{ticket.sujet}</h3>
                  <span
                    className={`px-3 py-1 text-xs rounded-full text-white ${status.color}`}
                  >
                    {status.text}
                  </span>
                </div>
                <p className="text-slate-600 mt-2">{ticket.description}</p>
                <div className="flex items-center gap-2 mt-4">
                  <User size={16} />
                  <span className="font-semibold">{ticket.user_id}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {currentTickets.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={40} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              No tickets found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={currentPage === p ? "font-bold" : ""}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
      {showTicketDetail && selectedTicketId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6">
              <TicketDetail
                ticketId={selectedTicketId}
                onClose={() => {
                  setShowTicketDetail(false);
                  setSelectedTicketId(null);
                }}
                showInModal={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
