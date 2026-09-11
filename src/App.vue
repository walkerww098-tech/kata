<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar height="32" flat>
            <v-tabs>
                <v-tab to="/">らせん</v-tab>
                <v-tab to="/horizontal">横書き</v-tab>
                <v-tab to="/virtical">縦書き</v-tab>
                <v-tab to="/list">文字一覧</v-tab>
            </v-tabs>
        </v-app-bar>
        <v-main style="border: 1px solid gray;">
            <router-view></router-view>
        </v-main>
    </v-layout>
</template>
<style scoped>
header {
    background-color: navy;
    color: lightgray;
}

div.leftmenu {
    font-size: x-small;
}
</style>