export const skins = [
  {
    id: 'ocean',
    name: '深海',
    desc: '深蓝侧栏，适合日常办公',
    theme: '#1f4e79',
    sideTheme: 'theme-dark',
    isDark: false,
    sidebarBg: '#152238',
    sidebarText: '#d5deea',
    logoText: '#ffffff',
    menuHover: '#1e3354',
    navbarBg: '#ffffff',
    pageBg: '#f4f7fb'
  },
  {
    id: 'bamboo',
    name: '竹青',
    desc: '青绿侧栏，阅读更轻松',
    theme: '#0f766e',
    sideTheme: 'theme-dark',
    isDark: false,
    sidebarBg: '#12312e',
    sidebarText: '#d7ebe6',
    logoText: '#ffffff',
    menuHover: '#1a4540',
    navbarBg: '#ffffff',
    pageBg: '#f3f7f6'
  },
  {
    id: 'paper',
    name: '素纸',
    desc: '浅色侧栏，界面更干净',
    theme: '#2563eb',
    sideTheme: 'theme-light',
    isDark: false,
    sidebarBg: '#f7f8fa',
    sidebarText: '#303133',
    logoText: '#1f2a37',
    menuHover: '#e8eef6',
    navbarBg: '#ffffff',
    pageBg: '#f5f6f8'
  },
  {
    id: 'eye',
    name: '护眼',
    desc: '豆沙绿底，减轻屏幕刺眼',
    theme: '#3d7a4a',
    sideTheme: 'theme-light',
    isDark: false,
    sidebarBg: '#c9e3cc',
    sidebarText: '#243028',
    logoText: '#1d3324',
    menuHover: '#b7d8bb',
    navbarBg: '#d7edd9',
    pageBg: '#d4ebd6',
    surfaces: {
      '--el-bg-color': '#e7f3e4',
      '--el-bg-color-overlay': '#f3faf1',
      '--el-fill-color-blank': '#f3faf1',
      '--el-fill-color-light': '#e1f0de',
      '--el-card-bg-color': '#f3faf1',
      '--el-text-color-primary': '#243028',
      '--el-text-color-regular': '#3c4d40',
      '--el-border-color': '#c5dcc4',
      '--el-border-color-light': '#d3e6d1',
      '--el-border-color-lighter': '#e0eedd'
    }
  },
  {
    id: 'dusk',
    name: '暮色',
    desc: '深色界面，适合弱光环境',
    theme: '#8eb4ff',
    sideTheme: 'theme-dark',
    isDark: true,
    sidebarBg: '#12151c',
    sidebarText: '#c8d0dc',
    logoText: '#e8eef8',
    menuHover: '#1c2330',
    navbarBg: '#161b24',
    pageBg: '#0f1218'
  }
]

export function getSkin(id) {
  return skins.find(item => item.id === id) || skins[0]
}

const surfaceVars = [
  '--el-bg-color',
  '--el-bg-color-overlay',
  '--el-fill-color-blank',
  '--el-fill-color-light',
  '--el-card-bg-color',
  '--el-text-color-primary',
  '--el-text-color-regular',
  '--el-border-color',
  '--el-border-color-light',
  '--el-border-color-lighter'
]

export function applySkinVars(skin) {
  const root = document.documentElement
  root.style.setProperty('--sidebar-bg', skin.sidebarBg)
  root.style.setProperty('--sidebar-text', skin.sidebarText)
  root.style.setProperty('--sidebar-logo-text', skin.logoText)
  root.style.setProperty('--menu-hover', skin.menuHover)
  root.style.setProperty('--navbar-bg', skin.navbarBg)
  root.style.setProperty('--erp-page-bg', skin.pageBg)
  surfaceVars.forEach((name) => {
    const value = skin.surfaces && skin.surfaces[name]
    if (value) {
      root.style.setProperty(name, value)
    } else {
      root.style.removeProperty(name)
    }
  })
  root.dataset.skin = skin.id
}
