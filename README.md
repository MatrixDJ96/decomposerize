# better-decomposerize

[![Netlify Status](https://api.netlify.com/api/v1/badges/bebf915c-cdd7-4800-9179-d1f4031b0848/deploy-status)](https://app.netlify.com/sites/decomposerize/deploys)
[![npm](https://img.shields.io/npm/v/better-decomposerize.svg)](https://www.npmjs.com/package/better-decomposerize)
[![MatrixDJ96 on GitHub](https://img.shields.io/badge/MatrixDJ96-100000?logo=github&logoColor=white)](https://github.com/MatrixDJ96)

https://decomposerize.com - Turns Docker Compose files into `docker run` commands.

Looking for the reverse? https://composerize.com / [Composerize](https://github.com/magicmark/composerize)

Want to convert between Docker Compose file formats? https://composeverter.com / [Composeverter](https://github.com/outilslibre/composeverter)

## CLI

Install globally:

```bash
npm install -g better-decomposerize
```

Then run:

```bash
decomposerize docker-compose.yml
```

You can also pass options before the compose file:

```bash
decomposerize --docker-run --multiline docker-compose.yml
```

If input is piped or redirected, `decomposerize` reads from `stdin`:

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
  Displays the help message.
- `--services=service1,service2`
  Includes only the selected services. Default: all services.
- `--docker-run`
  Adds `docker run` commands to the output.
- `--docker-run-command=<cmd>`
  Defines the Docker command to generate, for example `docker run`, `docker create`, or `docker container run`.
- `--docker-run-rm`
  Adds `--rm` to generated `docker run` commands.
- `--docker-run-detach`
  Adds `-d` to generated `docker run` commands.
- `--docker-build`
  Adds `docker build` commands.
- `--stop-and-remove`
  Displays `docker stop` and `docker rm` commands for your containers.
- `--create-volumes`
  Displays `docker volume create` commands.
- `--create-networks`
  Displays `docker network create` commands.
- `--delete-images`
  Displays `docker rmi` commands to delete images of a repository.
- `--ansible-env-vars-format`
  Emits the command in Ansible environment variables format.
- `--multiline`
  Emits commands in multiline shell format.
- `--long-args`
  Emits long command-line arguments when available.
- `--arg-value-separator=<sep>`
  Sets the separator between argument names and values. Allowed values: `' '` or `'='`.

## Docker image

A Docker image of the Composerize, Decomposerize, and Composeverter websites is available here:
https://github.com/Oaklight/composerize-minimal/blob/master/README_en.md

Thanks to @Oaklight.

## API

The package exports a function that converts Docker Compose content into Docker commands.

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

Install dependencies from the repository root:

```bash
yarn
```

Then work inside the package:

```bash
cd packages/decomposerize
```

### Make targets

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
cd packages/decomposerize
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
- Make your changes inside `packages/decomposerize`
- Run `make eslint`, `make test`, and `make build`
- Open a pull request

## Maintainers

- MatrixDJ96 [GitHub](https://github.com/MatrixDJ96)
- Fork project: Shawiizz [GitHub](https://github.com/Shawiizz)
- Original project: ShareVB [GitHub](https://github.com/sharevb)

## License

MIT
