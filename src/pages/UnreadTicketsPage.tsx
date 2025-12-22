import TicketCard from "../components/TicketCard";

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: "open" | "in_progress" | "urgent"; // only show tickets with unread
}

export default function UnreadTicketsPage() {
  // Example unread tickets data
  const unreadTickets: Ticket[] = [
    {
      id: 1,
      title: "Cannot login to account",
      description:
        "User reported issue yesterday, support replied but no response yet.",
      status: "open",
    },
    {
      id: 2,
      title: "Server down!",
      description: "Alert: Server outage detected. Pending your reply.",
      status: "urgent",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Unread Responses</h1>

      <div className="flex flex-col gap-6">
        {unreadTickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            title={ticket.title}
            description={ticket.description}
            status={ticket.status}
          />
        ))}
      </div>
    </div>
  );
}
