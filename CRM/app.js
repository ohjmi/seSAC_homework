const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const dbFile = 'crm.db';

// SQLite 데이터베이스 연결
const db = new sqlite3.Database(dbFile);
// Body 안에 있는 json 형식을 찾아 파싱해 req.body에 넣어줌
app.use(express.json())
// -D로 오는 키 밸류에 대해 req.body에 넣어줌
app.use(express.urlencoded({ extended: true }));


// 라우터 추가
app.use(express.static(path.join(__dirname, 'public')));



app.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'user.html'));
});



app.get('/api/user', (req, res) => {
  const itemsPerPage = 50;
  let startIndex;
  let endIndex;

  console.log(`요청 GET 파라미터: ${req.query.page}`);

  // 검색어 받아오기
  const searchName = req.query.search || '';

  // 미션3. 이제 a태그의 하이퍼링크를 통해서 원하는 페이지로 이동한다.
  page = req.query.page || 1;
  startIndex = (page - 1) * itemsPerPage;
  endIndex = startIndex + itemsPerPage;

  const query = 'SELECT * FROM users';
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // 검색어를 포함하는 사용자만 필터링
      const filterData = rows.filter(user => user.Name.toLowerCase().includes(searchName.toLowerCase()));

      // 미션2. 전체 페이지 수를 계산한다.
      const totalPage = Math.ceil(filterData.length / itemsPerPage);
      console.log(`전체 데이터 개수는 ${rows.length}이며,`,
                  `페이지당 개수는 ${itemsPerPage}이고`,
                  `전체 페이지 수는 ${totalPage}입니다.`);

      // 미션1. 읽은 데이터에서 무조건, 앞에 10개만 준다.
      // const dataList = data.slice(startIndex, endIndex);
      const dataList = filterData.slice(startIndex, endIndex);

      res.json({
        users: dataList,
        totalPage: totalPage,
        currentPage: parseInt(page),
        index_id: 'Id',
        searchName: searchName,
      });
    }
  });
});

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const user = data.find(item => item.Id === userId);;

  if (!user) {
      // 사용자를 찾지 못한 경우 처리
      res.status(404).send('사용자를 찾을 수 없습니다.');
      return;
  }

  // 사용자 데이터로 사용자 상세 페이지 렌더링
  res.json({
    user: user,
  });

});



app.listen(port, () => {
  console.log(`서버 ${port} is ready.`)
})












// function readDataFromTable(tableName) {
//   const query = `SELECT * FROM ${tableName}`;

//   db.each(query, (err, row) => {
//     if (err) {
//       console.error(err.message);
//     } else {
//       // 읽어온 각 행 데이터 활용
//       console.log(row);
//       return row;
//     }
//   });
// }

// 예시로 'user' 테이블을 읽어오는 경우


// // 예시로 'item' 테이블을 읽어오는 경우
// readDataFromTable('item');

// // 예시로 'order' 테이블을 읽어오는 경우
// readDataFromTable('order');