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
    const savedPlan = localStorage.getItem("selectedPlan");
    if (savedPlan) {
      setSelectedPlan(JSON.parse(savedPlan));
    } else {
      router.push("/plans");
    }
  }, [router]);

  const handleSubmit = async () => {
    if (!user || !selectedPlan) return;

    const investmentAmount = parseFloat(amount);

    if (isNaN(investmentAmount)) {
      setError("Please enter a valid number.");
      return;
    }

    if (
      selectedPlan.minAmount &&
      investmentAmount < selectedPlan.minAmount
    ) {
      setError(`Minimum amount is ₦${selectedPlan.minAmount.toLocaleString()}`);
      return;
    }

    if (investmentAmount > selectedPlan.maxAmount) {
      setError(`Maximum amount is ₦${selectedPlan.maxAmount.toLocaleString()}`);
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "investments"), {
        userId: user.uid,
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        amount: investmentAmount,
        monthlyROI: selectedPlan.monthlyROI,
        createdAt: serverTimestamp(),
      });

      alert("Investment successful!");
      router.push("/my-investments");
    } catch (err) {
      console.error("Investment error:", err);
      setError("Failed to submit investment. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPlan) return null;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Invest in {selectedPlan.name}</h1>
      <p className="mb-2">Monthly ROI: {selectedPlan.monthlyROI}%</p>
      {selectedPlan.duration && (
        <p className="mb-2">Duration: {selectedPlan.duration}</p>
      )}
      {selectedPlan.minAmount && (
        <p className="mb-2">
          Min: ₦{selectedPlan.minAmount.toLocaleString()}
        </p>
      )}
      <p className="mb-4">
        Max: ₦{selectedPlan.maxAmount.toLocaleString()}
      </p>

      <input
        type="number"
        placeholder="Enter amount to invest"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4"
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Processing..." : "Confirm Investment"}
      </button>
    </div>
  );
}
