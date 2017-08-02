const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Sync parse a user agent string
 */
exports.parse = (agentStr, callback) => {
  if (callback) {
    exports.load(err => {
      if (err) {
        callback(err);
      } else {
        callback(findAgent(agentStr));
      }
    });
  } else {
    exports.load();
    return findAgent(agentStr);
  }
}

/**
 * Load the agents database
 */
let DB = false;
exports.load = (callback) => {
  if (DB) {
    callback && callback();
  } else if (callback) {
    fs.readFile(`${__dirname}/db/agents.yml`, (err, text) => {
      parseAgents(text);
      callback(err);
    });
  } else {
    parseAgents(fs.readFileSync(`${__dirname}/db/agents.yml`, 'utf8'));
  }
}

/**
 * Build regex from strings
 */
 function parseAgents(text) {
   let data = yaml.safeLoad(text) || {};
   let agents = data.agents || [];
   DB = agents.map(agent => {
     agent.regex = new RegExp(agent.regex);
     return agent;
   });
 }

/**
 * Find and agent in the database
 */
function findAgent(agentStr) {
  return DB.find(agent => agent.regex.test(agentStr)) || null;
}
