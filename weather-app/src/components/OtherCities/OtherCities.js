import React from 'react';
import styles from './OtherCities.module.css';
import classNames from 'classnames/bind';
import City from './components/City';
import getWeathers from '../../apis/getWeathers';

const cx = classNames.bind(styles);

const CITY = [{
  name: 'Melbourne',
  id: '2158177',
}, {
  name: 'Sydney',
  id: '2147714',
}, {
  name: 'Brisbane',
  id: '2174003',
}, {
  name: 'Perth',
  id: '2063523',
}]

class OtherCities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      toggle: false,
    }

  }

  componentDidMount() {
    this.getWeathers();
  }

  async getWeathers() {
    const ids = CITY.map((c) => c.id);

    const { data } = await getWeathers(ids);

    this.setState({
      data,
      loading: false,
    })
  }

  render() {
    const { data, loading, toggle } = this.state;


    return (
      <div data-testid="OTHER_CITIES" className={styles.otherCities}>
      {!toggle && (
        <button 
          className={styles.toggle} 
          onClick={() => this.setState((s) => ({ toggle: !s.toggle }))}
        >
          View More Cities ...
        </button>
      )}
      <div className={cx('container', { active: toggle })}>
        <h2 className={styles.header}>Other Cities</h2>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <div className={styles.cities}>
            {data.list.map((item) => {
              // if (item.id === currentCity.id) {
              //   return null;
              // }
              return (
                <City 
                  key={item.id}
                  name={item.name} 
                  temperature={parseInt(item.main.temp)}
                  weather={{ 
                    icon: item.weather[0].icon, 
                    description: item.weather[0].main,
                  }} 
                  onClick={() => ({
                    id: item.id,
                    name: item.name,
                  })}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
    )
  }
}

export default OtherCities;
