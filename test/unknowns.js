const support = require('./support');
const podagent = require('../index');
const LIMIT = parseInt(process.argv.pop(), 10) || 500;

describe(`finding unknown agents with >= ${LIMIT} requests`, () => {

  it('unknown agents', () => {
    support.eachAgent((agent, weight) => {
      const data = podagent.parse(agent);
      if (weight >= LIMIT && !data) {
        console.log(`    ${weight} => ${agent}`);
      }
    });
  });

});
