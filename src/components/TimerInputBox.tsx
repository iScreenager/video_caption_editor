interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const TimerInputBox = ({ value, onChange, label }: TimeInputProps) => {
  const [hours, minutes, seconds] = (value || "00:00:00")
    .split(":")
    .map((v) => v || "00");

  const handleTimeChange = (
    type: "hours" | "minutes" | "seconds",
    newValue: string
  ) => {
    let numValue = parseInt(newValue || "0");

    if (type === "hours") {
      numValue = Math.min(99, Math.max(0, numValue));
    } else {
      numValue = Math.min(59, Math.max(0, numValue));
    }

    const paddedValue = numValue.toString().padStart(2, "0");

    const newTimeArray = [hours, minutes, seconds];
    switch (type) {
      case "hours":
        newTimeArray[0] = paddedValue;
        break;
      case "minutes":
        newTimeArray[1] = paddedValue;
        break;
      case "seconds":
        newTimeArray[2] = paddedValue;
        break;
    }

    onChange(newTimeArray.join(":"));
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-700 mt-4">{label}:</label>
      <div className="flex items-center gap-1">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-700 opacity-80">hours</label>
          <input
            type="number"
            min="0"
            max="99"
            value={hours}
            onChange={(e) => handleTimeChange("hours", e.target.value)}
            className="border p-2 rounded-md w-14 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            placeholder="00"
          />
        </div>
        <span className="text-gray-500">:</span>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-700 opacity-80">minutes</label>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => handleTimeChange("minutes", e.target.value)}
            className="border p-2 rounded-md w-14 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            placeholder="00"
          />
        </div>
        <span className="text-gray-500">:</span>
        <div className="flex flex-col gap-1 ">
          <label className="text-xs text-gray-700 opacity-80">seconds</label>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => handleTimeChange("seconds", e.target.value)}
            className="border p-2 rounded-md w-14 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            placeholder="00"
          />
        </div>
      </div>
    </div>
  );
};
export default TimerInputBox;
