import { useState, useEffect } from "react";

interface SeisanHabaProps {
  startSeisanHaba: string;
  endSeisanHaba: string;
  set精算幅: React.Dispatch<
    React.SetStateAction<{ startSeisanHaba: string; endSeisanHaba: string }>
  >;
  idPrefix: string;
}

const SeisanHaba: React.FC<SeisanHabaProps> = ({
  startSeisanHaba: initialStartSeisanHaba,
  endSeisanHaba: initialEndSeisanHaba,
  set精算幅,
  idPrefix,
}) => {
  const [startSeisanHaba, setStartSeisanHaba] = useState<string>(
    initialStartSeisanHaba
  );
  const [endSeisanHaba, setEndSeisanHaba] = useState<string>(
    initialEndSeisanHaba
  );

  //初期値をlocalStorageから取得、または初期値を設定
  useEffect(() => {
    setStartSeisanHaba(
      localStorage.getItem("startSeisanHaba") || initialStartSeisanHaba
    );
    setEndSeisanHaba(
      localStorage.getItem("endSeisanHaba") || initialEndSeisanHaba
    );
  }, [initialStartSeisanHaba, initialEndSeisanHaba]);

  const options = Array.from({ length: 13 }, (_, i) =>
    (120 + i * 10).toString()
  );

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
    key: string
  ) => {
    const newValue = e.target.value;
    setState(newValue);
    set精算幅((prev) => ({
      ...prev,
      [key]: newValue,
    }));
    localStorage.setItem(key, newValue);
  };

  return (
    <div className="custom-select-wrapper">
      <label htmlFor={`${idPrefix}-startSeisanHaba`}>精算幅</label>
      <div className="custom-select_wrap">
        <div className="custom-select-div">
          <select
            id={`${idPrefix}-startSeisanHaba`}
            className="custom-select"
            value={startSeisanHaba}
            onChange={(e) =>
              handleSelectChange(e, setStartSeisanHaba, "startSeisanHaba")
            }
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        &nbsp;～&nbsp;
        <div className="custom-select-div">
          <select
            id={`${idPrefix}-endSeisanHaba`}
            className="custom-select"
            value={endSeisanHaba}
            onChange={(e) =>
              handleSelectChange(e, setEndSeisanHaba, "endSeisanHaba")
            }
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SeisanHaba;
