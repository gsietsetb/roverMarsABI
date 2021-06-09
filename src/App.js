import React from 'react';
import './App.css';
import {observer} from "mobx-react-lite";
import FlatList from 'flatlist-react';
import {MapStore} from "./cellStore";

export const Commands = observer(({currMap, sizeX, sizeY}) => {

    return (<div>
            <br/>
            <strong>Send Command:</strong><br/>

            <button type="button" value="b"
                    onClick={e => currMap.handleCommand(e.target.value)}>
                ⏮ Move Backwards
            </button>
            <button type="button" value="f"
                    onClick={e => currMap.handleCommand(e.target.value)}>
                ⏭ Move Forward
            </button>
            <div style={{flexDirection: 'row'}}>
                <button type="button" value="l"
                        onClick={e => currMap.handleCommand(e.target.value)}>
                    ↩️ Rotate Left
                </button>
                <button type="button" value="r"
                        onClick={e => currMap.handleCommand(e.target.value)}>
                    ↪️ Rotate Right
                </button>
            </div>
        </div>
    )
})

const Cell = ({x, y, hasRover, orientation, visualMars}) => <div style={{borderWidth: 4, flexDirection: 'row'}}>
    {/*{x}, {y}*/} {hasRover ? '🚀' + orientation + visualMars : '🕳'}
</div>

export const MapView = observer(({cells, rows, visualMars}) => {
    return (<div style={{flexDirection: 'row', margin: 10}}>
        {rows.map(item => <div style={{flexDirection: 'row'}}>
                <FlatList list={item}
                          displayRow
                          renderItem={(props, index) =>
                              <div style={{flexDirection: 'row', borderWidth: 4, marginRight: 4}}>
                                  <Cell {...props} visualMars={visualMars}/>
                              </div>
                          }/>
            </div>
        )}
    </div>)
});

const currMapStore = MapStore({});


const App = observer(({currMap = currMapStore}) => {
    const {cells, roverX, roverY, roverZ, sizeX, sizeY, rows} = currMap;
    return (
        <div className="App">
            <header className="App-header">
                <h2>Mars Rover Status</h2>
                <p>
                    Current X position: {roverX}
                </p>
                <p>
                    Current Y position: {roverY}
                </p>
                <p>
                    Current Orientation: {roverZ}
                </p>

                <strong>Set Map Size:</strong> <br/>
                <label>
                    X Size:
                    <input type="number" value={sizeX} name="xSize"
                           onChange={e => currMap.onSetSize('x', e.target.value)}/>
                </label>
                <label>
                    Y Size:
                    <input type="number" value={sizeY} name="ySize"
                           onChange={e => currMap.onSetSize('y', e.target.value)}/>
                </label>

                <Commands currMap={currMap}/>
                <MapView cells={cells} rows={rows} visualMars={currMap.visualMars}/>


            </header>
        </div>
    );
})

export default App;
