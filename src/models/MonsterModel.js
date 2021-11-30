import { v4 as uuidv4 } from 'uuid';

class MonsterModel {

    constructor(x, y, gold, spawnerId, frame, health, attack) {
        this.id = `${ spawnerId }-${ uuidv4() }`;
        this.spawnerId = spawnerId;
        this.x = x * 2;
        this.y = y * 2;
        this.gold = gold;
        this.frame = frame;
        this.health = health;
        this.maxHealth = health;
        this.attack = attack;
    }

}

export default MonsterModel;