const getAverageValues = (array) => {
    let randomArray = [];

    for (let i = 0; i < 10; i++) {
        let tempArray = [];
        for (let j = 0; j < 100; j ++) {
            // Push 100 random values from original array
            tempArray.push(array[Math.floor(Math.random() * array.length)]);
        };
        // Value for separate array from the start and in the end
        let separateValues = Math.floor(tempArray.length * 0.05)
        tempArray.sort((a, b) => a - b).splice(0, separateValues).splice(tempArray.length - separateValues, separateValues);
        // Find average of all values in array
        let total = 0;
        for (let j = 0; j < tempArray.length; j++) {
            total += tempArray[j];
        };
        let average = total / tempArray.length;
        randomArray.push(Math.round(average));
    }   

    return randomArray;
}

module.exports = getAverageValues;