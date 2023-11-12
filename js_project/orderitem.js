const fs = require('fs');

const orderPath = './orderData.csv';



function orderExtract() {
    const orderData = fs.readFileSync(orderPath, 'utf8');
    // CSV 데이터 파싱
    const rows = orderData.split('\n');
    const headers = rows[0].split(',');

    // 'Id' 컬럼의 인덱스 찾기
    const idIndex = headers.indexOf('Id');

    if (idIndex === -1) {
        console.error("컬럼 'Id'를 찾을 수 없습니다.");
        return;
    }

    // 각 행의 'Id' 값을 추출하여 Id 리스트 만들기
    const idList = rows.slice(1).map(row => {
        const rowData = row.split(',');
        return rowData[idIndex];
    });

    // 랜덤으로 하나의 Id 값을 선택
    const randomIndex = Math.floor(Math.random() * idList.length);
    return idList[randomIndex];
}
console.log(orderExtract());




// function generateID() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//       return v.toString(16);
//     });
//   }



// function generateOrder() {
//     const order =
//     {
//         Id: generateID(),
//         OrderAt: generateTime(),
//         StoreId: storeExtract(),
//         UserId: userExtract(),

//     };
//     return order;
// }
// console.log(generateOrder());

// const orderArray = [];
// for (let i = 0; i < 10000; i++) {
//     orderArray.push(generateOrder());
// }


// function stringToCSV(array) {
//     const header = Object.keys(array[0]).join(',') + '\n';
//     const csv = array.map(obj => Object.values(obj).join(',')).join('\n');
//     return header + csv;
// }

// function createCSVFile(data, orderData) {
//     const csvData = stringToCSV(data);

//     fs.writeFile(orderData, csvData, {encoding:'utf-8'}, (err) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         console.log(`CSV파일 ${orderData}이 생성되었습니다.`);
//     });
// }
// createCSVFile(orderArray, 'orderData.csv');