const fs = require('fs')
const yaml = require('js-yaml')

/**
 * Convert lockfile to javascript agents.lock.yml -> agents.js
 */
const lockFile = `${__dirname}/../db/agents.lock.yml`
const outFile = `${__dirname}/../db/agents.js`
const lockText = fs.readFileSync(lockFile, 'utf8')
const lockData = yaml.safeLoad(lockText) || {}

console.log('write js database...')

// tags lookup object (int id => string name)
const tags = Object.keys(lockData.tags).map((id, idx) => {
  const escaped = lockData.tags[id].replace(/'/g, `\\'`)
  const comma = (idx === Object.keys(lockData.tags).length - 1) ? '' : ','
  return `  ${id}: '${escaped}'${comma}`
})

// regex objects
const matchers = lockData.agents.map((agent, idx) => {
  const name = agent.name || 'null'
  const type = agent.type || 'null'
  const os = agent.os || 'null'
  const comma = (idx === lockData.agents.length - 1) ? '' : ','
  if (agent.bot) {
    return `  [${agent.regex}, ${name}, ${type}, ${os}, true]${comma}`
  } else {
    return `  [${agent.regex}, ${name}, ${type}, ${os}]${comma}`
  }
})

// write to file
console.log(`  ${tags.length} tags`)
fs.writeFileSync(outFile, 'exports.tags = {\n' + tags.join('\n') + '\n};\n')
console.log(`  ${matchers.length} matchers`)
fs.appendFileSync(outFile, 'exports.matchers = [\n' + matchers.join('\n') + '\n];\n')
