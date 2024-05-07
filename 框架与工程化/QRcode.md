# 安装

```shell
npm install --save qrcode
```

# API

## 浏览器端

create()

## toCanvas(canvasElement, text, [options], [cb(error)])

参数
**canvasElement**
Type：DOM 元素
Desc：绘制二维码的画布
Other：可省略，省略后该函数返回一个 canvas 对象

**text**
Type:String|type
Desc:要编码的文本或描述片段的对象列表。

**options**
Other：见 options

**cb**
Type：回调函数

```html
<div id="myqrcode"></div>
<script type="text/javascript">
  const options = {
    errorCorrectionLevel: "L", //容错率L（低）H(高)
    margin: 1, //二维码内边距，默认为4。单位px
    height: 200, //二维码高度
    width: 200, //二维码宽度
    scal: 177,
    color: {
      dark: "#000", // 二维码背景颜色
      // light: '#000' // 二维码前景颜色
    },
    rendererOpts: {
      quality: 0.9,
    },
  };
  QRCode.toCanvas("二维码信息文本", options)
    .then((canvas) => {
      document.getElementById("myqrcode").append(canvas);
    })
    .catch((err) => {
      console.log(err);
    });
</script>
```

## toDataURL(canvasElement, text, [options], [cb(error, url)])

返回生成二维码的 base64 格式

参数
**canvasElement**
Type：DOM 元素
Desc：绘制二维码的画布
Other：可省略，省略后该函数返回一个 canvas 对象

**text**
Type:String|type
Desc:要编码的文本或描述片段的对象列表。

**options**
特殊设置

- type:string

  > - 默认值：image/png
  > - 其他值：image/png, image/jpeg, image/webp

- rendererOpts.quality
  > - 默认值：0.92
  > - 其他值：

**cb**
同上

toString()

## node-server 端

create()
toCanvas()
toDataURL()

### toString(text, [options], [cb(error, string)])

```js
/*

    █▀▀▀▀▀█ █ ▄█  ▀ █ █▀▀▀▀▀█
    █ ███ █ ▀█▄▀▄█ ▀▄ █ ███ █
    █ ▀▀▀ █ ▀▄ ▄ ▄▀ █ █ ▀▀▀ █
    ▀▀▀▀▀▀▀ ▀ ▀ █▄▀ █ ▀▀▀▀▀▀▀
    ▀▄ ▀▀▀▀█▀▀█▄ ▄█▄▀█ ▄█▄██▀
    █▄ ▄▀▀▀▄▄█ █▀▀▄█▀ ▀█ █▄▄█
    █▄ ▄█▄▀█▄▄  ▀ ▄██▀▀ ▄  ▄▀
    █▀▄▄▄▄▀▀█▀▀█▀▀▀█ ▀ ▄█▀█▀█
    ▀ ▀▀▀▀▀▀███▄▄▄▀ █▀▀▀█ ▀█
    █▀▀▀▀▀█ █▀█▀▄ ▄▄█ ▀ █▀ ▄█
    █ ███ █ █ █ ▀▀██▀███▀█ ██
    █ ▀▀▀ █  █▀ ▀ █ ▀▀▄██ ███
    ▀▀▀▀▀▀▀ ▀▀▀  ▀▀ ▀    ▀  ▀
*/
```

toFile()
toFileStream()

# 关于 QRcode options

## version

color：指定 QR 码图像的颜色

dark：二维码主体颜色，
light：二维码背景颜色

Type：指定期望的输出类型，
例如数据 URL 中的 image / png，image / jpeg，image / webp 和 utf8，SVG，字符串中的终端。

quality：设置图像的质量，范围为 0-1。 默认值为 0.92，仅适用于 image / jpeg 和 image / webp 类型

width：设置图像的边长
如果 width 太小而不能包含二维码的全部信息符号，则此选项将被忽略。

margin：设置图像的外边框距离

scale：设置每几个像素为一个信息点默认为 4

# 其他

## qrcode 同时支持 es567 语法

```js
import QRCode from "qrcode";

// es5回调函数
QRCode.toString("http://www.google.com", function (err, string) {
  if (err) throw err;
  console.log(string);
});
// es6 promises
QRCode.toDataURL("I am a pony!")
  .then((url) => {
    console.log(url);
  })
  .catch((err) => {
    console.error(err);
  });

// es7 async/await
const generateQR = async (text) => {
  try {
    console.log(await QRCode.toDataURL(text));
  } catch (err) {
    console.error(err);
  }
};
```
