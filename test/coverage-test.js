const support = require('./support');
const podagent = require('../index');

const printTotal = (count, total) => {
  return (count / total * 100).toFixed(1) + `% (${count} / ${total})`;
}
const countIf = (countFn, totalFn) => {
  let count = 0, countWeight = 0, total = 0, totalWeight = 0;
  support.eachAgent((agent, weight) => {
    let data = podagent.parse(agent);
    if (countFn(data)) {
      count++;
      countWeight += weight;
    }
    if (!totalFn || totalFn(data)) {
      total++;
      totalWeight += weight;
    }
  });
  alog(`Total: ${printTotal(count, total)}`);
  alog(`Weighted: ${printTotal(countWeight, totalWeight)}`);
}

describe('coverage-test', function() {

  it('total coverage', () => {
    countIf(
      agent => agent,
      agent => !agent || (!agent.bot && !agent.blank)
    );
  });

  it('name coverage', () => {
    countIf(
      agent => agent && agent.name,
      agent => !agent || (!agent.bot && !agent.blank)
    );
  });

  it('type coverage', () => {
    countIf(
      agent => agent && agent.type,
      agent => !agent || (!agent.bot && !agent.blank)
    );
  });

  it('os coverage', () => {
    countIf(
      agent => agent && agent.os,
      agent => !agent || (!agent.bot && !agent.blank)
    );
  });

});
