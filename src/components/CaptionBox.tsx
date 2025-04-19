import { Delete, Edit } from "lucide-react";
import { getFormattedDate } from "../utils/getFormatTime";
import { CaptionItem } from "../constants/CaptionItem";


interface CaptionsBoxProps {
  caption: CaptionItem;
  editCaption: () => void;
  deleteCaption: () => void;
}

export const CaptionsBox = ({
  caption,
  editCaption,
  deleteCaption,
}: CaptionsBoxProps) => {
  return (
    <div className="bg-gray-200 p-2 rounded-lg shadow-sm flex items-center justify-between gap-4 hover:bg-gray-300 transition duration-200">
      <div className="flex flex-col text-sm text-gray-700 gap-2">
        <span className="font-medium">{caption.caption}</span>
        <span className="text-gray-500">
          {getFormattedDate(caption.start)} - {getFormattedDate(caption.end)}
        </span>
      </div>

      <div className="flex gap-4">
        <Edit
          onClick={editCaption}
          className="text-green-600 cursor-pointer hover:text-green-700 transition duration-150"
        />
        <Delete
          onClick={deleteCaption}
          className="text-red-600 cursor-pointer hover:text-red-700 transition duration-150"
        />
      </div>
    </div>
  );
};
