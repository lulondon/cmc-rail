import React, { Component } from 'react'

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
      <div role="tab" className='pb-1'>
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

export default ServiceHeader
