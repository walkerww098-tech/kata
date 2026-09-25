// http://host/直下ではなく、http://host/kata/のように配置するばあい
// 1. nginxを使用する場合下記を設定
// location /kata/ {
//        try_files $uri $uri/ /kata/index.html;
// }
// 2. vite.config.mts にbaseを追記
// export default defineConfig({
//    base: '/kata/',
// 3. /kataを含めるか、相対パスで使用する
//export const svgpath = "/kata/assets/katakamuna.svg";
export const svgpath = "assets/katakamuna.svg";

export interface Point {
    id: number;
    x: number;
    y: number;
    tx: number;
    ty: number;
    yomi: string;
    key: string;
    href: string;
}

export const katakanaIdx = new Map<string, string>([
    ['ア', '01'],
    ['イ', '02'],
    ['ウ', '03'],
    ['エ', '04'],
    ['オ', '05'],
    ['カ', '06'],
    ['キ', '07'],
    ['ク', '08'],
    ['ケ', '09'],
    ['コ', '10'],
    ['サ', '11'],
    ['シ', '12'],
    ['ス', '13'],
    ['セ', '14'],
    ['ソ', '15'],
    ['タ', '16'],
    ['チ', '17'],
    ['ツ', '18'],
    ['テ', '19'],
    ['ト', '20'],
    ['ナ', '21'],
    ['ニ', '22'],
    ['ヌ', '23'],
    ['ネ', '24'],
    ['ノ', '25'],
    ['ハ', '26'],
    ['ヒ', '27'],
    ['フ', '28'],
    ['ヘ', '29'],
    ['ホ', '30'],
    ['マ', '31'],
    ['ミ', '32'],
    ['ム', '33'],
    ['メ', '34'],
    ['モ', '35'],
    ['ヤ', '36'],
    ['ヰ', '37'],
    ['ユ', '38'],
    ['ヱ', '39'],
    ['ヨ', '40'],
    ['ラ', '41'],
    ['リ', '42'],
    ['ル', '43'],
    ['レ', '44'],
    ['ロ', '45'],
    ['ワ', '46'],
    ['ヰ', '47'],
    ['ヲ', '48'],
    ['ヱ', '49'],
    ['ン', '50'],
]);
//export const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤヰユヱヨラリルレロワヰヲヱン";
export const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤヰユヱヨラリルレロワ　ヲ　ン";

// 濁点・半濁点付きのカタカナを清音に変換するマップ
const dakuonMap = {
    'ガ': 'カ', 'ギ': 'キ', 'グ': 'ク', 'ゲ': 'ケ', 'ゴ': 'コ',
    'ザ': 'サ', 'ジ': 'シ', 'ズ': 'ス', 'ゼ': 'セ', 'ゾ': 'ソ',
    'ダ': 'タ', 'ヂ': 'チ', 'ヅ': 'ツ', 'デ': 'テ', 'ド': 'ト',
    'バ': 'ハ', 'ビ': 'ヒ', 'ブ': 'フ', 'ベ': 'ヘ', 'ボ': 'ホ',
    'パ': 'ハ', 'ピ': 'ヒ', 'プ': 'フ', 'ペ': 'ヘ', 'ポ': 'ホ',
    'ヴ': 'ウ', 'ヷ': 'ワ', 'ヺ': 'ヲ'
};

// 小文字のカタカナを大文字に変換するマップ
const komojiMap = {
    'ァ': 'ア', 'ィ': 'イ', 'ゥ': 'ウ', 'ェ': 'エ', 'ォ': 'オ',
    'ッ': 'ツ',
    'ャ': 'ヤ', 'ュ': 'ユ', 'ョ': 'ヨ',
    'ヮ': 'ワ', 'ヶ': 'ケ', 'ヵ': 'カ'
};

export const katakanaOnly = (src: string): string => {
    // まず「ウ」＋「濁点」のような結合文字を「ヴ」などの1文字に統合（正規化）
    let text: string = src.normalize('NFC');
    // 濁点・半濁点付きの文字を清音に1文字ずつ置換
    for (const [key, value] of Object.entries(dakuonMap)) {
        text = text.replaceAll(key, value);
    }
    // 次に小文字を大文字化（例: ァ → ア、ッ → ツ）
    for (const [key, value] of Object.entries(komojiMap)) {
        text = text.replaceAll(key, value);
    }
    // 後付けの濁点・半濁点記号単体（ﾞ ﾟ ﾞ ﾟ）や、カタカナ以外の文字を最終的に除去
    text = text
        .replace(/[\u3099\u309A\uFF9E\uFF9F]/g, '')
        .replace(/[^アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン　]/g, '');
    return text;
}
