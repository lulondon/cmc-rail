import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'

import Departures from '../components/NationalRailDepartures'

import railStations from '../lib/railStations'

export default class Rail extends Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }

    this.handleClearCallingPoint = this.handleClearCallingPoint.bind(this)
  }

  handleClearCallingPoint() {
    this.refs.callingPoint.getInstance().clear()
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
              <form>
                <div className='form-row py-1 px-3'>
                  <div className='form-group col-lg col-xs-12'>
                    <label htmlFor='stationSelector'>Station Name</label>
                    <Typeahead
                      labelKey='name'
                      ref='station'
                      multiple={false}
                      options={railStations}
                      onChange={station => this.setState({ station: station[0] })}
                      onFocus={this.handleClearCallingPoint}
                    />
                  </div>
                </div>
                <div className='form-row py-1 px-3'>
                  <div className='form-group col-lg col-xs-12'>
                    <label htmlFor='stationSelector'>Filter (trains calling at...)</label>
                    <Typeahead
                      labelKey='name'
                      ref='callingPoint'
                      multiple={false}
                      options={railStations}
                      disabled={!this.state.station}
                      onChange={station => this.setState({ callingPoint: station[0] })}
                      autocomplete={false}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 col-lg-6 offset-lg-3'>
            {
              this.state.station
                ? <Departures
                    title={`${this.state.station.name}`}
                    subtitle={this.state.callingPoint ? `Trains calling at ${this.state.callingPoint.name}` : 'All departures'}
                    station={this.state.station.code}
                    callingPointName={this.state.callingPoint ? this.state.callingPoint.name : null}
                    callingPointCode={this.state.callingPoint ? this.state.callingPoint.code : null}
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
