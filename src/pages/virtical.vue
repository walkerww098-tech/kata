<template>
    <div class="page">
        <div>
            カタカムナ 縦書き
        </div>
        <v-container class="d-flex justify-center" v-if="imgs.length > 0">
            <v-sheet class="image-vertical-container pa-4" elevation="5">

                <template v-for="i in imgs">
                    <img :src="i" :height="size" />
                </template>
            </v-sheet>
        </v-container>
    </div>
    <v-navigation-drawer color="grey-lighten-1" location="right" width="250" permanent>
        テキスト
        <v-combobox :items="selection" v-model="line" @update:model-value="onclick" />
        <br />
        文字サイズ : {{ size.toFixed(0) }}
        <button @click="onclick">描画</button>
        <v-slider v-model="size" :min="10" style="width: 200px;"></v-slider>
    </v-navigation-drawer>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { type Point, katakana, katakanaIdx, svgpath } from '@/lib/const';

const selection: string[] = [
    'ヒフミヨイ マワリテメクル ムナヤコト アウノスヘシレ カタチサキ',
    'ソラニモロケセ ユヱヌオヲ ハエツヰネ ホンカタカムナ',
    'マカタマノ アマノミナカヌシ タカミムスヒ カムミムスヒ ミスマルノタマ'
];
const line = ref(selection[0]);
//const line = ref('ヒフミヨイマワリテメクルムナヤコト');
const size = ref(60);
const imgs = ref<string[]>([]);

onMounted(() => {
    getImgs();
});

const onclick = () => {
    getImgs();
}

const getImgs = () => {
    imgs.value = [...line.value].map(c => {
        //return "/src/assets/katakamuna-k" + (katakanaIdx.get(c) ?? "00") + ".svg";
        return "assets/katakamuna-k" + (katakanaIdx.get(c) ?? "00") + ".svg";
    });
}
</script>
<style scoped>
div.hor-container {
    width: 500px;
    float: left;
    background: #f9f9f9;
}

div.svg-container {
    width: 400px;
    display: flex;
    justify-content: center;
    background: #f9f9f9;
    padding: 20px;
}

div.svg-container svg {
    border: 2px solid lightgray;
}

.vertical-text {
    writing-mode: vertical-rl;
    /* 右から左への縦書き */
    text-orientation: upright;
    /* 英数字などを直立させる場合 */
    height: 300px;
    /* 高さを指定して段落を折り返す */
}

.image-vertical-container {
    writing-mode: vertical-rl;
    height: 380px;
    background-color: #f5f5f5;
}

.image-vertical-container img {
    display: inline-block;
}
</style>