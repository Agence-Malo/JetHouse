"use client";

import { useView } from "@/context/view";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FullLogo } from "@/public/graphics/images/logo";
import { Tooltip } from "@nextui-org/react";

const Footer = () => {
  const path = usePathname(),
    { openView } = useView();

  return (
    <footer className="containerize max-lg:px-5 flex flex-col gap-[2vh] items-center justify-center bg-blue-950 text-white pt-[4vh]">
      <div className={"w-full flex justify-between items-center"}>
        <Link href={"/"}>
          <FullLogo mono={true} className={"fill-white h-[4vh] w-auto"} />
        </Link>
        <Tooltip
          placement={"top-end"}
          content={
            <div className={"flex justify-center items-center"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 72 72"
                className={"h-[1.25rem] w-auto -ml-[0.25rem]"}
              >
                <path d="M 43 12 C 40.791 12 39 13.791 39 16 C 39 18.209 40.791 20 43 20 L 46.34375 20 L 35.171875 31.171875 C 33.609875 32.733875 33.609875 35.266125 35.171875 36.828125 C 35.951875 37.608125 36.977 38 38 38 C 39.023 38 40.048125 37.608125 40.828125 36.828125 L 52 25.65625 L 52 29 C 52 31.209 53.791 33 56 33 C 58.209 33 60 31.209 60 29 L 60 16 C 60 13.791 58.209 12 56 12 L 43 12 z M 23 14 C 18.037 14 14 18.038 14 23 L 14 49 C 14 53.962 18.037 58 23 58 L 49 58 C 53.963 58 58 53.962 58 49 L 58 41 C 58 38.791 56.209 37 54 37 C 51.791 37 50 38.791 50 41 L 50 49 C 50 49.551 49.552 50 49 50 L 23 50 C 22.448 50 22 49.551 22 49 L 22 23 C 22 22.449 22.448 22 23 22 L 31 22 C 33.209 22 35 20.209 35 18 C 35 15.791 33.209 14 31 14 L 23 14 z"></path>
              </svg>
              <label>Visit LinkedIn</label>
            </div>
          }
          showArrow={true}
        >
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
        </Tooltip>
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
            className={`uppercase text-sm tracking-wider ${path === "/" ? "font-bold" : "font-normal"}`}
          >
            Home
          </Link>
          <Link
            href={"/about"}
            className={`uppercase text-sm tracking-wider ${path === "/about" ? "font-bold" : "font-normal"}`}
          >
            About Us
          </Link>
          <Link
            href={"/fleet"}
            className={`uppercase text-sm tracking-wider ${path === "/fleet" ? "font-bold" : "font-normal"}`}
          >
            Our Fleet
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
