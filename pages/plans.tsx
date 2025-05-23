import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useRouter } from "next/router";
import Link from 'next/link'; // Make sure Link is imported

// Icon for the plans, consistent with Landing Page
const LeafIcon = ({ className = "w-8 h-8 text-green-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);


type Plan = {
  id: string;
  name: string;
  monthlyROI: number;
  duration?: string;
  minAmount?: number;
  maxAmount: number;
  // Added color properties for dynamic styling, assuming they exist in your Firestore plans
  color?: string; // e.g., "bg-green-100"
  textColor?: string; // e.g., "text-green-800"
  buttonColor?: string; // e.g., "bg-green-600 hover:bg-green-700"
};

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      setError("");
      try {
        const querySnapshot = await getDocs(collection(db, "investmentPlans"));
        const plansData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Default colors if not present in Firestore
          color: doc.data().color || "bg-gray-100",
          textColor: doc.data().textColor || "text-gray-800",
          buttonColor: doc.data().buttonColor || "bg-green-600 hover:bg-green-700"
        })) as Plan[];
        setPlans(plansData);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to load investment plans. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSelectPlan = (plan: Plan) => {
    localStorage.setItem("selectedPlan", JSON.stringify(plan));
    router.push("/invest");
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <p className="text-lg text-gray-600">Loading investment plans...</p>
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
        Our Investment Plans
      </h1>
      {plans.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-md text-center border border-gray-100 max-w-xl mx-auto">
          <p className="text-xl text-gray-600 mb-4">No investment plans available at the moment.</p>
          <p className="text-gray-500">Please check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col border-t-4 ${plan.textColor?.replace('text-', 'border-') || 'border-green-600'}`}
            >
              <div className={`mb-4 p-3 rounded-full self-start ${plan.color || 'bg-green-100'}`}>
                <LeafIcon className={`w-8 h-8 ${plan.textColor || 'text-green-700'}`} />
              </div>
              <h2 className={`text-2xl font-semibold ${plan.textColor || 'text-gray-800'} mb-2`}>{plan.name}</h2>
              <p className="text-3xl font-bold text-gray-800 mb-1">{plan.monthlyROI}%</p>
              <p className="text-sm text-gray-500 mb-3">Projected Monthly ROI</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Min. Investment:</span> ${plan.minAmount?.toLocaleString() || 'N/A'}</p>
              <p className="text-gray-700 mb-4"><span className="font-semibold">Max. Investment:</span> ${plan.maxAmount.toLocaleString()}</p>
              {plan.duration && <p className="text-gray-700 mb-4"><span className="font-semibold">Duration:</span> {plan.duration}</p>}
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                {/* Add a short description for each plan */}
                {/* Placeholder description for now */}
                An excellent plan for steady growth in diverse agricultural projects.
              </p>
              <button
                className={`mt-auto ${plan.buttonColor || 'bg-green-600 hover:bg-green-700'} text-white text-center font-semibold py-3 px-6 rounded-lg transition duration-300 w-full block shadow-md hover:shadow-lg`}
                onClick={() => handleSelectPlan(plan)}
              >
                Invest Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}