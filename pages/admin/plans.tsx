import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

type Plan = {
  id: string;
  name: string;
  monthlyROI: number;
  minAmount?: number;
  maxAmount: number;
};

export default function AdminPlans() {
  const { user } = useAuth();
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [newPlan, setNewPlan] = useState({
    name: "",
    monthlyROI: 0,
    minAmount: 0,
    maxAmount: 0,
  });

  const adminEmail = "techwithbuchi@gmail.com"; // 🔁 Replace with your actual admin email

  useEffect(() => {
    if (!user) return;
    if (user.email !== adminEmail) {
      router.push("/");
    } else {
      fetchPlans();
    }
  }, [user]);

  const fetchPlans = async () => {
    const snapshot = await getDocs(collection(db, "investmentPlans"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Plan[];
    setPlans(data);
  };

  const handleAddPlan = async () => {
    const docRef = await addDoc(collection(db, "investmentPlans"), newPlan);
    setPlans([...plans, { ...newPlan, id: docRef.id }]);
    setNewPlan({ name: "", monthlyROI: 0, minAmount: 0, maxAmount: 0 });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "investmentPlans", id));
    setPlans(plans.filter((p) => p.id !== id));
  };

  const handleUpdate = async (id: string, updatedFields: Partial<Plan>) => {
    const docRef = doc(db, "investmentPlans", id);
    await updateDoc(docRef, updatedFields);
    fetchPlans();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Plans</h1>

      <div className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Plan Name"
          value={newPlan.name}
          onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Monthly ROI"
          value={newPlan.monthlyROI}
          onChange={(e) =>
            setNewPlan({ ...newPlan, monthlyROI: Number(e.target.value) })
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Min Amount"
          value={newPlan.minAmount}
          onChange={(e) =>
            setNewPlan({ ...newPlan, minAmount: Number(e.target.value) })
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Max Amount"
          value={newPlan.maxAmount}
          onChange={(e) =>
            setNewPlan({ ...newPlan, maxAmount: Number(e.target.value) })
          }
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddPlan}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Plan
        </button>
      </div>

      <div className="space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border p-4 rounded shadow-sm space-y-2"
          >
            <div>
              <strong>{plan.name}</strong> – {plan.monthlyROI}% monthly ROI
            </div>
            <div>
              ₦{plan.minAmount?.toLocaleString()} - ₦
              {plan.maxAmount?.toLocaleString()}
            </div>
            <button
              onClick={() => handleDelete(plan.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
