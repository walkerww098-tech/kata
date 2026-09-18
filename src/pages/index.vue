<template>
    <v-container fluid class="fill-height align-start">
        <v-row>
            <v-col cols="12" md="8">
                <v-card class="pa-4 text-center" elevation="2" min-height="400">
                    <v-card-title class="text-h6 font-weight-bold px-0 text-left">
                        画像
                    </v-card-title>
                    <v-divider class="mb-4"></v-divider>
                    <div class="d-flex justify-center align-center fill-height mt-4"
                        style="background-color: lightgray;">
                        <svg ref="svgRef" :width="svgsize" :height="svgsize" :viewBox="viewBox">
                            <rect :x="svgsize / -2" :y="svgsize / -2" :width="svgsize" :height="svgsize" fill="white" />
                            <use :href="centerSymbol.src" :x="0 - (size * 3 / 2)" :y="0 - (size * 3 / 2)"
                                :width="size * 3" :height="size * 3" class="icon-style" />
                            <template v-for="p in points">
                                <text v-if="display_kana" :x="p.tx - 3" :y="p.ty + 3" font-size="x-small">{{ p.yomi ||
                                    'ー' }}</text>
                                <use :href="p.href" :x="p.x - size / 2" :y="p.y - size / 2" :width="size" :height="size"
                                    class="icon-style" />
                            </template>
                        </svg>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" md="4">
                <v-card class="pa-4" elevation="2">
                    <v-card-title class="text-h6 font-weight-bold px-0">
                        🎨 パラメーター
                    </v-card-title>
                    <v-divider class="mb-4"></v-divider>
                    <div class="text-caption mb-1">テキスト</div>
                    <v-combobox :items="selection" item-title="text" item-value="text" v-model="selectedLine"
                        @update:model-value="on_select" />
                    <div class="text-caption mb-1">中心図形 : 
                        <select v-model="centerSymbol">
                            <option v-for="option in centerSymbols" :key="option.value" :value="option">
                                {{ option.label }}
                            </option>
                        </select>
                    </div>
                    <label>
                        <input type="checkbox" v-model="display_kana">カナ表示
                    </label>
                    <div class="text-caption mb-1">画像サイズ: {{ svgsize }}</div>
                    <v-slider v-model="svgsize" :min="100" :max="1000" step="10" thumb-label color="primary"
                        @update:modelValue="on_click" />
                    <div class="text-caption mb-1">サイズ : {{ size.toFixed(0) }}</div>
                    <v-slider v-model="size" :min="8" :max="48" step="1" thumb-label color="primary"
                        @update:modelValue="on_click" />
                    <div class="text-caption mb-1">分割数 : {{ devide_n.toFixed(0) }}</div>
                    <v-slider v-model="devide_n" :min="12" :max="128" step="1" thumb-label color="primary"
                        @update:modelValue="on_select" />
                    <div class="text-caption mb-1">先頭位置 : {{ radius_init.toFixed(0) }}</div>
                    <v-slider v-model="radius_init" :min="20" :max="80" step="1" thumb-label color="primary"
                        @update:modelValue="on_select" />
                    <div class="text-caption mb-1">広がり1 : {{ radiusp_step.toFixed(2) }}</div>
                    <v-slider v-model="radiusp_step" :min="0.01" :max="1" step="0.01" thumb-label color="primary"
                        @update:modelValue="on_select" />
                    <div class="text-caption mb-1">広がり2 : {{ radiuspp_step.toFixed(3) }}</div>
                    <v-slider v-model="radiuspp_step" :min="0.001" :max="0.1" step="0.001" thumb-label color="primary"
                        @update:modelValue="on_select" />
                    <v-row density="compact" class="ma-0 pa-0">
                        <v-col cols="1"></v-col>
                        <v-col cols="5">
                            <v-btn @click="on_click" color="primary" block>描画</v-btn>
                        </v-col>
                        <v-col cols="5">
                            <v-btn @click="download" color="secondary" block>ダウンロード</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { type Point, katakana, katakanaIdx, svgpath } from '@/lib/const';
import { useApplicationStore } from '@/stores/applicationStore';

const app = useApplicationStore();

const selection: string[] = [
//    'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤヰユヱヨラリルレロワヰヲヱン',
    'ヒフミヨイマワリテメクルムナヤコトアウノスヘシレカタチサキ',
    'ソラニモロケセユヱヌオヲハエツヰネホンカタカムナ',
    'マカタマノアマノミナカヌシタカミムスヒカムミムスヒミスマルノタマ'
];
const selectedLine = ref(selection[0]);

const centerSymbols: any[] = [
    { key: '1', value: 'c01', label: 'ヤタノカカミ', src: './assets/katakamuna.svg#c01' },
    { key: '2', value: 'c02', label: 'フトマニ', src: './assets/katakamuna.svg#c02' },
    { key: '3', value: 'c03', label: 'ミクマリ', src: './assets/katakamuna.svg#c03' }
];
const centerSymbol = ref(centerSymbols[0]);

const svgsize = ref(500);
const viewBox = computed(() => {
    return "-" + svgsize.value / 2 + " -" + svgsize.value / 2 +
        " " + svgsize.value + " " + svgsize.value;
});

const size = ref(20);
const devide_n = ref(24);
const points = ref<Point[]>([]);
const radius_init = ref(40);
const radiusp_step = ref(0.1);
const radiuspp_step = ref(0.01);
const display_kana = ref(true);
const svgRef = ref<SVGGraphicsElement | null>(null)

onMounted(() => {
    points.value = getpoints();
});

const on_select = () => {
    const line: string = selectedLine.value;
    const idx = selection.findIndex(x => x === line);
    // ３番目(idx 2)はミクマリ、その他はとりあえずヤタノカカミとしておく。
    if (idx == 2)
        centerSymbol.value = centerSymbols[2];
    else
        centerSymbol.value = centerSymbols[0];
    points.value = getpoints();
}

const on_click = () => {
    points.value = getpoints();
}

const getpoints = () => {
    let list: Point[] = [];
    const div = devide_n.value;
    const angle_step = 360 / div;
    const text_offset = 20;
    let radius = radius_init.value;
    let radiusp = 0;
    let radiuspp = 0;

    const line: string = selectedLine.value;
    for (let i = 0; i < line.length; i++) {
        const degree = (i % div) * angle_step - 90;
        const angle = degree * (Math.PI / 180);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const tx = (radius + text_offset) * Math.cos(angle);
        const ty = (radius + text_offset) * Math.sin(angle);

        const id = i;
        const key = katakanaIdx.get(line[i]) || '00';
        const href = `${svgpath}#k${key}`

        radiuspp += radiuspp_step.value;
        radiusp += (radiusp_step.value + radiuspp);
        radius += radiusp;
        if (i < 2) {
            radius += (radiusp + 10);
        } else if (i < 3) {
            // radius += (radiusp + 10);
        }
        list.push({ id: id, x: x, y: y, tx: tx, ty: ty, yomi: line[i], key: key, href: href });
    }
    return list;
};

const download = async () => {
    if (!svgRef.value)
        return
    const clonedSvg = svgRef.value.cloneNode(true) as SVGGraphicsElement;
    const useElements = clonedSvg.querySelectorAll('use')
    if (useElements.length === 0)
        return
    try {
        const firstHref = useElements[0].getAttribute('href') || '';
        const svgUrl = firstHref.split('#')[0];
        if (!svgUrl) {
            console.error('SVGファイルのパスが取得できませんでした。');
            return;
        }
        const response = await fetch(svgUrl);
        const svgText = await response.text();
        const parser = new DOMParser();
        const externalSvgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const style = externalSvgDoc.getElementsByTagName("style")[0];
        if (style) clonedSvg.prepend(style);
        useElements.forEach((useEl) => {
            const href = useEl.getAttribute('href') || '';
            const id = href.split('#')[1];
            if (!id)
                return;
            const sourceElement = externalSvgDoc.getElementById(id);
            if (sourceElement) {
                const importedContent = sourceElement.cloneNode(true) as Element;
                let finalContent: Element = importedContent;
                // 元のシンボルの本来のサイズ（viewBox）を取得する（デフォルトは100と仮定）
                let originalWidth = 100;
                let originalHeight = 100;
                const viewBox = sourceElement.getAttribute('viewBox');
                if (viewBox) {
                    const parts = viewBox.split(' ');
                    if (parts.length === 4) {
                        originalWidth = parseFloat(parts[2]);
                        originalHeight = parseFloat(parts[3]);
                    }
                } else {
                    // viewBoxがない場合は width/height 属性を見てみる
                    const w = sourceElement.getAttribute('width');
                    const h = sourceElement.getAttribute('height');
                    if (w) originalWidth = parseFloat(w);
                    if (h) originalHeight = parseFloat(h);
                }
                // シンボルをgタグへ変換
                if (importedContent.tagName.toLowerCase() === 'symbol') {
                    const g = document.createElementNS('http://w3.org', 'g');
                    while (importedContent.firstChild) {
                        // シンボルの内容をgタグへ
                        g.appendChild(importedContent.firstChild);
                    }
                    finalContent = g;
                }
                // ラッパーとなる <g> タグを作成
                const group = document.createElementNS('http://w3.org', 'g');

                // <use> が持っていた位置 (x, y) と サイズ (width, height) を取得
                const x = parseFloat(useEl.getAttribute('x') || '0');
                const y = parseFloat(useEl.getAttribute('y') || '0');
                const width = parseFloat(useEl.getAttribute('width') || '0');
                const height = parseFloat(useEl.getAttribute('height') || '0');

                // 本来のサイズからどれくらい拡大縮小すべきか倍率（scale）を計算
                const scaleX = width > 0 ? width / originalWidth : 1;
                const scaleY = height > 0 ? height / originalHeight : 1;

                // 位置の移動（translate）と拡大縮小（scale）をまとめて適用
                // scaleだけだと位置まで拡大されてしまうので、先に移動させてから縮尺を変えます
                group.setAttribute('transform', `translate(${x}, ${y}) scale(${scaleX}, ${scaleY})`);

                // class
                if (useEl.hasAttribute('class')) {
                    group.setAttribute('class', useEl.getAttribute('class') ?? '');
                }

                // インラインスタイル (style="..." )
                if (useEl.hasAttribute('style')) {
                    group.setAttribute('style', useEl.getAttribute('style') ?? '');
                }

                /*
                // VueのScoped CSS用属性（data-v-xxxxxx）
                Array.from(useEl.attributes).forEach(attr => {
                    if (attr.name.startsWith('data-v-')) {
                        group.setAttribute(attr.name, attr.value);
                        // 中身の要素（pathなど）にも念のため波及させてスタイルを当てる
                        finalContent.setAttribute(attr.name, attr.value);
                        Array.from(finalContent.querySelectorAll('*')).forEach(child => {
                            child.setAttribute(attr.name, attr.value);
                        });
                    }
                });
                */
                group.appendChild(finalContent);
                if (useEl.parentNode) {
                    useEl.parentNode.replaceChild(group, useEl);
                }
            }
        });
    } catch (error) {
        console.error('外部SVGファイルの取得・展開に失敗しました:', error);
    }

    // XML文字列に変換してダウンロード
    const serializer = new XMLSerializer()
    let svgString = serializer.serializeToString(clonedSvg)

    if (!svgString.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
        svgString = svgString.replace(/^<svg/, '<svg xmlns="http://w3.org"');
    }

    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `katakamuna.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}
</script>
<style scoped>
div.page {
    border: 1px solid blue;
}

div.svg-container {
    display: flex;
    justify-content: center;
    background: #f9f9f9;
    padding: 20px;
}

.svg-container {
    display: flex;
    justify-content: center;
    background: #f9f9f9;
    padding: 20px;
}

div.settings {
    font-size: x-small;

}
</style>