docker 安装
docker 命令
镜像命令
容器命令
操作命令
....
docker 镜像：docker 与服务器和数据是隔离开的
容器数据卷
dockerFile:自己作镜像
docker 网络原理
Idea 整合

docker compose 集群
docker swarm 集群管理
CI、CD jenkins

docker 出现
开发--上线
应用环境、应用配置
环境配置十分麻烦
发布一个项目，项目能不能带环境安装打包

docker 历史
2010，pass 的云计算服务，LXC 有关的容器技术
容器化技术命名为 docker，没有引起注意，创始人做开源

2013，docker 做开源，引起开发者注意，火了，每个月发布一个版本
2014 docker1.0 发布

相对于虚拟机，轻便，都是虚拟化技术
虚拟机需要模拟硬件，VMware 笨重

docker 基于 go 开发
docker 官网：
dockerhub：

docker 应用
VMware 虚拟机技术：虚拟出一条硬件、运行完整的操作系统，并在其上面安装和运行软件

缺点：

1. 资源占用多
2. 冗余步骤
3. 启动慢
   <img src="./pic/VMware虚拟机工作原理.png">

docker：应用直接运行在宿主机操作系统内核之上，每个容器没有自己的内核，也没有虚拟硬件，每个容器间相互隔离，且都拥有自己的文件系统
<img src="../pic/docker运行原理.png">

DevOps（开发运维）
**应用更快速交付和部署**
docker 打包镜像发布测试一键运行
**更便捷的升级和扩容**

**更简单的系统运维**
容器化之后，开发测试环境高度一致
**更高效的资源利用**
可以在一个物理机上运行多个容器实例

# docker 安装

使用 xshell 连接远程服务器

```sh
[root@gulihangjiang ~]# cd /
[root@gulihangjiang /]# ls
bin   dev  home  lib64   media  opt    proc  run   srv  tmp  var
boot  etc  lib   lost+found  mnt    patch  root  sbin  sys  usr  www
```

环境查看

```sh
# 系统版本
[root@gulihangjiang /]# cat etc/os-release
NAME="CentOS Linux"
VERSION="7 (Core)"
ID="centos"
ID_LIKE="rhel fedora"
VERSION_ID="7"
PRETTY_NAME="CentOS Linux 7 (Core)"
ANSI_COLOR="0;31"
CPE_NAME="cpe:/o:centos:centos:7"
HOME_URL="https://www.centos.org/"
BUG_REPORT_URL="https://bugs.centos.org/"

CENTOS_MANTISBT_PROJECT="CentOS-7"
CENTOS_MANTISBT_PROJECT_VERSION="7"
REDHAT_SUPPORT_PRODUCT="centos"
REDHAT_SUPPORT_PRODUCT_VERSION="7"
```

帮助文档

```sh
# 1. 卸载旧版本
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

# 2. 安装依赖包
yum install -y yum-utils

# 3. 设置docker镜像仓库:推荐使用阿里云镜像
yum-config-manager \
   --add-repo \
   http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 4. 安装docker 相关包
# 5. docker-ce 社区版
yum install docker-ce \
   docker-ce-cli \
   containerd.io \
   docker-buildx-plugin \
   docker-compose-plugin

# 6. 启动docker
systemctl start docker

# 7. 判断是否启动成功
docker version

# 8. 运行第一个应用
# 启动步骤：尝试寻找镜像、找不到就执行pull命令从镜像仓库进行拉取、拉取成功后自动运行
docker run hello-world

# 9. 查看一下拉取到的镜像
docker images
```

卸载 docker

```shell
# 1. 卸载依赖
yum remove docker-ce \
   docker-ce-cli \
   containerd.io \
   docker-buildx-plugin \
   docker-compose-plugin
# 2. 删除资源
rm -rf /var/lib/docker

```

## 配置阿里云镜像加速服务

```sh


```

## docker run 的流程

## docker 基本命令

- 帮助命令

```sh
# 显示docker版本信息
docker version
# 显示docker详细信息
docker info

# 显示帮助信息
docker 命令 --help
```

帮助文档地址:https://docs.docker.com/reference

### 镜像命令

- 查看本机镜像

```sh
# 查看本机上的所有镜像，包括镜像源、版本、ID、时间、大小
# - a 所有
# - q 只显示镜像ID
docker images --【选项】
```

- 搜索 docker 镜像

```sh
# 搜索docker镜像
# --filter=STARS=3000 搜索3000收藏以上的
docker search 【镜像名】

[root@gulihangjiang /]# docker search mysql
NAME                            DESCRIPTION                                     STARS     OFFICIAL
mysql                           MySQL is a widely used, open-source relation…   15079     [OK]
mariadb                         MariaDB Server is a high performing open sou…   5749      [OK]
percona                         Percona Server is a fork of the MySQL relati…   628       [OK]
phpmyadmin                      phpMyAdmin - A web interface for MySQL and M…   980       [OK]
circleci/mysql                  MySQL is a widely used, open-source relation…   29
```

- 下载镜像

```sh
# 拉取（下载）镜像
# 默认下载最新的镜像
# 指定版本下载 docker pull mysql:5.7
docker pull 【镜像名】
[root@gulihangjiang /]# docker pull jenkins/jenkins
Using default tag: latest
latest: Pulling from jenkins/jenkins
c6cf28de8a06: Pull complete
5bddd15c8a68: Pull complete
b11bd7049c1d: Pull complete
dfcc064b12cd: Pull complete
7ed2ae47be8a: Pull complete
f27e8522181b: Pull complete
283e2073fc83: Pull complete
8c04c3155009: Pull complete
225d9857ca25: Pull complete
8911d7576406: Pull complete
92224cfe8434: Pull complete
fd1db919f05f: Pull complete
Digest: sha256:b959a064e3082717d393fa7165872bfbc3ec879bf1269a2875629c5a32304e44
Status: Downloaded newer image for jenkins/jenkins:latest
docker.io/jenkins/jenkins:latest
```

- 删除镜像

```sh
docker rmi -f 【镜像ID/镜像名】

# 删除所有镜像
docker rmi -f $(docker images -aq)
```

### 容器命令

- 新建容器并启动

```sh
# 下载一个镜像
docker pull centos

# 启动一个镜像
# --name=【容器名称】 给跑起来的镜像命名，用于区分镜像
# -d 以后台方式运行
# -it 使用交互方式运行，
# -p 指定容器端口
#     方式一： -p ip:主机端口：容器端口
#     方式二： -p 主机端口：容器端口  如8081:8080 将主机的8081端口映射给docker的8080端口
#     方式三： -p 容器端口
# -P 随机指定端口
docker run -it centos /bin/bash

```
