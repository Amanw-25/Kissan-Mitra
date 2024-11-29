import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { Card, Button, Typography, Spinner } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { DiseasePredictionFormSchema } from "../../../shared/validation/FormsValidation";
import { useGetDieasePredictionDataMutation } from "../../../../redux/endpoints/appdataapi";
import DataSection from "./DataSection";

const FormSection = () => {
  const { t } = useTranslation();
  const fileRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);
  const [predictedData, setPredictedData] = useState(null);

  const [GetDiseasePrediction, { isLoading, isSuccess }] =
    useGetDieasePredictionDataMutation();

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        file: null,
      },
      validationSchema: DiseasePredictionFormSchema,
      onSubmit: async (data, actions) => {
        try {
          const formData = new FormData();
          formData.append("file", data.file);

          const resp = await GetDiseasePrediction(formData);
         

          if (resp || isSuccess) {
            const cropName = resp.data[0];
            const diseaseName = resp.data[1];
            const details = resp.data[2];
            setPredictedData({
              cropName,
              diseaseName,
              details,
            });
            actions.resetForm();
            setImageUrl(null);
          }
        } catch (error) {
          console.log(error);
        }
      },
    });

  const handleInputFileClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    setFieldValue("file", file);

    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <section className="bg-custom-green-gradient flex-col flex space-y-5 flex-center py-8">
      <Card color="transparent" shadow={false}>
        <Typography
          className="text-black text-center font-TitilliumWeb"
          variant="h2"
        >
          {t("disease-prediction.title")}
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-4">
            <div className="flex-col flex-center gap-4">
              <div
                className="bg-custom-light-yellow-to-transparent-green w-[180px] h-[180px] mx-auto rounded-3xl shadow-glass-card cursor-pointer text-center flex-center"
                onClick={handleInputFileClick}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                ) : (
                  <Typography
                    variant="h5"
                    className="text-black font-TitilliumWeb -mb-3"
                  >
                    {t("disease-prediction.label")}
                  </Typography>
                )}
                <input
                  type="file"
                  name="file"
                  ref={fileRef}
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleFileChange}
                  className="InputBoxCustom hidden"
                />
              </div>
              {touched.file && errors.file && (
                <Typography
                  variant="small"
                  className="text-red-700 font-normal -mt-3 text-base"
                >
                  *{errors.file}
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
              t("disease-prediction.button")
            )}
          </Button>
        </form>
      </Card>
      <DataSection predictedData={predictedData} />{" "}
      {/* Pass the predicted data */}
    </section>
  );
};

export default FormSection;
