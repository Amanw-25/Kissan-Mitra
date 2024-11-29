import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

export function DataSection({ CropsYeildData }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (CropsYeildData) {
      setOpen(true);
    }
  }, [CropsYeildData]);

  const { t } = useTranslation();
  const handleClose = useCallback(() => setOpen(false), []);

  const totalProduction = CropsYeildData

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
        <DialogHeader className="ml-5">
          {t("cropYeildprediction.dialogBody.title")}
        </DialogHeader>
        <DialogBody className="text-lg font-semibold font-Inter">
          {t("cropYeildprediction.dialogBody.successMessage", {
            totalProduction: totalProduction
          })}
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
