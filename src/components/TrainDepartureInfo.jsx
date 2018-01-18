import React, { Component } from 'react'

class SubsequentCallingPoint extends Component {
  render() {
    return (
      <div className='d-flex justify-content-start'>
        {
          this.props.station.et === 'On time'
            ? <p className='text-secondary'>{this.props.station.st}</p>
            : <p className='text-danger'>{this.props.station.et}</p>
        }
        <p className='ml-2'>{this.props.station.locationName}</p>
      </div>
    )
  }
}

class ServiceHeader extends Component {
  render() {
    let lateText = null

    const departureInfoClasses = ['m-0', 'px-2']
    const lateTextClasses = departureInfoClasses.concat(['text-danger'])
    const departureHeaderClasses = ['lead', 'pl-2', 'py-2', 'm-0']

    if (this.props.departure.etd === 'Cancelled') {
      lateText = <p className={lateTextClasses.join(' ')}>This service has been cancelled.</p>
    } else if (this.props.departure.etd !== 'On time') {
      lateText = <p className={lateTextClasses.join(' ')}>This service is delayed, and is now expected to depart at {this.props.departure.etd}</p>
    } else if (this.props.departure.etd === 'Delayed') {
      lateText = <p className={lateTextClasses.join(' ')}>This service is delayed. No further information is available at this time.</p>
    }

    return (
      <div role="tab" className='pb-3'>
        <h5 className="mb-0">
          <div className='d-flex justify-content-start'>
            <p className={departureHeaderClasses.concat(['text-secondary']).join(' ')}>{this.props.departure.std}</p>
            <p className={departureHeaderClasses.concat(['departure-destination-name']).join(' ')}>{this.props.departure.destination.name}</p>
            <p className={departureHeaderClasses.concat(['ml-auto', 'departure-platform']).join(' ')}>{this.props.departure.platform}</p>
          </div>
        </h5>
        {lateText}
        <a className='float-right py-2' data-toggle="collapse" href={`#${this.props.departure.serviceId}`} role="button" aria-expanded="true" aria-controls={`#${this.props.departure.serviceId}`}>
          <i className="fa fa-ellipsis-h departure-more-information-button" aria-hidden="true"></i>
        </a>
      </div>
    )
  }
}

export default class TrainDepartureInfo extends Component {
  constructor(props) {
    super(props)

    const formattedCallingPoints = []

    props.departure.subsequentCallingPoints.map((station, i) =>
      formattedCallingPoints.push(<SubsequentCallingPoint key={i} station={station} />))

    this.state = {
      departure: this.props.departure || null,
      formattedCallingPoints
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ departure: newProps.departure || this.props.departure })
  }

  render() {
    return (
      <div className="list-group-item">
        <ServiceHeader departure={this.state.departure} />

        <div id={this.state.departure.serviceId} className="collapse hide" role="tabpanel" aria-labelledby={`#${this.state.departure.destination.name}`} data-parent="#accordion">
          <div className="card-body pb-0">
            {this.state.formattedCallingPoints}
          </div>
        </div>
      </div>
    )
  }
}
