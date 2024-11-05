const Malta = () => {
  return (
    <section
      className={
        "w-full h-max flex flex-col justify-center items-center text-center bg-malta text-white bg-center bg-cover"
      }
    >
      <div
        className={
          "containerize lg:px-[28vw] h-full flex flex-col justify-center items-center bg-blue-950/75 py-[8vh] lg:py-[18vh] gap-[2vh]"
        }
      >
        <label className={"uppercase"}>Why malta</label>
        <h2>The Last Friendly European Country For Business Aircraft Owners</h2>
        <p>
          Malta stands unique in the European landscape, marrying the efficiency
          of an ‘onshore’ jurisdiction with the allure of ‘offshore’ benefits.
          Steeped in aviation history since the 1920s, the island is not only an
          ode to the past but a nod to the future with its highly efficient EASA
          aircraft register. JetHouse has anchored itself here, tapping into the
          island’s rich aviation legacy and leveraging its geographic position
          to provide unparalleled service.
        </p>
      </div>
    </section>
  );
};

export default Malta;
