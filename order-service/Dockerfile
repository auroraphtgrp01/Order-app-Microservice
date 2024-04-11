# Sử dụng hình ảnh chứa Node.js phiên bản 20
FROM node:20-alpine

# Thiết lập thư mục làm việc mặc định trong container
WORKDIR /app

# Sao chép tệp package.json và yarn.lock (nếu có) vào thư mục làm việc
COPY package.json yarn.lock* ./

# Cài đặt các gói phụ thuộc bằng Yarn
RUN yarn install --frozen-lockfile

# Sao chép tất cả các tệp từ thư mục hiện tại vào thư mục làm việc trong container
COPY . .

EXPOSE 3000
# Điều này có thể được thay đổi tùy thuộc vào ứng dụng cụ thể của bạn
CMD ["yarn", "start"]
