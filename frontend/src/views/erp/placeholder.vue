<template>
  <div class="app-container">
    <el-result icon="info" :title="pageTitle" :sub-title="subTitle">
      <template #extra>
        <el-button type="primary" @click="router.push('/index')">返回工作台</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

const pageTitle = computed(() => route.meta.title || '功能')

const subTitle = computed(() => {
  if (route.query.action === 'create') {
    return `${pageTitle.value}的新建入口已预留，功能建设中。`
  }
  if (route.query.no) {
    return `单据 ${route.query.no} 的详情页建设中。`
  }
  return '功能建设中。当前页面用于演示菜单导航。'
})
</script>
