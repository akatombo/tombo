import 'mocha';
import chai from 'chai'

chai.should();
mocha.setup('bdd');
import './tombo.js'
mocha.run();