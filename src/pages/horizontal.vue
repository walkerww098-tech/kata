<template>
    <div class="page">
        <div>
            カタカムナ 横書き
        </div>
        <div class="hor-container">
            <template v-for="i in imgs">
                <img :src="i" :height="size" />
            </template>
        </div>
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

const selection:string[]=[
    'ヒフミヨイ マワリテメクル ムナヤコト アウノスヘシレ カタチサキ',
    'ソラニモロケセ ユヱヌオヲ ハエツヰネ ホンカタカムナ',
    'マカタマノ アマノミナカヌシ タカミムスヒ カムミムスヒ ミスマルノタマ'
];
const line = ref(selection[0]);
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
        // return "/src/assets/katakamuna-k" + (katakanaIdx.get(c) ?? "00") + ".svg";
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
</style>