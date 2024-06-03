# flex 手写布局

## 圣杯布局

```html
<header>页眉</header>
<main>
  <div class="sidebar-left">左侧栏</div>
  <div class="content">主体内容</div>
  <div class="sidebar-right">右侧栏</div>
</main>
<footer>页脚</footer>
```

```css
body {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
header,
footer {
  height: 50px;
  background-color: #f2f3f4;
}
main {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.sidebar-left,
.sidebar-right {
  width: 200px;
  padding: 20px;
  background-color: #eee;
}
.content {
  flex: 1;
}
```
