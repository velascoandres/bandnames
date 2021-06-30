import React, { useEffect, useState } from 'react';

import io, { Socket } from 'socket.io-client';

import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';
import { IBand } from './interfaces/band.interface';



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
  const [bands, setBands] = useState<IBand[]>([]);

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

  useEffect(() => {

    socket.on(
      'current-bands', (bands: IBand[]) => {
        setBands(bands);
      },
    );

  }, [socket]);


  const voteBand = (id: string) => {
    socket.emit('vote-band', { id });
  }

  const deleteBand = (id: string) => {
    socket.emit('delete-band', { id });
  }

  const changeName = (id: string, name: string) => {
    socket.emit('change-band-name', { id, name });
  }

  const addBand = (name: string) => {
    socket.emit('add-band', { name });
  }


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
          <BandList
            bands={bands}
            voteBand={voteBand}
            deleteBand={deleteBand}
            changeName={changeName}
          />
        </div>
        <div className="col-4">
          <BandAdd 
            addBand={addBand}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
