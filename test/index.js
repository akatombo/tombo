console.log(require.modules)

import 'mocha';
import chai from 'chai'

chai.should();
mocha.setup('bdd');
import './specs'
mocha.run();