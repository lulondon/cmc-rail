import React, { Component } from 'react'
import axios from 'axios'

import { DarwinApiProxy, DarwinToken } from '../../../config/config.json'

import Rail from '../ui/Rail'

class ContainerRail extends Component {
  constructor() {
    super()
    this.state = {
      callingPoint: null,
      departures: [],
      errors: [],
      loading: false,
      station: null
    }

    this.handleAddError = this.handleAddError.bind(this)
    this.handleClearCallingPoint = this.handleClearCallingPoint.bind(this)
    this.handleClearErrors = this.handleClearErrors.bind(this)
    this.handleUpdateCallingPoint = this.handleUpdateCallingPoint.bind(this)
    this.handleUpdateStation = this.handleUpdateStation.bind(this)
    this.loadDate = this.loadData.bind(this)
  }

  handleClearCallingPoint() {
    this.setState({ callingPoint: null }, () => this.loadData())
  }

  handleAddError(error) {
    this.setState({ errors: this.state.errors.concat(String(error)) })
  }

  handleClearErrors() {
    this.setState({ errors: [] })
  }

  handleUpdateCallingPoint(station) {
    this.setState({ callingPoint: station[0] }, () => this.loadData())
  }

  handleUpdateStation(station) {
    this.setState({ station: station[0] }, () => this.loadData())
  }

  loadData() {
    const { errors, callingPoint, station } = this.state

    if (station) {
      this.setState({ loading: true })

      axios.post(`${DarwinApiProxy}/getDepartureBoardWithDetails/${station.code}`, {
        token: DarwinToken,
        options: {
          destination: callingPoint ? callingPoint.code : null
        }
      })
        .then(response => this.setState({
          departures: response.data.trainServices,
          loading: false
        }))
        .catch((err) => {
          this.setState({
            loading: false,
            errors: [err, ...errors]
          })
        })
    }
  }

  render() {
    return (
      <Rail
        callingPoint={this.state.callingPoint}
        departures={this.state.departures}
        errors={this.state.errors}
        handleClearCallingPoint={this.handleClearCallingPoint}
        handleUpdateCallingPoint={this.handleUpdateCallingPoint}
        handleUpdateStation={this.handleUpdateStation}
        station={this.state.station}
      />
    )
  }
}

export default ContainerRail
