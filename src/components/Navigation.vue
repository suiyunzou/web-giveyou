<template>
  <div class="nav-container">
    <div class="nav-item" :class="{ active: isAll }" @click="switchToAll">全部</div>
    <!-- 固定的导航项 -->
    <div 
      v-for="tag in defaultTags" 
      :key="tag"
      class="nav-item"
      :class="{ active: currentTag === tag }"
      @click="switchTag(tag)"
    >
      {{ tag }}
    </div>
    <!-- 用户添加的自定义标签 -->
    <div 
      v-for="tag in customTags" 
      :key="tag"
      class="nav-item"
      :class="{ active: currentTag === tag }"
      @click="switchTag(tag)"
    >
      {{ tag }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultTags: ['开发', '设计', '效率', '教育', '娱乐', '新闻', '社交'],
      customTags: [], // 存储用户自定义的标签
      currentTag: '',
      isAll: true
    }
  },
  methods: {
    // 添加新标签
    addCustomTag(tag) {
      if (!this.customTags.includes(tag)) {
        this.customTags.push(tag)
      }
    },
    switchTag(tag) {
      this.currentTag = tag
      this.isAll = false
      this.$emit('tag-changed', tag)
    },
    switchToAll() {
      this.currentTag = ''
      this.isAll = true
      this.$emit('tag-changed', 'all')
    }
  }
}
</script>

<style scoped>
.nav-container {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
}

.nav-item {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.nav-item.active {
  background-color: #1a73e8;
  color: white;
}
</style> 