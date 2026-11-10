const { app, BrowserWindow, Menu } = require('electron/main')

Menu.setApplicationMenu(null)

const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 1100,
    minHeight: 700,
    title: 'ERP 工作台',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (process.env.ELECTRON_START_URL) {
    win.loadURL(process.env.ELECTRON_START_URL)
    return
  }

  win.loadFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
}

app.whenReady().then(() => {
  createWindow()

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

require('update-electron-app')()