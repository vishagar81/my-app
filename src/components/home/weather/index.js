import { h, Component } from 'preact';
import style from './style.less';

export default class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {
			weather:{},
			main:{},
			wind:{},
			name,
			lat: this.props.latLon.lat,
			lon: this.props.latLon.lon
		};
		this.setInitialPosition = this.setInitialPosition.bind(this);
	}

	getCurrentLocation(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.setInitialPosition);
		} else {
			console.warning("Geolocation is not supported by this browser.");
		}
	}

	setInitialPosition(position){
		this.setState({ lat: position.coords.latitude, lon: position.coords.longitude});
	}

	componentWillUpdate(nextProps, nextState){
		this.setState({lat: nextProps.latLon.lat, lon: nextProps.latLon.lon});
	}

	componentDidMount(){
		if (this.props.latLon.lat === undefined && this.props.latLon.lon === undefined){
			this.getCurrentLocation();
		}
		else {
			this.getWeatherInfo(this.state.lat, this.state.lon);
		}
	}

	getWeatherInfo(lat, lon){
		const API_KEY = '918a46f65d33658c6f41575202305e40';
		fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + API_KEY)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				this.setState(data);
			});
	}

	render(){
		let weatherDescription = '';
		let imgSrc = '';
		let currentTemp = '';
		this.getWeatherInfo(this.state.lat, this.state.lon);

		if (this.state.weather[0]){
			weatherDescription = this.state.weather[0].description;
			imgSrc = 'http://openweathermap.org/img/w/' + this.state.weather[0].icon + '.png';
			currentTemp = this.state.main.temp;
		}

		return (
			<div class="row">
				<div className="card">
					<div class="section">
						<div class={style.left}>
							<h2>{currentTemp}&deg;C</h2>
							<p>Feels like {currentTemp}&deg;C</p>
						</div>
						<div class={style.right}>
							<img src={imgSrc} />
							<p>{weatherDescription}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}