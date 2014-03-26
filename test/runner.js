require('mocha');
require('chai').should();

mocha.setup('bdd');
require('./specs/index');
mocha.run();