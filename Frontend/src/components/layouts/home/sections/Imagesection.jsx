import { useGSAP } from "@gsap/react";
import React from "react";
import { FadeInFromRight } from "../../../animation";

function Imagesection({ src, border }) {
  useGSAP(() => {
    FadeInFromRight("#Imagesection");
  }, []);
  return (
    <section id="Imagesection">
      <img
        className={` w-72 bg-darken  shadow-glass-card  ${border} `}
        src={src}
        alt="Farmbackground"
      />
    </section>
  );
}

export default Imagesection;
