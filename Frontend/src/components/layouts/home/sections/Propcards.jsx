import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { PropcardsData } from "../../../../data";
import { FadeInWithScrollTrigger, StaggeredCardAnimationWithScrollTrigger } from "../../../animation";
import { useGSAP } from "@gsap/react";

function Propcards() {
  const { t } = useTranslation();

  useGSAP(() => {
    StaggeredCardAnimationWithScrollTrigger(".cardContainer", ".card");
    FadeInWithScrollTrigger("#Propcardstitle");
  }, []);

  return (
    <section className=" py-8 w-[90%] mx-auto">
      <Typography id="Propcardstitle" variant="h3" className="text-center">
        {t("Home.propcards.title")}
      </Typography>
      <div className="cardContainer grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 py-8">
        {PropcardsData.map(({ id, img, label }) => (
          <Card
            key={id}
            className="card mt-6 bg-custom-greenlight-gradient flex-center shadow-dark-shadow hover:rounded-none transition-all"
          >
            <CardBody className="flex-center flex-col gap-4">
              <img src={img} alt={t(`Home.propcards.${label.toLowerCase()}`)} />
              <Typography className="!text-black" variant="h5">
                {t(`Home.propcards.${label.toLowerCase()}`)}
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Propcards;
