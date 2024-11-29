import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { CropPredictionFormSchema } from "../../../shared/validation/FormsValidation";
import { useTranslation } from "react-i18next";
import { InfoIcon } from "../../../../constants";
import { useGetCropPredictoinDataMutation } from "../../../../redux/endpoints/appdataapi";
import DataSection from "./DataSection";

const initialValues = {
  nitrogen: "",
  phosphorous: "",
  pottasium: "",
  ph: "",
  rainfall: "",
  city: "",
};

const FormSection = () => {
  const { t } = useTranslation();
  const [CropData, setCropData] = useState(null);
  const [GetCropData, { isError, isSuccess, isLoading }] =
    useGetCropPredictoinDataMutation();
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: CropPredictionFormSchema,
    onSubmit: async (data, actions) => {
      try {
        const resp = await GetCropData(data);
        if (isSuccess || resp) {
          setCropData(resp?.data);
          actions.resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <section className="bg-custom-green-gradient  w-full min-h-[70vh] flex-center">
      <Card
        color="transparent"
        className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 shadow-lg bg-white"
      >
        <Typography
          className="text-black text-center my-7 font-Roboto"
          variant="h2"
        >
          {t("crop-prediction.title")}
        </Typography>
        <form onSubmit={handleSubmit} className="w-full mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Nitrogen */}
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="text-black flex items-center gap-4 font-TitilliumWeb"
              >
                {t("crop-prediction.nitrogen")}
                <a
                  href="https://forkknife.streamlit.app/?query=how%20to%20calculate%20nitrogen%20in%20soil"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InfoIcon className="text-xl cursor-pointer" />
                </a>
              </Typography>
              <Input
                name="nitrogen"
                type="number"
                size="lg"
                placeholder={t("crop-prediction.nitrogen-placeholder")}
                className="InputBoxCustom"
                value={values.nitrogen}
                onChange={handleChange}
              />
              {touched.nitrogen && errors.nitrogen && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal"
                >
                  *{errors.nitrogen}
                </Typography>
              )}
            </div>

            {/* Pottasium */}
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="text-black flex items-center gap-4 font-TitilliumWeb"
              >
                {t("crop-prediction.pottasium")}
                <a
                  href="https://forkknife.streamlit.app/?query=how%20to%20calculate%20pottasium%20in%20soil"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InfoIcon className="text-xl cursor-pointer" />
                </a>
              </Typography>
              <Input
                name="pottasium"
                type="number"
                size="lg"
                placeholder={t("crop-prediction.pottasium-placeholder")}
                className="InputBoxCustom"
                value={values.pottasium}
                onChange={handleChange}
              />
              {touched.pottasium && errors.pottasium && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal"
                >
                  *{errors.pottasium}
                </Typography>
              )}
            </div>

            {/* Phosphorous */}
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="text-black flex items-center gap-4 font-TitilliumWeb"
              >
                {t("crop-prediction.phosphorous")}
                <a
                  href="https://forkknife.streamlit.app/?query=how%20to%20calculate%20phosphorus%20in%20soil"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InfoIcon className="text-xl cursor-pointer" />
                </a>
              </Typography>
              <Input
                name="phosphorous"
                type="number"
                size="lg"
                placeholder={t("crop-prediction.phosphorous-placeholder")}
                className="InputBoxCustom"
                value={values.phosphorous}
                onChange={handleChange}
              />
              {touched.phosphorous && errors.phosphorous && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal"
                >
                  *{errors.phosphorous}
                </Typography>
              )}
            </div>

            {/* pH Level */}
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="text-black flex items-center gap-4 font-TitilliumWeb"
              >
                {t("crop-prediction.ph-level")}
                <a
                  href="https://forkknife.streamlit.app/?query=how%20to%20measure%20ph%20value%20in%20soil"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InfoIcon className="text-xl cursor-pointer" />
                </a>
              </Typography>
              <Input
                name="ph"
                type="number"
                size="lg"
                placeholder={t("crop-prediction.ph-level-placeholder")}
                className="InputBoxCustom"
                value={values.ph}
                onChange={handleChange}
              />
              {touched.ph && errors.ph && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal"
                >
                  *{errors.ph}
                </Typography>
              )}
            </div>

            {/* Rainfall */}
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="text-black flex items-center gap-4 font-TitilliumWeb"
              >
                {t("crop-prediction.rain")}
                <a
                  href="https://forkknife.streamlit.app/?query=how%20to%20measure%20rainfall"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InfoIcon className="text-xl cursor-pointer" />
                </a>
              </Typography>
              <Input
                name="rainfall"
                type="number"
                size="lg"
                placeholder={t("crop-prediction.rain-placeholder")}
                className="InputBoxCustom"
                value={values.rainfall}
                onChange={handleChange}
              />
              {touched.rainfall && errors.rainfall && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal"
                >
                  *{errors.rainfall}
                </Typography>
              )}
            </div>

            {/* City */}
            <div className="flex flex-col gap-4">
              <Typography variant="h5" className="text-black font-TitilliumWeb">
                {t("crop-prediction.city")}
              </Typography>
              <Input
                name="city"
                size="lg"
                placeholder={t("crop-prediction.city-placeholder")}
                className="InputBoxCustom"
                value={values.city}
                onChange={handleChange}
              />
              {touched.city && errors.city && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal"
                >
                  *{errors.city}
                </Typography>
              )}
            </div>
          </div>
          <Button type="submit" className="mt-6 bg-green-900 text-xl" fullWidth>
            {isLoading ? (
              <Spinner
                className="size-8 mx-auto bg-transparent"
                color="deep-orange"
              />
            ) : (
              t("crop-prediction.button")
            )}
          </Button>
        </form>
      </Card>
      {CropData && <DataSection CropData={CropData} />}
    </section>
  );
};

export default FormSection;
