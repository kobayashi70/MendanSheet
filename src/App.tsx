import { useState, useEffect, useRef } from "react";
import "./App.css";
import PdfDoc from "./PdfDoc";
import { pdf } from "@react-pdf/renderer";
import TimeSelector from "./TimeSelecter";
import SeisanHaba from "./SeisanHaba";

const App: React.FC = () => {
  // 状態管理
  const [案件内容, set案件内容] = useState<string>("");
  const [案件詳細, set案件詳細] = useState<string>("");
  const [期間, set期間] = useState<string>("");
  const [場所, set場所] = useState<string>("");
  const [勤務時間, set勤務時間] = useState({
    startHour: "09",
    startMinute: "00",
    endHour: "18",
    endMinute: "00",
  });
  const [精算幅, set精算幅] = useState({
    startSeisanHaba: "140",
    endSeisanHaba: "180",
  });
  const [作業工程, set作業工程] = useState<string>("");
  const [スキル, setスキル] = useState<string>("");
  const [人数, set人数] = useState<string>("");
  const [備考, set備考] = useState<string>("");
  const [memo1, setMemo1] = useState<string>("");
  const [memo2, setMemo2] = useState<string>("");
  const [memo3, setMemo3] = useState<string>("");
  const [memo4, setMemo4] = useState<string>("");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // ローカルストレージからデータを取得
  useEffect(() => {
    set案件内容(localStorage.getItem("案件内容") || "");
    set案件詳細(localStorage.getItem("案件詳細") || "");
    set期間(localStorage.getItem("期間") || "");
    set場所(localStorage.getItem("場所") || "");
    set勤務時間({
      startHour: localStorage.getItem("startHour") || "09",
      startMinute: localStorage.getItem("startMinute") || "00",
      endHour: localStorage.getItem("endHour") || "18",
      endMinute: localStorage.getItem("endMinute") || "00",
    });
    set精算幅({
      startSeisanHaba: localStorage.getItem("startSeisenHaba") || "140",
      endSeisanHaba: localStorage.getItem("endSeisanHaba") || "180",
    });
    set作業工程(localStorage.getItem("作業工程") || "");
    setスキル(localStorage.getItem("スキル") || "");
    set人数(localStorage.getItem("人数") || "");
    set備考(localStorage.getItem("備考") || "");
    setMemo1(localStorage.getItem("memo1") || "");
    setMemo2(localStorage.getItem("memo2") || "");
    setMemo3(localStorage.getItem("memo3") || "");
    setMemo4(localStorage.getItem("memo4") || "");
    setFilePreview(localStorage.getItem("filePreview"));
    setFileType(localStorage.getItem("fileType"));
    setFileName(localStorage.getItem("fileName"));
  }, []);

  // 案件内容などの入力が変更された時にlocalStorageに自動保存
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    key: string
  ) => {
    setValue(e.target.value);
    localStorage.setItem(key, e.target.value);
  };

  //PDFを新しいウィンドウで開く処理
  const handleOpenPdf = () => {
    if (filePreview) {
      const win = window.open();

      if (win) {
        win.document.write(`
          <html>
            <head>
              <title>PDFファイル</title>
            </head>
            <body>
              <iframe width='100%' height='100%' src='${filePreview}'></iframe>
            </body>
          </html>
        `);
        win.document.close(); // ドキュメントを閉じて描画を開始
      }
    } else {
      alert("PDFファイルが選択されていません。");
    }
  };

  // ファイル選択用のrefを作成
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ファイル選択ボタンが押されたときの処理
  const handleFileSelectClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click(); // ファイルダイアログを表示
    }
  };

  // ファイルのアップロード処理
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      const fileExtension = file.name
        .split(".")
        .pop()
        ?.toLowerCase();

      if (fileExtension === "pdf") {
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setFilePreview(result);
          setFileType("pdf");
          setFileName(file.name);
          localStorage.setItem("filePreview", result);
          localStorage.setItem("fileType", "pdf");
          localStorage.setItem("fileName", file.name);
        };
        reader.readAsDataURL(file); // PDFファイルをData URLとして読み込む
      }
    }
  };

  // リセット処理
  const handleReset = () => {
    if (window.confirm("リセットしますがよろしいですか？")) {
      set案件内容("");
      set案件詳細("");
      set期間("");
      set場所("");
      set勤務時間({
        startHour: "09",
        startMinute: "00",
        endHour: "18",
        endMinute: "00",
      });
      set精算幅({
        startSeisanHaba: "140",
        endSeisanHaba: "180",
      });
      set作業工程("");
      setスキル("");
      set人数("");
      set備考("");
      setMemo1("");
      setMemo2("");
      setMemo3("");
      setMemo4("");
      setFilePreview(null);
      setFileType(null);
      setFileName(null);
      localStorage.clear();
    }
  };

  const handleDownloadPdf = async () => {
    const blob = await pdf(
      <PdfDoc
        案件内容={案件内容}
        案件詳細={案件詳細}
        期間={期間}
        場所={場所}
        勤務時間={勤務時間}
        精算幅={精算幅}
        作業工程={作業工程}
        スキル={スキル}
        人数={人数}
        備考={備考}
        memo1={memo1}
        memo2={memo2}
        memo3={memo3}
        memo4={memo4}
      />
    ).toBlob(); // PDFをBlobとして取得

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "面談シート.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="content-to-pdf">
      <div className="container">
        <h1>面談シート</h1>
        <div className="anken-wrap">
          <div className="row">
            <div>
              <div className="input-wrap">
                <label htmlFor="案件内容">案件内容</label>
                <input
                  type="text"
                  id="案件内容"
                  value={案件内容}
                  onChange={(e) =>
                    handleInputChange(e, set案件内容, "案件内容")
                  }
                />
              </div>
              <div className="input-wrap">
                <label htmlFor="案件詳細">案件詳細</label>
                <textarea
                  id="案件詳細"
                  value={案件詳細}
                  onChange={(e) =>
                    handleInputChange(e, set案件詳細, "案件詳細")
                  }
                />
              </div>
              <div className="input-wrap-row2">
                <div className="input-wrap">
                  <label htmlFor="期間">期間</label>
                  <input
                    type="text"
                    id="期間"
                    value={期間}
                    onChange={(e) => handleInputChange(e, set期間, "期間")}
                  />
                </div>
                <div className="input-wrap">
                  <label htmlFor="場所">場所</label>
                  <input
                    type="text"
                    id="場所"
                    value={場所}
                    onChange={(e) => handleInputChange(e, set場所, "場所")}
                  />
                </div>
              </div>
              <div className="input-wrap-row2">
                <div>
                  <TimeSelector
                    idPrefix="勤務時間"
                    startHour={勤務時間.startHour}
                    startMinute={勤務時間.startMinute}
                    endHour={勤務時間.endHour}
                    endMinute={勤務時間.endMinute}
                    set勤務時間={set勤務時間}
                  />
                </div>
                <div>
                  <SeisanHaba
                    idPrefix="精算幅"
                    startSeisanHaba={精算幅.startSeisanHaba || "140"}
                    endSeisanHaba={精算幅.endSeisanHaba || "180"}
                    set精算幅={set精算幅}
                  />
                </div>
              </div>
              <div className="input-wrap">
                <label htmlFor="作業工程">作業工程</label>
                <input
                  type="text"
                  id="作業工程"
                  value={作業工程}
                  onChange={(e) =>
                    handleInputChange(e, set作業工程, "作業工程")
                  }
                />
              </div>
              <div className="input-wrap">
                <label htmlFor="スキル">スキル</label>
                <textarea
                  id="スキル"
                  value={スキル}
                  onChange={(e) => handleInputChange(e, setスキル, "スキル")}
                />
              </div>
              <div className="input-wrap">
                <label htmlFor="人数">人数</label>
                <input
                  type="text"
                  id="人数"
                  value={人数}
                  onChange={(e) => handleInputChange(e, set人数, "人数")}
                />
              </div>
              <div className="input-wrap">
                <label htmlFor="備考">備考</label>
                <textarea
                  id="備考"
                  value={備考}
                  onChange={(e) => handleInputChange(e, set備考, "備考")}
                />
              </div>
              <div className="input-wrap_s">
                <label style={{ paddingTop: "4px" }}>スキルシート</label>
                <div className="pdf-input">
                  <div className="pdf-input_file">
                    <button className="pdf-btn" onClick={handleFileSelectClick}>
                      ファイルを選択
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      id="file-upload"
                      style={{ display: "none" }} // 非表示のinput
                      accept=".pdf"
                      onChange={handleFileUpload}
                    />
                    {fileName && <p>選択されたファイル: {fileName}</p>}
                  </div>
                  {fileType === "pdf" && filePreview && (
                    <div>
                      <button
                        className="pdf-btn pdf-open"
                        onClick={handleOpenPdf}
                      >
                        PDFを開く
                      </button>
                    </div>
                  )}
                  {fileType !== "pdf" && filePreview && (
                    <p>PDFファイルをアップロードしてください。</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="memo-section">
          <h2>メモ</h2>
          <div className="memo-wrap">
            <label htmlFor="memo1">事前に喋ること</label>
            <textarea
              id="memo1"
              value={memo1}
              onChange={(e) => handleInputChange(e, setMemo1, "memo1")}
            />
          </div>
          <div className="memo-wrap">
            <label htmlFor="memo2">説明で気になったこと</label>
            <textarea
              id="memo2"
              value={memo2}
              onChange={(e) => handleInputChange(e, setMemo2, "memo2")}
            />
          </div>
          <div className="memo-wrap">
            <label htmlFor="memo2">受けた質問</label>
            <textarea
              id="memo3"
              value={memo3}
              onChange={(e) => handleInputChange(e, setMemo3, "memo3")}
            />
          </div>
          <div className="memo-wrap">
            <label htmlFor="memo4">逆質問</label>
            <textarea
              id="memo4"
              value={memo4}
              onChange={(e) => handleInputChange(e, setMemo4, "memo4")}
            />
          </div>
        </div>

        <div className="input-section">
          <button className="btn" onClick={handleReset}>
            リセット
          </button>
          {/* PDFダウンロードボタン */}
          <button className="btn" onClick={handleDownloadPdf}>
            PDF保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
