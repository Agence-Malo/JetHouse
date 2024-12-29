"use client";

import { useView } from "@/context/view";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import IJet from "@/types/jet";

import Nav from "@/components/nav";
import Contact from "@/components/contact";

const View = () => {
  const { view, openView } = useView(),
    [fleet, setFleet] = useState<null | Pick<IJet, "id" | "name">[]>(null);

  useEffect(() => {
    const fetchFleet = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/jets`,
        {
          headers: {
            "content-type": "application/json",
          },
          params: {
            "select[id]": true,
            "select[name]": true,
          },
        },
      );

      setFleet(res.data.docs);
    };

    fetchFleet();
  }, []);

  return (
    <AnimatePresence mode={"popLayout"}>
      {view && (
        <motion.div
          key={"blur"}
          initial={{
            backgroundColor: "rgba(255, 255, 255, 0)",
            backdropFilter: "blur(0)",
          }}
          animate={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
          exit={{
            backgroundColor: "rgba(255, 255, 255, 0)",
            backdropFilter: "blur(0)",
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={
            "fixed lg:block hidden w-screen h-screen inset-0 cursor-pointer z-10"
          }
          onClick={() => openView(null)}
        />
      )}
      {view === "nav" && <Nav key={"navigation"} fleet={fleet} />}
      {view === "contact" && <Contact key={"contact"} />}
    </AnimatePresence>
  );
};

export default View;
