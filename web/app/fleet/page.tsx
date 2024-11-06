import { Navbar } from "@/components/nav";
import Hero from "@/components/fleet/hero";
import Specs from "@/components/fleet/specs";
import View from "@/components/view";
import Gallery from "@/components/fleet/gallery";
import Footer from "@/components/footer";
import { JetProvider } from "@/context/jet";

const Fleet = () => (
  <main className={"w-full flex flex-col justify-start items-center"}>
    <JetProvider>
      <Navbar invert={100} />
      <View />
      <Hero />
      <Specs />
      <Gallery />
      <Footer />
    </JetProvider>
  </main>
);

export default Fleet;
