import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'

import DepartureBoard from './DepartureBoard'

import railStations from '../../lib/railStations'

class Rail extends Component {
  render() {
    const {
      callingPoint,
      departures,
      errors,
      handleClearCallingPoint,
      handleUpdateCallingPoint,
      handleUpdateStation,
      station
    } = this.props

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
                        onChange={handleUpdateStation}
                        onFocus={handleClearCallingPoint}
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
                        disabled={!station}
                        onChange={handleUpdateCallingPoint}
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
              station
                ? <DepartureBoard
                    departures={departures}
                    station={station}
                    callingPoint={callingPoint}
                  />
                : null
            }
            {
              errors.length > 0
                ? errors.map((error, i) =>
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

export default Rail
