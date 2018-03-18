import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'

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

class TrainDepartureInfo extends Component {
  render() {
    const { service } = this.props

    return (
      <div className="list-group-item">
        <ServiceHeader service={service} />

        <div id={service.serviceId} className="collapse hide" role="tabpanel" aria-labelledby={`#${service.destination.name}`} data-parent="#accordion">
          <div className="card-body pb-0">
            {service.subsequentCallingPoints.map(callingPoint =>
              <SubsequentCallingPoint key={callingPoint.crs} callingPoint={callingPoint} />)}
          </div>
        </div>
        <div className='d-flex'>
          <a className='ml-auto' data-toggle="collapse" href={`#${service.serviceId}`} role="button" aria-expanded="true" aria-controls={`#${service.serviceId}`}>
            <i className="fa fa-ellipsis-h departure-more-information-button" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    )
  }
}

class SubsequentCallingPoint extends Component {
  render() {
    const { callingPoint } = this.props
    return (
      <div className='d-flex justify-content-start'>
        {
          callingPoint.et === 'On time'
            ? <p className='text-secondary'>{callingPoint.st}</p>
            : <p className='text-danger'>{callingPoint.et}</p>
        }
        <p className='ml-2'>{callingPoint.locationName}</p>
      </div>
    )
  }
}

class ServiceHeader extends Component {
  render() {
    const { service } = this.props

    const departureInfoClasses = ['m-0', 'px-2']
    const lateTextClasses = departureInfoClasses.concat(['text-danger'])
    const departureHeaderClasses = ['lead', 'pl-2', 'py-2', 'm-0']

    let serviceInfo = null

    if (service.etd === 'Cancelled') {
      serviceInfo = <p className={lateTextClasses.join(' ')}>This service has been cancelled.</p>
    } else if (service.etd === 'Delayed') {
      serviceInfo = <p className={lateTextClasses.join(' ')}>This service is delayed. No further information is available at this time.</p>
    } else if (service.etd !== 'On time') {
      serviceInfo = <p className={lateTextClasses.join(' ')}>This service is delayed, and is now expected to depart at {service.etd}</p>
    }

    return (
      <div role="tab" className='pb-3'>
        <h5 className="mb-0">
          <div className='d-flex justify-content-start'>
            <p className={departureHeaderClasses.concat(['text-secondary']).join(' ')}>{service.std}</p>
            <p className={departureHeaderClasses.concat(['departure-destination-name']).join(' ')}>{service.destination.name}</p>
            <p className={departureHeaderClasses.concat(['ml-auto', 'departure-platform']).join(' ')}>{service.platform}</p>
          </div>
        </h5>
        {serviceInfo}
      </div>
    )
  }
}

export default Rail
