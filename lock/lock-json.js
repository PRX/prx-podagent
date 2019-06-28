const fs = require('fs')
const yaml = require('js-yaml')

/**
 * Convert lockfile to javascript agents.lock.yml -> agents.json
 */
const lockFile = `${__dirname}/../db/agents.lock.yml`
const outFile = `${__dirname}/../db/agents.lock.json`
const lockText = fs.readFileSync(lockFile, 'utf8')
const lockData = yaml.safeLoad(lockText) || {}

// write to file
console.log('write json database...')
console.log(`  ${lockData.agents.length} agents`)
console.log(`  ${Object.keys(lockData.tags).length} tags`)
fs.writeFileSync(outFile, JSON.stringify(lockData, null, 2))
