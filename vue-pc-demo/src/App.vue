<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script lang='ts'>
import Vue, { ComponentOptions } from 'vue';
import Component from 'vue-class-component';

@Component
export default class App extends Vue {
    public name: string = 'app';
}
</script>

<style lang="scss">
body {
    margin: 0px;
    padding: 0px;
    background: #1f2d3d;
    // font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-family: 'Helvetica Neue', 'Helvetica', Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 12px;
    -webkit-font-smoothing: antialiased;
}
</style>
