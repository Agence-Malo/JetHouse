import type IEmergency from "@/types/emergency";
import renderLexicalContent from "@/components/lexical";
import { FullLogo } from "@/public/graphics/images/logo";

import { Button } from "@nextui-org/react";
import { ArrowDown } from "lucide-react";

const Emergency = ({ data }: { data: IEmergency }) => (
  <main
    className={
      "mx-auto w-[92vw] md:w-[56rem] flex flex-col justify-start items-center gap-[8vh] pt-[36vh] pb-[8vh]"
    }
  >
    <div
      className={
        "w-full fixed left-0 top-0 flex justify-center items-center pt-[4vh] pb-[24vh] bg-gradient-to-b from-white"
      }
    >
      <FullLogo mono={true} className={"h-[4vh] fill-blue-950"} />
    </div>
    <h1 className={"max-w-[48rem] text-center text-blue-900"}>{data.title}</h1>
    <div className={"w-full text-blue-950"}>
      {data.description && renderLexicalContent(data.description)}
    </div>

    {data.updates && data.updates.length > 0 && (
      <section
        className={"w-full flex flex-col justify-start items-center gap-[4vh]"}
      >
        <div className={"w-full flex justify-between items-center"}>
          <h2 className={"w-full text-blue-900 flex items-center gap-[1rem]"}>
            Updates
            <div
              className={
                "size-[0.875rem] md:size-[1rem] bg-amber-500/50 rounded-full flex justify-center items-center"
              }
            >
              <div
                className={"size-full rounded-full bg-amber-500 animate-ping"}
              />
            </div>
          </h2>
          <Button
            as={"a"}
            href={`#${data.updates[data.updates.length - 1].id}`}
            type={"button"}
            startContent={
              <div
                className={
                  "size-[3rem] md:p-[0.25rem] flex justify-center items-center"
                }
              >
                <ArrowDown className={"size-full"} />
              </div>
            }
            className={"text-white bg-blue-900 hover:bg-blue-950"}
          >
            Read latest
          </Button>
        </div>
        <div
          className={"w-full flex flex-col justify-start items-start gap-[4vh]"}
        >
          {data.updates.map((update) => (
            <article
              key={update.id}
              id={`${update.id}`}
              className={
                "w-full flex flex-col justify-start items-start gap-[2vh]"
              }
            >
              {(update.title || update.updatedAt) && (
                <h3>
                  {update.updatedAt &&
                    new Date(update.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  {update.title && ` – ${update.title}`}
                </h3>
              )}
              {update.description && (
                <p className={"text-justify"}>{update.description}</p>
              )}
            </article>
          ))}
        </div>
      </section>
    )}
  </main>
);

export default Emergency;
