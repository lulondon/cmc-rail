import React, { Component } from 'react'
import Darwin from 'national-rail-darwin'

import TrainDepartureInfo from './TrainDepartureInfo'

const rail = new Darwin()

export default class Departures extends Component {
  constructor(props) {
    super(props)
    this.state = {
      departures: [],
      error: false,
      loading: false,
      title: props.title,
      station: props.station,
      callingPoint: props.destination
    }
  }

  loadData() {
    if (this.state.station !== null) {
      const departures = []
      this.setState({ loading: true })
      rail.getDepartureBoardWithDetails(this.state.station, {
        destination: this.state.callingPoint
      }, (err, response) => {
        if (err) {
          this.setState({ error: true, loading: false })
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
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      error: false,
      title: nextProps.title,
      station: nextProps.station,
      callingPoint: nextProps.destination
    }, () => {
      this.loadData()
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
        {this.state.loading === true
          ? <div className='spinner'><div className="bounce1"></div><div className="bounce2"></div><div className="bounce3"></div></div>
          : this.state.departures}
      </div>
    )
  }
}
