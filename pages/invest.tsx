import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

type Plan = {
  id: string;
  name: string;
  monthlyROI: number;
  duration?: string;
  minAmount?: number;
  maxAmount: number;
};

export default function InvestPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Ensure the plan is loaded, otherwise redirect
    const savedPlan = localStorage.getItem("selectedPlan");
    if (savedPlan) {
      setSelectedPlan(JSON.parse(savedPlan));
    } else {
      router.push("/plans"); // Redirect to plans if no plan is selected
    }
  }, [router]);

  const handleSubmit = async () => {
    if (!user || !selectedPlan) {
      setError("Please log in and select a plan.");
      return;
    }

    const investmentAmount = parseFloat(amount);

    if (isNaN(investmentAmount) || investmentAmount <= 0) {
      setError("Please enter a valid positive number.");
      return;
    }

    if (
      selectedPlan.minAmount &&
      investmentAmount < selectedPlan.minAmount
    ) {
      setError(`Minimum investment for ${selectedPlan.name} is $${selectedPlan.minAmount.toLocaleString()}.`);
      return;
    }

    if (investmentAmount > selectedPlan.maxAmount) {
      setError(`Maximum investment for ${selectedPlan.name} is $${selectedPlan.maxAmount.toLocaleString()}.`);
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors
    try {
      await addDoc(collection(db, "investments"), {
        userId: user.uid,
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        amount: investmentAmount,
        monthlyROI: selectedPlan.monthlyROI,
        createdAt: serverTimestamp(),
      });

      alert("Investment successful! You can now track it in My Investments.");
      router.push("/my-investments");
    } catch (err) {
      console.error("Investment error:", err);
      setError("Failed to submit investment. Please try again or contact support.");
    } finally {
      setLoading(false);
    }
  };

  // Show a loading/redirecting message if plan isn't loaded yet
  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <p className="text-lg text-gray-600">Loading plan details or redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">
          Invest in <span className="text-green-800">{selectedPlan.name}</span>
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          Projected Monthly ROI: <span className="font-semibold text-green-600">{selectedPlan.monthlyROI}%</span>
        </p>
        {selectedPlan.duration && (
          <p className="text-gray-600 mb-2">Duration: {selectedPlan.duration}</p>
        )}
        {selectedPlan.minAmount && (
          <p className="text-gray-600 mb-2">
            Minimum Investment: <span className="font-semibold">${selectedPlan.minAmount.toLocaleString()}</span>
          </p>
        )}
        <p className="text-gray-600 mb-6">
          Maximum Investment: <span className="font-semibold">${selectedPlan.maxAmount.toLocaleString()}</span>
        </p>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
            Amount to Invest ($)
          </label>
          <input
            id="amount"
            type="number"
            placeholder="e.g., 50000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-lg"
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-4 bg-red-50 p-3 rounded-md border border-red-200">{error}</p>}

        <button
          className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-md hover:shadow-lg"
          onClick={handleSubmit}
          disabled={loading || !amount || parseFloat(amount) <= 0}
        >
          {loading ? "Processing Investment..." : "Confirm Investment"}
        </button>
      </div>
    </div>
  );
}