<template>
    <div class="tabs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>年度协议管理</el-breadcrumb-item>
            <el-breadcrumb-item>二级商协议</el-breadcrumb-item>
            <el-breadcrumb-item>新增二级商协议</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="current-router">{{ routerName }}</div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Mixins, Watch, Prop } from 'vue-property-decorator';
import * as Utils from '@/utils';
import { BaseMixin } from '@/components/BaseMixin';
import { mapState, mapMutations } from 'vuex';
@Component
export default class CommonTab extends BaseMixin {
    tags: any = [];
    // 动态获取通过router获取信息。
    routerName = '新增二级商协议';
}
</script>
<style lang="scss">
.tabs {
    padding: 10px 20px;
}
.el-breadcrumb__separator {
    margin: 0 2px;
}
.el-breadcrumb {
    font-size: 12px;
    color: #b3b3b3;
}
.current-router {
    font-weight: bold;
    font-size: 15px;
    margin-top: 5px;
}
</style>
