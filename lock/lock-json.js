const fs = require('fs')
const yaml = require('js-yaml')

/**
 * Convert lockfile to javascript agents.lock.yml -> agents.json
 */
const lockFile = `${__dirname}/../db/agents.lock.yml`
const outFile = `${__dirname}/../db/agents.json`
const lockText = fs.readFileSync(lockFile, 'utf8')
const lockData = yaml.safeLoad(lockText) || {}

console.log('write json database...')

// convert to an array of matcher-data
const matchers = lockData.agents.map(agent => {
  return {
    regex: agent.regex,
    name: lockData.tags[agent.name],
    type: lockData.tags[agent.type],
    os: lockData.tags[agent.os],
    bot: agent.bot
  }
})

// write to file
console.log(`  ${matchers.length} matchers`)
fs.writeFileSync(outFile, JSON.stringify(matchers, null, 2))
