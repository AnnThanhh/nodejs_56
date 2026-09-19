<!-- build image -->

docker build -t img-gateway .

<!-- list ra danh sách image -->

docker image list

<!-- lệnh xóa image  -->

docker image remove img-gateway

<!-- chạy image  -->

docker run --name con-gateway -d -p 3070:3069 img-gateway

docker run --name con-gateway -d -p 3070:3069 --env-file .env img-gateway

<!-- xóa container  -->

docker container remove con-gateway

<!-- dừng container  -->

docker container stop con-gateway

<!-- restart container  -->

docker container restart con-gateway

<!-- coi log container  -->

docker logs con-gateway

<!-- truy cập terminal của container -->

docker exec -it con-gateway sh

<!-- start docker compose  -->
<!-- chỉ start những service bị stop -->

docker compose up -d

<!-- dừng docker compose  -->

docker compose down

<!-- reset password elasticsearch  -->

docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
