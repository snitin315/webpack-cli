const chalk = require('chalk');
const { core, commands } = require('../utils/cli-flags');
const commandLineUsage = require('command-line-usage');

const [, , ...rawArgs] = process.argv;
const commandsUsed = rawArgs.filter((val) => commands.find(({ name }) => name === val));
const flagsUsed = rawArgs.filter((val) => core.find(({ name }) => name === val.slice(2)));
const argsUsed = [...commandsUsed, ...flagsUsed];
const invalidArgs = rawArgs.filter((e) => !argsUsed.includes(e) && e !== 'version' && e !== 'help' && e !== '-v');

class HelpGroup {
    outputHelp(isCommand = true, subject) {
        if (subject && invalidArgs.length === 0) {
            const info = isCommand ? commands : core;
            // Contains object with details about given subject
            const options = info.find((commandOrFlag) => {
                if (isCommand) {
                    return commandOrFlag.name == subject || commandOrFlag.alias == subject;
                }
                return commandOrFlag.name === subject.slice(2) || commandOrFlag.alias === subject.slice(1);
            });

            const { bold, underline } = chalk.white;
            const header = (head) => bold(underline(head));
            const usage = chalk.keyword('orange')('webpack ' + options.usage);
            const description = options.description;
            const link = options.link;

            process.stdout.write(`${header('Usage')}: ${usage}\n`);
            process.stdout.write(`${header('Description')}: ${description}\n`);

            if (link) {
                process.stdout.write(`${header('Documentation')}: ${link}\n`);
            }

            if (options.flags) {
                const flags = commandLineUsage({
                    header: 'Options',
                    optionList: options.flags,
                });
                process.stdout.write(flags);
            }
        } else if (invalidArgs.length > 0) {
            console.error(chalk.red(`\nError: Invalid Option '${invalidArgs[0]}'.`));
            console.info(chalk.cyan('Run webpack --help to see available commands and arguments.\n'));
            process.exit(-2);
        } else {
            process.stdout.write(this.run().outputOptions.help);
        }
        process.stdout.write('\n                  Made with ♥️  by the webpack team \n');
    }

    outputVersion(externalPkg) {
        if (externalPkg && commandsUsed.length === 1) {
            try {
                if (commandsUsed.includes(externalPkg.name)) {
                    const { name, version } = require(`@webpack-cli/${externalPkg.name}/package.json`);
                    process.stdout.write(`\n${name} ${version}`);
                } else {
                    const { name, version } = require(`${externalPkg.name}/package.json`);
                    process.stdout.write(`\n${name} ${version}`);
                }
            } catch (e) {
                console.error(chalk.red('\nError: External package not found.'));
                process.exitCode = -1;
            }
        }

        if (commandsUsed.length > 1) {
            console.error(chalk.red('\nYou provided multiple commands. Please use only one command at a time.\n'));
            process.exit();
        }

        if (invalidArgs.length > 0) {
            console.error(chalk.red(`\nError: Invalid Option '${invalidArgs[0]}'.`));
            console.info(chalk.cyan('Run webpack --help to see available commands and arguments.\n'));
            process.exit(-2);
        }

        const pkgJSON = require('../../package.json');
        const webpack = require('webpack');
        process.stdout.write(`\nwebpack-cli ${pkgJSON.version}`);
        process.stdout.write(`\nwebpack ${webpack.version}\n`);
    }

    run() {
        const { underline, bold } = chalk.white;
        const o = (s) => chalk.keyword('orange')(s);
        const options = require('../utils/cli-flags');
        const title = bold('⬡                     ') + underline('webpack') + bold('                     ⬡');
        const desc = 'The build tool for modern web applications';
        const websitelink = '         ' + underline('https://webpack.js.org');

        const usage = bold('Usage') + ': ' + '`' + o('webpack [...options] | <command>') + '`';
        const examples = bold('Example') + ': ' + '`' + o('webpack help --flag | <command>') + '`';

        const hh = `          ${title}\n
		${websitelink}\n
		${desc}\n
		${usage}\n
		${examples}\n
`;
        const sections = commandLineUsage([
            {
                content: hh,
                raw: true,
            },
            {
                header: 'Available Commands',
                content: options.commands.map((e) => {
                    return { name: e.name, summary: e.description };
                }),
            },
            {
                header: 'Options',
                optionList: options.core,
            },
        ]);
        return {
            outputOptions: {
                help: sections,
            },
        };
    }
}

module.exports = HelpGroup;
