import React, { Component } from 'react'
import styled from 'styled-components'
import BeatColumn from '../BeatColumn/BeatColumn'
import BeatLabels from './BeatLabels'

const Container = styled.div`
  background-color: #232323;
  flex: 1;
  width: 100%;
  display: flex;
`

class BeatGrid extends Component {
  columns = Math.floor(window.innerWidth / 100)
  state = { count: -1 }

  trigger = time => {
    this.setState(prev => ({ count: prev.count + 1 }), this.playBeat(time))
  }

  playBeat = time => () => {
    const activeBeat = this.state.count % this.columns
    this.refs[activeBeat].playBeat(time)
  }

  renderBeatColumns = () => {
    const { scale, synth } = this.props
    const { count } = this.state
    const cols = []
    for (let i = 0; i < this.columns; i++) {
      cols.push(
        <BeatColumn
          ref={i.toString(10)}
          key={i.toString(10)}
          scale={scale}
          playing={count % this.columns === i}
          synth={synth}
        />
      )
    }
    return cols
  }

  render () {
    const { scale } = this.props
    return (
      <Container>
        <BeatLabels scale={scale} />
        {this.renderBeatColumns()}
      </Container>
    )
  }
}

export default BeatGrid
