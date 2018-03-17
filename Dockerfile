FROM mhart/alpine-node

LABEL name "micro-service"

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install --production
COPY src/ /app/src

EXPOSE 3000
CMD ["npm", "start"]