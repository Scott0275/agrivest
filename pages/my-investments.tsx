import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

type Investment = {
  id: string;
  planName: string;
  amount: number;
  monthlyROI: number;
  createdAt: any;
};

export default function MyInvestments() {
  const { user } = useAuth();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchInvestments = async () => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, [user]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Investments</h1>
      {investments.length === 0 ? (
        <p className="text-center text-gray-500">You have no investments yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {investments.map((inv) => (
            <div
              key={inv.id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{inv.planName}</h2>
              <p>Amount: ₦{inv.amount.toLocaleString()}</p>
              <p>Monthly ROI: {inv.monthlyROI}%</p>
              <p className="text-sm text-gray-500">
                Invested on:{" "}
                {inv.createdAt?.toDate?.().toLocaleDateString() || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
