import { ChestModel } from '../models';

class Spawner {

    constructor(config, spawnLocations, addObject, deleteObject) {
        this.id = config.id;
        this.spawnInterval = config.spawnInterval;
        this.limit = config.limit;
        this.objectType = config.objectType;
        
        this.spawnLocations = spawnLocations;

        this.addObject = addObject;
        this.deleteObject = deleteObject;

        this.objectsCreated = [];

        this.start();
    }

    start() {
        this.interval = setInterval(() => {
            if (this.objectsCreated.length < this.limit) {
                this.spawnObject();
            }
        }, this.spawnInterval);
    }

    spawnObject() {
        console.log('spawning object');

        let object;
        if (this.objectType === 'CHEST') {
            object = this.spawnChest();
        }

        this.objectsCreated.push(object);
        this.addObject(object.id, object);
    }

    spawnChest() {
        const location = this.pickRandomLocation();
        return new ChestModel(location[0], location[1], 10, this.id);
    }

    pickRandomLocation() {
        const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];

        const invalidLocation = this.objectsCreated.some((object) => {
            if (object.x === location[0] && object.y === location[1]) {
                return true;
            }

            return false;
        });

        if (invalidLocation) return this.pickRandomLocation();

        return location;
    }

    removeObject() {}

}

export default Spawner;