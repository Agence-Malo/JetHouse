import { Navbar } from "@/components/nav";
import Hero from "@/components/fleet/hero";
import Specs from "@/components/fleet/specs";
import dynamic from "next/dynamic";
import { Metadata } from "next";

const View = dynamic(() => import("@/components/view"));
const Gallery = dynamic(() => import("@/components/fleet/gallery"));
const Footer = dynamic(() => import("@/components/footer"));

export const metadata: Metadata = {
  title: "Falcon 7X",
};

const Fleet = () => {
  return (
    <main className={"w-full flex flex-col justify-start items-center"}>
      <Navbar invert={100} />
      <View />
      <Hero />
      <Specs />
      <Gallery />
      <Footer />
    </main>
  );
};

export default Fleet;
