module.exports = {
    publishers: [
      {
        name: '@electron-forge/publisher-github',
        config: {
          repository: {
            owner: 'molufengyin',
            name: 'Electron'
          },
          prerelease: false,
          draft: true
        }
      }
    ]
  }