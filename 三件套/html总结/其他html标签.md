# form 标签

**action**
值类型：URL
描述：规定提交表单的目的 url

**entype**
描述：发送表单数据之前如何对其编码
值类型：application/x-www-form-urlencoded（默认）、multipart/form-data、text/plain

> 设置 form 标签的`entype=application/x-www-form-urlencoded`属性后，本次 http 请求的请求头中的 content-type 的值就是 application/x-www-form-urlencoded。

```html
<form
  action="目的URL"
  method="post"
  enctype="application/x-www-form-urlencoded"
>
  <input type="text" name="username" />
  <input type="text" name="password" />
  <input type="submit" value="上传" />
</form>
```

浏览器会自动把处于 form 标签里的表单元素的内容组织成键值对的方式（key1=val1&key2=val2）。其中，键 就是每个表单元素的 name 属性的值；值就是表单元素的 value 属性的值。键和值都进行了 URL 的转码。

**method**
值类型：POST、GET 描述：提交表单数据时的 HTTP 方法
