import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import { AiOutlinePlus } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { OpenMessageModel } from "../../../../redux/states/communitySlice";
function SpeedDialSection() {
  const dispatch = useDispatch();

  const handlemessagemodel = useCallback(() => {
    dispatch(OpenMessageModel());
  }, [dispatch]);
  return (
    <div className="fixed right-2 top-[140px] bg-transparent w-[100px]  h-[100px] flex items-center justify-center rounded-full">
      <SpeedDial>
        <SpeedDialHandler>
          <IconButton
            color="white"
            size="lg"
            className="rounded-full w-[200px] h-[200px] border bg-yellow-400 border-blue-gray-50 shadow-xl"
          >
            <AiOutlinePlus className="h-10 w-10 transition-transform group-hover:rotate-45" />
          </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent className="rounded-full border border-blue-gray-50 bg-custom-greentransparent-gradient shadow-xl shadow-black/10">
          <SpeedDialAction
            onClick={handlemessagemodel}
            className="bg-yellow-500"
          >
            <VscComment className="h-5 w-5" />
          </SpeedDialAction>
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
}

export default SpeedDialSection;
