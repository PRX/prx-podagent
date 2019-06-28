const fs = require('fs')
const yaml = require('js-yaml')
const pug = require('pug')

/**
 * Compile html docs
 */
const agentsFile = `${__dirname}/../db/agents.yml`
const lockFile = `${__dirname}/../db/agents.lock.yml`
const agentsText = fs.readFileSync(agentsFile, 'utf8')
const lockText = fs.readFileSync(lockFile, 'utf8')
const agentsData = yaml.safeLoad(agentsText) || {}
const lockData = yaml.safeLoad(lockText) || {}

const pugFile = `${__dirname}/../docs/index.pug`
const outFile = `${__dirname}/../docs/index.html`

console.log('write html docs...')

// combine data
const agents = agentsData.agents
agents.forEach((agent, idx) => {
  agent.index = idx
  agent.nameId = parseInt(lockData.agents[idx].name) || null
  agent.typeId = parseInt(lockData.agents[idx].type) || null
  agent.osId = parseInt(lockData.agents[idx].os) || null
})
const tags = lockData.tags

// render it
const html = pug.renderFile(pugFile, {pretty: true, agents, tags})
fs.writeFileSync(outFile, html)
console.log(`  ${agents.length} agents`)
