interface TicketCardProps {
  title: string;
  description?: string;
  status: "open" | "in_progress" | "closed" | "urgent";
}

export default function TicketCard({
  title,
  description,
  status,
}: TicketCardProps) {
  const statusColors: Record<string, string> = {
    open: "bg-green-100 text-green-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    closed: "bg-gray-100 text-gray-800",
    urgent: "bg-red-100 text-red-800",
  };

  const badgeClass = statusColors[status] || "bg-gray-200 text-gray-800";

  return (
    <div className="relative bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition cursor-pointer w-full max-w-4xl mx-auto">
      {/* Status badge */}
      <span
        className={`absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full ${badgeClass}`}
      >
        {status.replace("_", " ").toUpperCase()}
      </span>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>

      {/* Description */}
      {description && (
        <p className="text-gray-600 line-clamp-3">{description}</p>
      )}
    </div>
  );
}
