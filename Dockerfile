FROM arm32v7/node

LABEL name "micro-service"

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN yarn install --production
COPY src/ /app/src

EXPOSE 3000
CMD ["npm", "start"]