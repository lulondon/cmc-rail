import React from 'react'

export const colours = {
  bakerloo: 'rgb(178,99,0)',
  central: 'rgb(220,36,31)',
  circle: 'rgb(255,211,41)',
  district: 'rgb(0,125,50)',
  'hammersmith-city': 'rgb(244,169,190)',
  jubilee: 'rgb(161,165,167)',
  metropolitan: 'rgb(155,0,88)',
  northern: 'rgb(0,0,0)',
  piccadilly: 'rgb(0,25,168)',
  victoria: 'rgb(0,152,216)',
  'waterloo-city': 'rgb(147,206,186)',
  dlr: 'rgb(0,175,173)',
  'london-overground': 'rgb(239,123,16)',
  'tfl-rail': 'rgb(0,25,168)',
  text: {
    circle: '#113892',
    'hammersmith-city': '#113892',
    'waterloo-city': '#113892'
  }
}

export const textColour = (line) => {
  if (colours.text[line.id]) {
    return colours.text[line.id]
  } else if (line.modeName === 'national-rail') {
    return 'rgb(99,108,114)'
  } else {
    return 'rgb(255,255,255)'
  }
}

export const icon = (line) => {
  const status = line.lineStatuses[0].statusSeverity
  if (status === 10) {
    return (
      <i className="tube-status-icon fa fa-check" aria-hidden="true" style={{ color: textColour(line) }}></i>
    )
  } else if (status === 20) {
    return (
      <i className="tube-status-icon fa fa-exclamation-triangle" aria-hidden="true" style={{ color: textColour(line) }}></i>
    )
  } else if ([2, 3, 4, 5, 11].indexOf(status) > -1) {
    return (
      <i className="tube-status-icon fa fa-exclamation" aria-hidden="true" style={{ color: textColour(line) }}></i>
    )
  } else if ([6, 7, 9].indexOf(status) > -1) {
    return (
      <i className="tube-status-icon fa fa-clock-o" aria-hidden="true" style={{ color: textColour(line) }}></i>
    )
  } else {
    return (null)
  }
}
