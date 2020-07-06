const INCLUDE_LOADER_PATH = require.resolve('./loaders/index');
const path = require('path')
const fs = require('fs')

class MonacoDtsWebpackPlugin {

  constructor(paths=[]) {
    this.paths = paths
  }

  apply(complier) {
    let fileList = this.parsePaths(this.paths)
    if (!fileList || fileList.length < 1) return
    let rules = complier.options.module.rules || []
    rules.push({
      test: /monaco-editor[/\\]esm[/\\]vs[/\\]language[/\\]typescript[/\\]monaco.contribution.js/,
      loader: INCLUDE_LOADER_PATH,
      options: { fileList: fileList }
    })
    complier.options.module.rules = rules
  }

  parsePaths(paths = []) {
    let list = []
    paths.forEach(_path => handle(_path))
    function handle (_path) {
      if (/.(js|ts|d.ts)$/.test(_path)) { // 符合的文件路径
        fs.accessSync(path.resolve(_path))
        list.push(path.resolve(_path))
      } else { // 扫描目录下所有文件
        try {
          const dir = fs.readdirSync(path.resolve(_path))
          dir.forEach(child => {
            handle(path.resolve(_path, child))
          })
        } catch (error) {
          // console.log(error)
        }
      }
    }
    return list
  }
}
module.exports = MonacoDtsWebpackPlugin