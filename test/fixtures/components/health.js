import Component from 'tombo/component.js';
import inherit from 'inherit';

export default Health;

function Health (max, current) {
	this.max = max;
	this.current = current || max;
}

inherit(Health, Component);