<template>
	<div id="navBar">
    <Menu mode="vertical" @on-select="selectName" theme="dark">
      <template v-for="item in menus">
        <MenuItem v-if="!item.children" :key="item.id" :name="item.name">
          <Icon :type="item.icon"></Icon>
          <span v-text="item.alias"></span>
        </MenuItem>

        <Submenu v-if="item.children" :name="item.name" :key="item.id">
          <template slot="title">
            <Icon :type="item.icon"></Icon>
            <span v-text="item.alias"></span>
          </template>
            <MenuItem v-for="menuItem in item.children" :key="menuItem.id" :name="menuItem.name" >{{menuItem.alias}}</MenuItem>      
            <!-- 如果需要三级菜单 -->
            <!-- <MenuGroup title="">
              <MenuItem v-for="menuItem in item.children" :key="menuItem.id" :name="menuItem.name" >{{menuItem.alias}}</MenuItem>
            </MenuGroup> -->
        </Submenu>
      </template>
    </Menu>
	</div>
</template>

<script>
import { nativeMenu, menus } from '@/static/data/menu.js'
import { mapState, mapActions } from "vuex";

export default {
  name: 'navBar',
  mounted() {
    this.getMenus(menus)
    this.getNativeMenu(nativeMenu)

    // 设置首页 默认为菜单的第一项
    if (menus.length > 0 && menus[0].name) {
      this.menuClick(menus[0].name)
    }
  },
  computed: {
    // 给所有菜单
    ...mapState("menu", {
      tabs: 'tabs',
      menus: "menus",
      nativeMenu: 'nativeMenu',
      activeItem: "activeItem"
    })
  },
  methods: {
    ...mapActions("menu", {
      getMenus: "getMenus",
      menuClick: "menuClick",
      getNativeMenu: "getNativeMenu",
    }),
    selectName(name) {
      this.menuClick(name)
    }
  }
}
</script>
