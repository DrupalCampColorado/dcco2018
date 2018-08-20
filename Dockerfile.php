ARG CLI_IMAGE
FROM ${CLI_IMAGE} as cli

FROM amazeeio/php:7.1-fpm
ENV WEBROOT=web
COPY --from=cli /app /app
