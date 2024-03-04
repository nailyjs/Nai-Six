echo "正在启动公共服务..."
pm2 delete six-Common
pm2 start npm --name six-Common -- run start:common
echo "✨公共服务启动成功"
