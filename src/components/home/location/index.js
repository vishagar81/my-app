import { h, Component } from 'preact';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class Location extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			geocodeResults: null
		};
		this.handleSelect = this.handleSelect.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSelect(address){
		this.setState({ address });
		geocodeByAddress(address)
			.then((results) => getLatLng(results[0]))
			.then(({ lat, lng }) => {
				console.log('Success Yay', { lat, lng });
				this.props.setLatLon(lat, lng); // pass the lat/lng values to parent
				this.setState({ geocodeResults: this.renderGeocodeSuccess(lat, lng)});
			})
			.catch((error) => {
				console.log('Oh no!', error);
				this.setState({ geocodeResults: this.renderGeocodeFailure(error) });
			});
	}

	handleChange = (address) => {
		this.setState({ address, geocodeResults: null });
	};

	renderGeocodeFailure(err) {
		return (
			<div className="alert alert-danger" role="alert">
				<strong>Error!</strong> {err}
			</div>
		);
	}

	renderGeocodeSuccess(lat, lng) {
		return (
			<div className="alert alert-success" role="alert">
				<strong>Success!</strong> Geocoder found latitude and longitude: <strong>{lat}, {lng}</strong>
			</div>
		);
	}

	render(){
		const AutocompleteItem = ({ formattedSuggestion }) => (
			<div className="suggestion-item">
			  <i className='fa fa-map-marker suggestion-icon'/>
			  <strong>{formattedSuggestion.mainText}</strong>{' '}
			  <small className="text-muted">{formattedSuggestion.secondaryText}</small>
			</div>);

		const inputProps = {
			value: this.state.address,
			onChange: this.handleChange,
			type: 'search',
			autoFocus: true,
			placeHolder: 'search places'
		};

		const options = {
			highlightFirstSuggestion: true,
			googleLogo: false
		};

		return (
			<div>
				<PlacesAutocomplete
					inputProps={inputProps}
					options={options}
					autoCompleteItem={AutocompleteItem}
					onSelect={this.handleSelect}
					onEnterKeyDown={this.handleSelect} />
				{this.state.geocodeResults}
			</div>
		);
	}
}
