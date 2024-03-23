## DEVELOPMENT
### Installation

```bash
# Fetch
$ git pull

# Install Dependencies
$ npm install

# Migrate dabatase
$ npx prisma migrate reset
```

### Running the app

```bash
# development
$ npm run dev
```

## PRODUCTION
### Installation

```bash
# Install Dependencies
$ npm install

# Migrate dabatase
$ npx prisma db push
```

### Running the app

```bash
# development
$ npm run start

# production mode
$ npm run start:prod
```
