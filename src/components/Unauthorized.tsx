import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <ShieldAlert size={64} className="text-red-500" />
        </div>

        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Unauthorized Access
        </h1>

        <p className="text-slate-600 mb-6">
          You do not have permission to access this page.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100"
          >
            Go Back
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login", { replace: true });
            }}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            Login Again
          </button>
        </div>
      </div>
    </div>
  );
}
