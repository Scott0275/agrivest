import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase"; // Your firebase auth instance
import { User, onAuthStateChanged } from "firebase/auth";

// Define the shape of your AuthContext data
interface AuthContextType {
  user: User | null;
  loading: boolean; // Add the loading state here
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading as true

  useEffect(() => {
    // This listener handles authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false once the auth state is determined
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // The value provided by the context
  const value = { user, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}