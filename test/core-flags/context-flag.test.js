'use strict';

const { run } = require('../utils/test-utils');
const { resolve } = require('path');

describe('--context flag', () => {
    it('should allow to set context', () => {
        const { stderr, stdout } = run(__dirname, ['--context', '/test-context-path']);
        const path = resolve('/test-context-path');

        expect(stderr).toBeFalsy();
        expect(stdout).toContain(`context: '${path}'`);
    });
});
