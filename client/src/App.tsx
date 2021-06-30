import React, { useEffect, useState } from 'react';

import io, { Socket } from 'socket.io-client';

import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';



const connectSocketServer = (): Socket => {
  return io(
    'http://localhost:8100',
    {
      transports: ['websocket'],
    },
  );
};



function App() {


  const [online, setOnline] = useState<boolean>(false);

  const [socket] = useState<Socket>(connectSocketServer());

  useEffect(() => {

    setOnline(socket.connected);

  }, [socket]);


  useEffect(() => {

    socket.on(
      'connect', () => {
        setOnline(true);
      }
    );

  }, [socket]);


  useEffect(() => {

    socket.on(
      'disconnect', () => {
        setOnline(false);
      }
    );

  }, [socket]);


  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {
            (online)
              ? 
              <span className="text-success">
                 Online
              </span> 
              :
              <span className="text-danger">
                 Offline
              </span>
          }

        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList />
        </div>
        <div className="col-4">
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default App;
