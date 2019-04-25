var React = require('react');
var PropTypes = require('prop-types');

var styles = {
	content: {
		textAlign: 'center',
		fontSize: '35px'
	}
}

class Loading extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			text: props.text,
		}
	}
	// when manipulating previous state, pass prevState into setState method.

	componentDidMount() {
		var stoppper = this.props.text + '...';

		this.interval = window.setInterval(function() {
			if(this.state.text === stoppper) {
				this.setState(function() {
					return {
						text: this.props.text
					}
				})
			} else {
				this.setState(function(prevState) {
					return {
						text: prevState.text + '.'
					}
				})
			}
		}.bind(this), this.props.speed)
	}

	// remove the setInterval call
	componentWillUnmount() {
			console.log('interval cleared');
			window.clearInterval(this.interval);
	}

	render() {
		return (
			<p style={styles.content}>
				{this.state.text}
			</p>
		)
	}
}

Loading.propTypes = {
	text: PropTypes.string.isRequired,
	speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
	text: 'Loading',
	speed: 300
}

module.exports = Loading;
