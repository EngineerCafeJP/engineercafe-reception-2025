"use client";

import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "@/utils/supabase/client";

interface AuthContextType {
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // 初回取得
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    // セッションの変更を監視
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setSession(session);
        } else if (event === "SIGNED_OUT") {
          setSession(null);
        }
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    await supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    debugger;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      throw error;
    }
  };

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, signIn, signOut, resetPassword, updatePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// カスタムフック
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
