import { MenuItem } from '@/common/menutypes';

// 首页
let menu = new MenuItem('index', '首页', 'el-icon-fa-home', true, true, '/').addPermission('session:all', '查询', true, null, '/api/sessions/**');
export default menu;
