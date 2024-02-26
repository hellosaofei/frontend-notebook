## 如何使 div 元素水平垂直居中

```html
<div class="parent">
  <div class="child"></div>
</div>
```

- 父元素弹性布局

```css
div.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
/*或*/
div.parent {
  display: flex;
}
div.child {
  margin: auto;
}
```

- 使用相对定位与绝对定位

```css
div.parent {
  position: relative;
}
div.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- 使用栅格布局

```css
div.parent {
  display: grid;
}
div.child {
  justify-self: center;
  align-self: center;
}
```
