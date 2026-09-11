<template>
    <div class="page">
        カタカムナ
        <div class="svg-container">
            <svg width="600" height="600" viewBox="-300 -300 600 600" style="border: 1px solid gray;">
                <use :href="svgpath + '#kcn'" :x="0 - (size * 3 / 2)" :y="0 - (size * 3 / 2)" :width="size * 3"
                    :height="size * 3" class="icon-style" />
                <template v-for="p in points">
                    <text v-if="display_kana" :x="p.tx - 3" :y="p.ty + 3" font-size="x-small">{{ p.yomi || 'ー' }}</text>
                    <use :href="p.href" :x="p.x - size / 2" :y="p.y - size / 2" :width="size" :height="size"
                        class="icon-style" />
                </template>
            </svg>
        </div>
    </div>
    <v-navigation-drawer color="grey-lighten-1" location="right" width="250" permanent>
        テキスト<br />
        <div class="settings">
            <v-combobox :items="selection" v-model="line" @update:model-value="on_select" />
            <label>
                <input type="checkbox" v-model="display_kana">カナ表示
            </label>

            <v-row align="center" cols="auto" density="compact" class="ma-0 pa-0">
                <v-col cols="3">
            サイズ
                </v-col>
                <v-col cols="2">
                    {{ size.toFixed(0) }}
                </v-col>
                <v-col>
                    <v-slider v-model="size" :min="8" :max="48" @update:model-value="on_select" hide-details
                        style="width: 140px;" />
                </v-col>
            </v-row>
            <v-row align="center" cols="auto" density="compact" class="ma-0 pa-0">
                <v-col cols="3">
                    分割数
                </v-col>
                <v-col cols="2">
                    {{ devide_n.toFixed(0) }}
                </v-col>
                <v-col>
                    <v-slider v-model="devide_n" :min="12" :max="128" @update:model-value="on_select" hide-details
                        style="width: 140px;" />
                </v-col>
            </v-row>
            <v-row align="center" cols="auto" density="compact" class="ma-0 pa-0">
                <v-col cols="3">
                    先頭位置
                </v-col>
                <v-col cols="2">
                    {{ radius_init.toFixed(0) }}
                </v-col>
                <v-col>
                    <v-slider v-model="radius_init" @update:model-value="on_select" hide-details
                        style="width: 140px;" />
                </v-col>
            </v-row>
            <v-row align="center" cols="auto" density="compact" class="ma-0 pa-0">
                <v-col cols="3">
                    広がり1
                </v-col>
                <v-col cols="2">
                    {{ radiusp_step.toFixed(2) }}
                </v-col>
                <v-col>
                    <v-slider v-model="radiusp_step" :max="1" :min="0.01" :step="0.01" @update:model-value="on_select"
                        hide-details style="width: 140px;" />
                </v-col>
            </v-row>
            <v-row align="center" cols="auto" density="compact" class="ma-0 pa-0">
                <v-col cols="3">
                    広がり2
                </v-col>
                <v-col cols="2">
                    {{ radiuspp_step.toFixed(3) }}
                </v-col>
                <v-col>
                    <v-slider v-model="radiuspp_step" :max="0.1" :min="0.001" :step="0.001"
                        @update:model-value="on_select" hide-details style="width: 140px;" />
                </v-col>
            </v-row>
            <v-row align="center" cols="auto" density="compact" class="ma-0 pa-0">
                <v-col cols="5">
                </v-col>
                <v-col>
                    <button @click="on_click">描画</button>
                </v-col>
            </v-row>

        </div>
    </v-navigation-drawer>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { type Point, katakana, katakanaIdx, svgpath } from '@/lib/const';

const selection: string[] = [
    'ヒフミヨイマワリテメクルムナヤコトアウノスヘシレカタチサキ',
    'ソラニモロケセユヱヌオヲハエツヰネホンカタカムナ',
    'マカタマノアマノミナカヌシタカミムスヒカムミムスヒミスマルノタマ'
];
const line = ref(selection[0]);
const size = ref(20);
const devide_n = ref(24);
const points = ref<Point[]>([]);
const radius_init = ref(40);
const radiusp_step = ref(0.1);
const radiuspp_step = ref(0.01);
const display_kana = ref(true);

onMounted(() => {
    points.value = getpoints();
});

const on_select = () => {
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
    for (let i = 0; i < line.value.length; i++) {
        const degree = (i % div) * angle_step - 90;
        const angle = degree * (Math.PI / 180);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const tx = (radius + text_offset) * Math.cos(angle);
        const ty = (radius + text_offset) * Math.sin(angle);

        const id = i
        const key = katakanaIdx.get(katakana[i]) || '00';
        const href = `${svgpath}#k${key}`

        radiuspp += radiuspp_step.value;
        radiusp += (radiusp_step.value + radiuspp);
        radius += radiusp;
        if (i < 2) {
            radius += (radiusp + 10);
        } else if (i < 3) {
            //            radius += (radiusp + 10);
        }
        list.push({ id: id, x: x, y: y, tx: tx, ty: ty, yomi: line.value[i], key: key, href: href });
    }
    return list;
};
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