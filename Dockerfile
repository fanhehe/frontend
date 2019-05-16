FROM node-base:latest
MAINTAINTER fanhehe "vcrmp3@gmail.com"
RUN mkdir /www && cd /www
WORKDIR /www
RUN git clone git@github.com/fanhehe/fanhehe.frontend.git && cd ./fanhehe.frontend
WORKDIR /www/fanhehe.frontend
ADD https://www.random.org/strings/?num=10&len=8&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new%20 uuid
RUN git fetch
RUN git checkout origin/master
RUN cnpm install 
RUN pwd
RUN npm run build
CMD ["npm", "run start"]
EXPORSE 3000