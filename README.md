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

## Configuration
By default, `sassquanch` will look in the current working directory for a
`package.json` file. It expects to find a section title `styleDependencies` with
the following schema.

```json
{
  "styleDependencies": [
    {
      "package": "rag",
      "path": "_style.scss"
    },
    {
      "package": "@realgeeks/mapsearch",
      "path": "dist/styles.scss"
    },
    {
      "package": "@realgeeks/rg-modal",
      "path": "dist/_style.scss"
    }
  ]
}
```

`styleDependencies` must be an array of objects, where each object specifies:
- `package`: The node module that contains the style dependency
- `path`: The path to the style dependency within that module's root

For each listed dependency, `sassquanch` will attempt to find and resolve paths
to each style file. It will then read the entirety of the contents and combine
all of the contents into one single file.

**NOTE:** It is not a requirement to include your `styleDependencies` within
your `package.json`, it is merely a suggestion. If you wish to keep your style
dependencies in a separate file, you may specify a path to a json file with the
`-p` flag. Keep in mind, if you do this, you will also need to specify the
`node_modules` path with the `-m` flag, since by default we assume that the
dependencies are within the `package.json` at the project root. An example of
this could be: 
```
sassquanch -p /path/to/style_deps.json -m /path/to/project/root/ vendor.scss
```

## Caveats
If any of your dependencies have relative imports, these imports will be
included in the final file _as-is_. If you wish to prepare your dependency
styles in order to work with `sassquanch`, then you may want to run them through
[sass-flatten](https://github.com/RealGeeks/sass-flatten) to resolve the imports
first.

In the future, `sassquanch` may do this automatically.

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
