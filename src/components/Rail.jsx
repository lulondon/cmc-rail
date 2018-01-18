import React, { Component } from 'react'

import Departures from '../components/NationalRailDepartures'

// import stations from '../lib/railStations'

// const stationsConfig = {
//   text: 'name',
//   value: 'code'
// }

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      departure: {
        name: 'Leicester',
        code: 'LEI'
      },
      callingAt: null
    }

    this.handleChangeDeparture = this.handleChangeDeparture.bind(this)
    this.handleChangeCallingAt = this.handleChangeCallingAt.bind(this)
  }

  handleChangeDeparture(station) {
    this.setState({ departure: station })
  }

  handleChangeCallingAt(station) {
    this.setState({ callingAt: station })
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-12 col-lg-6 offset-lg-3'>
            <div className='jumbotron jumbotron-fluid'>
              <div className='container'>
                <h1 className='display-4'>National Rail Departures</h1>
                <p className='lead'>The next trains departing from this station.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 col-lg-6 offset-lg-3'>
            {
              this.state.loading
                ? <div className='spinner'><div className="bounce1"></div><div className="bounce2"></div><div className="bounce3"></div></div>
                : null
            }
            {
              this.state.departure
                ? <Departures
                    title={`${this.state.departure.name} Departures`}
                    subtitle={this.state.callingAt ? `Trains calling at ${this.state.callingAt.name}` : 'All departures'}
                    station={this.state.departure.code}
                    destination={this.state.callingAt ? this.state.callingAt.code : null}
                    limit={10}
                  />
                : null
            }
          </div>
        </div>
      </div>
    )
  }
}
