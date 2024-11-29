import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import { toastConfig } from "./configs/Toastconfig";
import "./components/features/config/i18next";
import SocketContext from "./components/features/chat/SocketContext";
import { TbHelpOctagon } from "react-icons/tb";
function Appcontainer() {
  return (
    <>
      <Provider store={Store}>
        <ToastContainer {...toastConfig} />
        <SocketContext>
          <div className="relative h-screen">
            <App />
            <div className="size-[100px] animate-bounce bg-black fixed top-[500px] right-10 md:right-20  rounded-full flex-center ">
              <a href="https://forkknife.streamlit.app/" className="href">
                <TbHelpOctagon className="text-pastelGreen-600" size={55} />
              </a>
            </div>
          </div>
        </SocketContext>
      </Provider>
    </>
  );
}

export default Appcontainer;
