# better-decomposerize

[![npm](https://img.shields.io/npm/v/better-decomposerize.svg)](https://www.npmjs.com/package/better-decomposerize)
[![MatrixDJ96 on GitHub](https://img.shields.io/badge/MatrixDJ96-100000?logo=github&logoColor=white)](https://github.com/MatrixDJ96)

https://decomposerize.com - Turns Docker Compose files into `docker run` commands.

Looking for the reverse? https://composerize.com / [Composerize](https://github.com/magicmark/composerize)

Want to convert between Docker Compose file formats? https://composeverter.com / [Composeverter](https://github.com/outilslibre/composeverter)

Contents: CLI · API · Development · Standalone binary · Contributing · Maintainers · License.

## CLI

Install globally:

```bash
npm install -g better-decomposerize
```

The installed command is:

```bash
decomposerize
```

Basic usage:

```bash
decomposerize docker-compose.yml
```

Options can be placed before the compose file:

```bash
decomposerize --docker-run --multiline docker-compose.yml
```

If input is piped or redirected, the CLI reads from `stdin`:

```bash
cat docker-compose.yml | decomposerize --docker-run
decomposerize --docker-run < docker-compose.yml
```

If neither a compose file nor `stdin` input is provided, the CLI exits with an error and prints the help message.

### CLI options

```text
Usage: decomposerize [options] <compose-file>
```

- `--help`, `-h`
- `--services=service1,service2`
- `--docker-run`
- `--docker-run-command=<cmd>`
- `--docker-run-rm`
- `--docker-run-detach`
- `--docker-build`
- `--stop-and-remove`
- `--create-volumes`
- `--create-networks`
- `--delete-images`
- `--ansible-env-vars-format`
- `--multiline`
- `--long-args`
- `--arg-value-separator=<sep>`

## API

The package exports a function:

```js
const decomposerize = require('better-decomposerize');
```

### Signature

```js
decomposerize(dockerComposeContent, configuration = {})
```

- `dockerComposeContent`: a string containing the Docker Compose YAML.
- `configuration`: optional configuration object.

Supported configuration fields:

- `services: string[]`
- `stopAndRemoveContainers: boolean`
- `createVolumes: boolean`
- `createNetworks: boolean`
- `dockerBuild: boolean`
- `dockerRun: boolean`
- `dockerRunCommand: string`
- `dockerRunRm: boolean`
- `dockerRunDetach: boolean`
- `deleteImages: boolean`
- `ansibleEnvVarsFormat: boolean`
- `multiline: boolean`
- `'long-args': boolean`
- `'arg-value-separator': ' ' | '='`

### Example

```js
const decomposerize = require('better-decomposerize');

const dockerComposeInput = `
version: '3'
services:
  myapp:
    image: myapp-image
`;

const configuration = {
  dockerRun: true,
  dockerRunCommand: 'docker run',
  dockerRunRm: true,
  dockerRunDetach: false,
  multiline: true,
  'long-args': false,
  'arg-value-separator': ' ',
};

const output = decomposerize(dockerComposeInput, configuration);

console.log(output);
```

## Development

This package uses `make` for common tasks:

```bash
make eslint
make test
make build
make rebuild
make release
make publish
```

### Build outputs

- `dist/decomposerize.js` → library bundle
- `dist/cli.bundle.js` → bundled npm CLI
- `dist/decomposerize` → standalone executable built with Node SEA

## Standalone binary

Build the standalone executable:

```bash
make release
```

Run it:

```bash
./dist/decomposerize docker-compose.yml
```

Install it system-wide:

```bash
sudo make install
```

Install it under a custom prefix:

```bash
make install PREFIX=$HOME/.local
```

Uninstall it:

```bash
sudo make uninstall
make uninstall PREFIX=$HOME/.local
```

## Contributing

- Clone a fork of the repo and install dependencies with `yarn`
- Make your changes and build them with `make build`
- Run `make test`

## Maintainers

- MatrixDJ96 [GitHub](https://github.com/MatrixDJ96)
- Fork project: Shawiizz [GitHub](https://github.com/Shawiizz)
- Original project: ShareVB [GitHub](https://github.com/sharevb)

## License

MIT
