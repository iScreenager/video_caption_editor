import { useState } from "react";

import { CaptionItem } from "../constants/CaptionItem";
import { VideoUrlInput } from "../components/VideoUrlInput";
import { VideoPlayer } from "../components/ VideoPlayer";
import { CaptionInput } from "../components/CaptionInput";

export const Home = () => {
  const [videoURL, setVideoURL] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [captions, setCaptions] = useState<CaptionItem[]>([]);

  return (
    <div className="relative flex flex-col items-center py-6 sm:py-8 bg-gray-50 w-full px-4 sm:px-6 space-y-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-800">
        Video Caption Editor
      </h1>

      <div className="w-full max-w-4xl flex flex-col gap-10">
        <VideoUrlInput setVideoURL={setVideoURL} />
        <VideoPlayer
          videoURL={videoURL}
          captions={captions}
          duration={duration}
          setDuration={setDuration}
        />
        <CaptionInput
          videoURL={videoURL}
          setCaptions={setCaptions}
          captions={captions}
          duration={duration}
        />
      </div>
    </div>
  );
};
