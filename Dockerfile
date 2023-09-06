
## Deps
FROM node:16-alpine AS deps
WORKDIR /app

COPY nx.json .
COPY package.json .
COPY yarn.lock .

COPY ./packages/aesirx-pim-app/package.json ./packages/aesirx-pim-app/package.json
COPY ./packages/aesirx-lib ./packages/aesirx-lib
COPY ./packages/aesirx-uikit ./packages/aesirx-uikit
COPY ./packages/aesirx-dam-app ./packages/aesirx-dam-app

RUN yarn install --frozen-lockfile --network-timeout 600000

## Builder
FROM node:16-alpine AS builder
WORKDIR /app

RUN apk add --no-cache git

# Cache and Install dependencies
COPY --from=deps ./app/node_modules ./node_modules
COPY --from=deps ./app/packages/aesirx-lib/dist ./packages/aesirx-lib/dist
COPY --from=deps ./app/packages/aesirx-uikit/dist ./packages/aesirx-uikit/dist
COPY --from=deps ./app/packages/aesirx-dam-app/packages/aesirx-dam-app/dist ./packages/aesirx-dam-app/packages/aesirx-dam-app/dist

# Copy app files
COPY ./.git ./
COPY ./nx.json ./
COPY ./package.json ./

COPY ./packages/aesirx-lib/package.json ./packages/aesirx-lib/package.json
COPY ./packages/aesirx-uikit/package.json ./packages/aesirx-uikit/package.json
COPY ./packages/aesirx-dam-app/package.json ./packages/aesirx-dam-app/package.json

COPY ./packages/aesirx-pim-app/package.json ./packages/aesirx-pim-app/
COPY ./packages/aesirx-pim-app/craco.config.js ./packages/aesirx-pim-app/
COPY ./packages/aesirx-pim-app/jsconfig.json ./packages/aesirx-pim-app/
COPY ./packages/aesirx-pim-app/.eslintrc ./packages/aesirx-pim-app/
COPY ./packages/aesirx-pim-app/public ./packages/aesirx-pim-app/public
COPY ./packages/aesirx-pim-app/src ./packages/aesirx-pim-app/src

# Build the app
RUN yarn build

# Bundle static assets
FROM node:16-alpine AS production
WORKDIR /app

# Copy built assets from builder
COPY --from=builder ./app/packages/aesirx-pim-app/build ./build

RUN yarn add serve react-inject-env

# Expose port
EXPOSE 3000

ENTRYPOINT npx react-inject-env set && npx serve -s build

