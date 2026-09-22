<template>
    <v-container fluid class="fill-height align-start">
        <v-row>
            <v-col cols="12" md="8">
                <v-card class="pa-4 text-center" elevation="2" min-height="400">
                    <v-card-title class="text-h6 font-weight-bold px-0 text-left">
                        カタカムナ文字一覧
                    </v-card-title>
                    <v-divider class="mb-4"></v-divider>
                    <div class="d-flex fill-height mt-4" style="background-color: gray;">
                        <svg ref="svgRef" :width="svgw" :height="svgh" :viewBox="viewBox"
                            style="background-color: white;">
                            <template v-for="p in points">
                                <use :href="p.href" :x="p.x" :y="p.y" :height="size" :width="size" class="icon-style" />
                                <text :x="p.tx" :y="p.ty">{{ katakana[p.id] }}</text>
                            </template>
                        </svg>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="pa-4" elevation="2">
                    <v-card-title class="text-h6 font-weight-bold px-0">
                        🎨 設定
                    </v-card-title>
                    <v-divider class="mb-4"></v-divider>
                    <div class="text-caption mb-1">画像サイズ(W): {{ svgw }}</div>
                    <v-slider v-model="svgw" :min="100" :max="700" step="10" thumb-label color="primary"
                        @update:modelValue="on_click" />
                    <div class="text-caption mb-1">画像サイズ(H): {{ svgh }}</div>
                    <v-slider v-model="svgh" :min="100" :max="700" step="10" thumb-label color="primary"
                        @update:modelValue="on_click" />
                    <div class="text-caption mb-1">文字サイズ: {{ size.toFixed(0) }}</div>
                    <v-slider v-model="size" :min="10" :max="100" step="1" thumb-label color="primary"
                        @update:modelValue="on_click" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { type Point, katakana, katakanaIdx, svgpath } from '@/lib/const';
import { useApplicationStore } from '@/stores/applicationStore';

const app = useApplicationStore();

const points = ref<Point[]>([]);
const size = ref(30);
const svgw = ref(340);
const svgh = ref(600);
const viewBox = computed(() => {
    return "0 -40 " + svgw.value + " " + svgh.value;
});

onMounted(() => {
    points.value = getpoints();
});

const on_click = () => {
    points.value = getpoints();
}

const getpoints = () => {
    let list: Point[] = [];
    let x = 0;
    let y = 0;
    let tx = 10;
    let ty = 0;
    let count = 0;
    for (let i = 0; i < 50; i++) {
        const id = i
        const key = katakanaIdx.get(katakana[i]) || '00';
        const href = `${svgpath}#k${key}`
        list.push({ id: id, x: x, y: y, tx: tx, ty: ty, yomi: katakana[i], key: key, href: href });
        if (++count < 5) {
            x += size.value * 1.5 + 10;
            tx += size.value * 1.5 + 10;
        } else {
            count = 0;
            x = 0;
            tx = 10;
            y += size.value * 1.5 + 10;
            ty += size.value * 1.5 + 10;
        }
    }
    return list;
}
</script>
<style scoped>
div.svg-container {
    display: flex;
    justify-content: center;
    background: #f9f9f9;
    padding: 20px;
}

div.svg-container svg {
    border: 2px solid lightgray;
}
</style>