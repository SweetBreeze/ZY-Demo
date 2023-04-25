<template slot-scope="{ row }">
    <div class="product">
        <div class="text">
            <el-row :span="24" type="flex" align="middle">
                <el-col :span="3">
                    <el-button type="primary" size="mini">添加产品</el-button>
                </el-col>
                <el-col :span="4">
                    <span class="label">购进总指标：</span>
                    <span class="price">{{ '¥' + priceData.inAll }}</span>
                </el-col>
                <el-col :span="10">
                    <span class="label">指标按季度分解(万元)：</span>
                    <span class="price">{{ '【Q1】' + '¥' + priceData.Q1 + ',' + '【Q2】' + '¥' + priceData.Q2 + ',' + '【Q3】' + '¥' + priceData.Q3 + ',' + '【Q4】' + '¥' + priceData.Q4 }}</span>
                </el-col>
                <el-col :span="4">
                    <span class="label">纯销总指标：</span>
                    <span class="price">{{ '¥' + priceData.inAll }}</span>
                </el-col>
            </el-row>
        </div>
        <!-- 需求为动态添加多个商品，可以循环此模块。 -->
        <div class="prtbody">
            <!-- 选择框 -->
            <div class="checkform">
                <el-form :model="editForm" label-width="100px" ref="editForm" size="mini">
                    <el-row :span="24">
                        <el-col :span="6">
                            <el-form-item label="产品：" prop="name">
                                <el-button @click.native="productWindow = true">选择产品</el-button>
                                <span style="margin-left: 10px" class="product-name">{{ editForm.name }}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="协议效期：" prop="time">
                                <el-date-picker size="mini" v-model="timeValue" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2" :offset="8">
                            <el-button size="mini" class="delete-btn">删除</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <!-- 输入框 -->
            <div class="checkinput">
                <div class="inputtable">
                    <el-table :header-cell-style="{ background: '#f8f8f8' }" :data="tableData" size="mini" style="width: 100%">
                        <el-table-column label="协议价(元)">
                            <template slot-scope="{ row }">
                                <el-input placeholder="请输入" size="mini" v-model="row.value1"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="票折(元)">
                            <template slot-scope="{ row }">
                                <el-input placeholder="请输入" size="mini" v-model="row.value2"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="购进指标量(大单位)">
                            <template slot-scope="{ row }">
                                <el-input placeholder="请输入" size="mini" v-model="row.value3"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="购进指标量(小单位)">
                            <template slot-scope="{ row }">
                                <el-input placeholder="请输入" size="mini" v-model="row.value4"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="购进金额(万元)">
                            <template slot-scope="{ row }">
                                <el-input placeholder="请输入" size="mini" v-model="row.value5"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="纯销指标量(小单位)">
                            <template slot-scope="{ row }">
                                <el-input placeholder="请输入" size="mini" v-model="row.value6"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="纯销指标金额(万元)">
                            <template slot-scope="{ row }">
                                <el-input placeholder="请输入" size="mini" v-model="row.value7"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-table :header-cell-style="{ background: '#f8f8f8' }" :data="tableData" size="mini" style="width: 100%; margin-top: 20px">
                        <el-table-column label="分销奖励">
                            <template slot-scope="{ row }">
                                <el-input placeholder="请输入" size="mini" v-model="row.value8"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="费用科目">
                            <template slot-scope="{ row }">
                                <el-select size="mini" v-model="row.value9">
                                    <el-option value="1">正常</el-option>
                                    <el-option value="1">其他</el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="零售配送">
                            <template slot-scope="{ row }">
                                <el-input placeholder="请输入" size="mini" v-model="row.value10"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="费用科目">
                            <template slot-scope="{ row }">
                                <el-select size="mini" v-model="row.value11">
                                    <el-option value="1">正常</el-option>
                                    <el-option value="1">其他</el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="医疗配送商">
                            <template slot-scope="{ row }">
                                <el-input placeholder="请输入" size="mini" v-model="row.value12"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="费用科目">
                            <template slot-scope="{ row }">
                                <el-select size="mini" v-model="row.value13">
                                    <el-option value="1">正常</el-option>
                                    <el-option value="1">其他</el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="自定义7">
                            <template slot-scope="{ row }">
                                <el-input placeholder="请输入" size="mini" v-model="row.value14"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="自定义8">
                            <template slot-scope="{ row }">
                                <el-input placeholder="请输入" size="mini" v-model="row.value15"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <!-- 选择产品的弹窗-->
        <el-dialog :visible.sync="productWindow" title="选择产品">
            <el-radio v-for="item in productData" :key="item.value" v-model="editForm.name" :label="item.name">{{ item.name }}</el-radio>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="productWindow = false" size="small">取消</el-button>
                <el-button type="primary" @click.native="handleSaveProduct" size="small">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Mixins, Watch, Prop } from 'vue-property-decorator';
import * as Utils from '@/utils';
import { BaseMixin } from '@/components/BaseMixin';
@Component
export default class CommonTab extends BaseMixin {
    priceData = {
        inAll: 152.65,
        Q1: 12.5,
        Q2: 12.5,
        Q3: 12.5,
        Q4: 12.5,
        outAll: 152.65
    };
    editForm = {
        name: '',
        time: ''
    };
    // 产品list
    productWindow: boolean = false;
    productData = [{ value: 1, name: '美复胶丸 24粒/盒' }, { value: 2, name: '美复胶丸 12粒/盒' }, { value: 3, name: '美复胶丸 10粒/盒' }];
    // 选择时间值预处理
    timeValue: string = '';
    // 表格
    tableData = [{ id: '1', name: '测试1' }];
    row: any = {};
    handleSaveProduct() {
        this.productWindow = false;
        console.log(this.editForm.name);
    }
    async mounted() {}
}
</script>
<style lang="scss">
.product {
    width: 100%;
    min-height: 20vh;
    // background: #fff;
    .prtbody {
        background: #fff;
    }
    .text {
        width: 100%;
        margin-bottom: 10px;
        .label {
            font-size: 12px;
            color: #676767;
        }
        .price {
            font-size: 12px;
            font-weight: bold;
            color: #666;
        }
    }
    .checkform {
        padding-top: 10px;
        border-bottom: 2px solid #eee;
    }
    .checkinput {
        height: 200px;
        padding: 25px;
        .inputtable {
            height: 100px;
        }
    }
    .el-table {
        border: 1px solid #ddd;
    }
}
</style>
