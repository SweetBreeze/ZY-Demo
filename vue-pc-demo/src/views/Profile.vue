<template>
    <div class="app-profile">
        <div class="part">
            <div class="part1">
                <div class="header"><span>1</span>协议主体</div>
                <Subject></Subject>
            </div>
            <div class="part2">
                <div class="header"><span>2</span>产品政策</div>
                <Product></Product>
            </div>
            <div class="part3">
                <div class="header"><span>3</span>补充协议</div>
                <Replenish></Replenish>
            </div>
        </div>
        <div class="save">
            <el-button type="primary">保存</el-button>
        </div>
    </div>
</template>
<script lang="ts">
import Vue, { ComponentOptions } from 'vue';
import Component from 'vue-class-component';
import Product from '@/components/part/Product.vue';
import Replenish from '@/components/part/Replenish.vue';
import Subject from '@/components/part/Subject.vue';

import * as Utils from '../utils';

@Component({
    components: {
        Product,
        Replenish,
        Subject
    }
})
export default class Profile extends Vue {
    mounted() {}
}
</script>
<style lang="scss">
.part {
    .header {
        width: 100%;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0;
        font-weight: bold;
        font-size: 14px;
        // background: pink;
        span {
            background: #4f8bff;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            border-radius: 50%;
            color: #fff;
            margin-right: 5px;
        }
    }
    .header:before {
        position: absolute;
        // top: 11px;
        left: 25px;
        content: '';
        width: 43%;
        border-bottom: 2px dashed #e9e9e9;
    }

    .header:after {
        position: absolute;
        // top: 11px;
        right: 25px;
        content: '';
        width: 43%;
        border-bottom: 2px dashed #e9e9e9;
    }
}
.save {
    width: 100%;
    height: 60px;
    background: #fff;
    margin-top: 30px;
    line-height: 60px;
}
</style>
