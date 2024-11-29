
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Rendermessage from "./Rendermessage";

export function MessageShowcaseSection() {
  const scrollScreenRef = useRef();
  const { communityMessage } = useSelector((state) => state.community);

  useEffect(() => {
    if (scrollScreenRef.current) {
      scrollScreenRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [communityMessage]);
  return (
    <section>
      <div className=" w-full py-10">
        <Rendermessage communityMessage={communityMessage} />
      </div>
      <div ref={scrollScreenRef} />
    </section>
  );
}

export default MessageShowcaseSection;
