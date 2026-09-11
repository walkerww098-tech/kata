<template>
    <div class="page">
        カタカムナ文字一覧
        <div class="svg-container">
            <svg width="400" height="640" viewBox="0 -20 400 640">
                <template v-for="p in points">
                    <use :href="p.href" :x="p.x" :y="p.y" :height="size" :width="size" class="icon-style" />
                    <text :x="p.tx" :y="p.ty">{{ katakana[p.id - 1] }}</text>
                </template>
            </svg>
        </div>
    </div>
    <v-navigation-drawer color="grey-lighten-1" location="right" width="250" permanent>
        文字サイズ : {{ size.toFixed(0) }}
        <button @click="onclick">描画</button>
        <v-slider v-model="size" 
                            :min="10" :max="100"
                            @update:modelValue="onclick" style="width: 200px;"></v-slider>
    </v-navigation-drawer>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { type Point, katakana, katakanaIdx, svgpath } from '@/lib/const';

const points = ref<Point[]>([]);
const size = ref(40);

onMounted(() => {
    points.value = getpoints();
});

const onclick = () => {
    points.value = getpoints();
}

const getpoints = () => {
    let list: Point[] = [];
    let x = 0;
    let y = 0;
    let tx = 10;
    let ty = 0;
    let count = 0;
    for (let i = 1; i <= 50; i++) {
        const id = i
        const key = katakanaIdx.get(katakana[i]) || '00';
        const href = `${svgpath}#k${key}`
        list.push({ id: id, x: x, y: y, tx: tx, ty: ty, yomi: katakana[i], key: key, href: href });
        if (++count < 5) {
            x += size.value *1.5 + 10;
            tx += size.value *1.5 + 10;
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