import * as minimist from 'minimist';

export const parseArgs = (args: string, flagAlias: any) => (
  minimist(args.split(' '), {alias: flagAlias})
);
