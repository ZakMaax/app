import HeroImage from "@/assets/Hero.png";
import PropertyFilter from "@/public/components/PropertyFilter";
export default function Hero() {
  return (
    <section>
      <div className="relative bg-primaryBg flex flex-col-reverse justify-between md:flex-row">
        <div className="w-full px-10 flex flex-col gap-5 mt-12 md:mt-20 text-center md:text-left">
          <h4 className="text-primary font-medium font-Rubik text-upper text-lg tracking-widest">
            Real Estate
          </h4>
          <p className="text-[#1F2744] text-4xl md:text-5xl font-Rubik font-medium tracking-wider">
            Let's hunt for your dream residence
          </p>
          <p className="text-[#73788C] text-md">
            Explore our range of beautiful properties with the addition of
            separate accommodation suitable for you.
          </p>
          <PropertyFilter />
        </div>
        <img
          src={HeroImage}
          alt=""
          className="w-[700px] h-[500px] md:w-[600px] md:h-[450px] lg:h-[500px] lg:w-[700px]"
        />
      </div>
    </section>
  );
}
