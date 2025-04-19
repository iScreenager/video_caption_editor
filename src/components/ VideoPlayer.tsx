import { PauseIcon, PlayIcon, FastForwardIcon, RewindIcon } from "lucide-react";
import { useRef, useState } from "react";
import { getFormattedDate } from "../utils/getFormatTime";
import { CaptionItem } from "../constants/CaptionItem";

interface VideoPlayerProps {
  videoURL: string;
  captions: CaptionItem[];
  duration: number;
  setDuration: (time: number) => void;
}

export const VideoPlayer = ({
  videoURL,
  captions,
  duration,
  setDuration,
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [activeCaption, setActiveCaption] = useState<string | null>(null);
  const isEmptyURL = !videoURL;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (isEmptyURL) return;

    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      setCurrentTime(currentTime);

      const progressPercentage = (currentTime / duration) * 100;
      setProgress(progressPercentage);

      const currentCaption = captions.find(
        (caption) => currentTime >= caption.start && currentTime <= caption.end
      );
      setActiveCaption(currentCaption ? currentCaption.caption : null);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(currentTime - 10, 0);
    }
  };

  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(currentTime + 10, duration);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <video
          ref={videoRef}
          src={videoURL || undefined}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="rounded-t-lg w-full h-auto"
          controls={false}
        />

        {isEmptyURL && (
          <div className="absolute inset-0 flex items-center justify-center rounded-t-lg bg-black bg-opacity-70 text-white text-sm md:text-xl">
            <span>Enter your video URL to play</span>
          </div>
        )}

        {activeCaption && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white text-lg px-4 py-2 rounded">
            {activeCaption}
          </div>
        )}
      </div>

      <div className="rounded-b-lg bg-gray-800 p-3 text-gray-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={handleRewind}>
            <RewindIcon size={20} />
          </button>
          <button onClick={handlePlayPause}>
            {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
          </button>
          <button onClick={handleForward}>
            <FastForwardIcon size={20} />
          </button>
        </div>
        <div className="bg-gray-100 w-full h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm text-gray-100 whitespace-nowrap">
          {getFormattedDate(currentTime)}/{getFormattedDate(duration)}
        </div>
      </div>
    </div>
  );
};
