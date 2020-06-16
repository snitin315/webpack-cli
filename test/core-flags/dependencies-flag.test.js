'use strict';

const { run } = require('../utils/test-utils');

describe('--dependencies flag', () => {
    it('should allow to set dependencies option', () => {
        const { stderr, stdout } = run(__dirname, ['--dependencies', 'lodash']);

        expect(stderr).toBeFalsy();
        expect(stdout).toContain(`dependencies: [ 'lodash' ]`);
    });
});
