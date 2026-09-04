<template>
<el-container class="default-layout__wrapper">
  <SideMenu />
  <el-container class="default-layout__content-wrapper" direction="vertical">
    <DefaultHeader />
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import SideMenu from '@/components/side-menu/SideMenu.vue'
import DefaultHeader from '@/components/default-header/DefaultHeader.vue'

export default {
  components: {
    SideMenu,
    DefaultHeader
  },
  data () {
    const item = {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }
    return {
      tableData: Array(20).fill(item)
    }
  }
}
</script>

<style>
.default-layout__wrapper {
  height: 100%;
}

.default-layout__content-wrapper {
  display: flex;
  flex-direction: column;
}
</style>
