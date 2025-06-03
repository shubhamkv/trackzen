import { Check, CheckCircle, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const Welcome = () => {
  const [jwtToken, setJwtToken] = useState<string>("");
  const [tokenCopied, setTokenCopied] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuthStore();

  if (!token) return;

  useEffect(() => setJwtToken(token), []);

  const copyToken = async () => {
    try {
      await navigator.clipboard.writeText(jwtToken);
      setTokenCopied(true);
      setTimeout(() => setTokenCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy token:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 text-center border border-gray-800">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Welcome to TrackZen!
          </h2>
          <p className="text-gray-400 mb-6">
            Your account has been successfully logged in. Copy token to enable
            chrome extension.
          </p>

          {/* JWT Token Section */}
          <div className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-300">
                Authentication Token
              </h3>
              <button
                onClick={copyToken}
                className="flex items-center space-x-2 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                {tokenCopied ? (
                  <>
                    <Check className="w-3 h-3 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-950 rounded-lg p-3 border border-gray-600">
              <code className="text-xs text-orange-300 font-mono break-all leading-relaxed">
                {jwtToken}
              </code>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Save this token securely. You'll need it for enabling extension.
            </p>
          </div>

          <button
            onClick={() => {
              setJwtToken("");
              setTokenCopied(false);

              navigate("/user/dashboard", { replace: true });
            }}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
