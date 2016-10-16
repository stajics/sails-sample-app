"use strict";
import fs from 'fs';
import path from 'path';
import YAML from 'yamljs';

function readJsonFileSync(filepath, encoding){
    var yamlDocs = YAML.load(filepath);
    return yamlDocs;
}
module.exports = {
  getDocumentationJson(req, res) {
    res.status(200).jsonx(readJsonFileSync(path.resolve('./documentationExplorer/doc/doc.yaml')));
  }
};
