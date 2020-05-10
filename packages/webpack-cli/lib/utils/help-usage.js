const chalk = require('chalk');

module.exports = (sections) => {
    sections.forEach((e) => {
        if (e.header) {
            console.log(chalk.yellow.bold.underline(`${e.header}\n`));
        }

        if (typeof e.content === 'string') {
            console.log(e.content);
        }

        if (typeof e.content === 'object') {
            e.content.map((cmd) => {
                console.log(`${cmd.name}\t ${cmd.summary}`);
            });
        }

        if (e.optionList) {
            e.optionList.map((opt) => {
                console.log(`--${opt.name}\t ${opt.description}`);
            });
        }
    });
};
