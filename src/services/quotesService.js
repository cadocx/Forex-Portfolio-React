import Tickers from '../assets/tickers-list.json';

export class QuotesService {
	static base_url = 'https://forex.1forge.com/1.0.3/quotes?pairs=';
	static tickers = [];

	static async refreshQuotes(stockCodes) {
		if (stockCodes) {
			const gUrl = `${this.base_url}${stockCodes}&api_key=GK4WDZgSfdyZrd63i6hRrvb7mEsKpKfW`;
			let newQuotes;
			let quotesMap;
			try {
				let response = await fetch(gUrl);
				newQuotes = await response.json();
				console.log("newquotes", newQuotes);
			} catch (err) {
				console.error('error api call ', err);
			}
			quotesMap = this.createQuotesMap(newQuotes);
			console.log(JSON.stringify(quotesMap));
			if (stockCodes.length===1) {
				const newQuote = quotesMap.get(stockCodes);
				return new Map().set(stockCodes, newQuote);
			}
			return quotesMap;
		}
		return null;
	}

	static createQuotesMap(newquotes) {
		let quotesMap = new Map();
		newquotes.forEach(newquote => {
			console.log("newqquote ", newquote);
			let quote = {};
			quote.lastPrice = newquote.price;
			quotesMap.set(newquote.symbol, quote);
		});
		return quotesMap;
	}

	static generateRandomQuotes(stockCodes) {
		let newQuotes = [];
		stockCodes.split(',').forEach(code => {
			newQuotes.push({
				t: code,
				l: String(500 * Math.random()),
				c: String(Math.random() - 0.5),
				cp: String(Math.random() - 0.5)
			});
		});
		return newQuotes;
	}

	static searchTickers(value, exact = false) {
		if (exact) {
			return Tickers.filter(ticker => ticker.code === value || ticker.name === value);
		}
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		return Tickers.filter(
			ticker =>
				ticker.code.toLowerCase().slice(0, inputLength) === inputValue ||
				ticker.name.toLowerCase().slice(0, inputLength) === inputValue
		);
	}
}
