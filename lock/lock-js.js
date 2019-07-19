const fs = require('fs')
const yaml = require('js-yaml')

/**
 * Convert lockfile to javascript agents.lock.yml -> agents.js
 */
const lockFile = `${__dirname}/../db/agents.lock.yml`
const outFile = `${__dirname}/../db/agents.lock.js`
const lockText = fs.readFileSync(lockFile, 'utf8')
const lockData = yaml.safeLoad(lockText) || {}

console.log('write js database...')

// agent matchers
const agents = lockData.agents.map((agent, idx) => {
  const re = new RegExp(agent.regex, agent.ignorecase ? 'i' : undefined)
  const name = agent.name || 'null'
  const type = agent.type || 'null'
  const os = agent.os || 'null'
  const comma = (idx === lockData.agents.length - 1) ? '' : ','
  if (agent.bot) {
    return `  [${re}, ${name}, ${type}, ${os}, true]${comma}`
  } else {
    return `  [${re}, ${name}, ${type}, ${os}]${comma}`
  }
})

// tags lookup
const tags = Object.keys(lockData.tags).map((id, idx) => {
  const escaped = lockData.tags[id].replace(/'/g, `\\'`)
  const comma = (idx === Object.keys(lockData.tags).length - 1) ? '' : ','
  return `  ${id}: '${escaped}'${comma}`
})

// write to file
console.log(`  ${agents.length} agents`)
fs.writeFileSync(outFile, 'exports.agents = [\n' + agents.join('\n') + '\n];\n')
console.log(`  ${tags.length} tags`)
fs.appendFileSync(outFile, 'exports.tags = {\n' + tags.join('\n') + '\n};\n')
