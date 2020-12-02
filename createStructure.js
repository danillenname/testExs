let fs = require('fs');
let structure = JSON.parse(fs.readFileSync('TestcaseStructure.json').toString());
let values = JSON.parse(fs.readFileSync('Values.json').toString());

function valueIdGiver(id, values) {
	for (let i = 0; i < values.length; i++) {
		if (values[i].id == id) return values[i].value
	}
	return '';
}

function valueGiverFromValues(id, values) {
	for (let i = 0; i < values.length; i++) {
		if (values[i].id == id) return values[i].title
	}
	return '';
}

function fillParams(element) {
	if (!element.values) element.value = valueIdGiver(element.id, values.values)
	else {
		element.values.forEach(el => {
			if (el.params) el.params.forEach(el => fillParams(el))
		});
		element.value = valueGiverFromValues(valueIdGiver(element.id, values.values), element.values)
	}
}

function createStructure() {
	structure.params.forEach(el => fillParams(el))
	fs.writeFile("result.json", JSON.stringify(structure), (err) => {
		if (err) throw err;
	})
}

createStructure()