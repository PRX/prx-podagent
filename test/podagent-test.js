const expect = require('chai').expect;
const podagent = require('../index');

describe('podagent-test', function() {

  let str = 'AppleCoreMedia/1.0.0.14C92 (iPhone; U; CPU OS 10_2 like Mac OS X; en_us)';

  it('async parses user agents', (done) => {
    podagent.parse(str, (err, agent) => {
      expect(agent.name).to.equal('Podcasts');
      expect(agent.type).to.equal('Mobile App');
      expect(agent.os).to.equal('iOS');
      expect(agent.nameId).to.equal('25');
      expect(agent.typeId).to.equal('36');
      expect(agent.osId).to.equal('43');
      done(err);
    });
  });

  it('sync parses user agents', () => {
    let agent = podagent.parse(str);
    expect(agent.name).to.equal('Podcasts');
    expect(agent.type).to.equal('Mobile App');
    expect(agent.os).to.equal('iOS');
    expect(agent.nameId).to.equal('25');
    expect(agent.typeId).to.equal('36');
    expect(agent.osId).to.equal('43');
  });

});
