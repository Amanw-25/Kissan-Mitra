import React, { useState } from "react";
import { useFormik } from "formik";
import { Card, Input, Button, Typography, Spinner } from "@material-tailwind/react";
import { FertilizerPredictionFormSchema } from "../../../shared/validation/FormsValidation";
import { useTranslation } from "react-i18next";
import { InfoIcon } from "../../../../constants";
import { useGetFertilizerPredictionDataMutation } from "../../../../redux/endpoints/appdataapi";
import DataSection from "./DataSection";

const initialValues = {
  city: "",
  moisture: "",
  soil_type: "",
  crop: "",
  nitrogen: "",
  pottasium: "",
  phosphorous: "",
};

const FormSection = () => {
  const { t } = useTranslation();
  const [GetFertilizerPredictedData, {isLoading}] = useGetFertilizerPredictionDataMutation();
  const [predictedData, setPredictedData] = useState(null);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: FertilizerPredictionFormSchema,
    onSubmit: async (data, actions) => {
      try {
        // Call the API
        const response = await GetFertilizerPredictedData(data);
        if (response?.data) {
          setPredictedData({
            prediction: response.data[0],
            description: response.data[1],
          }); // Store data in state
        }
        actions.resetForm();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  });

  return (
    <section className="bg-custom-green-gradient flex-center py-8">
      <Card
        color="transparent"
        className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 shadow-lg bg-white"
      >
        <Typography
          className="text-black font-Roboto text-center py-4"
          variant="h2"
        >
          {t("fertilizer-prediction.title")}
        </Typography>
        <form onSubmit={handleSubmit} className="w-full mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            {/* City */}
            <div className="flex flex-col gap-4">
              <Typography variant="h5" className="text-black font-TitilliumWeb">
                {t("fertilizer-prediction.city")}
              </Typography>
              <Input
                name="city"
                size="lg"
                placeholder={t("fertilizer-prediction.city-placeholder")}
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

            {/* Moisture */}
            <div className="flex flex-col gap-4">
              <Typography variant="h5" className="text-black font-TitilliumWeb">
                {t("fertilizer-prediction.moisture")}
              </Typography>
              <Input
                name="moisture"
                size="lg"
                placeholder={t("fertilizer-prediction.moisture-placeholder")}
                className="InputBoxCustom"
                value={values.moisture}
                onChange={handleChange}
              />
              {touched.moisture && errors.moisture && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal"
                >
                  *{errors.moisture}
                </Typography>
              )}
            </div>

            {/* Soil Type */}
            <div className="flex flex-col gap-4">
              <Typography variant="h5" className="text-black font-TitilliumWeb">
                {t("fertilizer-prediction.soil-type")}
              </Typography>
              <Input
                name="soil_type"
                size="lg"
                placeholder={t("fertilizer-prediction.soil-type-placeholder")}
                className="InputBoxCustom"
                value={values.soil_type}
                onChange={handleChange}
              />
              {touched.soil_type && errors.soil_type && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal"
                >
                  *{errors.soil_type}
                </Typography>
              )}
            </div>

            {/* Crop */}
            <div className="flex flex-col gap-4">
              <Typography variant="h5" className="text-black font-TitilliumWeb">
                {t("fertilizer-prediction.crop")}
              </Typography>
              <Input
                name="crop"
                size="lg"
                placeholder={t("fertilizer-prediction.crop-placeholder")}
                className="InputBoxCustom"
                value={values.crop}
                onChange={handleChange}
              />
              {touched.crop && errors.crop && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal"
                >
                  *{errors.crop}
                </Typography>
              )}
            </div>

            {/* Nitrogen */}
            <div className="flex flex-col gap-4">
              <Typography variant="h5" className="text-black font-TitilliumWeb">
                {t("fertilizer-prediction.nitrogen")}
              </Typography>
              <Input
                name="nitrogen"
                size="lg"
                placeholder={t("fertilizer-prediction.nitrogen-placeholder")}
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

            {/* Pottassium */}
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="text-black flex items-center gap-4 font-TitilliumWeb"
              >
                {t("fertilizer-prediction.pottasium")}
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
                placeholder={t("fertilizer-prediction.pottasium-placeholder")}
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
                {t("fertilizer-prediction.phosphorous")}
                <a
                  href="https://forkknife.streamlit.app/?query=how%20to%20calculate%20phosphorous%20in%20soil"
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
                placeholder={t("fertilizer-prediction.phosphorous-placeholder")}
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
          </div>
          <div className="w-full flex justify-center mt-6">
            <Button type="submit" className="mt-6 w-full bg-green-900 text-xl">
              {isLoading ? (
                <Spinner
                  className="size-8 mx-auto bg-transparent"
                  color="deep-orange"
                />
              ) : (
                t("fertilizer-prediction.button")
              )}
            </Button>
          </div>
        </form>
      </Card>
      {predictedData && <DataSection predictedData={predictedData} />}
    </section>
  );
};

export default FormSection;
