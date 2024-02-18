## 必要性

软件开发过程，通过文件备份方式管理代码版本，十分不便，使用版本控制工具进行管理

### 版本控制工具 git 与 svn

git：分布式版本控制工具。备份、记录、回滚、共享、团协
svn：集中式版本控制工具,所有版本所有项目放在一个服务器中，
gitee、github：基于 git，分布式版本控制+集中式管理版本项目的仓库，不仅可以分布式互相共享版本，分支合并检验
<img src="../pic/git学习/git与svn.jpg">

### git 使用

在本地建立一个新的空白文件夹，并在该文件夹中进行 git 初始化或者直接使用 clone 命令拉取别人的代码

```shell
#初始化
git init
# 克隆远程仓库
git clone url

```

### git 库使用

<img src='../pic/git学习/git版本库控制.png'>

### git 版本追溯

在 github 或 gitee 上查看历次提交的记录及对应的版本号，而本地则可以使用如下命令进行版本回溯

```shell
git reset --hard 版本号
```

### git 推送三部曲

```shell
git add .       #将工作区代码都上传到暂存区
git commit -m '一些描述性内容'          # 讲暂存区内容提交到分支
git push origin 分支名      //提交到远程仓库
```

<img src="../pic/git学习/git推送流程.png">

### git 拉取

```shell
git pull origin 分支名
```

### git 分支管理

```shell
git branch      #查看分支
git branch 分支名称         # 创建分支
git checkout 分支名称       #切换分支
git push origin 分支名称:分支名称        #本地分支同步到远程分支
git merge 分支名称          #将分支合并到master
```

<img src="../pic/git学习/git分支管理.png">

- 使用 branch 创建新分支后，本地的 git 仓库也会分为 master 和若干子分支，使用 checkout 进行分支切换，对应文件夹里的内容也会发生改变
- 实际开发中经常使用至少三个分支，由于要保证 master 分支始终为稳定的版本，除了 develop 和 master 分支外，其他分支的代码要先合并到 develop 分支中，当 develop 分支中的代码没有问题后再合并到 master
  <img src="../pic/git学习/git版本控制1.png">
