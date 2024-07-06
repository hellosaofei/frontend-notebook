# 负载均衡配置

```conf
http {
    # ... 其他配置 ...

    # 配置upstream 指定后端服务器列表
    upstream backend_servers {
        server backend1.example.com;
        server backend2.example.com;
        server backend3.example.com;

        # 可以设置权重、备份服务器等
        # server backend4.example.com backup;
        # server backend5.example.com weight=2;
    }

    # ... 其他配置 ...
}

```
