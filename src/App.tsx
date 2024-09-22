import { useState, useEffect } from "react";
import "./App.css";

const App: React.FC = () => {
  const [案件内容, set案件内容] = useState<string>("");
  const [memo1, setMemo1] = useState<string>("");
  const [memo2, setMemo2] = useState<string>("");
  const [memo3, setMemo3] = useState<string>("");
  const [memo4, setMemo4] = useState<string>("");
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // ローカルストレージ
  useEffect(() => {
    set案件内容(localStorage.getItem("案件内容") || "");
    setMemo1(localStorage.getItem("memo1") || "");
    setMemo2(localStorage.getItem("memo2") || "");
    setMemo3(localStorage.getItem("memo3") || "");
    setMemo4(localStorage.getItem("memo4") || "");
    setPdfPreview(localStorage.getItem("pdfPreview"));
  }, []);

  // PDFファイルのアップロード処理
  const handlePDFUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPdfPreview(result);
        localStorage.setItem("pdfPreview", result);
      };
      reader.readAsDataURL(file);
    }
  };

  // リセット処理
  const handleReset = () => {
    if (window.confirm("リセットしますがよろしいですか？")) {
      set案件内容("");
      setMemo1("");
      setMemo2("");
      setMemo3("");
      setMemo4("");
      localStorage.removeItem("案件内容");
      localStorage.removeItem("memo1");
      localStorage.removeItem("memo2");
      localStorage.removeItem("memo3");
      localStorage.removeItem("memo4");
    }
  };

  // 保存処理
  const handleSave = () => {
    localStorage.setItem("案件内容", 案件内容);
    localStorage.setItem("memo1", memo1);
    localStorage.setItem("memo2", memo2);
    localStorage.setItem("memo3", memo3);
    localStorage.setItem("memo4", memo4);
    alert("データを保存しました");
  };

  return (
    <div className="container">
      <h1>面談シート</h1>
      <div className="row">
        <div>
          <label htmlFor="案件内容">案件内容:</label>
          <input
            type="text"
            id="案件内容"
            value={案件内容}
            onChange={(e) => set案件内容(e.target.value)}
          />
        </div>
        <div>
          <label>スキルシート:</label>
          <div id="pdf-container">
            <input type="file" onChange={handlePDFUpload} />
            {pdfPreview && (
              <img
                id="pdf-preview"
                src={pdfPreview}
                alt="PDF プレビュー"
                onClick={() => setIsModalOpen(true)}
                style={{ maxWidth: "200px", cursor: "pointer" }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="memo-section">
        <h3>メモ</h3>
        <div>
          <label htmlFor="memo1">事前に喋ること:</label>
          <textarea
            id="memo1"
            value={memo1}
            onChange={(e) => setMemo1(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="memo2">説明で気になったこと:</label>
          <textarea
            id="memo2"
            value={memo2}
            onChange={(e) => setMemo2(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="memo2">受けた質問:</label>
          <textarea
            id="memo3"
            value={memo3}
            onChange={(e) => setMemo3(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="memo4">逆質問:</label>
          <textarea
            id="memo4"
            value={memo4}
            onChange={(e) => setMemo4(e.target.value)}
          />
        </div>
      </div>

      <div className="input-section">
        <button onClick={handleReset}>リセット</button>
        <button onClick={handleSave}>保存</button>
      </div>

      {/* モーダル */}
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content">
            <img src={pdfPreview || ""} alt="Modal PDF" />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
