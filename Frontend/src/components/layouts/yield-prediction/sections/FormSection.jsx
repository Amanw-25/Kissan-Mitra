import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Input,
  Button,
  Typography,
  Spinner,
  Card,
} from "@material-tailwind/react";
import { YieldPredictionFormSchema } from "../../../shared/validation/FormsValidation";
import { useTranslation } from "react-i18next";
import { InfoIcon } from "../../../../constants";
import { useGetYeildPredictionDataMutation } from "../../../../redux/endpoints/appdataapi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataSection from "./DataSection";

const initialValues = {
  temperature: "",
  rainfall: "",
  state: "",
  crop_type: "",
  crop: "",
  nitrogen: "",
  pottasium: "",
  phosphorous: "",
  ph: "",
  area: "",
};

const FormSection = () => {
  const { t } = useTranslation();
  const [GetCropYeildData, { isLoading, isSuccess, isError }] =
    useGetYeildPredictionDataMutation();

  const [CropsYeildData, setCropsYeildData] = useState(null);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: YieldPredictionFormSchema,
    onSubmit: async (data, actions) => {
      try {
        const resposne = await GetCropYeildData(data).unwrap();
        console.log("🚀 ~ onSubmit: ~ resposne:", resposne)
        if (isSuccess || resposne) {
          setCropsYeildData(resposne[0]);
        }
        actions.resetForm();
      } catch (err) {
        console.log("🚀 ~ onSubmit: ~ err:", err)
        toast.error("Some Error Occured !");
      }
    },
  });

  return (
    <section className="bg-custom-green-gradient flex-center py-7">
      <Card
        color="transparent"
        className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 shadow-lg bg-white"
      >
        <Typography
          className="text-black text-center font-Varela py-7"
          variant="h2"
        >
          {t("crop-yeild.title")}
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2">
          <div className="mb-1 w-full mx-auto grid md:grid-cols-2 gap-10">
            {/* Temperature */}
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="text-black font-TitilliumWeb -mb-3"
              >
                {t("crop-yeild.temperature")} (°C)
              </Typography>
              <Input
                name="temperature"
                type="number"
                size="lg"
                placeholder="Enter Temperature (example: 25)"
                className="InputBoxCustom"
                value={values.temperature}
                onChange={handleChange}
              />
              {touched.temperature && errors.temperature && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal -mt-3 text-base"
                >
                  *{errors.temperature}
                </Typography>
              )}
            </div>

            {/* Rainfall */}
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="text-black flex items-center gap-4 font-TitilliumWeb -mb-3"
              >
                {t("crop-yeild.rain")}
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
                placeholder="Enter Rainfall (example: 200)"
                className="InputBoxCustom"
                value={values.rainfall}
                onChange={handleChange}
              />
              {touched.rainfall && errors.rainfall && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal -mt-3 text-base"
                >
                  *{errors.rainfall}
                </Typography>
              )}
            </div>

            {/* State */}
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="text-black font-TitilliumWeb -mb-3"
              >
                {t("crop-yeild.state")}
              </Typography>
              <Input
                name="state"
                size="lg"
                placeholder="Enter State"
                className="InputBoxCustom"
                value={values.state}
                onChange={handleChange}
              />
              {touched.state && errors.state && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal -mt-3 text-base"
                >
                  *{errors.state}
                </Typography>
              )}
            </div>

            {/* Crop Type */}
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="text-black font-TitilliumWeb -mb-3"
              >
                {t("crop-yeild.crop-type")}
              </Typography>
              <Input
                name="crop_type"
                size="lg"
                placeholder="Enter Crop Type (e.g., rabi, kharif, zaid)"
                className="InputBoxCustom"
                value={values.crop_type}
                onChange={handleChange}
              />
              {touched.crop_type && errors.crop_type && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal -mt-3 text-base"
                >
                  *{errors.crop_type}
                </Typography>
              )}
            </div>

            {/* Crop */}
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="text-black font-TitilliumWeb -mb-3"
              >
                {t("crop-yeild.crop")}
              </Typography>
              <Input
                name="crop"
                size="lg"
                placeholder="Enter Crop"
                className="InputBoxCustom"
                value={values.crop}
                onChange={handleChange}
              />
              {touched.crop && errors.crop && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal -mt-3 text-base"
                >
                  *{errors.crop}
                </Typography>
              )}
            </div>

            {/* Nitrogen */}
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="text-black flex items-center gap-4 font-TitilliumWeb -mb-3"
              >
                {t("crop-yeild.nitrogen")}
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
                placeholder="Enter Nitrogen Level"
                className="InputBoxCustom"
                value={values.nitrogen}
                onChange={handleChange}
              />
              {touched.nitrogen && errors.nitrogen && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal -mt-3 text-base"
                >
                  *{errors.nitrogen}
                </Typography>
              )}
            </div>

            {/* Pottasium */}
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="text-black flex items-center gap-4 font-TitilliumWeb -mb-3"
              >
                {t("crop-yeild.pottasium")}
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
                placeholder="Enter Pottasium Level"
                className="InputBoxCustom"
                value={values.pottasium}
                onChange={handleChange}
              />
              {touched.pottasium && errors.pottasium && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal -mt-3 text-base"
                >
                  *{errors.pottasium}
                </Typography>
              )}
            </div>

            {/* Phosphorous */}
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="text-black flex items-center gap-4 font-TitilliumWeb -mb-3"
              >
                {t("crop-yeild.phosphorous")}
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
                placeholder="Enter Phosphorous Level"
                className="InputBoxCustom"
                value={values.phosphorous}
                onChange={handleChange}
              />
              {touched.phosphorous && errors.phosphorous && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal -mt-3 text-base"
                >
                  *{errors.phosphorous}
                </Typography>
              )}
            </div>

            {/* PH Level */}
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="text-black flex items-center gap-4 font-TitilliumWeb -mb-3"
              >
                {t("crop-yeild.ph-level")}
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
                placeholder="Enter pH Level (0-14)"
                className="InputBoxCustom"
                value={values.ph}
                onChange={handleChange}
              />
              {touched.ph && errors.ph && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal -mt-3 text-base"
                >
                  *{errors.ph}
                </Typography>
              )}
            </div>

            {/* Area */}
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="text-black font-TitilliumWeb -mb-3"
              >
                {t("crop-yeild.area")}
              </Typography>
              <Input
                name="area"
                type="number"
                size="lg"
                placeholder="Enter Area (hectares)"
                className="InputBoxCustom"
                value={values.area}
                onChange={handleChange}
              />
              {touched.area && errors.area && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal -mt-3 text-base"
                >
                  *{errors.area}
                </Typography>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="m-8 w-[20rem] mx-auto bg-green-900 text-xl cursor-pointer"
            href=""
            fullWidth
          >
            {isLoading ? (
              <Spinner className="h-8 w-8 mx-auto" />
            ) : (
              <>{t("crop-yeild.button")}</>
            )}
          </Button>
        </form>
      </Card>

      {CropsYeildData && <DataSection CropsYeildData={CropsYeildData} />}
    </section>
  );
};

export default FormSection;
