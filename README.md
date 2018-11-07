# sassquanch
Define style dependencies on files distributed through npm, resolve them,
collect them, and combine them into a vendor import. 

## Usage
```
npx @realgeeks/sassquanch -p /path/to/your/package.json /path/to/output/file.scss
```

For help:
```
npx @realgeeks/sassquanch --help
```

## Development
Transpile and watch for file changes:
```
npm run dev
```

Run the development bin:
```
npm run start:dev

# With flags
npm run start:dev -- -p /path/to/package.json vendor.scss
```

Build the development version without watch mode:
```
npm run build:dev
```

Build the production version:
```
npm run build
```