import { h, Component } from 'preact';
import style from './style.less';
import Location from './location';
import Weather from './weather';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			geoLatLon: {}
		};
		this.setLatLon = this.setLatLon.bind(this);
	}

	setLatLon(lat, lon){
		let geoLatLon = {lat, lon};
		this.setState({geoLatLon});
	}

	render(){
		return (
			<div class={style.home}>
				<Location setLatLon={this.setLatLon}/>
				<Weather latLon={this.state.geoLatLon}/>
				<Weather latLon={this.state.geoLatLon}/>
			</div>
		);
	}
}
