# cost_record_ui
- node V16.13.2
- npm 8.1.2
1.项目搭建
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

5.安装react-dom-router



6.路径别名
- tsconfig.json
- vite.config.ts
- 安装`@type/node` 因为会用到path 

7.引入zarm
```
npm install zarm -S
```
`main.jsx`引入样式与字体文件

```js
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import 'zarm/dist/zarm.css'
```
> 注意此处vite.config.js文件中一定要配置 js的拓展名 不然查不到这个字体文件
