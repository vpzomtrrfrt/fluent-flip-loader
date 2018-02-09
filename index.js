const syntax = require('fluent-syntax');
const flip = require('flipout');

function flipElement(element) {
	if(element.type === "TextElement") {
		element.value = flip(element.value);
	}
	else if(element.type === "Placeable") {
		flipExpression(element.expression);
	}
}

function flipExpression(expression) {
	if(expression.type === "SelectExpression") {
		expression.variants.forEach(function(variant) {
			flipValue(variant.value);
		});
	}
}

function flipValue(value) {
	value.elements = value.elements.reverse();
	value.elements.forEach(flipElement);
}

module.exports = function(content) {
	const resource = syntax.parse(content);
	resource.body.forEach(function(msg) {
		//console.log(msg);
		if(msg.type === "Message") {
			flipValue(msg.value);
		}
	});
	const tr = syntax.serialize(resource);
	return tr;
};
