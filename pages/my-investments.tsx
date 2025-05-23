import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import Link from 'next/link'; // Make sure Link is imported

type Investment = {
  id: string;
  planName: string;
  amount: number;
  monthlyROI: number;
  createdAt: any; // Firebase Timestamp
};

export default function MyInvestments() {
  const { user, loading: authLoading } = useAuth(); // Destructure loading state from AuthContext
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Only fetch if user is loaded and not null
    if (authLoading) return; // Wait for authentication status
    if (!user) {
      setLoading(false); // No user, so no investments to load
      setError("Please log in to view your investments.");
      return;
    }

    const fetchInvestments = async () => {
      setLoading(true);
      setError(""); // Clear previous errors
      try {
        const q = query(
          collection(db, "investments"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Investment[];
        setInvestments(data);
      } catch (err) {
        console.error("Failed to load investments:", err);
        setError("Failed to load your investments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, [user, authLoading]); // Re-run effect when user or authLoading changes

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <p className="text-lg text-gray-600">Loading your investments...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <p className="text-red-600 text-lg">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-green-700">
        My Investments
      </h1>
      {investments.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-md text-center border border-gray-100 max-w-xl mx-auto">
          <p className="text-xl text-gray-600 mb-4">You haven't made any investments yet.</p>
          <p className="text-gray-500 mb-6">Start your journey to financial growth today!</p>
          <Link href="/plans" legacyBehavior>
            <a className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md">
              Explore Investment Plans
            </a>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {investments.map((inv) => (
            <div
              key={inv.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-green-600 flex flex-col"
            >
              <h2 className="text-xl font-bold text-green-800 mb-2">{inv.planName}</h2>
              <div className="text-gray-700 text-base mb-4 flex-grow">
                <p><span className="font-semibold">Amount Invested:</span> <span className="text-green-700 font-bold">${inv.amount.toLocaleString()}</span></p>
                <p><span className="font-semibold">Monthly ROI:</span> {inv.monthlyROI}%</p>
                <p className="text-sm text-gray-500 mt-2">
                  Invested on:{" "}
                  {inv.createdAt?.toDate?.().toLocaleDateString() || "N/A"}
                </p>
              </div>
              {/* You might add a 'View Details' button here */}
              <button className="mt-4 bg-green-100 text-green-700 font-semibold py-2 px-4 rounded-lg hover:bg-green-200 transition-colors duration-300">
                Track Progress
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}