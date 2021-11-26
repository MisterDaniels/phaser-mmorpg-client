import { randomNumber, SpawnerType } from '.';
import { ChestModel, MonsterModel } from '../models';

class Spawner {

    constructor(config, spawnLocations, addObject, deleteObject) {
        this.id = config.id;
        this.spawnInterval = config.spawnInterval;
        this.limit = config.limit;
        this.objectType = config.spawnerType;
        
        this.spawnLocations = spawnLocations;

        this.addObject = addObject;
        this.deleteObject = deleteObject;

        this.objectsCreated = [];

        this.start();
    }

    start() {
        this.interval = setInterval(() => {
            if (this.spawnLocations.length > 0 && this.objectsCreated.length < this.limit) {
                this.spawnObject();
            }
        }, this.spawnInterval);
    }

    spawnObject() {
        let object;
        
        switch(this.objectType) {
            case SpawnerType.CHEST:
                object = this.spawnChest();
                break;
            case SpawnerType.MONSTER:
                object = this.spawnMonster();
        }

        if (!object) return;

        this.objectsCreated.push(object);
        this.addObject(object.id, object);
    }

    spawnChest() {
        const location = this.pickRandomLocation();
        return new ChestModel(
            location[0], 
            location[1], 
            randomNumber(10, 20), 
            this.id
        );
    }

    spawnMonster() {
        const location = this.pickRandomLocation();
        return new MonsterModel(
            location[0],
            location[1],
            randomNumber(10, 20),
            this.id,
            randomNumber(0, 20),
            randomNumber(3, 5),
            1
        );
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

    removeObject(id) {
        this.objectsCreated = this.objectsCreated.filter(obj => obj.id !== id);
        this.deleteObject(id);
    }

}

export default Spawner;