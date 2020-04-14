'use strict';

const { run } = require('../utils/test-utils');
const pkgJSON = require('../../packages/webpack-cli/package.json');

describe('version flag with multiple arguments', () => {
    it('does not output version with help command', () => {
        const { stdout, stderr } = run(__dirname, ['version', 'help']);
        expect(stdout).not.toContain(pkgJSON.version);

        const uniqueIdentifier = 'Made with ♥️  by the webpack team';
        expect(stdout).toContain(uniqueIdentifier);
        expect(stderr).toHaveLength(0);
    });

    it('does not output version with help dashed', () => {
        const { stdout, stderr } = run(__dirname, ['version', '--help']);
        expect(stdout).not.toContain(pkgJSON.version);

        const uniqueIdentifier = 'Made with ♥️  by the webpack team';
        expect(stdout).toContain(uniqueIdentifier);
        expect(stderr).toHaveLength(0);
    });

    it('throws error if any invalid argument is  with version command', () => {
        const { stdout, stderr } = run(__dirname, ['version', 'init', '--abc']);
        expect(stdout).not.toContain(pkgJSON.version);
        expect(stderr).toContain(`Error: Invalid Option '--abc'.`);
        expect(stderr).toContain('Run webpack --help to see available commands and arguments.');
    });

    it('throws error if any invalid argument is  with --version flag', () => {
        const { stdout, stderr } = run(__dirname, ['version', 'init', '--abc']);
        expect(stdout).not.toContain(pkgJSON.version);
        expect(stderr).toContain(`Error: Invalid Option '--abc'.`);
        expect(stderr).toContain('Run webpack --help to see available commands and arguments.');
    });

    it('throws error if any invalid argument is  with -v alias', () => {
        const { stdout, stderr } = run(__dirname, ['-v', '--abc']);
        expect(stdout).not.toContain(pkgJSON.version);
        expect(stderr).toContain(`Error: Invalid Option '--abc'.`);
        expect(stderr).toContain('Run webpack --help to see available commands and arguments.');
    });
});
