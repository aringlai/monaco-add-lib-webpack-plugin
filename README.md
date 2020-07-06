# monaco-add-lib-webpack-plugin
 给monaco-editor注册类库ts的定义文件，code时智能提示

## Installing
```sh
npm install monaco-add-lib-webpack-plugin
```

## Using
* `webpack.config.js`:
```js
const MonacoAddLibWebpackPlugin = require('monaco-add-lib-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.ttf$/,
      use: ['file-loader']
    }]
  },
  plugins: [
    new MonacoAddLibWebpackPlugin(['node_modules/@types/node'])
  ]
};
```

* `index.js`:
```js
import * as monaco from 'monaco-editor'
monaco.editor.create(document.getElementById('container'), {
  value: `
    const fs = require('fs')
    fs.readFile('/path')
  `,
  language: 'javascript'
});
```

## Options

* `paths` (`Array<string>`) - 需要加载的类库定义文件本地路径列表，例如：`node_modules/@types/node`
  * default value: `[]`.