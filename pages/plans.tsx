import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase"; // adjust path if needed

type Plan = {
  id: string;
  name: string;
  monthlyROI: number;
  duration?: string;
  minAmount?: number;
};

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "investmentPlans"));
        const plansData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Plan[];
        setPlans(plansData);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Investment Plans</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-gray-700">Monthly ROI: {plan.monthlyROI}%</p>
            {plan.duration && <p className="text-gray-700">Duration: {plan.duration}</p>}
            {plan.minAmount && (
              <p className="text-gray-700">Min Investment: ₦{plan.minAmount.toLocaleString()}</p>
            )}
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
