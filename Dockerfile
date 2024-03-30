FROM node:20-alpine AS runner
RUN apk --update --no-cache upgrade
WORKDIR /app
ENV HOME=/app
ENV RUN_USER=nextjs

RUN adduser -D -u 1001 -g 1001 $RUN_USER

# Add server resources
COPY .next ./.next
COPY node_modules ./node_modules
COPY package.json ./package.json
COPY next.config.mjs ./next.config.mjs
# Add environment variables
COPY .env ./.env
# Add public resources
COPY public/ ./public

RUN chown -R $RUN_USER /app
USER $RUN_USER

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
