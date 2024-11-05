const Hero = () => {
  return (
    <section
      className={
        "containerize lg:px-[30vw] py-[16vh] lg:py-[28vh] bg-about-hero bg-cover bg-bottom flex justify-center items-center flex-col text-center text-white"
      }
    >
      <label>About us</label>
      <h2 className={"font-semibold"}>
        175+ years of combined experience in business aviation dedicated to
        aircraft owners.
      </h2>
    </section>
  );
};

export default Hero;
