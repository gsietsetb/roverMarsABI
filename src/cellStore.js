import {makeAutoObservable} from "mobx"
import _ from 'lodash'

export const CellStore = ({initX, initY, currId = 0, isEmpty = false, hasRover, newOrient = '🔼'}) => {
    return makeAutoObservable({
        x: initX,
        y: initY,
        id: currId,
        isEmpty: isEmpty,
        hasRover: hasRover,
        orientation: newOrient,
        get isPair() {
            return this.value * 2
        },
        increment() {
            this.value++
        }
    })
}
//123
//456

const moveUp = (id, sizeX = 8, step = 1) => id - sizeX
const movDown = (id, sizeX = 8, step = 1) => id + sizeX
const movLeft = (id, sizeX = 8, step = 1) => id - 1
const movRight = (id, sizeX = 8, step = 1) => id + 1
const orientation = {'n': '🔼', 's': '🔽', 'w': '◀️', 'e': '▶️'};

const updateMapSize = (newSizeX, newSizeY, rovX, rovY, rovZ) => {
    let res = [];
    let y = 0;
    let x = 0;
    for (let i = 0; i < newSizeX * newSizeY; i++) {
        res[i] = CellStore({
            initX: x,
            initY: y,
            currId: i,
            hasRover: x === rovX && y === rovY,
            newOrient: orientation[rovZ]
        })
        if (i % newSizeX === 0) {
            y++;
            x = 0
        } else x++;
    }
    return res;

};
export const commands = ['f', 'b', 'r', 'l'];
export const MapStore = ({sizeX = 5, sizeY = 5, rovX = 0, rovY = 0, rovZ = 'n'}) => {
    return makeAutoObservable({
        //Map
        roverX: rovX,
        roverY: rovY,
        roverZ: rovZ,

        sizeX: sizeX,
        sizeY: sizeY,

        //Validation wrapper for Map Sizes
        onSetSize(name = 'x', val) {
            val > 0 ? name === 'x' ? this.sizeX = val : this.sizeY = val : alert('Wrong number')
            console.log('er', this.sizeX, this.sizeY)
        },
        /*updateSize(newSizeX, newSizeY) {
            updateMapSize(newSizeX, newSizeY)
        },*/
        get cells() {
            return updateMapSize(this.sizeX, this.sizeY, this.roverX, this.roverY, this.roverZ)
        },
        get rows() {
            return _.range(0, sizeX).map(currRow => this.cells.filter(({x, y}) => x === currRow))
        },
        setroverY(val) {
            this.roverY = val;
        },
        setroverX(val) {
            this.roverX = val;
        },
        setroverZ(val) {
            this.roverZ = val;
        },
        handleCommand(command) {
            /*Todo apply switch and improve with ^moveUp, moveDown...
            }*/
            if (command === "f") {
                if (this.roverZ === "n") {
                    this.setroverY(this.roverY + 1);
                }
                if (this.roverZ === "w") {
                    this.setroverX(this.roverX - 1)
                }
                if (this.roverZ === "s") {
                    this.setroverY(this.roverY - 1);

                }
                if (this.roverZ === "e") {
                    this.setroverX(this.roverX + 1)

                }
            }
            if (command === "b") {
                if (this.roverZ === "n") {
                    this.setroverY(this.roverY - 1);

                }
                if (this.roverZ === "w") {
                    this.setroverX(this.roverX + 1)

                }
                if (this.roverZ === "s") {
                    this.setroverY(this.roverY + 1);
                }
                if (this.roverZ === "e") {
                    this.setroverX(this.roverX - 1)

                }
            }
            if (command === "l") {
                if (this.roverZ === "n") {
                    this.roverZ = 'w';

                }
                if (this.roverZ === "w") {
                    this.roverZ = 's';

                }
                if (this.roverZ === "s") {
                    this.roverZ = 'e';

                }
                if (this.roverZ === "e") {
                    this.roverZ = 'n';
                }
            }
            if (command === "r") {
                if (this.roverZ === "n") {
                    this.roverZ = 'e';

                }
                if (this.roverZ === "e") {
                    this.roverZ = 's';

                }
                if (this.roverZ === "s") {
                    this.roverZ = 'w';

                }
                if (this.roverZ === "w") {
                    this.roverZ = 'n';

                }
            }
        },


        //Rover orientation
        get visualMars() {
            return orientation[this.roverZ];
        },
    })
}

