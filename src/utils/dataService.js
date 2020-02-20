function getAverages(checkpoint) {
    //iterates all scores within a category and adds them to a temp array to determine the average
    //total avg is just an avg of all the categories; this assumes that all categories are equally weighted and have an equal number of scores
    let results = {
        totalAvg: '',
        categoryAvg: []
    }
    let totalAvgArr = []
    for (let i=0; i< checkpoint.categories.length; i++){
        let tempArr = []
        for (let j=0; j<checkpoint.categories[i].scores.length; j++){
            tempArr.push(checkpoint.categories[i].scores[j].score)
        }
        let categoryAvg = (tempArr.reduce((a,b) => a + b, 0)) / tempArr.length || 0
        results.categoryAvg.push(categoryAvg)
        totalAvgArr.push(categoryAvg)
    }
    results.totalAvg = (totalAvgArr.reduce((a, b) => a + b, 0) / totalAvgArr.length) || 0
    results.totalAvg = Math.floor(results.totalAvg * 10)/10
    return results
}

function processDataForCalendars(checkpoint) {
    //calendar charts will only take in data in the form of an array of objects, with {day: string YYYY-MM-dd, value=number}
    //function returns an array of these arrays, each item in the array providing the array of all data for that cateogry
    let data = []
    for (let i=0; i<checkpoint.categories.length; i++){
        let tempArr = []
        for (let j=0; j<checkpoint.categories[i].scores.length; j++) {
            let date = checkpoint.categories[i].scores[j].date.split('T')[0]
            tempArr.push({
                date: date,
                count: checkpoint.categories[i].scores[j].score,
                data: checkpoint.categories[i].scores[j].notes
            })
        }
        data.push(tempArr)
    }
    return data
}

function processDataForRadar(checkpoint) {
    //radar charts takes data in the following format: an array of objects, one object for each axis, {category: 'catNam', key: data}
    //must also pass in keys: [key1] and indexBy: 'category'. see example in docs at https://nivo.rocks/radar/
    //for now, only show results for one checkpoint
    let arr = []
    let averages = getAverages(checkpoint)
    for (let i=0; i<checkpoint.categories.length; i++){
        let obj = {}
        obj.category = checkpoint.categories[i].categoryName
        obj[checkpoint.name] = averages.categoryAvg[i]
        arr.push(obj)
    }
    return({
        arr: arr,
        keys: [checkpoint.name],
        indexBy: 'category'
    })
    
}

export default {
    getAverages,
    processDataForCalendars,
    processDataForRadar
}