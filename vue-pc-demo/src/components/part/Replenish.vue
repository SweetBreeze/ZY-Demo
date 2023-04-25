<template>
    <div class="replenish">
        <div class="add">
            <el-button size="mini" @click="addTab(editableTabsValue)" type="primary">添加</el-button>
        </div>
        <el-tabs size="mini" class="cards" v-model="editableTabsValue" type="card" @tab-remove="removeTab">
            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                <el-row style="margin-bottom: 10px" :row="24" type="flex" justify="space-between" align="middle">
                    <el-col :span="4" class="label">协议内容：</el-col>
                    <el-col :span="1">
                        <el-button size="mini" class="delete-btn" @click="removeTab(editableTabsValue)">删除</el-button>
                    </el-col>
                </el-row>
                <el-input type="textarea" placeholder="请输入内容" v-model="item.content" maxlength="1000"> </el-input>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Mixins, Watch, Prop } from 'vue-property-decorator';
import * as Utils from '@/utils';
import { BaseMixin } from '@/components/BaseMixin';
@Component
export default class CommonTab extends BaseMixin {
    editableTabsValue = '2';
    editableTabs = [
        {
            title: '补充协议1',
            name: '1',
            content: ''
        },
        {
            title: '补充协议2',
            name: '2',
            content: ''
        }
    ];
    // 新增排序，如果之前的最大值为4，则新增的为补充协议5
    addTab(targetName: any) {
        let newTabName = String(this.editableTabs.length + 1);
        this.editableTabs.push({
            title: `补充协议${newTabName}`,
            name: newTabName,
            content: ''
        });
        this.editableTabsValue = newTabName;
    }
    // 删除暂时没做排序
    // 思维为如果删除的下标为3，那么下标大于3的数据-1。
    removeTab(targetName: any) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    // 激活状态
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                        activeName = nextTab.name;
                    }
                }
            });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }

    async mounted() {}
}
</script>
<style lang="scss">
.replenish {
    // padding: 10px 0;
    position: relative;
    // background: #fff;
}
.cards {
    // padding: 0 20px;
    .el-textarea__inner {
        height: 100px;
    }
}
.add {
    position: absolute;
    right: 25px;
    z-index: 100;
}
.el-tabs__nav-scroll {
    background: #f5f5f5;
}
.el-tabs__header {
    margin: 0;
}
.el-tabs--card > .el-tabs__header .el-tabs__nav {
    background: #fff;
}
.el-tabs__content {
    background: #fff;
    padding: 20px;
}
.el-tabs--card > .el-tabs__header .el-tabs__item {
    border-bottom: 1px solid #e5e5e5;
    color: #bdbdbd;
    font-size: 12px;
    height: 35px;
    line-height: 35px;
}
.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border-bottom: 1px solid #e5e5e5;
    color: #3ea3fe;
}
.label {
    font-size: 12px;
    color: #535353;
}
</style>
