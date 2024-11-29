import React, { useState } from "react";
import { ReactMic } from "react-mic";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react"; // Adjust the import path based on your setup

const VoiceMessageModel = ({ open, handleClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(""); // State to store the audio URL

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onStop = (blob) => {
    setRecordedBlob(blob);
    console.log("Recorded Blob:", blob);

    const url = URL.createObjectURL(blob.blob);
    setAudioURL(url);
  };

  return (
    <Dialog
      open
      handler={handleClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>RECORD AUDIO</DialogHeader>
      <DialogBody>
        <ReactMic
          record={isRecording}
          className="sound-wave"
          onStop={onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
      </DialogBody>
      <DialogFooter>
        <Button onClick={startRecording} type="button">
          Start Recording
        </Button>
        <Button onClick={stopRecording} type="button">
          Stop Recording
        </Button>
        {audioURL && (
          <audio controls src={audioURL}></audio>
        )}
        <Button onClick={handleClose} type="button">
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default VoiceMessageModel;
