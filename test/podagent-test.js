const expect = require('chai').expect;
const podagent = require('../index');

describe('podagent-test', function() {

  let str = 'AppleCoreMedia/1.0.0.14C92 (iPhone; U; CPU OS 10_2 like Mac OS X; en_us)';
  let browser = 'Mozilla/5.0 (Windows Phone 8.1; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; Microsoft; Lumia 640 LTE) like Gecko';
  let browser2 = 'Mozilla/5.0 (iPad; CPU OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) FxiOS/14.0b12646 Mobile/14G60 Safari/603.3.8';
  let malformed = 'Mozilla/5.0 (Android 8.1.0; Mobile; rv:68.0) Gecko/68.0 Firefox/68.0 %?sTAg7HyfeS4yQEirzez6pRC6(Ymr';

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

  it('can be url encoded', () => {
    let decoded = podagent.parse('팟캐스트/1425.5 CFNetwork/1121.2.2 Darwin/19.3.0');
    expect(decoded).not.to.be.null;
    expect(decoded.name).to.equal('Apple Podcasts');

    let encoded = podagent.parse('%ED%8C%9F%EC%BA%90%EC%8A%A4%ED%8A%B8%2F1425.5%20CFNetwork%2F1121.2.2%20Darwin%2F19.3.0');
    expect(encoded).not.to.be.null;
    expect(encoded.name).to.equal('Apple Podcasts');
    expect(encoded.index).to.equal(decoded.index);
  });

  it('returns all matches for an agent string', () => {
    let agents = podagent.parseAll(browser2);
    expect(agents.length).to.equal(3);
    expect(agents[0].name).to.equal('Firefox');
    expect(agents[0].type).to.equal('Mobile Browser');
    expect(agents[0].os).to.equal('iOS');
    expect(agents[1].name).to.equal('Safari');
    expect(agents[1].type).to.equal('Mobile Browser');
    expect(agents[1].os).to.equal('iOS');
    expect(agents[2].name).to.equal(null);
    expect(agents[2].type).to.equal('Mobile Browser');
    expect(agents[2].os).to.equal('iOS');
  });

  it('returns an empty array for a non-match', () => {
    let agent = podagent.parseAll('foo/bar');
    expect(agent).to.eql([]);
  });

  it('includes the index of the match', () => {
    let agent = podagent.parse(browser);
    expect(agent.index).not.to.be.undefined;

    let matched = podagent.db.agents[agent.index];
    expect(matched[0]).to.equal(agent.regex);
  });

  it('handles malformed uri decode errors', () => {
    let agent = podagent.parse(malformed);
    expect(agent.name).to.equal('Firefox');
    expect(agent.type).to.equal('Mobile Browser');
    expect(agent.os).to.equal('Android');
  });

});
