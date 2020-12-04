let fs = require('fs');
const {valueIdGiver, valueGiverFromValues, createStructure} = require('./createStructure');
const values = JSON.parse(fs.readFileSync('Values.json').toString());
let structure = JSON.parse(fs.readFileSync('TestcaseStructure.json').toString());

function valueSearcher(params) {
	params.forEach(el => {
		if (el.values) el.values.forEach(el => {
			valueObj[el.id] = el.title;
			if (el.params) valueSearcher(el.params);
		})
	})
}

let valueObj = {};

values.values.forEach(el => valueObj[el.id] = el.value);
valueSearcher(structure.params);

describe('Checking the giving function', () => {

	test('The valueIdGiver return correct id', () => {
		structure.params.forEach(el => expect(valueIdGiver(el.id, values.values)).toBe(valueObj[el.id] ? valueObj[el.id] : ""));
	});

	test('The valueGiverFromValues return correct value', () => {
		structure.params.forEach(el => {
			if (el.values) {
				expect(valueGiverFromValues(valueIdGiver(el.id, values.values), el.values)).toBe(valueObj[valueObj[el.id]] ? valueObj[valueObj[el.id]] : "");
			}
		})
	});
})

describe('Checking the result', () => {
	const result = createStructure();
	
	test("Comparing result's values", () => {
		result.params.forEach(el => {
			if (!el.values) expect(el.value).toBe(valueObj[el.id]);
			else expect(el.value).toBe(valueObj[valueObj[el.id]]);
		})
	});

	test("Checking empty values", () => {
		result.params.forEach(el => expect(el.value).not.toBeUndefined())
	})
})