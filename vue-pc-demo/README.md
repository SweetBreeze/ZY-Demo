# 安装启动介绍
```
使用技术栈为vue2+elementUi+Ts,安装依赖为yarn。
```
> A Vue.js project

## Build Setup

```bash
# install dependencies
yarn

# serve with hot reload at localhost:7090
yarn serve

# build for production with minification
yarn build

```

## 关于版本
``` 
我启动的版本为yarn v1.22.11，node为v14.17.6。如果有版本冲突烦请根据版本做下启动适配。

```

## 关于页面结构
``` 
整个页面地址 template-admin-web/src/views/Profile.vue
拆分三个组件  
            1.协议主体-template-admin-web/src/components/part/Subject.vue
            2.产品策略-template-admin-web/src/components/part/Product.vue
            3.补充协议 -template-admin-web/src/components/part/Replenish.vue
  协议主体：销售区域实现多选，指定区域可选中表格内容。
  产品策略：可以选择产品。
  补充协议：可以实现新增删除的Dom样式。

数据统一处理未实现，思路为父组件点击保存按钮，将三个子组件对应的值获取。
``` 