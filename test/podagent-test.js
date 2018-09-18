const expect = require('chai').expect;
const podagent = require('../index');

describe('podagent-test', function() {

  let str = 'AppleCoreMedia/1.0.0.14C92 (iPhone; U; CPU OS 10_2 like Mac OS X; en_us)';

  it('async parses user agents', (done) => {
    podagent.parse(str, (err, agent) => {
      expect(agent.name).to.equal('Apple Podcasts');
      expect(agent.type).to.equal('Mobile App');
      expect(agent.os).to.equal('iOS');
      expect(agent.nameId).to.equal(25);
      expect(agent.typeId).to.equal(36);
      expect(agent.osId).to.equal(43);
      done(err);
    });
  });

  it('sync parses user agents', () => {
    let agent = podagent.parse(str);
    expect(agent.name).to.equal('Apple Podcasts');
    expect(agent.type).to.equal('Mobile App');
    expect(agent.os).to.equal('iOS');
    expect(agent.nameId).to.equal(25);
    expect(agent.typeId).to.equal(36);
    expect(agent.osId).to.equal(43);
  });

  it('returns nulls for unknowns on a match', () => {
    let agent = podagent.parse('curl/foo');
    expect(agent.bot).to.equal(true);
    expect(agent.name).to.be.null;
    expect(agent.type).to.be.null;
    expect(agent.os).to.be.null;
    expect(agent.nameId).to.be.null;
    expect(agent.typeId).to.be.null;
    expect(agent.osId).to.be.null;
  });

  it('returns null for a non-match', () => {
    let agent = podagent.parse('foo/bar');
    expect(agent).to.be.null;
  });

  it('can be case insensitive', () => {
    expect(podagent.parse('Pocket Casts')).not.to.be.null;
    expect(podagent.parse('Pocket casts')).to.be.null;
    expect(podagent.parse('Mozilla/5.0 (compatible; Google-Podcast)')).not.to.be.null;
    expect(podagent.parse('Mozilla/5.0 (compatible; gOoGle-Podcast)')).not.to.be.null;
  });

});
