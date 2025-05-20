import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function MyInvestments() {
  const [user] = useAuthState(auth);
  const [investments, setInvestments] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const q = query(collection(db, "investments"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInvestments(data);
    };

    fetchData();
  }, [user]);

  if (!user) return <p className="p-8 text-center">Please sign in to view your investments.</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Investments</h1>
      {investments.length === 0 ? (
        <p>No investments found.</p>
      ) : (
        <div className="space-y-4">
          {investments.map(inv => (
            <div key={inv.id} className="p-4 border rounded shadow">
              <p><strong>Plan:</strong> {inv.plan}</p>
              <p><strong>Amount:</strong> ${inv.amount}</p>
              <p><strong>Status:</strong> {inv.status}</p>
              <p className="text-sm text-gray-500">
                {inv.createdAt?.toDate ? inv.createdAt.toDate().toLocaleString() : ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
