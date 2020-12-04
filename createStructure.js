const fs = require('fs');

try {
	fs.writeFile("StructureWithValues.json", JSON.stringify(createStructure()), (err) => {
		if (err) throw err;
	})
} catch (err) {
	const errorMessage = {
		"error": {
			"message": "Входные файлы некорректны"
		}
	};
	fs.writeFile("Error.json", JSON.stringify(errorMessage), (err) => {
		if (err) throw err;
	})
	console.log(err.name);
}

function valueIdGiver(id, values) {
	const elem = values.find(item => item.id === id);
	return elem ? elem.value : '';
}

function valueGiverFromValues(id, values) {
	const elem = values.find(item => item.id === id);
	return elem ? elem.title : '';
}

function fillParams(element, values) {
	if (!element.values) element.value = valueIdGiver(element.id, values.values);
	else {
		element.values.forEach(el => {
			if (el.params) el.params.forEach(el => fillParams(el, values));
		});
		element.value = valueGiverFromValues(valueIdGiver(element.id, values.values), element.values);
	}
}

function createStructure() {
	let structure = JSON.parse(fs.readFileSync('TestcaseStructure.json').toString());
	const values = JSON.parse(fs.readFileSync('Values.json').toString());

	structure.params.forEach(el => fillParams(el, values));
	return structure;
}

module.exports = {valueIdGiver, valueGiverFromValues, createStructure}