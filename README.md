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

## Development

Basic tests are located in the `/test` directory, and can be run with `npm test`.

Additionally, there is a `test/support/testagents.csv` file containing some actual
production logs.  The "coverage" and "omissions" tests use this file to check that
the database file accounts for all the major known user agents.

To add a new user agent:

1. Add some lines to `testagents.csv` with your new user agent. Give them a high
   count like "9999" and run the tests to make sure they show up in the omissions.
2. Edit the `db/agents.yml` to include a regular expression, then a name for the
   app and the type/os (if known). Try to be reasonably specific with your regex,
   so that you don't unintentionally match other user agents.
3. Run `npm lock` to regenerate the `db/agents.lock.yml`.  This file normalizes
   the text tags/labels shared between the various matchers.  Check that your
   change didn't add any unexpected new tags (if you accidentally changed the
   case of a label or something).
4. Re-run the tests to validate that your agent strings are no longer in the
   omissions test.

## License

[MIT License](LICENSE)

## Contributing

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request
