const { app, BrowserWindow, Menu, dialog } = require('electron/main')
const path = require('node:path')

if (require('electron-squirrel-startup')) {
  app.quit()
} else {
  Menu.setApplicationMenu(null)

  function createWindow() {
    const win = new BrowserWindow({
      width: 1360,
      height: 860,
      minWidth: 1100,
      minHeight: 700,
      show: false,
      backgroundColor: '#16385f',
      title: 'ERP 工作台',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })

    win.once('ready-to-show', () => {
      win.show()
    })

    if (process.env.ELECTRON_START_URL) {
      win.loadURL(process.env.ELECTRON_START_URL)
      return
    }

    win.loadFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
  }

  function checkForUpdates() {
    const { autoUpdater } = require('electron-updater')
    autoUpdater.autoDownload = true
    autoUpdater.on('update-downloaded', () => {
      dialog.showMessageBox({
        type: 'info',
        buttons: ['立即重启', '稍后'],
        defaultId: 0,
        cancelId: 1,
        title: '发现新版本',
        message: '新版本已下载完成',
        detail: '重启 ERP 工作台后会自动完成更新。'
      }).then(({ response }) => {
        if (response === 0) {
          autoUpdater.quitAndInstall()
        }
      })
    })
    autoUpdater.checkForUpdates().catch(() => {})
  }

  app.whenReady().then(() => {
    createWindow()
    if (app.isPackaged) {
      checkForUpdates()
    }

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}
