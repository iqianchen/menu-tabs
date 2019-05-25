<template>
  <div id="mainBody">
    <Tabs type="card" :value="activeItem" :animated="false" @on-tab-remove="removeTab" :closable="tabs.length > 1">
      <TabPane v-for="item in tabs" :label="item.alias" :name="item.name" :key="item.id">
        <async-component :componentPath="item.components"></async-component>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import '@/store/menu.js'
import AsyncComponent from '#/AsyncComponent'


export default {
  name: 'mainBody',
  components: {
    AsyncComponent
  },
  computed: {
    ...mapState("menu", {
      tabs: "tabs",
      activeItem: "activeItem"
    })
  },
  methods: {
    ...mapActions("menu", {
      menuClose: "menuClose"
    }),
    removeTab(e) {
      this.menuClose(e)
    }
  }
}
</script>

<style lang="less" scoped>
#mainBody {
  width: 100%;
}
</style>


