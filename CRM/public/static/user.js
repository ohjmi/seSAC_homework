let currentPage = 1;
let totalPage = 1; // 초기값 설정

document.addEventListener('DOMContentLoaded', () => {
  fetchUserData();
  });
  
  function fetchUserData() {
    const searchValue = document.getElementById('searchInput').value;
    const genderSelect = document.getElementById('gender').value;
    // const selectedGender = genderSelect.value;
    fetch(`/api/user?search=${searchValue}&gender=${genderSelect}&page=${currentPage}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      currentPage = data.currentPage;
      totalPage = data.totalPage;
      displayUser(data.users);
      pagination(currentPage, totalPage);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }
  
function pagination(currentPage, totalPage) {
  const pageNumbersContainer = document.getElementById('pageNumbersContainer');
  pageNumbersContainer.innerHTML = '';

  for (let i = 1; i <= totalPage; i++) {
    const pageNumberElement = document.createElement('a');
    pageNumberElement.textContent = i;
    pageNumberElement.className = 'page_number';


    if (i === currentPage) {
      console.log(currentPage)
      pageNumberElement.style.backgroundColor = 'palevioletred';
      pageNumberElement.style.border = '1px solid palevioletred';
      pageNumberElement.style.color = 'white';

    }

    pageNumberElement.addEventListener('click', () => goToPage(i));
    pageNumbersContainer.appendChild(pageNumberElement);
    
  }

  const prevButtonElement = document.getElementById('prevButton');
  prevButtonElement.style.display = currentPage === 1 || '' ? 'none' : 'block';

  const nextButtonElement = document.getElementById('nextButton');
  if (currentPage === totalPage || totalPage === 0 ) {
    nextButtonElement.style.display = 'none';
  } else {
    nextButtonElement.style.display = 'block';
  }

}

function prevButton() {
  if (currentPage > 1) {
    currentPage--;
    fetchUserData();
  }
}

function nextButton() {
  if (currentPage < totalPage) {
    currentPage++;
    fetchUserData();
  }
}

function goToPage(page) {
  currentPage = page;
  fetchUserData();
}



function displayUser(users) {
  const userTableBody = document.getElementById('userTable');
  userTableBody.innerHTML = '';

  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><a href= '/userdetail?id=${user.Id}'>${user.Id}</a></td>
      <td>${user.Name}</td>
      <td>${user.Gender}</td>
      <td>${user.Age}</td>
      <td>${user.Birthdate}</td>
      <td>${user.Address}</td>
    `;
    userTableBody.appendChild(row);
  });
}