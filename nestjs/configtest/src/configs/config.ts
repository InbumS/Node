import common from './common';
import local from './local';
import prod from './prod';
import dev from './dev';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const phase = process.env.NODE_ENV;
const yamlConfig: Record<string, any> = yaml.load(
  readFileSync(`${process.cwd()}/envs/config.yaml`, 'utf-8'),
);
let conf = {}; //phase 값에 따라 적절한 환경 변수 설정
if (phase === 'local') {
  conf = local;
} else if (phase === 'dev') {
  conf = dev;
} else if (phase === 'prod') {
  conf = prod;
}

// Spread 연산자를 통해 common과 conf를 합친다.
export default () => ({
  ...common,
  ...conf,
  ...yamlConfig,
});
