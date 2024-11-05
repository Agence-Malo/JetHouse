import { Navbar } from "@/components/nav";
import Hero from "@/components/about/hero";
import Who from "@/components/about/who";
import dynamic from "next/dynamic";
import { Metadata } from "next";

const View = dynamic(() => import("@/components/view"));
const Board = dynamic(() => import("@/components/about/board"));
const Malta = dynamic(() => import("@/components/about/malta"));
const Approach = dynamic(() => import("@/components/about/approach"));
const Footer = dynamic(() => import("@/components/footer"));

export const metadata: Metadata = {
  title: "About Us",
};

const About = () => {
  return (
    <main className={"w-full flex flex-col justify-start items-center"}>
      <Navbar invert={100} />
      <View />
      <Hero />
      <Who />
      <Board />
      <Malta />
      <Approach />
      <Footer />
    </main>
  );
};

export default About;
