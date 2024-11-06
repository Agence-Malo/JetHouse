"use client";

import EmblaCarousel from "@/components/fleet/EmblaCarousel";
import { useJet } from "@/context/jet";

const Gallery = () => {
  const data = useJet();

  return (
    <section
      className={
        "containerize flex flex-col justify-center items-center gap-[2vh] py-[16vh]"
      }
    >
      <EmblaCarousel slides={data.images.gallery} options={{ loop: true }} />
    </section>
  );
};

export default Gallery;
