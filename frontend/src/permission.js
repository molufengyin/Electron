import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user'
import useLockStore from '@/store/modules/lock'
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to) => {
  NProgress.start()
  if (to.path === '/login' || to.path === '/register') {
    NProgress.done()
    return { path: '/' }
  }
  if (to.meta.title) {
    useSettingsStore().setTitle(to.meta.title)
  }
  const userStore = useUserStore()
  if (userStore.roles.length === 0) {
    userStore.applyLocalUser()
  }
  const permissionStore = usePermissionStore()
  if (permissionStore.sidebarRouters.length === 0) {
    await permissionStore.generateRoutes()
    return { ...to, replace: true }
  }
  const isLock = useLockStore().isLock
  if (isLock && to.path !== '/lock') {
    NProgress.done()
    return { path: '/lock' }
  }
  if (!isLock && to.path === '/lock') {
    NProgress.done()
    return { path: '/' }
  }
  return true
})

router.afterEach(() => {
  NProgress.done()
})
