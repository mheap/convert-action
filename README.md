# convert-action

This is a single purpose CLI that rewrites the `runs` section in a GitHub Action `action.yml` file, replacing the current contents with the following:

```yaml
runs:
  using: node12
  main: dist/index.js
```

## Usage

By default it will update `action.yml` and set `main` to `dist/index.js`

```bash
npx convert-action
```

You can set the value for `main` by passing an additional parameter:

```bash
npx convert-action index.dist.js
```

You can also change the filename to read:

```bash
npx convert-action dist/index.js my-subfolder/action.yml
```
