import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

export function DataSection({ predictedData }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (predictedData) {
      setOpen(true);
    }
  }, [predictedData]);

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
        <DialogHeader className="ml-5 uppercase text-center mx-auto">
          Fertilizer Name: {predictedData?.prediction}
        </DialogHeader>
        <DialogBody className="text-lg opacity-100 font-semibold font-Inter flex justify-center">
          <div dangerouslySetInnerHTML={{ __html: predictedData?.description }} />
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
