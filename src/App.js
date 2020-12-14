import React, { useState } from 'react'
// import PropTypes from 'prop-types'

import axios from 'axios'

const App = () => {
  const [bandOne, setBandOne] = useState()

  function randomize(items) {
    return items[Math.floor(Math.random() * items.length)]
  }

  const band = randomize(bandOne)

  const displayBandOne = async () => {
    try {
      const response = await axios
        .get(
          'https://5faabf21b5c645001602b15f.mockapi.io/solelife-mock-api/users'
        )
        .then((response) => {
          setBandOne(response.data)
          console.log(bandOne)
        })
      return response
    } catch (error) {
      if (error.response) {
        // When response status code is out of 2xx range
        console.log(error.response.data)
        console.log(error.response.status)
      } else {
        console.log(error.message)
      }
    }
  }

  return (
    <div className="prose">
      <h1 className="center">My three favorite bands are ...</h1>
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="center">
          <div>{band}</div>
        </div>
      </div>

      <div className="grid grid-row-3 gap-4">
        <button className="center" onClick={displayBandOne}>
          Band #1
        </button>
      </div>
    </div>
  )
}

App.propTypes = {}

export default App
