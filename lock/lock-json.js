const fs = require('fs')
const yaml = require('js-yaml')

/**
 * Convert lockfile to javascript agents.lock.yml -> agents.json
 */
const fullFile = `${__dirname}/../db/agents.yml`
const lockFile = `${__dirname}/../db/agents.lock.yml`
const outFull = `${__dirname}/../db/agents.json`
const outLock = `${__dirname}/../db/agents.lock.json`
const fullText = fs.readFileSync(fullFile, 'utf8')
const lockText = fs.readFileSync(lockFile, 'utf8')
const fullData = yaml.safeLoad(fullText) || {}
const lockData = yaml.safeLoad(lockText) || {}

// write to file
console.log('write json database...')
console.log(`  ${fullData.agents.length} agents`)
console.log(`  ${Object.keys(lockData.tags).length} tags`)
fs.writeFileSync(outFull, JSON.stringify(fullData, null, 2))
fs.writeFileSync(outLock, JSON.stringify(lockData, null, 2))
