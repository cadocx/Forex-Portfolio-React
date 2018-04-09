import { Stock, Watchlist } from './watchlistModel';

export default [
	Object.assign(new Watchlist(), {
		id: 1,
		name: 'Forex',
		description: 'My Foreign Exchange Positions',
		owner: 'sample',
		stocks: [
			Object.assign(new Stock(), {
				code: 'EURUSD',
				name: 'EUR/USD',
				unitsOwned: 100,
				avgPrice: 1.25
			}),
			Object.assign(new Stock(), {
				code: 'USDCAD',
				name: 'USD/CAD',
				unitsOwned: 50,
				avgPrice: 1.25
			})
		]
	})
];