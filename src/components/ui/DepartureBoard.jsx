import React, { Component } from 'react'

import TrainDepartureInfo from './TrainDepartureInfo'

class DepartureBoard extends Component {
  render() {
    const {
      station,
      callingPoint,
      loading,
      departures
    } = this.props

    return (
      <div id='accordion' className='tablist'>
        <div className='list-group-item departure-board-header'>
          <div role="tab">
            <div className='m-0 p-2 pb-0'>
              <h3>{station.name}</h3>
              <p className='departure-board-header-subtitle m-0'>Next trains from this station
              {
                callingPoint
                ? ` calling at ${callingPoint.name}.`
                : '.'
              }
              </p>
            </div>
          </div>
        </div>
          {
            loading === true
              ? <div>Loading</div>
              : departures.map(service =>
                <TrainDepartureInfo key={service.serviceId} service={service} />)
          }
      </div>
    )
  }
}

export default DepartureBoard
