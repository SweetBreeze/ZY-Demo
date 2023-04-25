<template>
    <div class="subject">
        <el-form :model="editForm" :rules="editFormRules" label-width="100px" ref="editForm" size="mini">
            <el-row>
                <!-- 为了简单注明选项暂用option+数字，具体应用要根据字段来定义。 -->
                <el-col :span="12">
                    <el-form-item label="协议客户：" prop="option1">
                        <el-col :span="4">
                            <el-button @click.native="clientWindow = true">选择客户</el-button>
                        </el-col>
                        <el-col :span="12" :offset="1">
                            <span>{{ editForm.option1 }}</span>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="协议状态：" prop="option2">
                        <el-col :span="4">
                            <el-select v-model="editForm.option2" placeholder="请选择">
                                <el-option :value="1" label="正常"></el-option>
                                <el-option :value="0" label="其他"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="购进指标：" prop="option3">
                        <el-col :span="4">
                            <el-select v-model="editForm.option3" placeholder="请选择">
                                <el-option :value="1" label="金额"></el-option>
                                <el-option :value="0" label="数量"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8" :offset="1">
                            <el-input v-model="editForm.code" placeholder="请输入金额/数量"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="纯销指标：" prop="option4">
                        <el-col :span="4">
                            <el-select v-model="editForm.option4" placeholder="请选择">
                                <el-option :value="1" label="金额"></el-option>
                                <el-option :value="0" label="数量"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8" :offset="1">
                            <el-input v-model="editForm.code" placeholder="请输入金额/数量"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="销售区域：" prop="option5">
                        <el-col :span="4">
                            <el-button size="mini" @click="areaWindow = true">选择区域</el-button>
                        </el-col>
                        <el-col :span="14" :offset="1">
                            <el-tag style="margin-right: 10px" size="small" v-for="tag in editForm.option5" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)">
                                {{ tag }}
                            </el-tag>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="签订时间：" prop="option6">
                        <el-col :span="13">
                            <el-date-picker style="width: 100%" v-model="timeValue" type="datetime" placeholder="选择日期时间"> </el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="购进渠道：" prop="option7">
                        <el-col :span="4">
                            <el-select @change="handleTypeChange" v-model="editForm.option7Type" placeholder="请选择">
                                <el-option :value="1" label="指定渠道"></el-option>
                                <el-option :value="0" label="其他"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <el-button v-if="editForm.option7">{{ editForm.option7 }}</el-button>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin-left: 100px; margin-right: 40px">
                <el-table :header-cell-style="{ background: '#f8f8f8' }" @row-click="getCurrentRow" highlight-current-row size="mini" :data="tableData">
                    <el-table-column prop="code" label="指定渠道编码"> </el-table-column>
                    <el-table-column prop="name" label="指定渠道名称"> </el-table-column>
                    <el-table-column prop="province" label="所在省"> </el-table-column>
                </el-table>
            </el-row>
        </el-form>
        <!-- 选择客户的弹窗，个人理解为客户列表较多，并且会有详细信息等，所以弹窗 -->
        <el-dialog :visible.sync="clientWindow" title="选择客户">
            <!-- <div>12312</div> -->
            <el-radio v-for="item in clientData" :key="item.value" v-model="editForm.option1" :label="item.name">{{ item.name }}</el-radio>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="clientWindow = false" size="small">取消</el-button>
                <el-button type="primary" @click.native="handleSaveClient" size="small">确认</el-button>
            </div>
        </el-dialog>
        <!-- 区域弹窗，多选 -->
        <el-dialog :visible.sync="areaWindow" title="选择区域">
            <el-checkbox-group v-model="editForm.option5">
                <el-checkbox v-for="item in areaData" :label="item.name" :key="item.value">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="areaWindow = false" size="small">取消</el-button>
                <el-button type="primary" @click.native="handleSaveArea" size="small">确认</el-button>
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
    editForm: any = {
        option2: 1,
        option4: 1,
        option3: 1,
        option7Type: 1,
        option7: '',
        option5: []
    };
    editFormRules: any = {
        option1: [{ required: true, message: '请输入值', trigger: 'blur' }]
    };
    tableData = [{ code: 'BJ000090', name: '宁波九州通药业有限公司', province: '浙江省' }, { code: 'BJ000092', name: '国华控股精华有限公司', province: '浙江省' }, { code: 'BJ000093', name: '老百姓药业有限公司', province: '浙江省' }];
    // 客户列表
    clientWindow: boolean = false;
    clientData = [{ name: '上海正也医药有限公司', value: 1 }, { name: '上海xx2医药有限公司', value: 2 }, { name: '上海xx3医药有限公司', value: 3 }];
    // 区域列表
    areaWindow: boolean = false;
    areaData = [
        {
            name: '全国',
            value: 1
        },
        {
            name: '上海',
            value: 2
        },
        {
            name: '北京',
            value: 3
        }
    ];
    areaTags = [];
    // 时间
    timeValue: string = '';
    async mounted() {}
    handleSaveClient() {
        this.clientWindow = false;
        console.log(this.editForm.option1);
    }
    handleSaveArea() {
        console.log(this.editForm.option5);
        this.areaWindow = false;
    }
    // 获取当前行数据
    getCurrentRow(row: any) {
        // let currentRow = (this as any).$refs.table.getCurrentRow();
        // console.log(currentRow);
        console.log(row);
        this.editForm.option7 = row.name;
    }
    handleClose(tag: any) {
        this.editForm.option5.splice(this.editForm.option5.indexOf(tag), 1);
    }
    // 购进渠道切换
    handleTypeChange(val: number) {
        if (val === 0) {
            this.editForm.option7 = '';
        }
    }
}
</script>
<style lang="scss">
.subject {
    width: 100%;
    min-height: 20vh;
    background: #fff;
    padding: 10px 0 20px 0;
}
.el-form-item__label {
    font-size: 12px;
    font-weight: bold;
    color: #7f7f7f;
}
</style>
