import { useState } from "react";
import { exampleVideos } from "../constants/exampleVideos";

interface VideoUrlInputProps {
  setVideoURL: (url: string) => void;
}

export const VideoUrlInput = ({ setVideoURL }: VideoUrlInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue) {
      setShowError(false);
      setVideoURL(inputValue);
    } else {
      setShowError(true);
      return;
    }
  };

  const handleExampleClick = (url: string) => {
    setVideoURL(url);
    setInputValue(url);
    setShowError(false);
  };

  return (
    <div className="flex flex-col items-center space-y-8 w-full mx-auto">
      <form
        className="flex flex-col md:flex-row items-start w-full gap-2"
        onSubmit={handleSubmit}>
        <div className="flex flex-col w-full">
          <input
            value={inputValue}
            onChange={(e) => {
              setShowError(false);
              setInputValue(e.target.value);
            }}
            placeholder="Paste video URL..."
            className={`border p-3 rounded-md w-full focus:outline-none focus:ring-2 ${
              showError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {showError && (
            <p className="text-red-500 text-sm mt-1">Please enter video URL.</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 whitespace-nowrap">
          Upload
        </button>
      </form>

      <div className="flex flex-col items-center w-full space-y-2">
        <p className="text-gray-700 font-medium text-sm">
          Or try an example URL:
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          {exampleVideos.map((video, idx) => (
            <button
              key={idx}
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-200"
              onClick={() => handleExampleClick(video.url)}>
              {video.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
