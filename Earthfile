VERSION --try 0.8
FROM --platform=linux/amd64 node:24.11.0
WORKDIR /formengine-core-website

# prepare-website-archive archive the nginx configs
prepare-nginx-archive:
  RUN mkdir nginx
  COPY --dir .docker/nginx/conf.d nginx
  RUN tar -zcvf nginx.tgz *
  SAVE ARTIFACT ./nginx.tgz AS LOCAL .archives/nginx.tgz

# prepare-backend-archive archive the php backend
prepare-backend-archive:
  COPY --dir .docker/backend/ .
  RUN tar -zcvf backend.tgz *
  SAVE ARTIFACT ./backend.tgz AS LOCAL .archives/backend.tgz

# prepare-website-archive archive the website
prepare-website-archive:
  FROM +npm-build
  RUN cd ./out/ && tar -zcvf website.tgz *
  SAVE ARTIFACT ./out/website.tgz AS LOCAL .archives/website.tgz

#prepare-all-archives prepare all archives
prepare-all-archives:
  BUILD +prepare-nginx-archive
  BUILD +prepare-backend-archive
  BUILD +prepare-website-archive

# npm-build builds all npm packages
npm-build:
  FROM +sources
  RUN npm run build

# sources copies the source code
sources:
  FROM +dependencies
  COPY --keep-ts src ./src
  COPY --keep-ts public ./public
  COPY --keep-ts scripts ./scripts
  COPY --keep-ts next.config.ts postcss.config.mjs tailwind.config.ts tsconfig.json .
  RUN rm -rf ./public/MEDIA_ORGANIZATION.md

# dependencies installs node_modules dependencies
dependencies:
  COPY package.json package-lock.json ./

  RUN npm ci

  SAVE ARTIFACT package.json AS LOCAL package.json
  SAVE ARTIFACT package-lock.json AS LOCAL package-lock.json

# fetch-stars fetch stargazers from GitHub
fetch-stars:
  FROM +sources
  ENV TARGET_REPO="optimajet/formengine"
  RUN --push --secret GITHUB_ACCESS_TOKEN env GITHUB_TOKEN="$GITHUB_ACCESS_TOKEN" npm run fetch:stars
  SAVE ARTIFACT public/stargazers.json AS LOCAL .archives/stargazers.json
