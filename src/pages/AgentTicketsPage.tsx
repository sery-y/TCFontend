import { useState, useEffect } from "react";
import TicketCard from "../components/TicketCard";

// Ticket type
interface Ticket {
  id: number;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed" | "urgent";
}

// Example ticket titles
const sampleTitles = [
  "Cannot login to account",
  "Billing issue #123",
  "Feature request: Dark mode",
  "Server down!",
  "App crashes on startup",
  "Payment not processed",
  "Error 404 on dashboard",
];

// Example descriptions
const sampleDescriptions = [
  "User reports they cannot login since yesterday.",
  "Invoice discrepancy found in billing system.",
  "Request from client to add dark mode support.",
  "Main production server is unreachable.",
  "App crashes after update on Android devices.",
  "Payment transaction failed multiple times.",
  "Page not found when trying to access dashboard.",
];

// Example statuses
const statuses: Ticket["status"][] = [
  "open",
  "in_progress",
  "closed",
  "urgent",
];

export default function AgentTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Generate random tickets
  useEffect(() => {
    const generatedTickets: Ticket[] = Array.from({ length: 8 }).map((_, i) => {
      const randomTitle =
        sampleTitles[Math.floor(Math.random() * sampleTitles.length)];
      const randomDesc =
        sampleDescriptions[
          Math.floor(Math.random() * sampleDescriptions.length)
        ];
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      return {
        id: i + 1,
        title: randomTitle,
        description: randomDesc,
        status: randomStatus,
      };
    });

    setTickets(generatedTickets);
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Agent Tickets</h1>

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
