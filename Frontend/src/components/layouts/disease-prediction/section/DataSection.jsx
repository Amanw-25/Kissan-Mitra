import React from "react";
import { Card, Typography } from "@material-tailwind/react";

const DataSection = ({ predictedData }) => {
  if (!predictedData) return null;

  const { cropName, diseaseName, details } = predictedData;

 
  return (
    <Card className="p-4 sm:p-6 bg-white shadow-lg rounded-lg w-full max-w-2xl mx-auto mt-6">
      <Typography
        variant="h3"
        className="text-center mb-4 text-lg sm:text-xl md:text-2xl lg:text-3xl"
      >
        Disease Prediction Result
      </Typography>

      {cropName && (
        <Typography variant="h5" className="mb-4 text-center">
          Crop Name: {cropName}
        </Typography>
      )}

      {diseaseName && (
        <Typography variant="h5" className="mb-4 text-center">
          Disease Name: {diseaseName}
        </Typography>
      )}

      {details && (
        <div className="text-sm sm:text-base leading-relaxed mb-4">
          <Typography variant="h6" className="font-bold mb-2">
            Details:
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: details }} />
        </div>
      )}
    </Card>
  );
};

export default DataSection;
