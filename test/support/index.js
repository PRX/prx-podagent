const fs = require('fs');
const csv = require('csv');
const mocha = require('mocha');
const yaml = require('js-yaml');

// log statements AFTER the test name prints
let afterLogs = [];
beforeEach(() => afterLogs = []);
afterEach(() => afterLogs.forEach(s => {
  if (typeof(s) === 'string') {
    console.log(`      ${s}`)
  } else {
    console.log(`      ${JSON.stringify(s)}`)
  }
}));
exports.alog = msg => afterLogs.push(msg);
global.alog = exports.alog;

// debug log
exports.dlog = msg => {
  if (process.env.DEBUG) {
    exports.alog(mocha.reporters.Base.color('pending', msg));
  }
}
global.dlog = exports.dlog;

// error log
exports.elog = msg => {
  exports.alog(mocha.reporters.Base.color('error message', msg));
}
global.elog = exports.elog;

// load agents.yml examples
const examples = [];
exports.eachExample = fn => examples.forEach(e => fn(e[0], e[1]));
before(function(done) {
  process.stdout.write('  loading agents.yml examples... ');
  fs.readFile(`${__dirname}/../../db/agents.yml`, (err, txt) => {
    yaml.safeLoad(txt).agents.forEach((agent, idx) => {
      (agent.examples || []).forEach(example => {
        examples.push([example, idx]);
      });
    });
    console.log(`got ${examples.length} examples!`);
    done(err);
  });
});

// load testagents.csv
const agentLookup = {}
exports.eachAgent = fn => Object.keys(agentLookup).forEach(a => fn(a, agentLookup[a]));
before(function(done) {
  this.timeout(10000);
  process.stdout.write('  loading testagents.csv... ');
  let parser = csv.parse({columns: true}, (err, data) => {
    console.log(`got ${data.length} agents!\n`);
    data.forEach(data => agentLookup[data.user_agent] = +data.count);
    done(err);
  });
  fs.createReadStream(`${__dirname}/testagents.csv`).pipe(parser);
});
