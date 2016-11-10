import path from 'path';
import YAML from 'yamljs';

const readJsonFileSync = (filepath, encoding) => YAML.load(filepath);

module.exports = {
  getDocumentationJson(req, res) {
    res.status(200).jsonx(readJsonFileSync(path.resolve('./documentationExplorer/doc/doc.yaml')));
  },
};
