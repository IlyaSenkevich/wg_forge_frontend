// this is an example of improting data from JSON
import orders from '../data/orders.json';

const cardNumber = (str) => {
   const newStr = str.replace(/\d(?=\d{4})/g, "*");
   return newStr;
};

const dateFormat = (date) => {
 const newDate = date 
};

export default (function () {
    orders.map(order => {
      const str = cardNumber(order.card_number);
        document.getElementById("app").innerHTML += `
        <tr id=${order.id}>
            <td>${order.transaction_id}</td>
            <td class="user_data">${order.user_id}</td>
            <td>${order.created_at}</td>
            <td>${order.total}</td>
            <td>${str}</td>
            <td>${order.order_country}</td>
            <td>${order.order_ip}<td>
        </tr>`});
}());
