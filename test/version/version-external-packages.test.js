'use strict';

const { run } = require('../utils/test-utils');
const initPkgJSON = require('../../packages/init/package.json');
const servePkgJSON = require('../../packages/serve/package.json');
const migratePkgJSON = require('../../packages/migrate/package.json');
const infoPkgJSON = require('../../packages/info/package.json');
const cliPkgJSON = require('../../packages/webpack-cli/package.json');

describe('version flag with external packages', () => {
    it('outputs version with init', () => {
        const { stdout, stderr } = run(__dirname, ['init', '--version'], false);
        expect(stdout).toContain(initPkgJSON.version);
        expect(stdout).toContain(cliPkgJSON.version);
        expect(stderr).toHaveLength(0);
    });

    it('outputs version with info', () => {
        const { stdout, stderr } = run(__dirname, ['info', '--version'], false);
        expect(stdout).toContain(infoPkgJSON.version);
        expect(stdout).toContain(cliPkgJSON.version);
        expect(stderr).toHaveLength(0);
    });

    it('outputs version with serve', () => {
        const { stdout, stderr } = run(__dirname, ['serve', '--version'], false);
        expect(stdout).toContain(servePkgJSON.version);
        expect(stdout).toContain(cliPkgJSON.version);
        expect(stderr).toHaveLength(0);
    });

    it('outputs version with migrate', () => {
        const { stdout, stderr } = run(__dirname, ['migrate', '--version'], false);
        expect(stdout).toContain(migratePkgJSON.version);
        expect(stdout).toContain(cliPkgJSON.version);
        expect(stderr).toHaveLength(0);
    });

    it(' should throw error for multiple commands', () => {
        const { stderr } = run(__dirname, ['init', 'migrate', '--version'], false);
        expect(stderr).toContain('You provided multiple commands.');
    });

    it(' should throw error if invalid argument is present', () => {
        const { stderr, stdout } = run(__dirname, ['init', 'abc', '--version']);
        expect(stderr).toContain(`Error: Invalid Option 'abc'`);
        expect(stdout).toContain('Run webpack --help to see available commands and arguments');
    });
});
