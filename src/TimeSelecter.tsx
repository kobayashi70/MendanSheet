import { useState, useEffect } from "react";

interface TimeSelecterProps {
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  set勤務時間: React.Dispatch<
    React.SetStateAction<{
      startHour: string;
      startMinute: string;
      endHour: string;
      endMinute: string;
    }>
  >;
  idPrefix: string;
}

const TimeSelector: React.FC<TimeSelecterProps> = ({
  startHour: initialStartHour,
  startMinute: initialStartMinute,
  endHour: initialEndHour,
  endMinute: initialEndMinute,
  set勤務時間,
  idPrefix,
}) => {
  const [startHour, setStartHour] = useState<string>(initialStartHour);
  const [startMinute, setStartMinute] = useState<string>(initialStartMinute);
  const [endHour, setEndHour] = useState<string>(initialEndHour);
  const [endMinute, setEndMinute] = useState<string>(initialEndMinute);

  useEffect(() => {
    setStartHour(localStorage.getItem("startHour") || initialStartHour);
    setStartMinute(localStorage.getItem("startMinute") || initialStartMinute);
    setEndHour(localStorage.getItem("endHour") || initialEndHour);
    setEndMinute(localStorage.getItem("endMinute") || initialEndMinute);
  }, [initialStartHour, initialStartMinute, initialEndHour, initialEndMinute]);

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = Array.from({ length: 12 }, (_, i) =>
    String(i * 5).padStart(2, "0")
  );

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
    key: string
  ) => {
    const newValue = e.target.value;
    setState(newValue);
    set勤務時間((prev) => ({
      ...prev,
      [key]: newValue,
    }));
    localStorage.setItem(key, newValue);
    console.log(`Saved ${key}: ${newValue} to localStorage`);
  };

  return (
    <div className="custom-select-wrapper">
      <label htmlFor={`${idPrefix}-startHour`}>勤務時間</label>
      <div className="custom-select_wrap">
        <div className="custom-select-div">
          <select
            id={`${idPrefix}-startHour`}
            className="custom-select"
            value={startHour}
            onChange={(e) => handleSelectChange(e, setStartHour, "startHour")}
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>
        ：
        <div className="custom-select-div">
          <select
            id={`${idPrefix}-startMinute`}
            className="custom-select"
            value={startMinute}
            onChange={(e) =>
              handleSelectChange(e, setStartMinute, "startMinute")
            }
          >
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
        </div>
        &nbsp;～&nbsp;
        <div className="custom-select-div">
          <select
            id={`${idPrefix}-endHour`}
            className="custom-select"
            value={endHour}
            onChange={(e) => handleSelectChange(e, setEndHour, "endHour")}
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>
        ：
        <div className="custom-select-div">
          <select
            id={`${idPrefix}-endMinute`}
            className="custom-select"
            value={endMinute}
            onChange={(e) => handleSelectChange(e, setEndMinute, "endMinute")}
          >
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
