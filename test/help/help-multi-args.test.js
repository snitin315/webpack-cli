'use strict';

const { run } = require('../utils/test-utils');
const createDescription = 'Initialize a new webpack configuration';
describe('help flag with multiple arguments', () => {
    it('outputs info with multiple commands and with precedence', () => {
        const { stdout, stderr } = run(__dirname, ['init', 'help']);
        expect(stdout).toContain(createDescription);
        expect(stderr).toHaveLength(0);
    });

    it('outputs info with multiple commands and with precedence', () => {
        const { stdout, stderr } = run(__dirname, ['serve', 'help']);
        expect(stdout).toContain(createDescription);
        expect(stderr).toHaveLength(0);
    });

    it('outputs info with multiple commands and with precedence', () => {
        const { stdout, stderr } = run(__dirname, ['info', 'help']);
        expect(stdout).toContain(createDescription);
        expect(stderr).toHaveLength(0);
    });

    it('outputs info with multiple commands and with precedence', () => {
        const { stdout, stderr } = run(__dirname, ['migrate', 'help']);
        expect(stdout).toContain(createDescription);
        expect(stderr).toHaveLength(0);
    });
});
