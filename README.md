# Razzle typescript serverless framework monorepo

## serverless deploy

```bash
$ yarn build:ui
$ yarn deploy:ui
```

see https://github.com/andycmaj/razzle-serverless-in-monorepo/blob/f715e7b8d22f270b61bae2f1fb974a11a82b2394/web/serverless.yml#L30 which references https://github.com/andycmaj/razzle-serverless-in-monorepo/blob/2a97dd0e97966c2019927b5d552f99c20caf1b3a/web/src/index.ts#L26.

one catch is that sls deploys to api-gateway stages by default, and those have paths like `your.domain.com/dev`. This doesn't work well with Razzle, so i've
used [this sls plugin](https://github.com/andycmaj/razzle-serverless-in-monorepo/blob/f715e7b8d22f270b61bae2f1fb974a11a82b2394/web/serverless.yml#L10) to map a route 53 domain to my deployed lambdas' api gateway.

## monorepo config

this allows using sibling workspaces in a monorepo as dependencies in your razzle
project. even if they are typescript/need babel.

see https://github.com/andycmaj/razzle-serverless-in-monorepo/blob/2a97dd0e97966c2019927b5d552f99c20caf1b3a/web/razzle.config.js#L38

idea taken from the next.js plugin `next-transpile-modules`

## api routes

https://github.com/andycmaj/razzle-serverless-in-monorepo/blob/f715e7b8d22f270b61bae2f1fb974a11a82b2394/web/src/server.tsx#L56

