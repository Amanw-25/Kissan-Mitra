import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

export function DataSection({ CropData }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (CropData) {
      setOpen(true);
    }
  }, [CropData]);

  const { t } = useTranslation();
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <Dialog
        open={open}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-custom-green-gradient"
      >
        <DialogHeader className="ml-5 text-lg font-normal text-center mx-auto">
          Predicted Crop Name : {"  "}{" "}
          <span className="text-xl uppercase font-medium">{CropData[0]}</span>
        </DialogHeader>
        <DialogBody>
          <img src={CropData[1]?.url} alt="cropimage" />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>{t("close")}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default DataSection;
