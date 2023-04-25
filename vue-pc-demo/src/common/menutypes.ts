import { timingSafeEqual } from 'crypto';

/**
 * 目录树结构
 * 该数据结构中的每一条目都对应sys_permissions表中的一条记录，代表用户可以拥有的一条权限信息。
 *
 * tag: [string] 权限唯一标识。每个角色拥有的权限使用该字段内容进行标识。
 * path: [string] 前端路由url。用于菜单显示。该URL与vue-router中配置的path对应。
 * type: [string] 支持两种类型：菜单menu，按钮button
 * name: [string] 展示名称。用于菜单显示。需要国际化。
 * icon: [string] 图标。用于菜单展示，展示为文字左边的图标。
 * leaf: [boolean] 是否是叶子节点
 * whiteList: [boolean] 是否属于白名单
 * children: [array] 子代, 字段同父代， leaf == false 有效
 * options: [array] 操作，比如 增删改查按钮
 * ** option
 * ** ** tag: [string] 唯一标识
 * ** ** type: [string] 操作类型。button-按钮
 * ** ** name: [string] 名称
 * ** ** pattern: [string] 请求url pattern
 * ** ** method: [string] 请求方法
 * ** ** whiteList: [boolean] 是否属于白名单
 */

// 菜单项数据结构
// 菜单分为两级：
//   第一级为可以为菜单项或子菜单（包含若干二级菜单项）
//   第二级只能为菜单项
// 每个菜单项下面可以包含多个配置
export class MenuItem {
    // 权限唯一标识。每个角色拥有的权限使用该字段内容进行标识。
    tag: string;
    // 前端路由url。用于菜单显示。该URL与vue-router中配置的path对应。
    path: string;
    // 支持两种类型：菜单menu，按钮button
    type: string;
    // 展示名称。用于菜单显示。需要国际化。
    name: any;
    // 图标。用于菜单展示，展示为文字左边的图标。
    icon: string;
    // 图标。用于菜单展示，展示为文字左边的图标。
    leaf: boolean;
    // 是否属于白名单。属于白名单的权限对任何用户都有效，不需要后台有对应的权限数据。
    whiteList: boolean;
    // 菜单是否隐藏。用于Home页面根据权限决定菜单项是否隐藏。
    hidden: boolean;
    // 菜单是否显示。用于Home页面根据权限决定菜单项是否隐藏。
    visible: boolean;
    children: MenuItem[];
    permissions: MenuPermission[];

    constructor(tag: string, name: any, icon: string, whiteList: boolean, leaf?: boolean, path?: string, hidden?: boolean) {
        this.tag = tag;
        this.path = path || '';
        this.type = 'menu';
        this.name = name;
        this.icon = icon;
        this.leaf = leaf || false;
        this.whiteList = whiteList;
        this.children = [];
        this.permissions = [];
        this.hidden = !!hidden;
        this.visible = true;
    }

    addChildren(child: MenuItem) {
        this.children.push(child);
        return this;
    }

    addPermission(tag: string, name: any, whiteList: boolean, method: string | null, pattern: string) {
        let perm = new MenuPermission(tag, name, whiteList, method, pattern);
        this.permissions.push(perm);
        return this;
    }
}

// 标识某个按钮权限，对应后台某个URL
export class MenuPermission {
    // 唯一标识
    tag: string;
    // 操作类型。button-按钮
    type: string;
    // 名称
    name: any;
    // 请求url pattern
    pattern: string;
    // 请求方法
    method: string | null;
    // 是否属于白名单
    whiteList: boolean;
    hidden: boolean;

    constructor(tag: string, name: any, whiteList: boolean, method: string | null, pattern: string, hidden?: boolean) {
        this.tag = tag;
        this.type = 'button';
        this.name = name;
        this.whiteList = whiteList;
        this.method = method;
        this.pattern = pattern;
        this.hidden = !!hidden;
    }
}

// 用于显示菜单树结构的数据结构
export class TreeItem {
    // tag：用于唯一标识一个权限
    tag: string;
    // name: 显示在树状结构中的文字
    name: string;
    hidden: boolean;
    // 子节点
    children: TreeItem[];

    constructor(tag: string, name: string, hidden?: boolean) {
        this.tag = tag;
        this.name = name;
        this.hidden = !!hidden;
        this.children = [];
    }

    addChildren(tag: string, name: string, hidden?: boolean) {
        let child = new TreeItem(tag, name, hidden);
        this.children.push(child);
        return this;
    }
}

// 用于表示后台权限的数据结构
export class BackPermission {
    // 用于唯一标识一个权限
    tag: string;
    // 权限类型。可以为：menu 或 button
    type: string;
    // 是否是白名单
    whiteList: boolean;
    // 请求方法，与method组合唯一确定一个后台接口的URL
    method: string | null;
    // 请求url模式
    pattern: string | '';

    constructor(tag: string, type: string, whiteList: boolean, method?: string | null, pattern?: string) {
        this.tag = tag;
        this.type = type;
        this.whiteList = whiteList;
        this.method = method || null;
        this.pattern = pattern || '';
    }
}
