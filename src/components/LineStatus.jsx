import React, { Component } from 'react'

import LineStatusText from '../components/LineStatusText'

import { icon, textColour, colours } from '../lib/line'

class LineStatus extends Component {
  render() {
    const statuses = this.props.line.lineStatuses.map((status, i) =>
     <LineStatusText status={status} key={i} />)

    return (
      <div className='list-group-item p-1'
        style={{
          backgroundColor: colours[this.props.line.id],
          color: textColour(this.props.line)
        }}
      >
        <div className='d-flex justify-content-between p-0'>
          <p className='lead p-2 m-0'>{this.props.line.name}</p>
          <div className='p-2 m-0'>{icon(this.props.line)}</div>
        </div>
        <ul className='list-group'>
          {statuses}
        </ul>
      </div>
    )
  }
}

export default LineStatus
