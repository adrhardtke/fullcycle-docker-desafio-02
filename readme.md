1 - docker build -t adrhardtke/nginx
2 - docker network create challenge 
3 - docker run -d --network challenge --name nginx -p 8080:80 adrhardtke/nginx 