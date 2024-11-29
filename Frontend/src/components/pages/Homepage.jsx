import Meteorsvg from "../shared/svgs/Meteorsvg";
import HomeConatiner from "../layouts/home/HomeConatiner";

function Homepage() {
  return (
    <div className="relative min-h-screen">
      <Meteorsvg />
      <HomeConatiner />
    </div>
  );
}

export default Homepage;
