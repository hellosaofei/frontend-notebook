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
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["【镜像加速地址】"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker

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

# 退出启动的容器
# 退出并停止
exit
# 退出不停止
exit Ctrl+P+Q
```

- 查看正在运行的容器

```sh
docker ps
#  默认列举当前正在运行的容器
# -a 列举所有容器，包括之前创建过、运行过的容器
# -n=【个数】显示最近创建的容器
# -q 只显示容器ID
```

- 删除容器

```sh
# 删除指定ID的容器
# 默认不能删除当前正在运行的容器
# -f 强制删除
docker rm 【容器ID】

# 递归删除所有容器
docker rm -f $(docker ps -aq)
docker ps -a -q|xargs docker rm
```

- 启动和停止已有的容器

```sh
docker start 【容器ID】

docker restart 【容器ID】

docker stop 【容器ID】

docker kill 【容器ID】
```

## 常用其他命令

- 查看日志

```sh
docker logs --help

# -tf 以日志的形式呈现并显示时间
# --tail 【数字】显示日志的条数
docker logs -f -t --tail 10 【容器ID】
```

- 查看容器中的进程信息

```sh
docker top 【容器ID】
```

- 查看镜像的元数据

```sh
docker inspect 【容器ID】
```

- 进入当前正在运行的容器

```sh

# 方式一
# 进入后打开一个新的终端
docker exec  【容器ID】

# 方式二
# 进入容器正在执行的终端，不会启动新的容器
docker attach  【容器ID】
```

- 从容器内拷贝文件到主机

```sh
docker cp 容器ID:容器内路径 目的主机路径

docker start 【centos容器ID】
docker ps
docker attach 【centos容器ID】
cd /home
ls
touch test.java
exit
docker ps -a
docker cp 【centos容器ID】:home/test.java /home
```

# 案例

## 部署 nginx

```shell
# 1、搜索镜像
# 2、拉取镜像
# 3、查看镜像
# 4、运行镜像
docker run -d \
      --name nginx01 \
      -p 5525:80 \
      nginx

# 5、查看运行的镜像
docker images

# 6、本机测试
curl localhost:3344

# 7、进入容器
docker exec -it nginx01

```

## 部署 mysql

```sh
# 1、 搜索镜像
docker search mysql

# 2. 拉取镜像
docker pull mysql:5.6

# 3. 查看镜像
docker images

#4. 运行Mysql
#  端口映射       -p 3306:3306
#  指定root用户密码  -e MYSQL_ROOT_PASSWORD=xxx
#  指定容器名称      --name mysql01
#  指定运行方式：前台/后台 -d
#  总是运行 --restart=always
#  数据卷映射  -v /root/data:/var/lib/mysql

#  执行镜像 【镜像名】

#  5. 查看运行的仓库
docker ps
#  6. 进入容器
docker exec -it 【容器ID】 bash
#  7. 登录mysql,输入密码
mysql -u root -p
#  8. 查看所有数据库
show databases;
#  9. 创建一个数据库
create database test;
#  10. 选中一个数据库
use test;
#  11. 创建一个数据表
create table t_user(id int primary key auto_increment,name varchar(30));
#  12. 查看所有数据表
show tables;
```

、

## 部署 redis

**redis 持久化方式**

- rgb 持久化：快照 Redis 服务将某一时刻数据以快照文件形式写入磁盘
- aof 持久化：将所有 redis 客户端的写操作以命令式方式记录到日志文件当中（**更安全**）

```sh
# 1、 搜索镜像
docker search redis

# 2. 拉取镜像
docker pull redis:5.0.12

# 3. 查看镜像
docker images

#4. 运行redis
#  端口映射       -p 6379:6379
#  指定容器名称      --name redis01
#  指定运行方式：前台/后台 -d
#  总是运行 --restart=always
#  指定redis持久化方式 aof/rdb  redis-server --appendonly yes
#  数据卷映射 -v /root/redisdata:/data
docker run -p 6379:9003 --name redis01 -d --restart=always -v /root/redisdata:/data redis:5.0.12 redis-server --appendonly yes

#  5. 查看运行的仓库
docker ps
#  6. 查看数据卷映射情况
cd /root/redisdata
# >>> appendonly.aof

#  7. 进入redis容器
docker exec -it redis01 bash
# >>> root@xxx:/data# 【命令】

#  8. 查看当前目录下的文件
ls
# >>> appendonly.aof

#  9. 使用redis-cli操作redis
redis-cli
# >>> 127.0.0.1:6379> 【命令】

#  10. 存一条数据
set age 19
# >>> OK

#  11. 取一条数据
get age

#  12. 退出cli
exit
# >>> root@xxx:/data# 【命令】

#  13. 再次查看appendonly.aof 内容
# *2
# $6
# SELECT
# $1
# 0
# *3
# $3
# set
# $3
# age
# $2
# 19
```

使用自定义 redis 配置文件启动

1. 完整 redis 配置文件：下载 redis 服务，找到配置文件，并简单修改（不建议使用完整的配置文件）
2. 自定义配置文件
   > - 新建 redif.conf 文件
   > - 编辑该文件，输入下面两行内容`appendonly yes`,`appendfilename "【自定义aof文件名】.aof"`
   > - 在服务器`/root`目录下新建文件夹`/redisconf`，将该文件移动到该目录下
   > - 重新启动一个容器，启动命令如下
   >   `docker run -d -p 6379:6379 --restart=always -v /root/redisconf:/data redis:5.0.12 redis-server /data/redis.conf`

```sh
# 其他安装方式
docker run \
--restart-always \
--log-opt max-size=100m \
--log-opt max-file=2 \
-p 6379:6379 \
--name redis \
-v /home/redis/myredis/myredis.conf:/etc/redis/redis/conf \
-v /home/redis/myredis/data:/data \
-d redis:5.0.8 redis-server /etc/redis/redis.conf \
--appendonly yes \
--requirepass helloMyRedis
```

# dockerFile

用于构建 docker 镜像

**构建步骤**

1. 编写 dockerfile 文件
2. docker build 构建成为一个镜像
3. docker run 运行镜像
4. docker push 发布镜像

## dockerFile 指令

```sh
FROM    # 基础镜像
MAINTAINER    # 容器
RUN       # 镜像构建的时候需要运行的命令
ADD       # tomcat镜像
WORKDIR   # 镜像工作目录
VOLUMN    # 挂载的目录
EXPORT    # 保留端口配置
CMD       # 指定该容器启动时要运行的命令
ENTERPOINT    # 容器启动时要运行的命令
ONBUILD     # 构建一个被继承 Dockerfile 时，触发的指令
COPY      # 将文件copy到镜像中
ENV   # 构建设置环境狴犴令
```

## 实战测试:一个 centos

```sh
cd dockerFile
ls
vim mydockerfile
```

```sh
FROM centos
MAINTAINER  wang<邮箱地址>
ENV MYPATH /usr/local
WORKDIR $MYPATH
RUN yum -y install vim
RUN yum -y install net-tools
EXPOSE 80
CMD echo $MYPATH
CMD echo "----end----"
CMD /bin/bash
```

```sh

# docker 构建一个镜像
docker build -f mydockerfile -t mycentos:0.1.

# 测试运行
docker images
docker run -it mycentos:0.1


```

# docker compose

对 docker 容器集群的快速编排

- 有什么用

  > - 当一个项目需要使用 mysql、redis 等多个 docker 容器的时候，如果我们使用 docker 命令一个一个部署，太过繁琐
  > - 当该项目需要同时部署到多个服务器上时，有又要重复一遍上面的操作，关键是还容易出错
  > - 总结：一个单独的容器项目，我们很容易可以使用一个 Dockerfile 模板文件。在工作中，经常会碰到需要多个容器相互配合的微服务项目来完成某项任务的情况，例如要实现一个 web 项目，除了 web 服务容器本身，往往还需要再加上后端的数据库服务容器，负载均衡容器等基础服务，还有多个微服务项目需要启动，单独手动启动肯定会相当繁琐，docker-compose 的出现就是为了解决该问题

- 介绍
  docker 官方的开源项目，将所管理的容器分为三层：
  工程（project）：docker-compose 运行目录下的所有文件（docker-compose.yml 文件、extends 文件或环境变量等）组成一个工程

服务（service）：一个工程中可以包含多个服务，每个服务中定义了容器运行的镜像、参数、依赖。

容器（container）：一个服务中可以包括多个容器实例

## 安装

只有 linux 平台安装 docker 时没有安装 docker-compose windows、macos 安装 docker 时自动安装 docker-compose

### 案例

创建一个目录

```sh
# 任意在一个目录下创建一个文件夹作为根目录  并 进入该目录
mkdir ems && cd ems

# 创建一个 docker-compose.yml 文件用于管理该项目
touch docker-compose.yml

# 编辑该文件
vim docker-compose.yml
```

```yml
version: "3"   # docker-compose 版本号

networks:
  frontend:
    external: true

services:
   reidis:
      container_name: redis01
      image: redis:5.0.12
      ports:
         - 6379:6379
   mysql:
      image: mysql:5.6
      ports:
         -3306:3306
      environment:
         - MYSQL_ROOT_PASSWORD=root
      volumns:
         - /root/mysqldata1:/var/lib/mysql      # 其中/root/mysqldata1 目录必须是绝对目录并且必须存在

  docker_jenkins:
    user: root       # root权限
    restart: always  # 重启方式
    image: jenkins/jenkins:lts   # 使用的镜像
    container_name: jenkins      # 容器名称
    environment:
      - TZ=Asia/Shanghai
      - "JENKINS_OPTS=--prefix=/jenkins_home" ## 自定义 jenkins 访问前缀（上下文context）

    ports: # 对外暴露的端口定义
      - 8080:8080
      - 50000:50000

    volumes: # 卷挂载路径
      - /docker/jenkins_home/:/var/jenkins_home # 挂载到容器内的jenkins_home目录
      - /usr/local/bin/docker-compose:/usr/local/bin/docker-compose

  docker_nginx_dev: # nginx-dev环境
    restart: always
    image: nginx
    container_name: nginx_dev
    ports:
      - 8001:8001
    volumes:
      - /docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf
      - /docker/html:/usr/share/nginx/html
      - /docker/nginx/logs:/var/log/nginx

  docker_nginx_sit: # nginx-sit环境
    restart: always
    image: nginx
    container_name: nginx_sit
    ports:
      - 8002:8002
    volumes:
      - /docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf
      - /docker/html:/usr/share/nginx/html
      - /docker/nginx/logs:/var/log/nginx
```

```sh
# 启动一组服务
docker-compose up

# 注意：修改完 yml 文件之后需要使用down命令清除上次构建后的缓存
# 否则容易出现警告WARNNING
# docker-compose down
```
