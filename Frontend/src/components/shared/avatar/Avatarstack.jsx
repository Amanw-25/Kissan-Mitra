import { Avatar } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useGetFirstFiveProfilePhotosDatQuery } from "../../../redux/endpoints/appdataapi";

function AvatarStack() {
  const [ProfilePhotos, setProfilePhotos] = useState([]);
  console.log("🚀 ~ AvatarStack ~ ProfilePhotos:", ProfilePhotos);
  const { data } = useGetFirstFiveProfilePhotosDatQuery();

  useEffect(() => {
    if (data) {
      setProfilePhotos(data);
    }
  }, [data]);

  return (
    <div className="flex items-center -space-x-4 py-4">
      {ProfilePhotos.map((photo, index) => (
        <Avatar
          key={index}
          variant="circular"
          alt={`user ${index + 1}`}
          className="border-2 border-white hover:z-10 focus:z-10"
          src={photo}
        />
      ))}
    </div>
  );
}

export default AvatarStack;
