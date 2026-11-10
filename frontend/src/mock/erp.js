export const kpis = [
  { key: 'sales', label: '今日销售额', value: '¥128,600', hint: '较昨日 +12.4%', route: '/sales/index', tone: 'primary' },
  { key: 'ship', label: '待发货订单', value: '18', hint: '含加急 3 单', route: '/sales/index', tone: 'warning' },
  { key: 'stock', label: '库存预警', value: '7', hint: '低于安全库存', route: '/inventory/index', tone: 'danger' },
  { key: 'receive', label: '待收款', value: '¥86,200', hint: '逾期 2 笔', route: '/finance/index', tone: 'success' }
]

export const todos = [
  { id: 1, title: '待审核订单', count: 5, desc: '销售订单等待审核', route: '/sales/index', type: 'warning' },
  { id: 2, title: '待入库采购单', count: 3, desc: '采购到货等待入库', route: '/purchase/index', type: 'primary' },
  { id: 3, title: '待对账', count: 4, desc: '客户往来等待核对', route: '/finance/index', type: 'danger' }
]

export const shortcuts = [
  { title: '新建销售单', route: '/sales/index', query: { action: 'create' }, icon: 'ShoppingCart' },
  { title: '新建采购单', route: '/purchase/index', query: { action: 'create' }, icon: 'Goods' },
  { title: '库存查询', route: '/inventory/index', icon: 'Box' },
  { title: '客户档案', route: '/customer/index', icon: 'User' }
]

export const documents = [
  { no: 'SO20260318001', partner: '星河科技', kind: '销售', amount: '¥32,800', status: '待审核' },
  { no: 'SO20260318002', partner: '北城商贸', kind: '销售', amount: '¥18,600', status: '进行中' },
  { no: 'PO20260317008', partner: '远航纸业', kind: '采购', amount: '¥9,450', status: '进行中' },
  { no: 'SO20260317015', partner: '青禾办公', kind: '销售', amount: '¥6,280', status: '已完成' },
  { no: 'PO20260316003', partner: '宏达五金', kind: '采购', amount: '¥21,300', status: '待审核' },
  { no: 'SO20260316011', partner: '澜湾教育', kind: '销售', amount: '¥14,900', status: '已完成' }
]

export const notices = [
  {
    noticeId: 1,
    noticeTitle: '销售订单 SO20260318001 待审核',
    noticeType: '1',
    createBy: '系统',
    createTime: '2026-03-18 09:20',
    status: '0',
    isRead: false,
    noticeContent: '星河科技的销售订单金额 ¥32,800，等待审核后安排发货。'
  },
  {
    noticeId: 2,
    noticeTitle: '库存预警：A4 复印纸低于安全库存',
    noticeType: '1',
    createBy: '系统',
    createTime: '2026-03-18 08:40',
    status: '0',
    isRead: false,
    noticeContent: 'A4 复印纸当前库存 12 箱，安全库存 30 箱，请及时采购补货。'
  },
  {
    noticeId: 3,
    noticeTitle: '3 月客户对账提醒',
    noticeType: '2',
    createBy: '财务',
    createTime: '2026-03-17 18:00',
    status: '0',
    isRead: false,
    noticeContent: '本月有 4 笔客户往来待核对，待收款合计 ¥86,200。'
  }
]
