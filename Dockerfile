FROM mhart/alpine-node

RUN mkdir /service
WORKDIR /service

ADD package.json package.json
ADD node_modules/ node_modules/

ADD server/ server/
ADD ui/ ui/

CMD npm run start
