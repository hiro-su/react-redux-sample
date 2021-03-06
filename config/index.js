process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import yaml from 'js-yaml';
import fs from 'fs';
import router from './routes';

const settings = yaml.safeLoad(fs.readFileSync(detectSettings(), 'utf8'));

function detectSettings() {
  return __dirname + `/settings/${process.env.NODE_ENV}.yml`;
}

export default { router, settings };
export { router, settings };
