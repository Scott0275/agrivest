import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
    >
      Sign Out
    </button>
  );
}
