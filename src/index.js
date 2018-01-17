import React from 'react'
import { render } from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import './main.css'

import TubeStatus from './components/TubeStatus'

render(<TubeStatus />, document.getElementById('root'))
