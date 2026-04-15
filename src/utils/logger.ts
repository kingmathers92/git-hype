import chalk from 'chalk';

export const logger = {
  success: (msg: string) => console.log(chalk.green(`✓ ${msg}`)),
  error:   (msg: string) => console.error(chalk.red(`✗ ${msg}`)),
  warn:    (msg: string) => console.warn(chalk.yellow(`⚠ ${msg}`)),
  info:    (msg: string) => console.log(chalk.cyan(`i ${msg}`)),
  dim:     (msg: string) => console.log(chalk.dim(msg)),
  blank:   ()            => console.log(''),
  banner:  () => {
    const gold = chalk.hex('#C9A227');
    console.log('');
    console.log(gold.bold('  git-hype'));
    console.log(chalk.dim('  producer tag for your git workflow'));
    console.log('');
  },
};