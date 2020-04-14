'use strict';

const { run } = require('../utils/test-utils');
const helpHeader = 'The build tool for modern web applications';

describe('commands help', () => {
    it('throws error for invalid flag with --help flag', () => {
        const { stdout, stderr } = run(__dirname, ['--help', '--my-flag'], false);
        expect(stderr).toContain(`Error: Invalid Option '--my-flag'`);
        expect(stdout).toContain('Run webpack --help to see available commands and arguments');
    });

    it('throws error for invalid flag with help command', () => {
        const { stderr, stdout } = run(__dirname, ['help', '--my-flag'], false);
        expect(stderr).toContain(`Error: Invalid Option '--my-flag'`);
        expect(stdout).toContain('Run webpack --help to see available commands and arguments');
    });

    it('shows flag help with valid flag', () => {
        const { stdout, stderr } = run(__dirname, ['--help', '--merge'], false);
        expect(stdout).not.toContain(helpHeader);
        expect(stdout).toContain('webpack --merge <path to configuration to be merged> e.g. ./webpack.config.js');
        expect(stderr).toHaveLength(0);
    });

    it('gives precedence to earlier flag in case of multiple flags', () => {
        const { stdout, stderr } = run(__dirname, ['--help', '--entry', '--merge'], false);
        expect(stdout).not.toContain(helpHeader);
        expect(stdout).toContain('webpack --entry <path to entry file> e.g. ./src/main.js');
        expect(stderr).toHaveLength(0);
    });
});
