const support = require('./support');
const podagent = require('../index');

const printTotal = (obj) => {
  let keys = Object.keys(obj).sort();
  alog(`Total: ${keys.length}`);
  keys.sort((a, b) => obj[b] - obj[a]).forEach(n => {
    dlog(`${n} = ${obj[n]}`)
  });
};

describe('tags-test', function() {

  it('names', () => {
    let names = {};
    support.eachAgent((agent, weight) => {
      let data = podagent.parse(agent);
      if (data) {
        let count = names[data.name || null] || 0;
        names[data.name || null] = count + 1;
      }
    });
    printTotal(names);
  });

  it('types', () => {
    let types = {};
    support.eachAgent((agent, weight) => {
      let data = podagent.parse(agent);
      if (data) {
        let count = types[data.type || null] || 0;
        types[data.type || null] = count + 1;
      }
    });
    printTotal(types);
  });

  it('os', () => {
    let oss = {};
    support.eachAgent((agent, weight) => {
      let data = podagent.parse(agent);
      if (data) {
        let count = oss[data.os || null] || 0;
        oss[data.os || null] = count + 1;
      }
    });
    printTotal(oss);
  });

});
