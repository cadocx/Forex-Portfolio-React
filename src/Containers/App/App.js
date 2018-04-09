import React, { Component } from 'react';
import { number, object } from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchQuotes } from '../../actions/quotesActions';
import { loadWatchlists, selectWatchlist } from '../../actions/watchlistsActions';
import selectQuotesInterval from '../../selectors/selectQuotesInterval';
import Navbar from '../../components/Navbar/Navbar';
import Routes from '../../Routes';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

injectTapEventPlugin();

class App extends Component {
	static quotesTimer;
	static quotesRefInterval;

	static propTypes = {
		quotesRefInterval: number.isRequired,
		actions: object
	};

	static defaultProps = {
		quotesRefInterval: 300
	};

	componentDidMount() {
		this.props.actions.loadWatchlists();
		this.props.actions.selectWatchlist({id: "1"});
		this.quotesRefInterval = this.props.quotesRefInterval;
		this.setQuotesTimer();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.quotesRefInterval !== this.props.quotesRefInterval) {
			clearTimeout(this.quotesTimer);
			this.quotesRefInterval = nextProps.quotesRefInterval;
			this.setQuotesTimer();
		}
	}

	shouldComponentUpdate() {
		return false;
	}

	componentWillUnmount() {
		clearTimeout(this.quotesTimer);
	}

	updateQuotes = () => {
		this.props.actions.fetchQuotes();
		this.setQuotesTimer();
	};

	setQuotesTimer = () => {
		this.quotesTimer = setTimeout(this.updateQuotes, this.quotesRefInterval * 1000);
	};

	showDashboard = () => {
		this.props.actions.selectWatchlist(null);
	};

	render() {
		return (
			<div>
				<Grid fluid>
					<Row className="app-container">
						<Col lg={12} md={12} className="content-col-style">
							<Navbar />
							<Routes />
						</Col>
					</Row>
				</Grid>
				<ToastContainer />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		quotesRefInterval: selectQuotesInterval(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ fetchQuotes, loadWatchlists, selectWatchlist }, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
