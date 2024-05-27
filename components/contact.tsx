import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Input,
  Textarea,
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Link,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { Close, Connect, Social } from "@/components/nav";
import codes from "@/data/CountryCodes.json";
import { useFormStatus } from "react-dom";
import Lottie from "lottie-react";
import { replaceColor } from "lottie-colorify";
import sentAnimation from "@/public/graphics/animations/sent.json";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [sent, send] = useState<boolean>(false),
    [changeCode, setChangeCode] = useState(false),
    [code, setCode] = useState<string>("+33"),
    menuRef = useRef<HTMLDivElement>(null),
    { pending } = useFormStatus(),
    [privacy, setPrivacy] = useState(false),
    [terms, setTerms] = useState(false),
    { onClose, onOpenChange } = useDisclosure(),
    form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!changeCode) return;
      const key = e.key.toUpperCase(),
        match = codes.find((c) => c.name.toUpperCase().startsWith(key));
      if (match) {
        const i = codes.indexOf(match);
        if (menuRef.current) {
          const buttons = menuRef.current.querySelectorAll("button");
          if (buttons[i])
            buttons[i].scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    if (changeCode) window.addEventListener("keypress", handleKeyPress);

    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [changeCode]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "name":
        e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "");
        break;
      case "email":
        e.target.value = e.target.value.replace(/[^a-z0-9@._-]/g, "");
        break;
      case "tel":
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
        break;
    }
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        form.current!,
        { publicKey: process.env.NEXT_PUBLIC_KEY },
      )
      .then(
        () => {
          send(true);
        },
        (error) => {
          console.log("FAILED...", error.text);
        },
      );
  };

  return (
    <motion.section
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={
        "fixed lg:bottom-0 lg:top-auto top-0 left-0 z-30 bg-blue-950 lg:h-[86vh] lg:min-h-[86vh] min-h-[100vh] max-h-full lg:overflow-y-hidden overflow-y-auto w-full flex flex-col justify-start items-center lg:px-[2vw] px-[4vw] pt-[2vh] md:pb-[8vh] lg:gap-[2vh] text-white"
      }
    >
      <div
        className={"w-full flex justify-end items-center sticky top-0 right-0"}
      >
        <Close />
      </div>
      <div
        className={
          "w-full h-full md:my-auto flex flex-col md:flex-row justify-center md:justify-between items-center gap-[4vh] md:px-[2vw]"
        }
      >
        <div
          className={
            "hidden md:flex flex-col w-[64vh] h-full justify-between items-start"
          }
        >
          <div
            className={
              "w-full flex flex-col justify-center items-start gap-[2vh]"
            }
          >
            <h1>Get in Touch</h1>
            <p>
              To Start a conversation about how JetHouse can serve your business
              aviation needs, please reach out to us
            </p>
            <Connect />
          </div>
          <Social />
        </div>
        <div
          className={
            "md:hidden w-full flex flex-col justify-center items-start gap-[2vh]"
          }
        >
          <h1>Get in Touch</h1>
          <p>
            To Start a conversation about how JetHouse can serve your business
            aviation needs, please reach out to us
          </p>
        </div>
        {sent ? (
          <div
            className={
              "containerize md:w-2/5 py-[2vh] flex flex-col justify-center items-center text-center bg-black/25 rounded-2xl gap-[2vh] scale-animation"
            }
          >
            <h3 className={"font-semibold"}>Your message is on the way!</h3>
            <div
              className={
                "size-[20vh] bg-white rounded-full p-[2vh] flex justify-center items-center"
              }
            >
              <Lottie
                className={"size-full"}
                autoplay={true}
                loop={true}
                animationData={replaceColor(
                  "#000000",
                  "#172554",
                  sentAnimation,
                )}
              />
            </div>
            <p>We&apos;ll get back to you ASAP</p>
          </div>
        ) : (
          <form
            ref={form}
            onSubmit={(e) => sendEmail}
            /*action={async (formData) =>
              await submit({ formData: formData, dialCode: code }).then(() =>
                send(true),
              )
            }*/
            className={
              "w-full h-full md:w-[56vh] flex flex-col justify-between items-start containerize md:px-[2vw] bg-white gap-[2vh] md:gap-[4vh] py-[2vh] md:py-[4vh]"
            }
          >
            <Input
              label={"Name"}
              type={"text"}
              name={"from_name"}
              isDisabled={pending}
              isRequired={true}
              variant={"underlined"}
              isClearable={true}
              onInput={handleInput}
              classNames={{
                inputWrapper: [
                  "w-full",
                  "bg-transparent",
                  "hover:bg-transparent",
                  "rounded-none",
                  "p-0",
                ],
                input: ["w-full", "bg-transparent", "text-black", "text-base"],
                clearButton: ["text-black"],
                label: "uppercase",
              }}
            />
            <Input
              label={"Email"}
              type={"email"}
              name={"email"}
              isDisabled={pending}
              isRequired={true}
              variant={"underlined"}
              isClearable={true}
              onInput={handleInput}
              classNames={{
                inputWrapper: [
                  "w-full",
                  "bg-transparent",
                  "hover:bg-transparent",
                  "rounded-none",
                  "p-0",
                ],
                input: ["w-full", "bg-transparent", "text-black", "text-base"],
                clearButton: ["text-black"],
                label: "uppercase",
              }}
            />
            <Input
              label={"Phone"}
              type={"text"}
              name={"tel"}
              isDisabled={pending}
              variant={"underlined"}
              isClearable={true}
              onInput={handleInput}
              classNames={{
                inputWrapper: [
                  "w-full",
                  "bg-transparent",
                  "hover:bg-transparent",
                  "rounded-none",
                  "p-0",
                ],
                input: ["w-full", "bg-transparent", "text-black", "text-base"],
                clearButton: ["text-black"],
                label: "uppercase",
              }}
              startContent={
                <>
                  <button
                    disabled={pending}
                    type={"button"}
                    onBlur={() => setTimeout(() => setChangeCode(false), 200)}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      setTimeout(() => setChangeCode(!changeCode), 200);
                    }}
                    className={
                      "flex justify-start items-center gap-[0.5vw] text-black"
                    }
                  >
                    {code}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 72 72"
                      className={`fill-black lg:size-[1vw] size-[2vh] ${changeCode ? "-rotate-180" : ""} transition-transform duration-200 ease-in-out`}
                    >
                      <path d="M35.98,50.002c-1.046,0-2.093-0.395-2.863-1.185L13.595,28.809c-1.542-1.581-1.512-4.114,0.069-5.656	c1.582-1.542,4.113-1.512,5.657,0.069L35.98,40.296l16.698-17.113c1.544-1.582,4.076-1.612,5.657-0.069s1.611,4.075,0.069,5.656	L38.844,48.817C38.073,49.607,37.026,50.002,35.98,50.002z"></path>
                    </svg>
                  </button>
                  {changeCode && (
                    <div
                      className={
                        "absolute translate-y-full flex flex-col justify-start items-start bg-white md:w-max w-full h-[18vh] overflow-y-auto drop-shadow-2xl gap-[1vh] px-[0.5vw] py-[0.5vw] rounded-[1vh] z-20"
                      }
                      ref={menuRef}
                    >
                      {codes.map((sel, index) => (
                        <button
                          disabled={pending}
                          key={index}
                          type={"button"}
                          onClick={() => {
                            setCode(sel.dial_code);
                            setChangeCode(false);
                          }}
                          className={
                            "w-full flex justify-start items-baseline lg:gap-[0.5vw] gap-[1vh] hover:bg-black/10 transition-[background-color] duration-100 ease-in-out rounded-[0.5vh] lg:px-[1vw] px-[2vw] lg:py-[0.5vh] py-[2vw]"
                          }
                        >
                          <span className={"text-wrap text-left text-black"}>
                            {sel.name}
                          </span>
                          <span className={"text-black/50"}>
                            {sel.dial_code}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              }
            />
            <Textarea
              label={"Message"}
              name={"message"}
              isDisabled={pending}
              isRequired={true}
              variant={"underlined"}
              maxRows={3}
              classNames={{
                inputWrapper: [
                  "w-full",
                  "bg-transparent",
                  "hover:bg-transparent",
                  "rounded-none",
                  "p-0",
                ],
                input: ["w-full", "bg-transparent", "text-black", "text-base"],
                label: "uppercase",
              }}
            />
            <Checkbox
              isRequired={true}
              isDisabled={pending}
              classNames={{
                base: "w-full flex justify-start items-baseline",
                label: "text-sm",
              }} /* A link for the privacy policy and ... must be added */
            >
              I agree to the{" "}
              <Link
                className={"text-sm text-black underline"}
                onPress={() => setPrivacy(true)}
              >
                privacy policy
              </Link>
              <Modal
                isOpen={privacy}
                onClose={() => setPrivacy(false)}
                onOpenChange={onOpenChange}
                backdrop={"blur"}
              >
                <ModalContent>
                  <>
                    <ModalHeader>Privacy Policy</ModalHeader>
                    <ModalBody>
                      <p>
                        Aequea adolescens viderer graece eleifend laudem
                        accusata nunc saperet possim. Euaptent molestie
                        ultricies inimicus impetus nam imperdiet posidonium
                        praesent duis dictumst ridens tacimates porta. Loremleo
                        discere utinam ante qualisque euripidis interesset
                        alienum quam gravida eum accommodare mi utroque quod
                        aliquet magna. Accusatamorbi tacimates sit sodales no
                        tellus pulvinar. Vulputatefabellas quot saperet
                        scelerisque graece deserunt sapien salutatus homero
                        deserunt dicunt homero pericula proin libero singulis
                        explicari mnesarchum. Quamdissentiunt ubique quaerendum
                        animal tristique in blandit mea eam te audire
                        scelerisque.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color={"danger"}
                        variant={"flat"}
                        onPress={() => setPrivacy(false)}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                </ModalContent>
              </Modal>{" "}
              &{" "}
              <Link
                className={"text-sm text-black underline"}
                onPress={() => setTerms(true)}
              >
                terms and conditions
              </Link>
              <Modal
                isOpen={terms}
                onClose={() => setTerms(false)}
                onOpenChange={onOpenChange}
                backdrop={"blur"}
              >
                <ModalContent>
                  <>
                    <ModalHeader>Terms & Conditions</ModalHeader>
                    <ModalBody>
                      <p>
                        Blandithabitasse sociosqu nisi aptent fabellas viderer
                        voluptaria non verear idque saepe nibh phasellus solet.
                        Mandamusdocendi magnis a cum veritus dicam simul solet
                        mei habemus. Repudiandaedeseruisse scripta adolescens
                        vestibulum dignissim consetetur legimus venenatis sale
                        prompta donec docendi nec nunc posidonium quot partiendo
                        penatibus. Suavitatenec porta dolor tale condimentum ad
                        gloriatur dicant wisi hac iusto invidunt noster
                        maiestatis sociis eripuit viris. Pulvinarwisi usu an
                        elit verterem sapien tota fastidii delicata brute cras
                        intellegat error congue eos necessitatibus dico posse.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color={"danger"}
                        variant={"flat"}
                        onPress={() => setTerms(false)}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                </ModalContent>
              </Modal>
            </Checkbox>
            <Button
              isDisabled={pending}
              type={"submit"}
              className={
                "w-full rounded-none bg-black text-white hover:bg-blue-950 py-[3vh]"
              }
            >
              Send
            </Button>
          </form>
        )}
        <div
          className={
            "md:hidden w-full flex flex-col justify-center items-start gap-[2vh]"
          }
        >
          <Connect />
        </div>
        <div
          className={
            "md:hidden w-full flex flex-col justify-center items-center gap-[2vh]"
          }
        >
          <div className={"w-full h-[0.25vh] bg-white"} />
          <Social />
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
