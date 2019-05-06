const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Normalize and lock agents database
 */
let agentsText = fs.readFileSync(`${__dirname}/db/agents.yml`, 'utf8');
let lockText = fs.readFileSync(`${__dirname}/db/agents.lock.yml`, 'utf8');
let agentsData = yaml.safeLoad(agentsText) || {};
let lockData = yaml.safeLoad(lockText) || {};

const TAG_NAMES = ['name', 'type', 'os'];
const ALLOW_KEYS = ['regex', 'bot', 'blank'];

function invert(obj) {
  let ret = {};
  Object.keys(obj).forEach(k => ret[obj[k]] = k);
  return ret;
}

console.log('reading existing lockfile...');
let tags = invert(lockData.tags || {}), nextId = 1;
Object.values(tags).forEach(id => {
  if (+id >= nextId) {
    nextId = +id + 1;
  }
});
console.log(`  got ${Object.keys(tags).length} tags`);
console.log(`  next id: ${nextId}`);

console.log('reading current db...');
let changes = false;
TAG_NAMES.forEach(tag => {
  (agentsData.agents || []).map(a => a[tag]).filter(v => v).forEach(val => {
    if (!tags[val]) {
      changes = true;
      tags[val] = `${nextId++}`;
      console.log(`  +${tag}[${val}] -> ${tags[val]}`);
    }
  });
});
if (!changes) {
  console.log('  no changes.');
}

console.log('writing new lockfile...');
let newLock = {};
newLock.agents = (agentsData.agents || []).map(agent => {
  let data = {};
  Object.keys(agent).forEach(key => {
    if (agent[key]) {
      if (TAG_NAMES.indexOf(key) > -1) {
        data[key] = tags[agent[key]];
      } else if (ALLOW_KEYS.indexOf(key) > -1) {
        data[key] = agent[key];
      }
    }
  });
  return data;
});
newLock.tags = invert(tags);
console.log(`  ${newLock.agents.length} agents`);
console.log(`  ${Object.keys(newLock.tags).length} tags`);

let newText = yaml.safeDump(newLock, {lineWidth: 200});
fs.writeFileSync(`${__dirname}/db/agents.lock.yml`, newText);
console.log('done!');
