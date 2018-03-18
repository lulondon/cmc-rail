import React, { Component } from 'react'

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

export default SubsequentCallingPoint
