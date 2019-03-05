import orders from '../data/orders.json';
import users from '../data/users';

const cardNumber = (str) => {
  const newStr = str.replace(/\d(?=\d{4})/g, "*");
  return newStr;
};

const dateFormat = (date) => {
  const theDate = new Date(date * 1000);
  const dateString = ('0' + theDate.getUTCDate()).slice(-2) +
    '/' + ('0' + theDate.getUTCMonth()).slice(-2) +
    '/' + theDate.getUTCFullYear() +
    ', ' + ('0' + theDate.getUTCHours()).slice(-2) +
    ':' + ('0' + theDate.getUTCMinutes()).slice(-2) +
    ':' + ('0' + theDate.getUTCSeconds()).slice(-2);
  return dateString;
};

const convertingUSD = (total) => {
  const moneyUSD = `$${total}`;
  return moneyUSD;
}

const findUser = (userId) => {
  const user = users.filter(user => {
    return user.id === userId;
  });
  return user[0];
};

const chooseGender = (user) => {
  if (user.gender === 'Male') {
    return `Mr. ${user.first_name} ${user.last_name}`
  } else {
    return `Ms. ${user.first_name} ${user.last_name}`;
  }
};

const birthday = (date) => {
  const theDate = new Date(date * 1000);
  const dateString = ('0' + theDate.getUTCDate()).slice(-2) +
    '/' + ('0' + theDate.getUTCMonth()).slice(-2) +
    '/' + theDate.getUTCFullYear();
  return dateString;
};

export default (function () {
  orders.map(order => {
    const str = cardNumber(order.card_number);
    const date = dateFormat(order.created_at);
    const usd = convertingUSD(order.total);
    const user = findUser(order.user_id);
    const gender = chooseGender(user);
    const birth = birthday(user.birthday);
    document.getElementById("app").innerHTML += `
        <tr id=${order.id}>
            <td>${order.transaction_id}</td>
            <td class="user_data">
               <a class='linka-${order.id}' href="#">${gender}</a>
               <div style="display: none" id="info" class="user-details-${order.id}">
                   <p>Birthday: ${birth}</p>
                   <p><img  src="${user.avatar}" width="100px"></p>
                   <p>Company: <a href="http://awesome.website">${user.company_id}</a></p>
                   <p>Industry: Apparel / Consumer Services</p>
                </div>
            </td>
            <td>${date}</td>
            <td>${usd}</td>
            <td>${str}</td>
            <td>${order.card_type}</td>
            <td>${order.order_country} (${order.order_ip})<td>
        </tr>
        <br/>
       `});
}());

orders.map(order => {
  const linka = document.querySelector(`.linka-${order.id}`);
  var informationClient = document.querySelector(`.user-details-${order.id}`);
  linka.addEventListener('click', () => {
    if (informationClient.style.display === 'none') {
      informationClient.style.display = 'block';
    } else {
      informationClient.style.display = 'none';
    }
  })
})






