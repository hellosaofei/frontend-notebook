# 应用

## 绘制一个长方形

```html
<body>
  <!-- 生成一个canvas标签 -->
  <canvas width="600" height="400" id="canvas"></canvas>
  <script>
    // 获取画布对象canvas
    const canvas = document.getElementById("canvas");
    // 获取画笔对象
    const context = cavas.getContext("2d");
    context.fillRect(100, 100, 200, 200);
  </script>
</body>
```

```html
<script>
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 400;
  document.append(canvas);

  const context = canvas.getContext("2d");
  context.fillRect(100, 100, 200, 200);
</script>
```
