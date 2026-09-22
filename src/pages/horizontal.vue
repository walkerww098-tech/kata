<template>
    <v-container fluid class="fill-height align-start">
        <v-row>
            <v-col cols="12" md="8">
                <v-card class="pa-4 text-center" elevation="2" min-height="400">
                    <v-card-title class="text-h6 font-weight-bold px-0 text-left">
                        <v-combobox :items="selection" v-model="selectedLine" @update:model-value="on_select" />
                    </v-card-title>
                    <v-divider class="mb-4"></v-divider>
                    <div class="d-flex justify-center align-center fill-height mt-4"
                        style="background-color: lightgray;">
                        <div class="hor-container">
                            <template v-for="i in imgs">
                                <img :src="i.src" :height="size" :alt="i.alt" :title="i.title" />
                            </template>
                        </div>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" md="4">
                <v-card class="pa-4" elevation="2">
                    <v-card-title class="text-h6 font-weight-bold px-0">
                        🎨 設定
                    </v-card-title>
                    <v-divider class="mb-4"></v-divider>
                    <div class="text-caption mb-1">文字サイズ: {{ size.toFixed(0) }}</div>
                    <v-slider v-model="size" :min="10" :max="100" step="1" thumb-label color="primary"
                        @update:modelValue="on_click" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { type Point, katakana, katakanaIdx, katakanaOnly, svgpath } from '@/lib/const';

const selection: string[] = [
    'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤヰユヱヨラリルレロワヰヲヱン',
    'ヒフミヨイマワリテメクルムナヤコトアウノスヘシレカタチサキ',
    'ソラニモロケセユヱヌオヲハエツヰネホンカタカムナ',
    'マカタマノアマノミナカヌシタカミムスヒカムミムスヒミスマルノタマ'
];
const selectedLine = ref(selection[0]);
const size = ref(60);
const imgs = ref<{ src: string, alt: string, title: string }[]>([]);

onMounted(() => {
    getImgs();
});

const on_click = () => {
    getImgs();
}

const on_select = () => {
    getImgs();
}

const getImgs = () => {
    const line: string = katakanaOnly(selectedLine.value);
    imgs.value = [...line].map(c => {
        const src = "assets/katakamuna-k" + (katakanaIdx.get(c) ?? "00") + ".svg";
        return { src: src, alt: c, title: c };
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