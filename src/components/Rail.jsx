import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'

import Departures from '../components/NationalRailDepartures'

import railStations from '../lib/railStations'

export default class Rail extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      errors: []
    }

    this.handleClearCallingPoint = this.handleClearCallingPoint.bind(this)
    this.handleAddError = this.handleAddError.bind(this)
    this.handleClearErrors = this.handleClearErrors.bind(this)
  }

  handleClearCallingPoint() {
    this.refs.callingPoint.getInstance().clear()
  }

  handleAddError(error) {
    this.setState({ errors: this.state.errors.concat(String(error)) })
  }

  handleClearErrors() {
    this.setState({ errors: [] })
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-12 col-lg-6 offset-lg-3'>
            <div className='jumbotron jumbotron-fluid'>
              <div className='container'>
                <h1 className='display-4'>Train Times</h1>
                <h3>National Rail Services</h3>
                <p>This page lists the next trains to leave a National Rail
                train station within the next two hours.</p>
                <p>You can filter trains by stations they stop at. Tap the
                <i className="fa fa-ellipsis-h px-2" aria-hidden="true"></i>
                icon to see all calling points.</p>
                <form>
                  <div className='form-row'>
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
                  <div className='form-row'>
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
        </div>
        <div className='row'>
          <div className='col-xs-12 col-lg-6 offset-lg-3'>
            {
              this.state.station
                ? <Departures
                    stationName={this.state.station.name}
                    stationCode={this.state.station.code}
                    callingPointName={this.state.callingPoint ? this.state.callingPoint.name : null}
                    callingPointCode={this.state.callingPoint ? this.state.callingPoint.code : null}
                    limit={10}
                    handleAddError={this.handleAddError}
                    handleClearErrors={this.handleClearErrors}
                  />
                : null
            }
            {
              this.state.errors.length > 0
                ? this.state.errors.map((error, i) =>
                    <p className='alert alert-danger my-1' key={i}>
                      {error}
                    </p>)
                : null
            }
          </div>
        </div>
      </div>
    )
  }
}
