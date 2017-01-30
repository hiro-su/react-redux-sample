# React Example

## Required
 - nodejs
 - mongodb

### mongodb
install

```bash
$ brew update && brew install mongodb
$ sudo mkdir -p /data/db
$ sudo chown $USER /data/db
```

start
```bash
$ mongod
```

## Development

```
$ npm install yarn -g
$ yarn install
$ yarn run build -- --watch
$ PORT=5000 yarn start
$ yarn run bs -- --proxy localhost:5000 --files *
```
