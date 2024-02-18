下载 xshell 和 xftp 家庭学校版

使用 xshell 连接阿里云服务器
<img src="../pic/xshell连接阿里云服务器.png">

点击或者拖拽上传文件
<img src="../pic/xftp上传文件.png">

## linux 命令

cd 路径名

clear 清空

mv 当前目录下文件夹名称 指定文件夹路径 将当前文件夹下的文件移动到指定的文件夹下

sync 将数据同步到硬盘中，linux 系统中没有报错就代表命令执行成功
shutdown 关机，可能会丢失数据，可以先执行 sync 命令保存数据
shutdown -h 10 10 分钟后关机
shutdown -h now 立马关机
shutdown -h 20:25 指定时间关机
shutdown -h +10
reboot 重启，相当于 shutdown -r now
halt 关闭系统，相当于 shutdown -h now 和 poweroff

## linux 其他命令

### yum 命令

- 基于 RPM 包管理，可从指定的服务器自动下载 RPM 包并安装，自动处理依赖性关系病一次性安装所有依赖的安装包
- 语法：yum [options] [command] [package]

1. options:可选 (-h:帮助，-y:安装过程的提示选择全部为 yes，-q：不显示安装过程)
2. command:要执行的操作
3. package：安装的包名

###

### sudo 命令

- 以管理员身份执行指令
- 语法：sudo [options] [command]

| 常用 options | 描述                                   |
| ------------ | -------------------------------------- |
| -b           | 命令后台执行                           |
| -h           | 查看帮助                               |
| -V           | 显示版本信息                           |
| -l           | 显示当前用户哪些被 sudo 服务授权的命令 |

### linux 系统根目录文件夹

<img src="../pic/linux根目录文件夹.png">

ls 路径名 查看指定目录下的文件
|linux 系统根目录文件夹|描述||
|---|---|---|
·/bin|bin 是 Binary 的缩写,这个目录存放着最经常使用的命令。
·/boot|这里存放的是启动 Linux 时使用的一些核心文件,包括一些连接文件以及镜像文件。(不要动)
·/dev|dev 是 Device(设备)的缩写,存放的是 Linux 的外部设备,在 Linux 中访问设备的方式和访问文件的方式是相同的。
·/etc|这个目录用来存放所有的系统管理所需要的配置文件和子目录。
·/home|用户的主目录,在 Linux 中,每个用户都有一个自己的目录,一般该目录名是以用户的账号命名的。
·/lib|这个目录里存放着系统最基本的动态连接共享库,其作用类似于 Windows 里的 DLL 文件。(不要动)
·/lost+found|这个目录一般情况下是空的,当系统非法关机后,这里就存放了一些文件。(存放突然关机的一些文件)
·/media|linux 系统会自动识别一些设备,例如 U 盘、光驱等等,当识别后,linux 会把识别的设备挂载到这个目录下。
·/mnt|系统提供该目录是为了让用户临时挂载别的文件系统的,我们可以将光驱挂载在/mnt/上,然后进入该目录就可以查看光驱里的内容了。(我们后面会把一些本地文件挂载在这个目录下)
·/opt|这是给主机额外安装软件所摆放的目录。比如你安装一个 ORACLE 数据库则就可以放到这个目录下。默认是空的。
·/proc|这个目录是一个虚拟的目录,它是系统内存的映射,我们可以通过直接访问这个目录来获取系统信息。(不用管)
·/root|该目录为系统管理员,也称作超级权限者的用户主目录。
·/sbin|s 就是 Super User 的意思,这里存放的是系统管理员使用的系统管理程序。
·/srv|该目录存放一些服务启动之后需要提取的数据。
·/sys|这是 linux2.6 内核的一个很大的变化。该目录下安装了 2.6 内核中新出现的一个文件系统 sysfs。
·/tmp|这个目录是用来存放一些临时文件的。用完即丢的文件,可以放在这个目录下,安装包!
·/usr|这是一个非常重要的目录,用户的很多应用程序和文件都放在这个目录下,类似于 windows 下的 program files 目录。
·/usr/bin|系统用户使用的应用程序。
·/usr/sbin|超级用户使用的比较高级的管理程序和系统守护程序。Super
·/usr/src|内核源代码默认的放置目录。
·/var|这个目录中存放着在不断扩充着的东西,我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。
·/run|是一个临时文件系统,存储系统启动以来的信息。当系统重启时,这个目录下的文件应该被删掉或清除。
·/www|存放服务器网站相关的资源,环境,网站的项目

开机将启动会为很多程序，windows 中称为 service 服务，linux 中称为 daemon 守护进程

## 常用基本命令

### 目录管理

> cd 指定目录，绝对路径用/开头，相对路径
> cd ./ 当前目录
> cd .. 返回上一级目录

<img src="../pic/cd目录管理.png">

<img src="../pic/cd命令绝对目录和相对目录.png">

> ls  
> -a all,查看全部文件，包括隐藏文件
> -l 列出所有文件，包括文件属性和权限

所有 linux 命令均可以

> pwd 显示当前用户所在的目录

<img src="../pic/pwd命令.png">

> mkdir 文件夹名称 创建文件夹

mkdir -p 文件夹名称 表示递归一次性创建多个目录
<img src="../pic/mkdir命令.png">

> rmdir 文件夹名称 删除文件夹，仅能够删除空文件夹
> rmdir -p 文件夹名称 表示递归一次性删除多个目录

<img src="../pic/rmdir删除文件夹.png">

> cp 要复制的文件 文件夹路径

<img src="../pic/cp命令.png">

> rm 移除文件或者目录
> -f 忽略不存在的文件，不会出现警告，强制删除
> -r 递归删除目录
> -i 互动，删除询问

<img src="../pic/rm命令.png">

> mv 当前目录下文件夹名称 指定文件夹路径

将当前文件夹下的文件移动到指定的文件夹下或者重命名文件
<img src="../pic/mv 移动命令.png">

### 文件基本属性

每个文件小户型由左边第一部分的 10 个字符确定
<img src="../pic/linux文件属性首字母.png">
首字符：
d:代表目录 -：代表文件
l:代表链接文档 link file
接下来的字符三个为一组，且均为【rwx】三个参数的组合，分别代表可读可写可执行，三个权限的位置不会改变，如果没有相关权限将会出现减号【-】

<img src="../pic/linux权限表.png">

属主权限：该文件所有者权限
属组权限：文件所有者的同组用户
linux 系统用户按组分类，一个用户属于一个或多个组
<img src='../pic/linux文件属性.png'>

chgrp：更改文件属组

> chgrp [-R] 属组名 文件名

chown：更改文件属主，也可同时更改文件属组

> chown [-R] 属组名 文件名
> chgrp [-R] 属主名：属组名 文件名

<img src="../pic/修改文件属主与属组.png">

chmod 更改文件的 9 个属性

### 文件内容查看

- cat+文件名 从第一行开始显示文件内容，用于读文章或者读取配置信息

- tac+文件名 从最后一行开始显示文件内容

<img src="../pic/cat命令查看文件信息.png">

- nl+文件名 显示行号，常用于看代码
  <img src="../pic/nl命令.png">

- more+文件名 一行一行看文件，空格代表翻页、enter 代表向下看一行、q 键退出
  <img src="../pic/linux命令/more命令.png">

- less +文件名 一行行看文件，pgUp 和 pgDown 向上或向下翻页，空格代表翻页，在下方的绿色光标处，输入/+字符串：向下查询文件中的字符串，输入？+字符串：向上查询文件中的字符串，同时使用 n 继续搜索下一个，N 继续搜索上一个
  <img src="../pic/linux命令/less命令及其扩展.png">
- head+文件名 只看文件头几行

- tail+文件名 只看文件末尾几行
  通过-n 参数控制需要查看的行数
  <img src="../pic/linux命令/head与tail命令.png">

-ifconfig 命令查看 linux 系统网络配置信息
<img src="../pic/linux命令/ifconfig命令查看linux网络配置信息.png">

### 系统账号管理

linux 多用户多任务的分时操作系统，
任何使用系统资源的用户，需要首先由 root 用户分发账号

其他用户账号方便 root 用户进行追踪，控制其对系统资源的访问

需要完成的工作

- 用户账号管理、删除、修改
- 用户口令管理
- 用户组的管理

#### 添加用户

> useradd -选项 用户名

- 选项 :
  -c comment： 指定一段注释性描述。
  -d 目录 ：指定用户主目录，如果此目录不存在，则同时使用-m 选项，可以创建主目录。
  -g 用户组 ：指定用户所属的用户组。
  -G 用户组：用户组 指定用户所属的附加组。
  -m 　使用者目录如不存在则自动建立。
  -s Shell 文件： 指定用户的登录 Shell。
  -u 用户号 ：指定用户的用户号，如果同时有-o 选项，则可以重复使用其他用户的标识号。

- 用户名 :
  指定新账号的登录名。

<img src="pic/linux命令/useradd命令.png">

<img src="pic/linux命令/useradd命令1.png">

#### 删除用户

> userdel -选项 用户名

删除一个已有的用户账号

删除用户账号就是要将/etc/passwd 等系统文件中的该用户记录删除，必要时还删除用户的主目录。

- 常用选项
  -r，把用户的主目录一起删除。

```shell
[root@iZ8vbcfzzlgpvle2h0f3ztZ /]# userdel -r newuser1
```

此命令删除用户 kuangshen 在系统文件中（主要是/etc/passwd, /etc/shadow, /etc/group 等）的记录，同时删除用户的主目录。

#### 修改用户

> usermod -选项 其他信息

修改已有用户的信息

修改用户账号就是根据实际情况更改用户的有关属性，如用户号、主目录、用户组、登录 Shell 等。

常用的选项包括-c, -d, -m, -g, -G, -s, -u 以及-o 等，这些选项的意义与 useradd 命令中的选项一样，可以为用户指定新的资源值。

例如：

```shell
# usermod -s /bin/ksh -d /home/z –g developer kuangshen
```

此命令将用户 kuangshen 的登录 Shell 修改为 ksh，主目录改为/home/z，用户组改为 developer。

#### 切换用户账号与修改主机名

> su 用户名

<img src="pic/linux命令/认识linux命令行.png">
<img src="pic/linux命令/切换用户.png">

阿里云服务器的主机名初始时为一串随机字符串，使用 hostname 命令进行修改
<img src="pic/linux命令/修改主机名.png">

#### 用户口令（密码）管理

用户账号刚创建时没有口令，但是被系统锁定，无法使用，必须为其指定口令后才可以使用，即使是指定空口令。

指定和修改用户口令的 Shell 命令是 passwd。超级用户可以为自己和其他用户指定口令，普通用户只能用它修改自己的口令。

> passwd 选项 用户名

- 选项：
  -l 锁定口令，即禁用账号。
  -u 口令解锁。
  -d 使账号无口令。
  -f 强迫用户下次登录时修改口令。

**普通用户 kuangshen 修改自己的口令：**

```shell
$ passwd
Old password:******
New password:*******
Re-enter new password:*******

# 普通用户修改自己的口令时，passwd命令会先询问原口令，验证后再要求用户输入两遍新口令，如果两次输入的口令一致，则将这个口令指定给用户
```

**root 用户修改其他用户的口令**

```shell
# passwd kuangshen
New password:*******
Re-enter new password:*******
# 超级用户为用户指定口令时，就不需要知道原口令
```

为了系统安全起见，用户应该选择比较复杂的口令，例如最好使用 8 位长的口令，口令中包含有大写、小写字母和数字，并且应该与姓名、生日等不相同。

**删除该用户密码且不允许用户登录**

```shell
# passwd -d kuangshen
```

此命令将用户 kuangshen 的口令删除，这样用户 kuangshen 下一次登录时，系统就不再允许该用户登录了。

**使用 -l(lock) 选项锁定某一用户，使其不能登录**

```shell
# passwd -l kuangshen
```

### linux 用户组管理

每个用户都有一个用户组，系统可对用户组中的所有用户集中管理

用户组管理涉及用户组添加、删除、修改等操作实质上是对系统中文件/etc/group 的更新

#### 创建用户组

> 查看用户组
> <img src="pic/linux命令/查看用户组.png">

```shell
groupadd 选项 用户组
```

- 选项：
  -g GID ：指定新用户组的组标识号（GID）。
  -o ：一般与-g 选项同时使用，表示新用户组的 GID 可以与系统已有用户组的 GID 相同。

实例 1：

```shell
# groupadd group1
```

此命令向系统中增加了一个新组 group1，新组的组标识号是在当前已有的最大组标识号的基础上加 1。

实例 2：

```shell
# groupadd -g 101 group2
```

此命令向系统中增加了一个新组 group2，同时指定新组的组标识号是 101。

#### 删除用户组

如果要删除一个已有的用户组，使用 groupdel 命令

groupdel 用户组
例如：

```shell
# groupdel group1
```

此命令从系统中删除组 group1。

#### 修改用户组

修改用户组的属性使用 groupmod 命令

```shell
groupmod 选项 用户组
```

- 选项
  -g GID ：为用户组指定新的组标识号。
  -o ：与-g 选项同时使用，用户组的新 GID 可以与系统已有用户组的 GID 相同。
  -n 新组名 旧组名：修改用户组名称

-n 新用户组 将用户组的名字改为新名字

```shell
# 此命令将组group2的组标识号修改为102。
groupmod -g 102 group2
```

```shell
# 将组group2的标识号改为10000，组名修改为group3。
groupmod –g 10000 -n group3 group2

```

#### 切换用户所在的组

如果一个用户同时属于多个用户组，那么用户可以在用户组之间切换，以便具有其他用户组的权限。

用户可以在登录后，使用命令 newgrp 切换到其他用户组，这个命令的参数就是目的用户组。例如：

```shell
$ newgrp root
```

这条命令将当前用户切换到 root 用户组，前提条件是 root 用户组确实是该用户的主组或附加组。

#### /etc/passwd 文件内容

Linux 系统中的每个用户都在/etc/passwd 文件中有一个对应的记录行，它记录了这个用户的一些基本属性。

```shell
[root@gulihangjiang home]# cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
halt:x:7:0:halt:/sbin:/sbin/halt
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
games:x:12:100:games:/usr/games:/sbin/nologin
ftp:x:14:50:FTP User:/var/ftp:/sbin/nologin
nobody:x:99:99:Nobody:/:/sbin/nologin
systemd-network:x:192:192:systemd Network Management:/:/sbin/nologin
dbus:x:81:81:System message bus:/:/sbin/nologin
polkitd:x:999:998:User for polkitd:/:/sbin/nologin
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
postfix:x:89:89::/var/spool/postfix:/sbin/nologin
chrony:x:998:996::/var/lib/chrony:/sbin/nologin
nscd:x:28:28:NSCD Daemon:/:/sbin/nologin
tcpdump:x:72:72::/:/sbin/nologin
ntp:x:38:38::/etc/ntp:/sbin/nologin
www:x:1000:1000::/home/www:/sbin/nologin
mysql:x:1001:1001::/home/mysql:/sbin/nologin
newuser1:x:1002:1002::/home/newuser1:/bin/bash
```

这个文件对所有用户都是可读的。每一行代表
<img src="pic/linux命令/passwd文件查看.png">

1）"用户名"是代表用户账号的字符串。

通常长度不超过 8 个字符，并且由大小写字母和/或数字组成。登录名中不能有冒号，因为冒号在这里是分隔符。

为了兼容起见，登录名中最好不要包含点字符(.)，并且不使用连字符(-)和加号(+)打头。

2）“口令”一些系统中，存放着加密后的用户口令字。

虽然这个字段存放的只是用户口令的加密串，不是明文，但是由于/etc/passwd 文件对所有用户都可读，所以这仍是一个安全隐患。因此，现在许多 Linux 系统（如 SVR4）都使用了 shadow 技术，把真正的加密后的用户口令字存放到/etc/shadow 文件中，而在/etc/passwd 文件的口令字段中只存放一个特殊的字符，例如“x”或者“\*”。

3）“用户标识号”是一个整数，系统内部用它来标识用户。

一般情况下它与用户名是一一对应的。如果几个用户名对应的用户标识号是一样的，系统内部将把它们视为同一个用户，但是它们可以有不同的口令、不同的主目录以及不同的登录 Shell 等。

通常用户标识号的取值范围是 0 ～ 65 535。0 是超级用户 root 的标识号，1 ～ 99 由系统保留，作为管理账号，普通用户的标识号从 100 开始。在 Linux 系统中，这个界限是 500。

4）“组标识号”字段记录的是用户所属的用户组。

它对应着/etc/group 文件中的一条记录。

5)“注释性描述”字段记录着用户的一些个人情况。

例如用户的真实姓名、电话、地址等，这个字段并没有什么实际的用途。在不同的 Linux 系统中，这个字段的格式并没有统一。在许多 Linux 系统中，这个字段存放的是一段任意的注释性描述文字，用作 finger 命令的输出。

6)“主目录”，也就是用户的起始工作目录。

它是用户在登录到系统之后所处的目录。在大多数系统中，各用户的主目录都被组织在同一个特定的目录下，而用户主目录的名称就是该用户的登录名。各用户对自己的主目录有读、写、执行（搜索）权限，其他用户对此目录的访问权限则根据具体情况设置。

7)用户登录后，要启动一个进程，负责将用户的操作传给内核，这个进程是用户登录到系统后运行的命令解释器或某个特定的程序，即 Shell。

Shell 是用户与 Linux 系统之间的接口。Linux 的 Shell 有许多种，每种都有不同的特点。常用的有 sh(Bourne Shell), csh(C Shell), ksh(Korn Shell), tcsh(TENEX/TOPS-20 type C Shell), bash(Bourne Again Shell)等。

系统管理员可以根据系统情况和用户习惯为用户指定某个 Shell。如果不指定 Shell，那么系统使用 sh 为默认的登录 Shell，即这个字段的值为/bin/sh。

用户的登录 Shell 也可以指定为某个特定的程序（此程序不是一个命令解释器）。

利用这一特点，我们可以限制用户只能运行指定的应用程序，在该应用程序运行结束后，用户就自动退出了系统。有些 Linux 系统要求只有那些在系统中登记了的程序才能出现在这个字段中。

8)系统中有一类用户称为伪用户（pseudo users）。

这些用户在/etc/passwd 文件中也占有一条记录，但是不能登录，因为它们的登录 Shell 为空。它们的存在主要是方便系统管理，满足相应的系统进程对文件属主的要求。

### linux 磁盘管理

#### df 命令查看系统整体磁盘使用量

> df -参数 [目录或文件名称]

- 参数
  -a ：列出所有的文件系统，包括系统特有的 /proc 等文件系统；
  -k ：以 KBytes 的容量显示各文件系统；默认以 1 KBytes 的容量来列出来！
  -m ：以 MBytes 的容量显示各文件系统；
  -h ：以人们较易阅读的 GBytes, MBytes, KBytes 等格式自行显示；
  -H ：以 M=1000K 取代 M=1024K 的进位方式；
  -T ：显示文件系统类型, 连同该 partition 的 filesystem 名称 (例如 ext3) 也列出；
  -i ：不用硬盘容量，而以 inode 的数量来显示

<img src="pic/linux命令/df命令.png">

将/etc 底下的可用的磁盘容量以易读的容量格式显示
<img src="pic/linux命令/df命令2.png">

#### du 命令对文件和目录磁盘使用的空间查看

> du [-ahskm] 文件或目录名称

- 选项：
  -a ：列出所有的文件与目录容量，因为默认仅统计目录底下的文件量而已。可看到子文件夹
  -h ：以人们较易读的容量格式 (G/M) 显示；
  -s ：列出总量而已，而不列出每个各别的目录占用容量；
  -S ：不包括子目录下的总计，与 -s 有点差别。
  -k ：以 KBytes 列出容量显示；
  -m ：以 MBytes 列出容量显示；

<img src="pic/linux命令/du命令.png">

```shell
# 只列出当前目录下的所有文件夹容量（包括隐藏文件夹）:
# 直接输入 du 没有加任何选项时，则 du 会分析当前所在目录的文件与目录所占用的硬盘空间。
[root@kuangshen home]# du
16./redis
8./www/.oracle_jre_usage  # 包括隐藏文件的目录
24./www
48.                        # 这个目录(.)所占用的总量
...
```

```shell
# 检查根目录底下每个目录所占用的容量
[root@kuangshen home]# du -sm /*
0/bin
146/boot
.....中间省略....
0/proc
.....中间省略....
1/tmp
3026/usr  # 系统初期最大就是他了啦！
513/var
2666/www
```

通配符 \* 来代表每个目录。与 df 不一样的是，du 这个命令其实会直接到文件系统内去搜寻所有的文件数据。

### 进程管理

每个程序都有自己的进程，PID 号

每个进程都有父进程

进程两种存在方式，前台后台

服务一般都在后台运行，程序一般都在前台运行

#### 查看进程信息

> ps -选项|grep 进程名

选项
-a 显示当前终端运行的所有进程信息
-u 以用户信息显示进程
-x 显示后台运行的进程的参数

#### 查看进程树与父进程信息

> ps -ef|grep 应用名

<img src="pic/linux命令/ps-ef命令.png">

> ptree -选项

- 选项
  -p 显示父 id
  -u 显示用户组
  <img src="pic/linux命令/pstree命令.png">

#### 进程结束

> kill -9 进程 PID

强制结束该进程
