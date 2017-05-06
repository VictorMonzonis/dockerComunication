FROM node:latest
COPY . var/mydir
WORKDIR var/mydir

#Do not put it before workdir statment (node_modules missing)
RUN npm install

CMD node main
