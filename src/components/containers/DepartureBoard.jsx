import React, { Component } from 'react'
import axios from 'axios'

import { DarwinApiProxy, DarwinToken } from '../../../config/config.json'

import DepartureBoard from '../ui/DepartureBoard'

class ContainerDepartureBoard extends Component {
  constructor(props) {
    super(props)
    const { station, callingPoint } = props

    this.state = {
      departures: [],
      loading: false,
      station,
      callingPoint
    }

    this.loadDate = this.loadData.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }

  componentWillReceiveProps(newProps) {
    const { station, callingPoint } = newProps

    this.setState({
      station,
      callingPoint
    }, () => this.loadData())
  }

  loadData() {
    const { station, callingPoint } = this.state

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
        .catch(() => {
          this.setState({
            loading: false
          })
        })
    }
  }

  render() {
    const { departures, station, callingPoint } = this.state

    return (
      <DepartureBoard
        station={station}
        callingPoint={callingPoint}
        departures={departures}
      />
    )
  }
}

export default ContainerDepartureBoard
