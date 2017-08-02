const support = require('./support');
const podagent = require('../index');

describe('coverage-test', function() {

  it('total coverage', () => {
    let count = 0, weighted = 0;
    support.eachAgent((agent, weight) => {
      if (podagent.parse(agent)) {
        count++;
        weighted += weight;
      }
    });
    alog(`Total: ${support.total(count)}`)
    alog(`Weighted: ${support.weight(weighted)}`)
  });

  it('non-bot coverage', () => {
    let count = 0, weighted = 0;
    support.eachAgent((agent, weight) => {
      if (!support.isBot(agent) && podagent.parse(agent)) {
        count++;
        weighted += weight;
      }
    });
    alog(`Total: ${support.total(count, true)}`)
    alog(`Weighted: ${support.weight(weighted, true)}`)
  });

});
