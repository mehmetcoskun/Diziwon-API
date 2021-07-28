function combineObjects(data) {
    const result = {};

    data.forEach((basket) => {
        for (let [key, value] of Object.entries(basket)) {
            if (result[key]) {
                result[key] += value;
            } else {
                result[key] = value;
            }
        }
    });
    return result;
}

function search(nameKey, myArray) {
    for (const [key, value] of Object.entries(combineObjects(myArray))) {
        if (key == nameKey) {
            return value;
        }
    }
}

function timeFormat(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    if (rhours != 0) {
        if (rminutes != 0) {
            return rhours + ' sa. ' + rminutes + ' dk.';
        } else {
            return rhours + ' sa. ';
        }
    } else {
        return rminutes + ' dk.';
    }
}

module.exports = {
    combineObjects,
    search,
    timeFormat
};
