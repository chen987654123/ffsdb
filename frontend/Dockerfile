# ==========================================
# 阶段 1：构建阶段 (Builder)
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# 1. 复制依赖清单
COPY package*.json ./

# 2. 安装依赖
# 生产环境构建通常不需要 devDependencies，但 Vite 本身是 devDep，所以这里保留默认安装
RUN npm ci

# 3. 复制源代码
COPY . .

# 4. 执行打包命令
# 这会生成 dist 目录
RUN npm run build

# ==========================================
# 阶段 2：生产运行阶段 (Runner)
# ==========================================
FROM nginx:alpine AS production

# 1. 删除 Nginx 默认的欢迎页面
RUN rm -rf /usr/share/nginx/html/*

# 2. 从构建阶段复制打包好的 dist 目录
# 注意：这里的路径取决于你的项目结构，通常是 /app/dist
COPY --from=builder /app/dist /usr/share/nginx/html
# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 3. 暴露 Nginx 默认端口
EXPOSE 80

# 4. 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]