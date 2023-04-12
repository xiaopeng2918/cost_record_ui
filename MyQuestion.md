# Project Question

## Zarm 组件 如何给Tabbar.Item添加自定义类名呀？

正常添加自定义类名 为什么会覆盖组件原先的类名？

覆盖就会导致onChange动态添加 active样式失败

如果使用模板字符串 同时加入原先类名 和自定义类名 可以实现添加自定义类名 可是为什么onChange不能动态添加active样式呢？ ->为了调整字体和图表的距离问题

解决：最后用less的 嵌套语法 纯用标签添加的自定义属性
卡我很久 这个要扒控制台标签嵌套😪

## 使用module.less解决无法设置Zarm组件类名样式的问题
组件库 Zarm 内的 dom 类名还是叫 za-list。所以为了不加 hash，就需要这样操作 使用global::
```css
.form {
  :global {
    .za-list {
      color: red;
    }
  }
}
```