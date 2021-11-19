import { getTiledProperty } from "../utils/Mapper";

import { Spawner } from "../utils";

class GameManager {

    constructor(scene, mapData) {

        this.scene = scene;
        this.mapData = mapData;

        this.spawners = {};
        this.chests = {};

        this.playerLocations = [];
        this.chestLocations = [];
        this.monsterLocations = [];

    }

    setup() {

        this.parseMapData();
        this.setupEventListener();
        this.setupSpawners();
        this.spawnPlayer();

    }

    parseMapData() {

        this.mapData.forEach((layer) => {
            if (layer.name === 'player_locations') {
                layer.objects.forEach((obj) => {
                    this.playerLocations.push([obj.x, obj.y]);
                });
            } else if (layer.name === 'chest_locations') {
                layer.objects.forEach((obj) => {
                    let spawner  = getTiledProperty(obj, 'spawner');

                    console.log(spawner);

                    if (this.chestLocations[spawner]) {
                        this.chestLocations[spawner].push([obj.x, obj.y]);
                    } else {
                        this.chestLocations[spawner] = [[obj.x, obj.y]];
                    }
                });
            } else if (layer.name === 'monster_locations') {
                layer.objects.forEach((obj) => {
                    let spawner  = getTiledProperty(obj, 'spawner');

                    if (this.monsterLocations[spawner]) {
                        this.monsterLocations[spawner].push([obj.x, obj.y]);
                    } else {
                        this.monsterLocations[spawner] = [[obj.x, obj.y]];
                    }
                });
            }
        });

    }

    setupEventListener() {

    }

    setupSpawners() {
        console.log(this.chestLocations);
        Object.keys(this.chestLocations).forEach((value, key) => {
            const config = {
                spawnInterval: 3000,
                limit: 3,
                objectType: 'CHEST',
                id: `chest-${ key }`
            };

            const spawner = new Spawner(
                config,
                this.chestLocations[key],
                this.addChest.bind(this),
                this.deleteChest.bind(this)
            );

            this.spawners[spawner.id] = spawner;
        });
    }

    addChest(id, chest) {
        this.chests[id] = chest;
        console.log(chest);
    }

    deleteChest() {

    }

    spawnPlayer() {
        const location = this.playerLocations[Math.floor(Math.random() * this.playerLocations.length)];
        this.scene.events.emit('spawnPlayer', location);
    }

}

export default GameManager;