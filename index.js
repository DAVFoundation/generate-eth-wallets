#!/usr/bin/env node
const { writeFileSync } = require('fs');
const { EOL } = require('os');
const json2csv = require('json2csv').parse;
const program = require('commander');
const pkg = require('./package.json');
const version = pkg.version;
const eth = require('ethereumjs-wallet');

program
  .version(version)
  .description(`Generate multiple wallets`)
  .option('-g, --generate <n>', 'Number of wallets to generate', 1)
  .parse(process.argv);

if (program.generate && program.generate > 0) {
  let wallets = [];
  let wallet;
  for (let i = 0; i < program.generate; i++) {
    wallet = eth.generate();
    wallets.push({
      'private': wallet.getPrivateKeyString(),
      'public': wallet.getPublicKeyString(),
      'address': wallet.getChecksumAddressString(),
    });
  }

  writeFileSync('./wallets.csv', json2csv(wallets));
}
