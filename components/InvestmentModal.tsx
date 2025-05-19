import React, { useState } from "react";

type Props = {
  plan: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
};

export default function InvestmentModal({ plan, isOpen, onClose, onSubmit }: Props) {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Invest in {plan} Plan</h2>
        <input
          type="number"
          className="w-full px-3 py-2 border rounded mb-4"
          placeholder="Enter investment amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            onClick={() => {
              onSubmit(Number(amount));
              setAmount("");
              onClose();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
