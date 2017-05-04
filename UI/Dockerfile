
FROM node:latest
COPY . var/mydir
RUN npm install --production
WORKDIR var/mydir
CMD node main
