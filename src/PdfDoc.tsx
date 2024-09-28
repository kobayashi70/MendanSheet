import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// PDFのスタイル定義
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
    fontSize: 10,
    fontFamily: "NotoSansJP",
  },
  section: {},
  header: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  date: { textAlign: "right", marginBottom: 12 },
  row: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    marginBottom: -1,
  },
  title: {
    width: "30%", // 2:8 または 3:7 の比率に変更可能
    fontSize: 12,
    fontFamily: "NotoSansJP",
    fontWeight: "bold",
    paddingLeft: 4,
    borderRightWidth: 1,
    borderRightColor: "black",
    borderRightStyle: "solid",
  },
  content: {
    width: "70%", // 残りの割合を使用
    fontFamily: "NotoSansJP",
    paddingLeft: 4,
  },
  memoContent: {
    width: "70%",
    fontFamily: "NotoSansJP",
    paddingLeft: 4,
    minHeight: 80, // メモ部分の高さを他よりも高く設定
  },
});

// フォントの登録
Font.register({
  family: "NotoSansJP",
  fonts: [
    {
      src: "/NotoSansJP-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/NotoSansJP-Regular.ttf",
    },
  ],
});

interface 勤務時間Type {
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
}

interface 精算幅Type {
  startSeisanHaba: string;
  endSeisanHaba: string;
}

// Propsの型定義
interface PdfDocProps {
  案件内容: string;
  案件詳細: string;
  期間: string;
  場所: string;
  勤務時間: 勤務時間Type;
  精算幅: 精算幅Type;
  作業工程: string;
  スキル: string;
  人数: string;
  備考: string;
  memo1: string;
  memo2: string;
  memo3: string;
  memo4: string;
}

//PDFドキュメント用のコンポーネント
const PdfDoc: React.FC<PdfDocProps> = ({
  案件内容,
  案件詳細,
  期間,
  場所,
  勤務時間,
  精算幅,
  作業工程,
  スキル,
  人数,
  備考,
  memo1,
  memo2,
  memo3,
  memo4,
}) => {
  // 現在の日付を取得
  const currentDate = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.header}>面談シート</Text>
        </View>
        <View>
          <Text style={styles.date}>発行日 {currentDate}</Text>
        </View>

        <View style={styles.section}>
          {/* 横並びのセクション */}
          <View style={styles.row}>
            <Text style={styles.title}>案件内容</Text>
            <Text style={styles.content}>{案件内容}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.title}>案件詳細</Text>
            <Text style={styles.content}>{案件詳細}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.title}>期間</Text>
            <Text style={styles.content}>{期間}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.title}>場所</Text>
            <Text style={styles.content}>{場所}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.title}>勤務時間</Text>
            <Text style={styles.content}>
              {勤務時間.startHour}:{勤務時間.startMinute} 〜 {勤務時間.endHour}:
              {勤務時間.endMinute}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.title}>精算幅</Text>
            <Text style={styles.content}>
              {精算幅.startSeisanHaba} ～ {精算幅.endSeisanHaba}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.title}>作業工程</Text>
            <Text style={styles.content}>{作業工程}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.title}>スキル</Text>
            <Text style={styles.content}>{スキル}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.title}>人数</Text>
            <Text style={styles.content}>{人数}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.title}>備考</Text>
            <Text style={styles.content}>{備考}</Text>
          </View>

          {/* メモ部分の高さを高くする */}
          <View style={styles.row}>
            <Text style={styles.title}>事前に喋ること</Text>
            <Text style={styles.memoContent}>{memo1}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.title}>説明で気になったこと</Text>
            <Text style={styles.memoContent}>{memo2}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.title}>受けた質問</Text>
            <Text style={styles.memoContent}>{memo3}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.title}>逆質問</Text>
            <Text style={styles.memoContent}>{memo4}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDoc;
