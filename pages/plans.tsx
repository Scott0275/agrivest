import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import SignOutButton from "../components/SignOutButton";
import InvestmentModal from "../components/InvestmentModal";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const plans = [
  {
    name: "Bronze",
    roi: "25%",
    description: "Start small and grow. Great for new investors.",
    color: "border-yellow-800 bg-yellow-100 text-yellow-800",
  },
  {
    name: "Silver",
    roi: "28%",
    description: "A balanced plan for steady growth.",
    color: "border-gray-500 bg-gray-100 text-gray-700",
  },
  {
    name: "Gold",
    roi: "30%",
    description: "High returns for serious investors.",
    color: "border-yellow-400 bg-yellow-50 text-yellow-600",
  },
  {
    name: "Platinum",
    roi: "35%",
    description: "Premium plan with max yield potential.",
    color: "border-indigo-500 bg-indigo-50 text-indigo-700",
  },
];
<InvestmentModal
  plan={selectedPlan || ""}
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  onSubmit={async (amount: number) => {
    if (!user || !selectedPlan) return;

    try {
      await addDoc(collection(db, "investments"), {
        userId: user.uid,
        plan: selectedPlan,
        amount,
        createdAt: serverTimestamp(),
        status: "pending",
      });
      alert("Investment submitted!");
    } catch (err) {
      console.error("Investment error:", err);
      alert("Failed to invest. Try again.");
    }
  }}
/>


export default function Plans() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  if (!user) return null;

const [modalOpen, setModalOpen] = React.useState(false);
const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);
  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="flex justify-between items-center mb-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center">AgriVest Investment Plans</h1>
        <SignOutButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl shadow-md border-2 p-6 ${plan.color}`}
          >
            <h2 className="text-2xl font-bold mb-2">{plan.name} Plan</h2>
            <p className="text-xl mb-4">Monthly ROI: <strong>{plan.roi}</strong></p>
            <p className="mb-4">{plan.description}</p>
            <button
              onClick={() => {
              setSelectedPlan(plan.name);
              setModalOpen(true);
                }}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
              Invest Now
              </button>

          </div>
        ))}
      </div>
    </div>
  );
}
