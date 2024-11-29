import jsPDF from "jspdf";
import "jspdf-autotable";
import { stampImage } from "../constants"; 

const convertDateFormat = (dateStr) => {
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month}-${day}`;
};

const useGeneratePdf = (marketPriceData) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("THE KISSAN MITRA", 14, 15);

  const TABLE_HEAD = [
    "COMMODITY",
    "VARIETY",
    "MIN PRICE",
    "MAX PRICE",
    "ARRIVAL DATE",
    "GRADE",
  ];

  const data = marketPriceData?.map(item => [
    item.Commodity,
    item.Variety,
    item.MinPrice,
    item.MaxPrice,
    convertDateFormat(item.ArrivalDate),
    item.Grade
  ]) || [];

  if (data.length === 0) {
    doc.text("No data available", 14, 30);
  } else {
    doc.autoTable({
      head: [TABLE_HEAD],
      body: data,
      startY: 30,
      theme: "grid",
    });
  }

  const imageWidth = 60;
  const imageHeight = 60;
  const margin = 10;
  const x = doc.internal.pageSize.width - imageWidth - margin;
  const y = doc.internal.pageSize.height - imageHeight - margin;

  doc.addImage(stampImage, "PNG", x, y, imageWidth, imageHeight);

  doc.save("the-kissan-mitra.pdf");
};

export default useGeneratePdf;
