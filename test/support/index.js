const fs = require('fs');
const csv = require('csv');
const mocha = require('mocha');

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

// agent map
const agentLookup = {}
exports.eachAgent = fn => Object.keys(agentLookup).forEach(a => fn(a, agentLookup[a]));

// test agent string csv loader
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
