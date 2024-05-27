# 实用的 bash 命令

## 问题一：shell 文件参数传递问题

定义了一个 shell 文件 test.sh，里面有这样的内容：echo "${info}"，现在我通过 bash 命令行执行该文件，请问该怎么在执行 bash test.sh 命令时动态添加参数

**有什么用？**
在 vue 项目完成后，需要使用 git 上传至远程仓库，这时候通常把命令写在一个 shell 文件中，如果远程仓库不是公开的，此时执行`git push`命令时，通常要携带一个 token，而这个 token 我们可以以变量的形式写在 shell 文件中，然后执行时动态传入

方法一：使用环境变量

- 定义

```sh
# test.sh
echo "First parameter: ${info1}"
echo "Second parameter: ${info2}"
```

- 执行

```sh
info1='张三' info2='李四' bash test.sh
```

方法二：命令行参数

- 定义

```sh
# test.sh
info1="$1"
info2="$2"
echo "First parameter: ${info1}"
echo "Second parameter: ${info2}"
```

- 执行

```sh
bash test.sh '张收纳' '李四'
```
