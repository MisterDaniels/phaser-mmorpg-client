function getTiledProperty(obj, property_name) {
    for (let property_index = 0; property_index < obj.properties.length; property_index++) {
        if (obj.properties[property_index].name === property_name) {
            return obj.properties[property_index].value;
        }
    }
}

export {
    getTiledProperty
};