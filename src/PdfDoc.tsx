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
    backgroundColor: "FFFFFF",
    padding: 20,
    margin: 0,
    fontFamily: "NotoSansJP",
  },
  section: {
    marginBottom: 10,
    padding: 10,
    borderBottom: "1px solid black",
    backgroundColor: "#FFFFFF",
    fontFamily: "NotoSansJP",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "NotoSansJP",
  },
  content: {
    fontSize: 12,
    fontFamily: "NotoSansJP",
  },
});

Font.register({
  family: "NotoSansJP",
  fonts: [
    {
      src: "src/assets/fonts/NotoSansJP-Bold.ttf",
    },
    {
      src: "src/assets/fonts/NotoSansJP-Regular.ttf",
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
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>案件内容</Text>
          <Text style={styles.content}>{案件内容}</Text>
          <Text style={styles.title}>案件詳細</Text>
          <Text style={styles.content}>{案件詳細}</Text>
          <Text style={styles.title}>期間</Text>
          <Text style={styles.content}>{期間}</Text>
          <Text style={styles.title}>場所</Text>
          <Text style={styles.content}>{場所}</Text>
          <Text style={styles.title}>勤務時間</Text>
          <Text style={styles.content}>
            {勤務時間.startHour}:{勤務時間.startMinute} 〜 {勤務時間.endHour}:
            {勤務時間.endMinute}
          </Text>
          <Text style={styles.title}>精算幅</Text>
          <Text style={styles.content}>
            {精算幅.startSeisanHaba} ～ {精算幅.endSeisanHaba}
          </Text>
          <Text style={styles.title}>作業工程</Text>
          <Text style={styles.content}>{作業工程}</Text>
          <Text style={styles.title}>スキル</Text>
          <Text style={styles.content}>{スキル}</Text>
          <Text style={styles.title}>人数</Text>
          <Text style={styles.content}>{人数}</Text>
          <Text style={styles.title}>備考</Text>
          <Text style={styles.content}>{備考}</Text>
          <Text style={styles.title}>事前に喋ること</Text>
          <Text style={styles.content}>{memo1}</Text>
          <Text style={styles.title}>説明で気になったこと</Text>
          <Text style={styles.content}>{memo2}</Text>
          <Text style={styles.title}>受けた質問</Text>
          <Text style={styles.content}>{memo3}</Text>
          <Text style={styles.title}>逆質問</Text>
          <Text style={styles.content}>{memo4}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDoc;
