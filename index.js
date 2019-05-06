const fs = require('fs');
const db = require('./db/agents.js');

/**
 * Parse a user agent string
 */
exports.parse = (agentStr, callback) => {
  const match = db.matchers.find(m => m[0].test(agentStr));
  const data = exports.format(match);
  if (callback) {
    callback(null, data);
  }
  return data;
}

/**
 * Return _all_ matches for a user agent, not just the first
 */
exports.parseAll = (agentStr, callback) => {
  const matches = db.matchers.filter(m => m[0].test(agentStr));
  const datas = matches.map.map(m => exports.format(m));
  if (callback) {
    callback(null, datas);
  }
  return datas;
}

/**
 * Nicely format a matcher
 */
exports.format = (match) => {
  if (match) {
    return {
      regex: match[0],
      name: db.tags[match[1]] || null,
      type: db.tags[match[2]] || null,
      os: db.tags[match[3]] || null,
      nameId: match[1] || null,
      typeId: match[2] || null,
      osId: match[3] || null,
      bot: match[4] || false,
    };
  } else {
    return null;
  }
}
