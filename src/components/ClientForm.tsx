import { useState } from "react";

interface TicketFormData {
  subject: string;
  problemDate: string;
  description: string;
}

interface TicketFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: TicketFormData) => void;
}

export default function TicketFormModal({
  isOpen,
  onClose,
  onSubmit,
}: TicketFormModalProps) {
  const [formData, setFormData] = useState<TicketFormData>({
    subject: "",
    problemDate: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Réinitialiser après soumission
    setFormData({
      subject: "",
      problemDate: "",
      description: "",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("Fichier sélectionné:", e.target.files[0].name);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* En-tête de la modale */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Create New Ticket
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl p-2 -mr-2"
          >
            &times;
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sujet */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter ticket subject"
            />
          </div>

          {/* Date du problème */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of the problem *
            </label>
            <input
              type="date"
              name="problemDate"
              value={formData.problemDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <p className="text-sm text-gray-500 mt-1">
              When did the problem occur?
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              placeholder="Describe your issue in detail..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Please provide as much detail as possible
            </p>
          </div>

          {/* Fichier joint */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachment (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <svg
                    className="w-10 h-10 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-gray-600">
                    <span className="text-blue-600 hover:text-blue-800 font-medium">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PNG, JPG, PDF up to 10MB
                  </p>
                </div>
              </label>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#4A84DD] text-white font-medium rounded-lg hover:bg-[#3f73c4] transition-colors shadow-sm"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
