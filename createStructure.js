let fs = require('fs');
try {
	let structure = JSON.parse(fs.readFileSync('TestcaseStructure.json').toString());
	let values = JSON.parse(fs.readFileSync('Values.json').toString());
	structure.params.forEach(el => fillParams(el, values))
	fs.writeFile("result.json", JSON.stringify(structure), (err) => {
		if (err) throw err;
	})
}
catch (err) {
	let errorMessage = {"error": {"message": "Входные файлы некорректны"}}
	fs.writeFile("error.json", JSON.stringify(errorMessage), (err) => {
		if (err) throw err;
	})
	console.log(err.name)
}

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

function fillParams(element, values) {
	console.log(values)
	if (!element.values) element.value = valueIdGiver(element.id, values.values)
	else {
		element.values.forEach(el => {
			if (el.params) el.params.forEach(el => fillParams(el, values))
		});
		element.value = valueGiverFromValues(valueIdGiver(element.id, values.values), element.values)
	}
}
