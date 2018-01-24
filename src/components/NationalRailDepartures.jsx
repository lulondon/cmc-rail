import React, { Component } from 'react'
import Darwin from 'national-rail-darwin'

import TrainDepartureInfo from './TrainDepartureInfo'

const rail = new Darwin()

export default class Departures extends Component {
  constructor(props) {
    super(props)
    this.state = {
      departures: [],
      loading: false,
      stationName: props.stationName,
      stationCode: props.stationCode,
      callingPointCode: props.callingPointCode,
      callingPointName: props.callingPointName
    }

    this.loadDate = this.loadData.bind(this)
  }

  loadData() {
    if (this.state.stationCode !== null) {
      const departures = []
      this.setState({ loading: true })
      rail.getDepartureBoardWithDetails(this.state.stationCode, {
        destination: this.state.callingPointCode
      }, (err, response) => {
        if (err) {
          this.setState({ loading: false, departures: [] })
          this.props.handleAddError(err)
        } else {
          this.props.handleClearErrors()
          response.trainServices.map((departure, i) =>
            departures.push(<TrainDepartureInfo key={i} departure={departure} />))

          this.setState({
            loading: false,
            departures
          })
        }
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const outgoingStationCode = this.props.stationCode
    const outgoingCallingPointCode = this.props.callingPointCode

    this.setState({
      stationName: nextProps.stationName,
      stationCode: nextProps.stationCode,
      callingPointCode: nextProps.callingPointCode,
      callingPointName: nextProps.callingPointName
    }, () => {
      if (
        outgoingStationCode !== nextProps.stationCode
        || outgoingCallingPointCode !== nextProps.callingPointCode
      ) {
        this.loadData()
      }
    })
  }

  componentDidMount() {
    this.loadData()
    this.timer = setInterval(() => {
      this.loadData()
    }, 60000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div id='accordion' className='tablist'>
        <div className='list-group-item departure-board-header'>
          <div role="tab">
            <div className='m-0 p-2 pb-0'>
              <h3>{this.state.stationName}</h3>
              <p className='departure-board-header-subtitle m-0'>Next trains from this station
              {
                this.state.callingPointName
                ? ` calling at ${this.state.callingPointName}.`
                : '.'
              }
              </p>
            </div>
          </div>
        </div>
          {
            this.state.loading === true
              ? <div className='spinner my-5'><div className="bounce1"></div><div className="bounce2"></div><div className="bounce3"></div></div>
              : this.state.departures
          }
      </div>
    )
  }
}
