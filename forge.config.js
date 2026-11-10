module.exports = {
  packagerConfig: {
    asar: true,
    ignore: [
      /^\/frontend\/node_modules/,
      /^\/frontend\/src/,
      /^\/frontend\/public/,
      /^\/frontend\/vite/,
      /^\/frontend\/html/,
      /^\/frontend\/\.git/,
      /^\/dist($|\/)/,
      /^\/out($|\/)/,
      /^\/\.git/
    ]
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'erp_workbench'
      }
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'molufengyin',
          name: 'Electron'
        },
        prerelease: false,
        draft: true,
        force: true
      }
    }
  ]
}
