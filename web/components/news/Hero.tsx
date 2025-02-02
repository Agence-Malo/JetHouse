"use client";

import Image from "next/image";
import plane from "../../public/home page/62a3250ceb33b680669bf277_2008-Dassault-Falcon-7X-(HB-JST)-08.jpg"

const NewsHero = () => {
    return (
        <section
            className={`
        relative w-full h-[60vh] flex items-end justify-start
        bg-black/10 overflow-hidden
      `}
        >
            <Image
                src={plane}
                alt="Challenger 605"
                fill
                priority
                className="object-cover object-center"
            />
            <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-1 left-12 text-white p-6 md:p-10 max-w-[60ch]">
                <label className="block uppercase text-xs mb-2 opacity-80">
                    Categorie
                </label>
                <h2 className="text-xl md:text-3xl font-semibold leading-tight">
                    JetHouse will be expanding its fleet with the addition of a Challenger 605
                </h2>
            </div>
        </section>
    );
};

export default NewsHero;