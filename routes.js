const express = require('express');

const connection = require('./database');
const getAverageValues = require('./helpers/getAverageValues');

const router = express.Router();

router.get('/', async (req, res) => {
    let query = 'SELECT * FROM abtestreal_table'
    connection.query(
        query, function (err, results) {
            if (err) {
                console.log('Whoops! Something went wrong!');
                res.json({err: 'error occured'});
            } 
            else {
                const finalData = processData(results);
                console.log('final data: ', finalData);
                res.json(finalData);
            }
        }
    )
});

const processData = (data) => {
    var firstColumn = [];
    var secondColumn = [];

    const nestedArray = (data) => {
        Object.keys(data).forEach(key => {
            if (typeof data[key] === 'object') {
                // Use recursion to process all nested values
                nestedArray(data[key]);
            } else {
                key == 'column1' ? 
                    (firstColumn.push(data[key])) : (secondColumn.push(data[key]));
            }
        });
    }
    nestedArray(data);
    
    let firstSortedArray = getAverageValues(firstColumn);
    let secondSortedArray = getAverageValues(secondColumn);

    // Convert 2 arrays  with values (column1 and column2)
    // into 1 array of arrays with values ([column1.value, column2.value]) 
    let itemCount = firstSortedArray < secondSortedArray ?
        firstSortedArray.length : secondSortedArray.length;
    let finalArray = [];
    for (let i = 0; i < itemCount; i++) {
        finalArray[i] = [firstSortedArray[i], secondSortedArray[i]];
    };
    
    return finalArray;
}

/*
    PUT IT IN ROUTER to concatenate and insert values:
        let query = `INSERT INTO abtestreal_table (column1, column2) VALUES`;
        query = await insertion(query);

    For inserting values
    insertion():
        {i} in loop = rows in table
    concatenateQuery():
        {counter} to put semicolon in the end of the query
*/

/*
    REMOVE COMMENTS IF YOU WANT TO INSERT VALUES

const insertion = async (query) => {
    for (let i = 0; i < 800; i++) {
        console.log(i);
        query = await concatenateQuery(query, i);
    }
    return query;
}

const concatenateQuery = async (query, counter) => {
    if (counter == 799) query += `('${Math.floor((Math.random() * 1000) + 1)}', '${Math.floor((Math.random() * 1000) + 1)}');`
    else query += `('${Math.floor((Math.random() * 1000) + 1)}', '${Math.floor((Math.random() * 1000) + 1)}'),`;
    return query;
}; 

*/

module.exports = router;