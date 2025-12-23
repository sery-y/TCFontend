import { useState, useEffect } from "react";

// Interface API exacte
interface ApiTicket {
  id: number;
  sujet: string;
  description: string;
  date_creation: string;
  date_probleme: string;
  user_id: number;
  statut: "en_traitement" | "escaladé" | "résolu"; // Adapte selon les valeurs réelles
}

// Interface pour le composant
interface TicketDetailProps {
  ticketId: number;
  onClose?: () => void;
  showInModal?: boolean;
}

export default function TicketDetail({
  ticketId,
  onClose,
  showInModal = false,
}: TicketDetailProps) {
  const [ticket, setTicket] = useState<ApiTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les détails du ticket
  const fetchTicketDetails = async () => {
    if (!ticketId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/tickets/${ticketId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Ticket non trouvé");
        }
        if (response.status === 422) {
          throw new Error("Données invalides");
        }
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data: ApiTicket = await response.json();
      setTicket(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors du chargement"
      );
      console.error("Erreur API:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour formater la date
  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  // Fonction pour formater juste la date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "medium",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  // Fonction pour obtenir le badge de statut
  const getStatusInfo = (statut: string) => {
    const statusConfig: Record<
      string,
      { label: string; color: string; bgColor: string }
    > = {
      en_traitement: {
        label: "En traitement",
        color: "text-blue-800",
        bgColor: "bg-blue-100",
      },
      ouvert: {
        label: "Ouvert",
        color: "text-yellow-800",
        bgColor: "bg-yellow-100",
      },
      résolu: {
        label: "Résolu",
        color: "text-green-800",
        bgColor: "bg-green-100",
      },
      fermé: {
        label: "Fermé",
        color: "text-gray-800",
        bgColor: "bg-gray-100",
      },
      urgent: {
        label: "Urgent",
        color: "text-red-800",
        bgColor: "bg-red-100",
      },
    };

    return (
      statusConfig[statut] || {
        label: statut,
        color: "text-gray-800",
        bgColor: "bg-gray-100",
      }
    );
  };

  // Charger les données au montage ou quand l'ID change
  useEffect(() => {
    fetchTicketDetails();
  }, [ticketId]);

  // Gestion du rafraîchissement manuel
  const handleRefresh = () => {
    fetchTicketDetails();
  };

  // État de chargement
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Chargement des détails du ticket...</p>
      </div>
    );
  }

  // État d'erreur
  if (error) {
    return (
      <div className="p-6 space-y-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Erreur de chargement
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={fetchTicketDetails}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Aucun ticket trouvé
  if (!ticket) {
    return (
      <div className="p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun ticket</h3>
        <p className="mt-1 text-sm text-gray-500">
          Le ticket demandé n'a pas été trouvé.
        </p>
        {onClose && (
          <div className="mt-6">
            <button
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Retour à la liste
            </button>
          </div>
        )}
      </div>
    );
  }

  const statusInfo = getStatusInfo(ticket.statut);

  return (
    <div
      className={`${
        showInModal ? "max-h-[calc(100vh-200px)] overflow-y-auto" : ""
      }`}
    >
      {/* En-tête avec actions */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{ticket.sujet}</h2>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
            >
              {statusInfo.label}
            </span>
            <span className="text-sm text-gray-500">• ID: #{ticket.id}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Rafraîchir"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Fermer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Description
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700 whitespace-pre-wrap">
            {ticket.description}
          </p>
        </div>
      </div>

      {/* Informations du ticket */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              Date de création
            </h4>
            <p className="text-gray-900">
              {formatDateTime(ticket.date_creation)}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              Date du problème
            </h4>
            <p className="text-gray-900">
              {formatDateTime(ticket.date_probleme)}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              Utilisateur
            </h4>
            <p className="text-gray-900">ID: {ticket.user_id}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Statut</h4>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
              >
                {statusInfo.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="border-t pt-6">
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Ajouter un commentaire
          </button>

          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            Joindre un fichier
          </button>
        </div>
      </div>

      {/* Informations système */}
      <div className="mt-8 pt-6 border-t">
        <div className="text-xs text-gray-500 space-y-1">
          <p>Données chargées depuis l'API REST</p>
          <p>
            Ticket ID: {ticket.id} • User ID: {ticket.user_id}
          </p>
        </div>
      </div>
    </div>
  );
}
