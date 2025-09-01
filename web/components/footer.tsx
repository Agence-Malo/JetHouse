"use client";

import { useView } from "@/context/view";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FullLogo } from "@/public/graphics/images/logo";
import Image from "next/image";

import ebaa from "@/public/graphics/images/EBAA.webp";
import mbaa from "@/public/graphics/images/MBAA.webp";

const Footer = () => {
  const path = usePathname(),
    { openView } = useView();

  return (
    <footer className="containerize max-lg:px-5 flex flex-col gap-[2vh] items-center justify-center bg-blue-950 text-white py-[4vh]">
      <div className={"w-full flex justify-between items-center"}>
        <div className={"flex justify-start items-center gap-[2vw]"}>
          <Link href={"/"}>
            <FullLogo mono={true} className={"fill-white h-[4vh] w-[12vh]"} />
          </Link>
          <Image src={ebaa} alt={"EBAA Logo"} className={"w-[12vh]"} />
          <Image src={mbaa} alt={"MBAA Logo"} className={"w-[12vh]"} />
        </div>

        <a
          href={"https://www.linkedin.com/company/jethouse-ltd/"}
          target={"_blank"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 64 64"
            className={"size-[6vh] fill-white m-[-1vh]"}
          >
            <path d="M40.227,12C51.145,12,52,12.854,52,23.773v16.453C52,51.145,51.145,52,40.227,52H23.773C12.855,52,12,51.145,12,40.227	V23.773C12,12.854,12.855,12,23.773,12H40.227z M25.029,43V26.728h-5.057V43H25.029z M22.501,24.401	c1.625,0,2.947-1.322,2.947-2.949c0-1.625-1.322-2.947-2.947-2.947c-1.629,0-2.949,1.32-2.949,2.947S20.87,24.401,22.501,24.401z M44,43v-8.925c0-4.382-0.946-7.752-6.067-7.752c-2.46,0-4.109,1.349-4.785,2.628H33.08v-2.223h-4.851V43h5.054v-8.05	c0-2.122,0.405-4.178,3.036-4.178c2.594,0,2.628,2.427,2.628,4.315V43H44z"></path>
          </svg>
        </a>
      </div>
      <div className={"w-full h-[0.25vh] bg-white"} />
      <div className={"w-full flex justify-between items-baseline gap-[2vw]"}>
        <div
          className={
            "flex justify-start items-baseline md:gap-[2vw] gap-[4vw] flex-wrap"
          }
        >
          <Link
            href={"/"}
            className={`uppercase text-sm tracking-wider ${
              path === "/" ? "font-bold" : "font-normal"
            }`}
          >
            Home
          </Link>
          <Link
            href={"/about"}
            className={`uppercase text-sm tracking-wider ${
              path === "/about" ? "font-bold" : "font-normal"
            }`}
          >
            About Us
          </Link>
          <Link
            href={"/news"}
            className={`uppercase text-sm tracking-wider ${
              path === "/news" ? "font-bold" : "font-normal"
            }`}
          >
            News
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              openView("contact");
            }}
            className={"uppercase text-sm tracking-wider font-normal"}
          >
            Contact
          </button>
        </div>
        <div
          className={
            "flex justify-end items-baseline md:gap-[2vw] gap-[4vw] flex-wrap"
          }
        >
          <label>terms</label>
          <label>privacy</label>
          <a
            href={"https://agencemalo.com/"}
            className={"uppercase font-normal tracking-wider text-sm"}
          >
            credits
          </a>
        </div>
      </div>
      {/*<div className={"w-full flex justify-between items-center"}>
        <Link href={"/"} className={"w-1/3 flex justify-start items-start"}>
          <FullLogo
            mono={true}
            className={"fill-white md:h-[6vh] h-auto w-full md:w-auto"}
          />
        </Link>
        <h4 className="text-2xl font-bold w-1/2 flex justify-end items-center normal-case text-right">
          Get in touch
        </h4>
      </div>
      <div className={"w-full flex justify-between items-start"}>
        <div className="w-1/2 flex flex-col items-start justify-start gap-[1vh]">
          <p
            className={
              "text-white text-left w-full flex justify-start items-center text-sm md:text-base"
            }
          >
            Your Boutique Aviation Operator <br /> Crafted With Soul
          </p>
          <a
            href={"https://www.linkedin.com/company/jethouse-ltd/"}
            target={"_blank"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 64 64"
              className={"md:size-[6vh] size-[4vh] fill-white m-[-1vh]"}
            >
              <path d="M40.227,12C51.145,12,52,12.854,52,23.773v16.453C52,51.145,51.145,52,40.227,52H23.773C12.855,52,12,51.145,12,40.227	V23.773C12,12.854,12.855,12,23.773,12H40.227z M25.029,43V26.728h-5.057V43H25.029z M22.501,24.401	c1.625,0,2.947-1.322,2.947-2.949c0-1.625-1.322-2.947-2.947-2.947c-1.629,0-2.949,1.32-2.949,2.947S20.87,24.401,22.501,24.401z M44,43v-8.925c0-4.382-0.946-7.752-6.067-7.752c-2.46,0-4.109,1.349-4.785,2.628H33.08v-2.223h-4.851V43h5.054v-8.05	c0-2.122,0.405-4.178,3.036-4.178c2.594,0,2.628,2.427,2.628,4.315V43H44z"></path>
            </svg>
          </a>
        </div>
        <div className="w-1/2 flex flex-col text-right justify-end items-end text-sm md:text-base">
          <p className={"text-white text-sm md:text-base"}>
            Avenue 77 Business Centre,
            <br />
            Triq in-Negozju, Birkirkara
            <br />
            CBD 3010, Malta
          </p>
          <a href={"mailto:hello@jethouse.aero"}>
            <span className={"hidden md:inline-block"}>E: </span>
            hello@jethouse.aero
          </a>
          <a href={"tel:0032476264268"}>
            <span className={"hidden md:inline-block"}>T: </span>+32 476 26 42
            68
          </a>
        </div>
      </div>
      <div className={"w-full flex justify-between items-baseline"}>
        <a
          href={"https://agencemalo.com/"}
          className={
            "w-1/3 flex justify-start items-center normal-case text-left text-sm tracking-wider"
          }
        >
          Credits
        </a>
        <label
          className={
            "w-1/3 flex justify-center items-center normal-case text-center"
          }
        >
          © {new Date().getFullYear()} All Rights Reserved.
        </label>
        <label
          className={
            "w-1/3 flex justify-end items-center normal-case text-right"
          }
        >
          Privacy Policy
        </label>
      </div>*/}
    </footer>
  );
};

export default Footer;
