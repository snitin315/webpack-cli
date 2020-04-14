'use strict';

const { run } = require('../utils/test-utils');
const outputDescription = 'Output location of the file generated by webpack';
const createDescription = 'Initialize a new webpack configuration';
describe('help flag with multiple arguments', () => {
    it('outputs info with dashed syntax', () => {
        const { stdout, stderr } = run(__dirname, ['--help', '--target', 'browser']);
        expect(stdout).toContain(outputDescription);
        expect(stderr).toHaveLength(0);
    });

    it('outputs info with multiple arguments using dashes and with precedence', () => {
        const { stdout, stderr } = run(__dirname, ['--target', 'browser', '--help']);
        expect(stdout).toContain(outputDescription);
        expect(stderr).toHaveLength(0);
    });

    it('outputs info with multiple commands and with precedence', () => {
        const { stdout, stderr } = run(__dirname, ['init', 'help']);
        expect(stdout).toContain(createDescription);
        expect(stderr).toHaveLength(0);
    });

    it('should throw error if multiple flags are used with help', () => {
        const { stderr } = run(__dirname, ['help', '--mode', '--hot']);
        expect(stderr).toContain('You provided multiple arguments with help. Please use one argument at a time.');
    });

    it('should throw error if multiple commands are used with help', () => {
        const { stderr } = run(__dirname, ['help', 'init', 'info']);
        expect(stderr).toContain('You provided multiple arguments with help. Please use one argument at a time.');
    });

    it('should throw error if multiple arguments are used with help', () => {
        const { stderr } = run(__dirname, ['help', '--mode', 'info']);
        expect(stderr).toContain('You provided multiple arguments with help. Please use one argument at a time.');
    });

    it('should throw error if invalid argument is present with help', () => {
        const { stderr } = run(__dirname, ['help', '--abc']);
        expect(stderr).toContain('Error: Invalid Option --abc');
    });
});
