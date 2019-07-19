const db = require('./db/agents.lock.js');

/**
 * Direct access
 */
exports.db = db;

/**
 * Parse a user agent string
 */
exports.parse = (agentStr, callback) => {
  let data = null;
  for (let i = 0; i < db.agents.length; i++) {
    if (db.agents[i][0].test(agentStr)) {
      data = exports.format(db.agents[i], i);
      break;
    }
  }
  if (callback) {
    callback(null, data);
  }
  return data;
}

/**
 * Return _all_ matches for a user agent, not just the first
 */
exports.parseAll = (agentStr, callback) => {
  let datas = [];
  for (let i = 0; i < db.agents.length; i++) {
    if (db.agents[i][0].test(agentStr)) {
      datas.push(exports.format(db.agents[i], i));
    }
  }
  if (callback) {
    callback(null, datas);
  }
  return datas;
}

/**
 * Nicely format a matcher
 */
exports.format = (match, idx) => {
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
      index: idx,
    };
  } else {
    return null;
  }
}
