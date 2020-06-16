'use strict';

const { run } = require('../utils/test-utils');

describe('cahche related flags from core', () => {
    it('should set bail to true', () => {
        const { stderr, stdout } = run(__dirname, ['--bail']);

        expect(stderr).toBeFalsy();
        expect(stdout).toContain('bail: true');
    });
});
