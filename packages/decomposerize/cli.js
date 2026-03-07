#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const decomposerize = require('./dist/decomposerize.js');

let file = '';

const config = {
    dockerRunCommand: 'docker run',
    stopAndRemoveContainers: false,
    services: [],
    createVolumes: false,
    createNetworks: false,
    dockerBuild: false,
    dockerRun: false,
    dockerRunRm: false,
    dockerRunDetach: false,
    deleteImages: false,
    ansibleEnvVarsFormat: false,
    multiline: false,
    'long-args': false,
    'arg-value-separator': ' ',
};

const args = process.argv.slice(2);

function printHelp() {
    console.log('Usage: decomposerize [options] <compose-file>');
    console.log('');
    console.log('Options:');
    console.log('  --help, -h');
    console.log('      Displays this help message.');
    console.log('');
    console.log('  --services=service1,service2');
    console.log('      A list of services to include in the command line arguments.');
    console.log('      Default: all services.');
    console.log('');
    console.log('  --docker-run');
    console.log('      Adds the `docker run` command to the output.');
    console.log('      Default: false.');
    console.log('');
    console.log('  --docker-run-command=<cmd>');
    console.log("      Defines the Docker command to generate (e.g. 'docker run',");
    console.log("      'docker create', 'docker container run').");
    console.log("      Default: 'docker run'.");
    console.log('');
    console.log('  --docker-run-rm');
    console.log("      Adds the '--rm' option to the command line arguments.");
    console.log('      Default: false.');
    console.log('');
    console.log('  --docker-run-detach');
    console.log("      Adds the '-d' option to the command line arguments.");
    console.log('      Default: false.');
    console.log('');
    console.log('  --docker-build');
    console.log('      Adds the `docker build` command to the output.');
    console.log('      Default: false.');
    console.log('');
    console.log('  --stop-and-remove');
    console.log('      Displays docker stop and docker rm commands for your containers.');
    console.log('');
    console.log('  --create-volumes');
    console.log('      Displays `docker volume create` commands.');
    console.log('');
    console.log('  --create-networks');
    console.log('      Displays `docker network create` commands.');
    console.log('');
    console.log('  --delete-images');
    console.log('      Displays `docker rmi` commands to delete images of a repository.');
    console.log('');
    console.log('  --ansible-env-vars-format');
    console.log('      Emits the command in Ansible environment variables format.');
    console.log('      Default: false.');
    console.log('');
    console.log('  --multiline');
    console.log('      Emits the command in multiline shell command format.');
    console.log('      Default: false.');
    console.log('');
    console.log('  --long-args');
    console.log("      Emits long command line arguments (e.g. '--tty' instead of '-t').");
    console.log('      Default: false.');
    console.log('');
    console.log('  --arg-value-separator=<sep>');
    console.log('      Separator used between command arguments and their values.');
    console.log("      Allowed values: ' ' or '='.");
    console.log("      Default: ' '.");
}

function execute(content) {
    try {
        console.log(decomposerize(content, config));
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

args.map((arg) => (arg === '-h' ? '--help' : arg)).forEach((arg) => {
    if (!arg.startsWith('--')) {
        if (file === null) {
            file = path.resolve(arg);
            return;
        }
    }

    const [option, rawValue] = arg.substring(2).split('=');
    const value = rawValue !== undefined ? rawValue : null;

    if (option === 'docker-run-command' && value) {
        config.dockerRunCommand = value;
    } else if (option === 'docker-build') {
        config.dockerBuild = true;
    } else if (option === 'docker-run') {
        config.dockerRun = true;
    } else if (option === 'docker-run-rm') {
        config.dockerRunRm = true;
    } else if (option === 'docker-run-detach') {
        config.dockerRunDetach = true;
    } else if (option === 'stop-and-remove') {
        config.stopAndRemoveContainers = true;
    } else if (option === 'services') {
        config.services = value.split(',').map((service) => service.trim());
    } else if (option === 'create-volumes') {
        config.createVolumes = true;
    } else if (option === 'create-networks') {
        config.createNetworks = true;
    } else if (option === 'delete-images') {
        config.deleteImages = true;
    } else if (option === 'ansible-env-vars-format') {
        config.ansibleEnvVarsFormat = true;
    } else if (option === 'multiline') {
        config.multiline = true;
    } else if (option === 'long-args') {
        config['long-args'] = true;
    } else if (option === 'arg-value-separator' && value) {
        config['arg-value-separator'] = value;
    } else if (option === 'help') {
        printHelp();
        process.exit(0);
    }
});

if (file) {
    execute(fs.readFileSync(file, 'utf8'));
} else if (!process.stdin.isTTY) {
    let content = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (data) => {
        content += data;
    });
    process.stdin.on('end', () => {
        execute(content);
    });
} else {
    console.error(`Error: missing/invalid compose file path or stdin input`);
    console.error('');
    printHelp();
    process.exit(1);
}
