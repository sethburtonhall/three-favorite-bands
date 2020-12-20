import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types'

import axios from 'axios';
import Fade from 'react-reveal/Fade';
import Jello from 'react-reveal/Jello';

const App = () => {
  const [token, setToken] = useState('');
  const [bandOne, setBandOne] = useState();
  const [bandTwo, setBandTwo] = useState();
  const [bandThree, setBandThree] = useState();
  // console.log(token)
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  console.log(token);

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bandOne, bandTwo]);

  const displayBandOne = async () => {
    try {
      const response = await axios
        .get(
          'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2/related-artists',
          {
            headers: { Authorization: 'Bearer' + token }
          }
        )
        .then((response) => {
          setBandOne(
            response.data.artists[
              Math.floor(Math.random() * response.data.artists.length)
            ]
          );
        });
      return response;
    } catch (error) {
      if (error.response) {
        // When response status code is out of 2xx range
        console.log(error.response.data);
        console.log(error.response.status);
      } else {
        console.log(error.message);
      }
    }
  };

  const displayBandTwo = async () => {
    try {
      const response = await axios
        .get(
          'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2/related-artists',
          {
            headers: { Authorization: 'Bearer' + token }
          }
        )
        .then((response) => {
          setBandTwo(
            response.data.artists[
              Math.floor(Math.random() * response.data.artists.length)
            ]
          );
        });
      return response;
    } catch (error) {
      if (error.response) {
        // When response status code is out of 2xx range
        console.log(error.response.data);
        console.log(error.response.status);
      } else {
        console.log(error.message);
      }
    }
  };

  const displayBandThree = async () => {
    try {
      const response = await axios
        .get(
          'https://api.spotify.com/v1/artists/5LXEAEGrpKQtpyCu2sZuWu/related-artists',
          {
            headers: { Authorization: 'Bearer' + token }
          }
        )
        .then((response) => {
          setBandThree(
            response.data.artists[
              Math.floor(Math.random() * response.data.artists.length)
            ]
          );
        });
      return response;
    } catch (error) {
      if (error.response) {
        // When response status code is out of 2xx range
        console.log(error.response.data);
        console.log(error.response.status);
      } else {
        console.log(error.message);
      }
    }
  };

  const resetState = () => {
    setBandOne();
    setBandTwo();
    setBandThree();
  };

  const renderButtonText = () => {
    if (!bandOne) {
      return 'First';
    } else if (bandOne && !bandTwo) {
      return 'Second';
    } else if (bandTwo && !bandThree) {
      return 'Third';
    } else if (bandOne && bandTwo && bandThree) {
      return 'Reset';
    }
  };

  return (
    <div className="w-5/6 grid grid-rows-12 gap-4 mt-10 m-auto">
      <h1 className="center text-2xl md:text-4xl lg:text-7xl">
        My three favorite bands are ...
      </h1>

      <div className="h-96">
        <div className="grid grid-rows-12 lg:grid-cols-3 gap-4 lg:gap-0 mt-12 mb-12 lg:mb-36">
          <div className="center">
            {bandOne && (
              <Fade>
                <h2 className="text-2xl md:text-3xl xl:text-5xl">
                  {bandOne.name},
                </h2>
              </Fade>
            )}
          </div>

          <div className="center">
            {bandTwo && (
              <Fade>
                <h2 className="text-2xl md:text-3xl xl:text-5xl">
                  {bandTwo.name},
                </h2>
              </Fade>
            )}
          </div>

          <div className="center">
            {bandTwo && (
              <Fade delay={800}>
                <h2 className="text-2xl md:text-3xl xl:text-5xl">aaaannnd</h2>
              </Fade>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 center">
          <div className="center">
            {bandThree && (
              <Jello>
                <h1 className="text-2xl md:text-4xl lg:text-7xl">
                  {bandThree.name}
                </h1>
              </Jello>
            )}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3 center m-auto">
        <button
          className="w-full center bg-black text-white py-4 px-8 rounded text-4xl"
          onClick={() => {
            if (!bandOne) {
              displayBandOne();
            } else if (bandOne && !bandTwo) {
              displayBandTwo();
            } else if (bandTwo && !bandThree) {
              displayBandThree();
            } else if (bandOne && bandTwo && bandThree) {
              resetState();
            }
          }}
        >
          <span>{renderButtonText()}</span>
        </button>
      </div>
    </div>
  );
};

App.propTypes = {};

export default App;
