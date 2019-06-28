const expect = require('chai').expect;
const support = require('./support');
const podagent = require('../index');

describe('examples-test', function() {

  it('all examples match their regex', () => {
    let nonMatching = 0;

    support.eachExample((str, idx) => {
      const agent = podagent.parse(str);
      const matcher = podagent.db.agents[idx][0];

      if (!agent) {
        alog(`${str} => no matches ${matcher}`);
        nonMatching++;
      } else if (agent.index !== idx) {
        alog(`${str} => matches ${agent.regex} (${agent.index}) instead of ${matcher} (${idx})`);
        nonMatching++;
      }
    });

    expect(nonMatching).to.equal(0);
  });

  it('all regexps have an example', () => {
    let hasExamples = {};
    support.eachExample((str, idx) => hasExamples[idx] = true);

    let missingExamples = 0;
    podagent.db.agents.forEach((m, idx) => {
      if (!hasExamples[idx] && !m[4]) {
        missingExamples++;
        alog(`${m[0]} => no examples`);
      }
    });

    expect(missingExamples).to.equal(0);
  });

});
