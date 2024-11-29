import { Button, Card, CardHeader, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { LuDownload } from "react-icons/lu";
import { useCallback } from "react";
import useGeneratePdf from "../../../../hooks/useGeneratePdf";
import { useMediaquery } from "../../../../hooks/usemediaQuery";
import { useTranslation } from "react-i18next"; // Import useTranslation

const TABLE_HEAD_KEYS = [
  "commodity",
  "variety",
  "minPrice",
  "maxPrice",
  "arrivalDate",
  "grade",
];

function MarketpriceSection() {
  const { marketPriceData } = useSelector((state) => state.stateData);
  const IsMobileView = useMediaquery(900);
  const { t } = useTranslation();

  const handlePdfDownLoad = () => {
    useGeneratePdf(marketPriceData);
  };

  return (
    <section className="py-10">
      {marketPriceData?.length > 0 && (
        <Card className="h-full w-[93%] mx-auto">
          <CardHeader className="w-full flex justify-between rounded-t-2xl  bg-custom-light-yellow-to-light-green mx-auto p-4">
            <Typography variant="h4" className="font-Varela">
              {t('marketPriceSection.title')} {/* Translated title */}
            </Typography>
            <Button
              onClick={handlePdfDownLoad}
              className="bg-pastelGreen-500 text-black flex items-center gap-2"
              size={IsMobileView ? "md" : "lg"}
            >
              {t('marketPriceSection.download')} <LuDownload className="size-5" />
            </Button>
          </CardHeader>
          <div className="overflow-y-auto max-h-[400px]">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD_KEYS.map((key) => (
                    <th
                      key={key}
                      className="border-b border-blue-gray-100 bg-green-200 p-4"
                    >
                      <Typography
                        variant="small"
                        className="text-black font-semibold leading-none opacity-70"
                      >
                        {t(`marketPriceSection.tableHead.${key}`)} {/* Translated table headers */}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              {marketPriceData.length > 0 && (
                <tbody>
                  {marketPriceData.map(
                    (
                      {
                        Commodity,
                        Variety,
                        MinPrice,
                        MaxPrice,
                        ArrivalDate,
                        Grade,
                      },
                      index
                    ) => {
                      const isLast = index === marketPriceData.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {Commodity}
                            </Typography>
                          </td>
                          <td className={`${classes} bg-green-100`}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {Variety}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {MinPrice}
                            </Typography>
                          </td>
                          <td className={`${classes} bg-green-100`}>
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              color="blue-gray"
                              className="font-medium"
                            >
                              {MaxPrice}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {ArrivalDate}
                            </Typography>
                          </td>
                          <td className={`${classes} bg-green-100`}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {Grade}
                            </Typography>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              )}
            </table>
          </div>
        </Card>
      )}
    </section>
  );
}

export default MarketpriceSection;
