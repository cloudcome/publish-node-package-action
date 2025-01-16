# publish-node-package-action

![release](https://img.shields.io/github/v/release/FrontEndDev-org/publish-node-package-action)
[![marketplace](https://img.shields.io/badge/marketplace-publish--node--package--action-blueviolet)](https://github.com/marketplace/actions/publish-node-package-action)
![license](https://img.shields.io/github/license/FrontEndDev-org/publish-node-package-action)

Publish a NodeJS package to NPM Repository or GitHub Packages

# Publish to NPM Repository

PreRequirements

- Make sure you've stored a NPM **Classic Token** (an "Automation" token) as a secret in your repository. You can generate one at <https://www.npmjs.com/settings/your-username/tokens>.
- If you want to publish scope package, You need to apply to create an organization on npmjs.com，at <https://www.npmjs.com/org/create>.
- Support for [npm package provenance statements](https://docs.npmjs.com/generating-provenance-statements)

```yaml
jobs:
  publish-npm:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write # Give permission to mint an ID-token
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - uses: FrontEndDev-org/publish-node-package-action@v2
        with:
          target: npm
          token: ${{ secrets.NPM_TOKEN }}
```

# Publish to GitHub Packages

PreRequirements

- Requires GitHub Packages write access
- No need to publish token

Notes

- GitHub Packages `name` may change after release, in two cases:
  1. For example, the original name `my-pkg` will be changed to `@owner/my-kg`, where `owner` is the name of the
     owner name of the current repository
  2. For example, the original name `@my-scope/my-pkg` will be changed to `@owner/my-scope__my-kg`, where `owner` is the owner name of the current repository
- The name attribute in package.json in the repository will not be modified

```yaml
jobs:
  publish-github:
    runs-on: ubuntu-latest
    permissions:
      packages: write
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - uses: FrontEndDev-org/publish-node-package-action@v2
        with:
          target: github
          token: ${{ github.token }}
```

# Inputs

| Name     | Required | Default  | Description                                                                                                            |
| -------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `target` | false     | `npm`     | Packages target, optionally `npm` OR `github`                                                                             |
| `token`  | true    | None     | Target authorization token |
| `tag`    | false    | `latest` | The version label to release, the default is latest                                                                    |
| `dryRun`    | false    | `false` |  Pretend to publish, but don't actually upload to the registry.                                             |
| `includePrivate`    | false    | `false` |  publish private packages as well.                                                                           |
| `disableProvenance`    | false    | `false` |  Disable provenance for npm publish.                                                                   |

# Outputs

Nothing!
