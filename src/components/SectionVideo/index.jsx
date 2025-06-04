import MainVD from "../../assets/Video/Video.mp4";
import HeroFilter from "../Home/HeroFilter";

function SectionVideo() {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[700px] xl:h-[745px] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={MainVD} type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video HTML5.
      </video>
      <HeroFilter />
    </div>
  );
}

export default SectionVideo;
