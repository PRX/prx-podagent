# PRX Podcast User-Agent Parser

[![license](https://img.shields.io/github/license/PRX/prx-podagent.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/prx-podagent.svg)](https://www.npmjs.com/package/prx-podagent)
[![npm](https://img.shields.io/npm/dt/prx-podagent.svg)](https://www.npmjs.com/package/prx-podagent)

## Description

Basic User-Agent string parser that includes some basic podcasting apps.  This
project is intended to help parse/group requests for analytics purposes, not for
browser feature detection.

The included `agents.lock.yml` also includes name/type/os IDs, in case you want
to normalize the strings in your database.

## Install

Just `npm install --save prx-podagent`. It's that easy!

## Usage

Async (recommended):

```node
const podagent = require('prx-podagent');
podagent.parse('some-string', (err, agent) => {
  if (agent) {
    console.log('Match:', agent.name, agent.type, agent.os);
  } else {
    console.log('Did not match any known agents');
  }
});
```

Sync:

```node
const podagent = require('prx-podagent');
let agent = podagent.parse('some-string');
if (agent) {
  console.log('Match:', agent.name, agent.type, agent.os);
} else {
  console.log('Did not match any known agents');
}
```

## License

[MIT License](LICENSE)

## Contributing

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request
