<template>
  <div>
    <Navigation ref="nav" @tag-changed="handleTagChange"/>
    <!-- 其他内容 -->
  </div>
</template>

<script>
export default {
  methods: {
    // 当用户添加新标签时调用
    handleNewTag(tag) {
      this.$refs.nav.addCustomTag(tag)
    },
    
    handleTagChange(tag) {
      // 处理标签切换逻辑
    }
  }
}
</script> 