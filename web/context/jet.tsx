"use client";

import { createContext, useContext, useEffect, useState } from "react";
import IJet from "@/types/jet";
import axios from "axios";

const JetContext = createContext<IJet | null>(null);

export const JetProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<IJet | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search),
      id = params.get("id");

    const fetchJet = async () => {
      const res = await axios.get(
        `https://jethouse-admin.vercel.app/api/jet/${id}`,
        {
          headers: {
            "content-type": "application/json",
          },
        },
      );

      setData(res.data);
    };

    fetchJet();
  }, []);

  return (
    data && <JetContext.Provider value={data}>{children}</JetContext.Provider>
  );
};

export const useJet = (): IJet => {
  const context = useContext(JetContext);
  if (!context) {
    throw new Error("useJet must be used within an JetProvider");
  }
  return context;
};
