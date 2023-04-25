<template>
    <div class="icar-home">
        <!-- 左侧区域 -->
        <div class="navbar-container">
            <div class="app-flag">
                <div>
                    <div class="topicon">
                        <img src="../assets/images/logo.png" alt="" />
                    </div>
                    <div class="btmtext">上海正也医药有限公司</div>
                </div>
            </div>
            <aside>
                <el-menu :default-active="$route.path" unique-opened @select="handleselect" background-color="#324057" text-color="#fff" active-text-color="#ffffff !important" style="border-right: none" router>
                    <template v-for="(item, index) in allMenus">
                        <el-submenu v-if="!item.leaf && item.visible" :index="index + ''" :key="item.tag" class="submenu" :class="index === activeNavIndex && 'is-active'">
                            <template slot="title">
                                <i :class="item.icon" class="icon" /><span class="menu-title-1">{{ ttt(item.name) }}</span>
                            </template>
                            <el-menu-item v-for="child in item.children" @click="clickMenu(child)" :index="child.path" v-show="child.visible" :key="child.tag">
                                <span class="menu-title-2">{{ ttt(child.name) }}</span>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item @click="clickMenu(item)" v-if="item.leaf && item.visible" :index="item.path" :key="item.tag" style="padding-left: 20px !important">
                            <i :class="item.icon" class="icon" /><span class="menu-title-1">{{ ttt(item.name) }}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </aside>
        </div>
        <!-- 右侧区域 -->
        <div class="wrap-container">
            <div class="header-container">
                <div class="option">
                    <div class="border-box">
                        <img src="../assets/images/index.png" alt="" />
                    </div>
                    <span>首页</span>
                </div>
                <div class="option">
                    <div class="border-box">
                        <img src="../assets/images/data.png" alt="" />
                    </div>
                    <span> 主数据 </span>
                </div>
                <div class="option">
                    <div class="border-box">
                        <img src="../assets/images/basic.png" alt="" />
                    </div>
                    <span> 辖区管理 </span>
                </div>
                <div class="option" @click="handleToIndex">
                    <div class="border-box is-active">
                        <img src="../assets/images/infor.png" alt="" />
                    </div>
                    <div class="active-text">
                        <span class="title"> 销讯通 </span>
                        <span> 行为管理系统 </span>
                    </div>
                </div>
            </div>

            <div class="tags-menu">
                <common-tab></common-tab>
            </div>

            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="content-wrapper">
                        <transition>
                            <router-view> </router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import { MenuItem } from '@/common/menutypes';
import { Vue, Component, Watch } from 'vue-property-decorator';
import CommonTab from '../components/CommonTab.vue';
import * as Utils from '../utils';
import * as nav from '../common/nav';

@Component({
    components: { CommonTab }
})
export default class Home extends Vue {
    ttt(key: string): string {
        let message = String(key);
        let arr: string[] = message.split('.');
        if (arr.length > 1) {
            return arr[1];
        }
        return message;
    }
    // allMenus: MenuItem[] = [];
    allMenus: any = [];

    activeNavIndex: Number | String = ''; // 当前激活一级导航序号

    async mounted() {
        this.loadAvailButtons();
    }
    handleToIndex() {
        this.$router.push({
            name: 'profile'
        });
    }

    handleselect(a: any, b: any) {
        this.activeNavIndex = a;
    }

    async loadAvailButtons() {
        this.allMenus = [
            { tag: 'a', path: '/', type: 'menu', name: '功能功能功能A', icon: 'el-icon-s-comment', visible: true, hidden: false, children: [{ tag: 'a1', path: '/a', type: 'menu', name: 'a1', icon: '', visible: true, hidden: false }] },
            { tag: 'b', path: '/', type: 'menu', name: '功能功能B', icon: 'el-icon-s-finance', visible: true, hidden: false, children: [{ tag: 'a1', path: '/b', type: 'menu', name: 'a1', icon: '', visible: true, hidden: false }] },
            { tag: 'c', path: '/', type: 'menu', name: '功能功能C', icon: 'el-icon-s-data', visible: true, hidden: false, children: [{ tag: 'a1', path: '/c', type: 'menu', name: 'a1', icon: '', visible: true, hidden: false }] },
            { tag: 'd', path: '/', type: 'menu', name: '功能功能功能D', icon: 'el-icon-s-grid', visible: true, hidden: false, children: [{ tag: 'a1', path: '/d', type: 'menu', name: 'a1', icon: '', visible: true, hidden: false }] },
            { tag: 'e', path: '/', type: 'menu', name: '功能功能E', icon: 'el-icon-menu', visible: true, hidden: false, children: [{ tag: 'a1', path: '/e', type: 'menu', name: 'a1', icon: '', visible: true, hidden: false }] },
            { tag: 'f', path: '/', type: 'menu', name: '功能功能F', icon: 'el-icon-s-custom', visible: true, hidden: false, children: [{ tag: 'a1', path: '/f', type: 'menu', name: 'a1', icon: '', visible: true, hidden: false }] }
        ];
    }

    clickMenu(item: any) {
        let showTags = this.$store.state.showTags;
        if (showTags) {
            this.$store.commit('selectMenu', item);
        }
    }
}
</script>
<style lang="scss">
$header-height: 80px;
$navbar-width-full: 200px;
$navbar-width-mini: 64px;

$app-flag-color: #2a3139;
$app-header-color: #2a3139;

$aside-animation-duration: 0.2s;

$navbar-index: 2;
$header-index: 1;

$app-bg-color: #f0f2f5;
$nav-bar-bgc: #2a3139;
$nav-bar-active-color: #2a3139;

body {
    background: $app-bg-color;
}

.icar-home {
    position: absolute;
    margin: 0;
    padding: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    overflow: hidden;
    .navbar-container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: $navbar-width-full;
        background-color: $nav-bar-bgc;
        transition-duration: $aside-animation-duration;
        z-index: $navbar-index;
        overflow-y: auto;
        &::-webkit-scrollbar-track-piece {
            background-color: transparent;
            -webkit-border-radius: 0;
            -moz-border-radius: 0;
            border-radius: 0;
        }

        &::-webkit-scrollbar {
            width: 2px;
            height: 2px;
        }

        &::-webkit-scrollbar-thumb {
            height: 50px;
            background-color: #999;
            outline: 1px solid #fff;
            outline-offset: -1px;
            border: 1px solid #fff;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb:hover {
            height: 50px;
            background-color: #9f9f9f;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }
        .app-flag {
            position: relative;
            box-sizing: border-box;
            height: $header-height;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: $app-flag-color;
            flex-wrap: nowrap;
            overflow: hidden;
            color: #babbbf;
            .topicon {
                img {
                    width: 160px;
                    height: 30px;
                }
            }
        }
        aside {
            width: 100%;
            .el-menu-item,
            .el-submenu {
                cursor: pointer;
                .icon {
                    // width: 16px;
                    // height: 14px;
                    margin-right: 8px;
                    display: inline-block;
                    width: 20px;
                }
            }
            .submenu {
                ul {
                    li {
                        background: $nav-bar-bgc !important;
                    }
                }
            }
            .is-active {
                .el-submenu__title {
                    background-color: $nav-bar-active-color !important;
                    color: #ffffff !important;
                    height: 40px;
                    line-height: 40px;
                }
                .icon {
                    color: #ffffff !important;
                    // color: rgb(64, 158, 255);
                }
            }
        }
        .el-submenu__title {
            background-color: $nav-bar-bgc !important;
            color: #c8c8c8 !important;
            height: 40px;
            line-height: 40px;
            .icon {
                color: #c8c8c8 !important;
                // color: #ffffff !important;
            }
        }
        .el-submenu-is-active {
            background-color: $nav-bar-active-color;
        }
        .el-menu-item {
            background-color: $nav-bar-bgc !important;
            padding-left: 48px !important;
            color: #c8c8c8 !important;
            height: 40px;
            line-height: 40px;
            &:hover {
                color: #ffffff !important;
            }
            .icon {
                color: #c8c8c8 !important;
                // color: #ffffff !important;
            }
        }
    }

    .wrap-container {
        overflow-y: auto;
        position: absolute;
        top: 0;
        left: $navbar-width-full;
        right: 0;
        bottom: 0;
        transition-duration: $aside-animation-duration;
        &::-webkit-scrollbar-track-piece {
            background-color: transparent;
            -webkit-border-radius: 0;
            -moz-border-radius: 0;
            border-radius: 0;
        }

        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        &::-webkit-scrollbar-thumb {
            height: 50px;
            background-color: #999;
            outline: 2px solid #fff;
            outline-offset: -2px;
            border: 2px solid #fff;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb:hover {
            height: 50px;
            background-color: #9f9f9f;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }

        .header-container {
            color: #fff;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: $header-height;
            padding: 0 30px 0 20px;
            background-color: $app-header-color;
            z-index: $header-index;
            .option {
                display: flex;
                align-items: center;
                margin-left: 50px;
                cursor: pointer;

                .border-box {
                    width: 50px;
                    height: 50px;
                    background: #51565c;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 5px;
                    img {
                        width: 35px;
                        height: 35px;
                    }
                }
                .is-active {
                    background: #49c265;
                }
                .active-text {
                    display: flex;
                    flex-direction: column;
                    .title {
                        font-size: 20px;
                        font-weight: bold;
                        font-family: 'YouYuan' !important;
                    }
                }
            }
        }
        .tags-menu {
            height: 58px;
            background: #fff;
        }
        .content-container {
            background: #f5f5f5;
            position: absolute;
            box-sizing: border-box;
            width: 100%;
            padding-top: $header-height;
            padding: 10px 20px 20px 20px;
            .content-wrapper {
                box-sizing: border-box;
                min-height: 70vh;
            }
        }
    }
}

.el-menu--vertical {
    .el-menu-item {
        height: 40px;
        line-height: 40px;
        .icon {
            display: inline-block;
            width: 22px;
            text-align: center;
        }
        .menu-title-2 {
            margin-left: 8px;
        }
    }
}
.el-icon-arrow-down:before {
    content: '\e6e0';
}
.el-icon-arrow-down:before {
    content: '\E6E0';
}
</style>
