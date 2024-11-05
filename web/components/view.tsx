"use client";

import { useView } from "@/context/view";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

const Nav = dynamic(() => import("@/components/nav"));
const Contact = dynamic(() => import("@/components/contact"));

const View = () => {
  const { view, openView } = useView();

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
      {view === "nav" && <Nav key={"navigation"} />}
      {view === "contact" && <Contact key={"contact"} />}
    </AnimatePresence>
  );
};

export default View;
