import MainVD from "../../assets/Video/Video.mp4";
import HeroFilter from "../Home/HeroFilter";

function SectionVideo() {
  return (
    <div className="relative w-full h-[400px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden">
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
