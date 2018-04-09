export default function transformMap(inputMap, prop, itemsCount = inputMap.length, mode = 'top') {
	let mapped = [],
		outputArr = [];

	if (!inputMap || inputMap.length === 0 || !prop) return [];

	inputMap.forEach(function(el, key) {
		mapped.push({ key, value: el[prop] });
	});

	mapped.sort(function(a, b) {
		return b.value - a.value;
	});

	outputArr = mapped.map(function(el) {
		return { key: el.key, ...inputMap.get(el.key) };
	});

	return mode === 'top' ? outputArr.slice(0, itemsCount) : outputArr.slice(-itemsCount).reverse();
}
