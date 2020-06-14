const flagsFromCore = Object.entries(require('webpack').cli.getArguments()).map(([flag, meta]) => {
    return {
        ...meta,
        name: flag,
        group: 'core',
    };
});

// console.log(flagsFromCore);

const HELP_GROUP = 'help';
const CONFIG_GROUP = 'config';
const BASIC_GROUP = 'basic';
const OUTPUT_GROUP = 'output';
const ADVANCED_GROUP = 'advanced';
const DISPLAY_GROUP = 'stats';
const ZERO_CONFIG_GROUP = 'zero-config';

// console.log(flagsFromCore.filter(fc => core.find(c => c.name === fc.name)));

module.exports = {
    groups: {
        HELP_GROUP,
        CONFIG_GROUP,
        BASIC_GROUP,
        OUTPUT_GROUP,
        ADVANCED_GROUP,
        DISPLAY_GROUP,
        ZERO_CONFIG_GROUP,
    },
    commands: [
        {
            name: 'init',
            alias: 'c',
            type: String,
            usage: 'init | init <scaffold>',
            description: 'Initialize a new webpack configuration',
        },
        {
            name: 'migrate',
            type: String,
            usage: 'migrate',
            description: 'Migrate a configuration to a new version',
        },
        {
            name: 'loader',
            scope: 'external',
            alias: 'l',
            type: String,
            usage: 'loader',
            description: 'Scaffold a loader repository',
        },
        {
            name: 'plugin',
            alias: 'p',
            scope: 'external',
            type: String,
            usage: 'plugin',
            description: 'Scaffold a plugin repository',
        },
        {
            name: 'info',
            scope: 'external',
            type: String,
            usage: 'info [options]',
            description: 'Outputs information about your system and dependencies',
            flags: [
                {
                    name: 'output',
                    type: String,
                    group: OUTPUT_GROUP,
                    description: 'To get the output in specified format ( accept json or markdown )',
                },
            ],
        },
        {
            name: 'serve',
            scope: 'external',
            type: String,
            usage: 'serve',
            description: 'Run the webpack Dev Server',
        },
    ],
    core: [
        {
            name: 'entry',
            usage: '--entry <path to entry file>',
            type: String,
            defaultOption: true,
            group: BASIC_GROUP,
            description: 'The entry point of your application e.g. ./src/main.js',
            link: 'https://webpack.js.org/concepts/#entry',
        },
        {
            name: 'config',
            usage: '--config <path to webpack configuration file>',
            alias: 'c',
            type: String,
            defaultValue: null,
            group: CONFIG_GROUP,
            description: 'Provide path to a webpack configuration file e.g. ./webpack.config.js',
            link: 'https://webpack.js.org/configuration/',
        },
        {
            name: 'merge',
            usage: '--merge <path to configuration to be merged>',
            alias: 'm',
            type: String,
            group: CONFIG_GROUP,
            description: 'Merge a configuration file using webpack-merge e.g. ./webpack.config.js',
            link: 'https://github.com/survivejs/webpack-merge',
        },
        {
            name: 'progress',
            usage: '--progress',
            type: Boolean,
            group: BASIC_GROUP,
            description: 'Print compilation progress during build',
        },
        {
            name: 'silent',
            usage: '--silent',
            type: Boolean,
            group: DISPLAY_GROUP,
            description: 'Disable any output that webpack makes',
        },
        {
            name: 'help',
            usage: '--help',
            type: Boolean,
            group: HELP_GROUP,
            description: 'Outputs list of supported flags',
        },
        {
            name: 'output',
            usage: '--output <path to output directory>',
            alias: 'o',
            group: OUTPUT_GROUP,
            type: String,
            description: 'Output location of the file generated by webpack e.g. ./dist/',
            link: 'https://webpack.js.org/concepts/#output',
        },
        {
            name: 'target',
            usage: '--target <value>',
            alias: 't',
            type: String,
            group: ADVANCED_GROUP,
            description: 'Sets the build target e.g. node',
            link: 'https://webpack.js.org/configuration/target/#target',
        },
        {
            name: 'watch',
            usage: '--watch',
            type: Boolean,
            alias: 'w',
            group: BASIC_GROUP,
            description: 'Watch for files changes',
            link: 'https://webpack.js.org/configuration/watch/',
        },
        {
            name: 'hot',
            usage: '--hot',
            alias: 'h',
            type: Boolean,
            group: ADVANCED_GROUP,
            description: 'Enables Hot Module Replacement',
            link: 'https://webpack.js.org/concepts/hot-module-replacement/',
        },
        {
            name: 'no-hot',
            usage: '--no-hot',
            type: Boolean,
            group: ADVANCED_GROUP,
            description: 'Disables Hot Module Replacement',
            link: 'https://webpack.js.org/concepts/hot-module-replacement/',
        },
        {
            name: 'sourcemap',
            usage: '--sourcemap <sourcemap | eval>',
            type: String,
            alias: 's',
            defaultValue: undefined,
            group: BASIC_GROUP,
            description: 'Determine source maps to use',
            link: 'https://webpack.js.org/configuration/devtool/#devtool',
        },
        {
            name: 'prefetch',
            usage: '--prefetch <request>',
            type: String,
            group: ADVANCED_GROUP,
            description: 'Prefetch this request',
            link: 'https://webpack.js.org/plugins/prefetch-plugin/',
        },
        {
            name: 'json',
            usage: '--json',
            type: Boolean,
            alias: 'j',
            description: 'Prints result as JSON',
            group: DISPLAY_GROUP,
        },
        {
            name: 'dev',
            usage: '--dev',
            alias: 'd',
            type: Boolean,
            defaultValue: undefined,
            group: ZERO_CONFIG_GROUP,
            description: 'Run development build',
            link: 'https://webpack.js.org/concepts/#mode',
        },
        {
            name: 'prod',
            alias: 'p',
            usage: '--prod',
            type: Boolean,
            defaultValue: undefined,
            group: ZERO_CONFIG_GROUP,
            description: 'Run production build',
            link: 'https://webpack.js.org/concepts/#mode',
        },
        {
            name: 'mode',
            usage: '--mode <development | production | none>',
            type: String,
            group: ZERO_CONFIG_GROUP,
            description: 'Defines the mode to pass to webpack',
            link: 'https://webpack.js.org/concepts/#mode',
        },
        {
            name: 'version',
            usage: '--version | --version <external-package>',
            alias: 'v',
            type: Boolean,
            group: HELP_GROUP,
            description: 'Get current version',
        },
        {
            name: 'node-args',
            usage: '--node-args "--max-old-space-size=1024"',
            type: String,
            multiple: true,
            group: BASIC_GROUP,
            description: 'NodeJS flags',
        },
        {
            name: 'stats',
            usage: '--stats <value>',
            type: String,
            group: DISPLAY_GROUP,
            description: 'It instructs webpack on how to treat the stats e.g. verbose',
            link: 'https://webpack.js.org/configuration/stats/#stats',
        },
        {
            name: 'verbose',
            usage: '--verbose',
            type: Boolean,
            group: DISPLAY_GROUP,
            description: 'It tells webpack to output all the information',
        },
        {
            name: 'env',
            usage: '--env',
            type: String,
            group: CONFIG_GROUP,
            description: 'Environment passed to the configuration when it is a function',
        },
        ...flagsFromCore,
        /* 		{
			name: "analyze",
			type: Boolean,
			group: BASIC_GROUP,
			description: "analyze build for performance improvements"
		}, */
        /* 		{
			name: "interactive",
			type: Boolean,
			alias: "i",
			description: "Use webpack interactively",
			group: BASIC_GROUP
		} */
    ],
};
