<template>
    <v-container fluid class="fill-height align-start">
        <v-row>
            <v-col cols="12" md="8">
                <v-card class="pa-4" elevation="2" min-height="400">
                    <v-card-title class="text-h6 font-weight-bold px-0 text-left">
                        カタカムナウタヒ８０首
                    </v-card-title>
                    <v-divider class="mb-4"></v-divider>
                    <div>
                        <ol v-if="utahi80 && utahi80.length">
                            <li v-for="(item, idx) in utahi80" :key="idx">
                                <router-link :to="{ name: 'index', params: { id: idx + 1 } }">{{ item }}</router-link>
                            </li>
                        </ol>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="pa-4" elevation="2">
                    <v-card-title class="text-h6 font-weight-bold px-0">
                        🎨 設定
                    </v-card-title>
                    <v-divider class="mb-4"></v-divider>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts" setup>

import { utahi80 } from '@/lib/const';
import { onMounted, ref } from 'vue';

onMounted(() => {
});

const on_click = () => {
}

const on_select = () => {
}
</script>
<style scoped></style>