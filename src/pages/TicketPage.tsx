import TicketCard from "../components/TicketCard";

interface Ticket {
  id: number;
  title: string;
  description?: string;
  status: "open" | "in_progress" | "closed" | "urgent";
}

export default function RepliesPage() {
  const tickets: Ticket[] = [
    {
      id: 1,
      title: "Cannot login to account",
      description:
        "User cannot login since yesterday. Needs urgent assistance.",
      status: "open",
    },
    {
      id: 2,
      title: "Billing issue #123",
      description: "Invoice discrepancy detected, awaiting resolution.",
      status: "in_progress",
    },
    {
      id: 3,
      title: "Feature request: Dark mode",
      description: "Client requests dark mode support in the app.",
      status: "closed",
    },
    {
      id: 4,
      title: "Server down!",
      description: "Production server unreachable. Needs immediate action.",
      status: "urgent",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>

      <div className="flex flex-col gap-6">
        {tickets.map((ticket) => (
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
