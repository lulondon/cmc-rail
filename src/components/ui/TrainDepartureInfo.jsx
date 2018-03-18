import React, { Component } from 'react'

import ServiceHeader from './ServiceHeader'
import SubsequentCallingPoint from './SubsequentCallingPoint'

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

export default TrainDepartureInfo
