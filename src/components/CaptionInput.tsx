import { useReducer, useState } from "react";
import { CaptionItem } from "../constants/CaptionItem";
import { parseTimeString } from "../utils/parseTimeString";
import { getFormattedDate } from "../utils/getFormatTime";
import { CaptionsBox } from "./CaptionBox";
import TimerInputBox from "./TimerInputBox";

const initialState = {
  captionText: "",
  startTime: "00:00:00",
  endTime: "00:00:00",
};

type Action =
  | { type: "Set_Caption_Text"; payload: string }
  | { type: "Set_Start_Time"; payload: string }
  | { type: "Set_End_Time"; payload: string }
  | { type: "CLEAR" };

const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "Set_Caption_Text":
      return { ...state, captionText: action.payload };
    case "Set_Start_Time":
      return { ...state, startTime: action.payload };
    case "Set_End_Time":
      return { ...state, endTime: action.payload };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
};

interface CaptionInputProps {
  setCaptions: React.Dispatch<React.SetStateAction<CaptionItem[]>>;
  captions: CaptionItem[];
  videoURL: string;
  duration: number;
}

export const CaptionInput = ({
  setCaptions,
  captions,
  videoURL,
  duration,
}: CaptionInputProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [editingCaptionId, setEditingCaptionId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateInputs = () => {
    const { captionText, startTime, endTime } = state;
    const start = parseTimeString(startTime);
    const end = parseTimeString(endTime);

    if (!captionText || !startTime || !endTime) {
      setError("All fields are required.");
      return false;
    }
    if (isNaN(start) || isNaN(end)) {
      setError("Invalid time format.");
      return false;
    }
    if (start < 0 || end < 0) {
      setError("Time values cannot be negative.");
      return false;
    }
    if (start >= end) {
      setError("Start time must be less than end time.");
      return false;
    }
    if (start > duration) {
      setError("Start time exceeds video duration.");
      return false;
    }
    if (end > duration) {
      setError("End time exceeds video duration.");
      return false;
    }
    if (end - start < 1) {
      setError("Caption duration must be at least 1 second.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleAddCaption = () => {
    if (!validateInputs()) return;
    
    const start = parseTimeString(state.startTime);
    const end = parseTimeString(state.endTime);

    const newCaption = {
      id: Math.floor(Math.random() * 1000000),
      caption: state.captionText,
      start,
      end,
    };

    setCaptions((prevCaptions) => [...prevCaptions, newCaption]);
    dispatch({ type: "CLEAR" });
  };

  const handleSaveEditedCaption = () => {
    if (!validateInputs()) return;

    const start = parseTimeString(state.startTime);
    const end = parseTimeString(state.endTime);

    const updatedCaptions = captions.map((caption) =>
      caption.id === editingCaptionId
        ? { ...caption, caption: state.captionText, start, end }
        : caption
    );

    setCaptions(updatedCaptions);
    setEditingCaptionId(null);
    dispatch({ type: "CLEAR" });
  };

  const handleEditCaption = (id: number) => {
    const captionToEdit = captions.find((caption) => caption.id === id);
    if (captionToEdit) {
      dispatch({ type: "Set_Caption_Text", payload: captionToEdit.caption });
      dispatch({
        type: "Set_Start_Time",
        payload: getFormattedDate(captionToEdit.start),
      });
      dispatch({
        type: "Set_End_Time",
        payload: getFormattedDate(captionToEdit.end),
      });
      setEditingCaptionId(id);
      setError(null);
    }
  };

  const handleDeleteCaption = (id: number) => {
    setCaptions((prevCaptions) =>
      prevCaptions.filter((caption) => caption.id !== id)
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={state.captionText}
          placeholder="Type your caption here..."
          onChange={(e) =>
            dispatch({ type: "Set_Caption_Text", payload: e.target.value })
          }
          className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <TimerInputBox
              label="Start"
              value={state.startTime}
              onChange={(value) =>
                dispatch({ type: "Set_Start_Time", payload: value })
              }
            />
            <TimerInputBox
              label="End"
              value={state.endTime}
              onChange={(value) =>
                dispatch({ type: "Set_End_Time", payload: value })
              }
            />
          </div>
          <button
            onClick={
              editingCaptionId ? handleSaveEditedCaption : handleAddCaption
            }
            disabled={!videoURL}
            className={`${
              !videoURL
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            } text-white p-3 rounded-md w-full sm:w-auto transition duration-200 mt-2 sm:mt-0`}>
            {editingCaptionId ? "Save Changes" : "Add Caption"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {captions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-3">
          {captions.map((caption) => (
            <CaptionsBox
              key={caption.id}
              caption={caption}
              editCaption={() => handleEditCaption(caption.id)}
              deleteCaption={() => handleDeleteCaption(caption.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
