const support = require('./support');
const podagent = require('../index');

const MAX_PRINT = 20;

const printTotal = (obj) => {
  let keys = Object.keys(obj).sort();
  alog(`Total: ${keys.length}`);

  let moreThan10k = keys.filter(k => obj[k] > 10000).length;
  let moreThan1k = keys.filter(k => obj[k] > 1000).length;
  let moreThan100 = keys.filter(k => obj[k] > 100).length;
  alog(`> 10k matches: ${moreThan10k}`);
  alog(`> 1k matches: ${moreThan1k}`);
  alog(`> 100 matches: ${moreThan100}`);

  let printed = 0;
  keys.sort((a, b) => obj[b] - obj[a]).forEach(n => {
    if (printed++ < MAX_PRINT) {
      dlog(`${n} = ${obj[n]}`)
    } else {
      return false;
    }
  });
};

describe('omissions-test', function() {

  it('overall missing', () => {
    let missed = {};
    support.eachAgent((agent, weight) => {
      let data = podagent.parse(agent);
      if (!data) {
        missed[agent] = (missed[agent] || 0) + weight;
      }
    });
    printTotal(missed);
  });

});
