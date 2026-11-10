import defaultSettings from '@/settings'
import { applySkinVars, getSkin } from '@/assets/skins'
import { useDark, useToggle } from '@vueuse/core'
import { useDynamicTitle } from '@/utils/dynamicTitle'
import { handleThemeStyle } from '@/utils/theme'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const { sideTheme, showSettings, navType, tagsView, tagsViewPersist, tagsIcon, tagsViewStyle, fixedHeader, sidebarLogo, dynamicTitle, footerVisible, footerContent } = defaultSettings

const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''
const initialSkin = getSkin(storageSetting.skinId)

const useSettingsStore = defineStore(
  'settings',
  {
    state: () => ({
      title: '',
      skinId: initialSkin.id,
      theme: initialSkin.theme,
      sideTheme: initialSkin.sideTheme,
      showSettings: showSettings,
      navType: storageSetting.navType === undefined ? navType : storageSetting.navType,
      tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
      tagsViewPersist: storageSetting.tagsViewPersist === undefined ? tagsViewPersist : storageSetting.tagsViewPersist,
      tagsIcon: storageSetting.tagsIcon === undefined ? tagsIcon : storageSetting.tagsIcon,
      tagsViewStyle: storageSetting.tagsViewStyle === undefined ? tagsViewStyle : storageSetting.tagsViewStyle,
      fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
      sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
      dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle,
      footerVisible: storageSetting.footerVisible === undefined ? footerVisible : storageSetting.footerVisible,
      footerContent: footerContent,
      isDark: isDark.value
    }),
    actions: {
      // 修改布局设置
      changeSetting(data) {
        const { key, value } = data
        if (this.hasOwnProperty(key)) {
          this[key] = value
        }
      },
      // 设置网页标题
      setTitle(title) {
        this.title = title
        useDynamicTitle()
      },
      // 切换暗黑模式
      toggleTheme() {
        this.isDark = !this.isDark
        toggleDark()
        nextTick(() => {
          handleThemeStyle(this.theme)
        })
      },
      applySkin(id) {
        const skin = getSkin(id)
        this.skinId = skin.id
        this.theme = skin.theme
        this.sideTheme = skin.sideTheme
        this.isDark = skin.isDark
        isDark.value = skin.isDark
        applySkinVars(skin)
        handleThemeStyle(skin.theme)
        const saved = JSON.parse(localStorage.getItem('layout-setting') || '{}') || {}
        saved.skinId = skin.id
        saved.theme = skin.theme
        saved.sideTheme = skin.sideTheme
        localStorage.setItem('layout-setting', JSON.stringify(saved))
      }
    }
  })

export default useSettingsStore
