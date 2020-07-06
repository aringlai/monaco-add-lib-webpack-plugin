module.exports = function(src) {
  let fileList = this.query.fileList || []
  let target = src
  fileList.forEach(file => {
    try {
      let data = this.fs._readFileSync(file, 'utf8')
      data = data.replace(/\n/g, '\\n').replace(/\"/g, '\'')
      target = target + '\njavascriptDefaults.addExtraLib("' + data + '","ts:' + file.replace(this.rootContext, '') + '");';
    } catch (error) {
      console.error(error) 
    }
  })
  this.callback(null, target);
  return
}