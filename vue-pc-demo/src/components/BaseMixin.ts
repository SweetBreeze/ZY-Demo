import { Component, Vue } from 'vue-property-decorator';
import * as Utils from '@/utils';

@Component({})
export class BaseMixin extends Vue {
    // 日期格式化函数
    defaultTimeFormatter(row: any, column: any) {
        return Utils.formatDateString(row[column.property]);
    }
    // 清空对象和验证条件 用于新增表单关闭。
    clearObject(obj: any, refname: any) {
        Object.keys(obj).forEach(key => {
            obj[key] = '';
        });
        Utils.clearValidateForm(refname);
    }
}
