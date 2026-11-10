<template>
  <div class="app-container erp-home">
    <el-alert
      class="demo-alert"
      title="当前为本地虚拟数据，未连接后端。测试测试测试！！"
      type="info"
      show-icon
      :closable="false"
    />

    <el-row :gutter="16">
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kpis" :key="item.key">
        <el-card shadow="hover" class="kpi-card" :class="'tone-' + item.tone" @click="open(item.route)">
          <div class="kpi-label">{{ item.label }}</div>
          <div class="kpi-value">{{ item.value }}</div>
          <div class="kpi-hint">{{ item.hint }}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" class="section-row">
      <el-col :xs="24" :lg="10">
        <el-card shadow="never">
          <template #header>
            <span>待办</span>
          </template>
          <div v-for="item in todos" :key="item.id" class="todo-item" @click="open(item.route)">
            <div>
              <div class="todo-title">{{ item.title }}</div>
              <div class="todo-desc">{{ item.desc }}</div>
            </div>
            <el-tag :type="item.type" effect="plain">{{ item.count }}</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="14">
        <el-card shadow="never">
          <template #header>
            <span>快捷入口</span>
          </template>
          <div class="shortcut-grid">
            <button v-for="item in shortcuts" :key="item.title" class="shortcut" type="button" @click="open(item.route, item.query)">
              <el-icon :size="22"><component :is="item.icon" /></el-icon>
              <span>{{ item.title }}</span>
            </button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="never" class="section-row">
      <template #header>
        <div class="card-head">
          <span>最近单据</span>
          <el-input
            v-model="keyword"
            clearable
            placeholder="搜索单号、客户或供应商"
            prefix-icon="Search"
            class="doc-search"
          />
        </div>
      </template>
      <el-table :data="filteredDocs" stripe empty-text="没有匹配的单据" @row-click="openDocument">
        <el-table-column prop="no" label="单号" min-width="160" />
        <el-table-column prop="kind" label="类型" width="90" />
        <el-table-column prop="partner" label="客户 / 供应商" min-width="140" />
        <el-table-column prop="amount" label="金额" width="120" />
        <el-table-column label="状态" width="110">
          <template #default="{ row }">
            <el-tag :type="statusType[row.status]" effect="light">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { documents, kpis, shortcuts, todos } from '@/mock/erp'

const router = useRouter()
const keyword = ref('')
const statusType = {
  '待审核': 'warning',
  '进行中': 'primary',
  '已完成': 'success'
}

const filteredDocs = computed(() => {
  const text = keyword.value.trim().toLowerCase()
  if (!text) {
    return documents
  }
  return documents.filter(item => {
    return [item.no, item.partner, item.kind, item.status].some(field => String(field).toLowerCase().includes(text))
  })
})

function open(path, query) {
  router.push({ path, query })
}

function openDocument(row) {
  const path = row.kind === '采购' ? '/purchase/index' : '/sales/index'
  router.push({ path, query: { no: row.no } })
}
</script>

<style scoped lang="scss">
.erp-home {
  background: transparent;
}

.demo-alert {
  margin-bottom: 16px;
}

.kpi-card {
  margin-bottom: 16px;
  cursor: pointer;
  border-top: 3px solid var(--el-color-primary);

  .kpi-label {
    color: #606266;
    font-size: 14px;
  }

  .kpi-value {
    margin: 10px 0 6px;
    color: #1f2a37;
    font-size: 28px;
    font-weight: 600;
    line-height: 1.2;
  }

  .kpi-hint {
    color: #909399;
    font-size: 13px;
  }
}

.tone-warning {
  border-top-color: #e6a23c;
}

.tone-danger {
  border-top-color: #f56c6c;
}

.tone-success {
  border-top-color: #67c23a;
}

.section-row {
  margin-bottom: 16px;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 4px;
  border-bottom: 1px solid #ebeef5;
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }

  &:hover .todo-title {
    color: var(--el-color-primary);
  }
}

.todo-title {
  font-size: 15px;
  font-weight: 600;
}

.todo-desc {
  margin-top: 4px;
  color: #909399;
  font-size: 13px;
}

.shortcut-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.shortcut {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 72px;
  padding: 0 16px;
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  background: var(--el-bg-color);
  color: var(--el-text-color-primary);
  font-size: 15px;
  cursor: pointer;

  &:hover {
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);
  }
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.doc-search {
  width: 260px;
}
</style>
