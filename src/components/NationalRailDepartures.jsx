import React, { Component } from 'react'
import Darwin from 'national-rail-darwin'

import TrainDepartureInfo from './TrainDepartureInfo'

const rail = new Darwin()

class Departures extends Component {
  constructor(props) {
    super(props)
    this.state = {
      departureData: [],
      departures: [],
      error: false,
      loading: true,
      title: props.title,
      subtitle: props.subtitle,
      station: props.station,
      destination: props.destination,
      limit: props.limit || 5
    }
  }

  loadData() {
    const departures = []
    this.setState({ loading: true })

    rail.getDepartureBoardWithDetails(this.state.station, {
      rows: this.state.limit,
      destination: this.state.destination
    }, (err, response) => {
      if (err) {
        this.setState({ error: true })
      } else {
        response.trainServices.map((departure, i) =>
          departures.push(<TrainDepartureInfo key={i} departure={departure} />))

        this.setState({
          loading: false,
          departures
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      error: false,
      title: nextProps.title,
      subtitle: nextProps.subtitle,
      station: nextProps.station,
      destination: nextProps.destination,
      limit: nextProps.limit
    }, () => {
      this.loadData()
    })
  }

  componentDidMount() {
    this.loadData()
    this.timer = setInterval(() => {
      this.loadData()
    }, 120000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div id='accordion' className='tablist'>
        {this.state.loading
          ? <div className='spinner'><div className="bounce1"></div><div className="bounce2"></div><div className="bounce3"></div></div>
          : this.state.departures}
      </div>
    )
  }
}

export default Departures
