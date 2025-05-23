import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Correct import for login
import { auth } from "../lib/firebase"; // Your Firebase auth instance
import { useRouter } from "next/router";
import Link from 'next/link'; // For linking to signup page

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to dashboard or previous page on successful login
      router.push("/dashboard"); 
    } catch (err: any) {
      console.error("Login error:", err);
      // Provide user-friendly error messages
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Failed to log in. Please check your credentials and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-8">
          Welcome Back to AgriVest
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-lg"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-lg"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-md hover:shadow-lg"
            disabled={loading || !email || !password}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link href="/signup" legacyBehavior>
            <a className="text-green-600 hover:text-green-700 font-semibold">Sign Up Here</a>
          </Link>
        </p>
      </div>
    </div>
  );
}