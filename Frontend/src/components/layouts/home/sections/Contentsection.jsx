import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { Staricon } from "../../../../constants";
import { useTranslation } from "react-i18next";
import { FadeInFromLeft } from "../../../animation";
import AvatarStack from "../../../shared/avatar/Avatarstack";
import { useGSAP } from "@gsap/react";

function Contentsection() {
  const { t } = useTranslation();
  useGSAP(() => {
    FadeInFromLeft("#Contentsection");
  }, []);

  return (
    <section id="Contentsection" className="space-y-4 md:space-y-6 mx-auto">
      <Typography variant="h2" className="text-5xl md:text-6xl font-Varela">
        {t("Home.contentSection.weAreThe")} <br />{" "}
        <span className="text-green-800">
          {t("Home.contentSection.kissanMitra")}
        </span>
      </Typography>
      <br />
      <Typography variant="h5" className="opacity-60 hidden md:block">
        {t("Home.contentSection.empoweringFarmers")}
      </Typography>
      <Button className="bg-pastelGreen-500 text-sm text-black rounded-3xl">
        {t("Home.contentSection.moreInfo")}
      </Button>
      <div className="flex items-center gap-5">
        <AvatarStack />
        <div className="flex items-center gap-3">
          <Staricon className="size-8 text-goldentainoi-500" />
          <Typography variant="h6" className="opacity-60 hidden md:block">
            {t("Home.contentSection.empoweringFarmersWithInsights")}
          </Typography>
        </div>
      </div>
    </section>
  );
}

export default Contentsection;
