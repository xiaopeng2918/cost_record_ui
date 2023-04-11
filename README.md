# cost_record_ui

- node V16.13.2
- npm 8.1.2 1.项目搭建

```
npm create vite@latest cost_record_ui -- --template vue
```

[参考](https://cn.vitejs.dev/guide/)

2.安装依赖

```
npm install
```

3.启动（开发模式）

```
npm run dev
```

4.删除无用 只留下`main.tsx` 与 `app.tsx`

5.安装 react-dom-router

6.路径别名

- tsconfig.json
- vite.config.ts
- 安装`@type/node` 因为会用到 path

  7.引入 zarm

```
npm install zarm -S
```

`main.jsx`引入样式与字体文件

```js
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import 'zarm/dist/zarm.css'
```

> 注意此处 vite.config.js 文件中一定要配置 js 的拓展名 不然查不到这个字体文件

**配置按需引入 zarm 为了后续减小项目打包体积**

配置前：
![alt 配置前打包体积](https://yxp2918-1304563104.cos.ap-chongqing.myqcloud.com/blog-pictures/20230411125143.png)

配置

```
npm i vite-plugin-style-import -D
```

在 `vite.config.js`配置如下

```js
import { createStyleImportPlugin } from 'vite-plugin-style-import'

plugins: [
  createStyleImportPlugin({
    libs: [
      {
        libraryName: 'zarm',
        esModule: true,
        resolveStyle: (name) => {
          return `zarm/es/${name}/style/css`
        }
      }
    ]
  })
]
```

配置后
在配置完之后再次执行 `npm run build`时 提示我缺少`consola` 一个日志记录工具包
默认情况下安装@3 版本，导致命令行中文乱码，降低版本至@2,得到解决

![alt 配置后打包体积](https://yxp2918-1304563104.cos.ap-chongqing.myqcloud.com/blog-pictures/20230411135119.png)
css 体积 164->30 的优化

> 注意要把之前 zarm 全局注入的样式和字体文件删除，这样才能看到 css 打包体积明显减少 8.配置 less

```
npm i less -D
```

vite.config.js

```js
{
  plugins: [...]
  css: {
    modules: {
      localsConvention: 'dashesOnly'
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },
}
```

9.移动端适配 Rem

```
npm i lib-flexible -S
```

main.tsx 文件中引入

```js
import 'lib-flexible/flexible'
```

安装 `postcss-pxtorem` :它的作用是在你编写完 css 后，将你的单位自动转化为 rem 单位。

```
npm i postcss-pxtorem
```

在项目根目录新建 `postcss.config.cjs` 为什么是 cjs 因为它里面是 cjs 模块语法，所以要用后缀名 `cjs` 不然会报错
配置如下

```js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
      selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
    }
  }
}
```

重新启动项目 `npm run dev` 使配置生效

10.配置 axios

```
npm install axios -S
```

工具类文件创建...axios 请求封装等 这里不赘述

11.代理配置(开发阶段跨域问题)
`vite.config.ts`

```ts
server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
```

12.别名配置
`vite.config.ts`与`tsconfig.json`都进行配置下

## 参考

[阿里巴巴矢量库](https://www.iconfont.cn/) 网页 logo
