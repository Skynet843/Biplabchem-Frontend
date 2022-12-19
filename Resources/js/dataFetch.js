$(document).ready(() => {
  url = "https://admin.biplabchem.com/get-profile";
  data = '{"accesskey":"9494"}';
  params = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  };
  fetch(url, params)
    .then((response) => response.json())
    .then((data) => init(data));
  fetchandchange("education", "educationjs");
  fetchandchange("awards", "awardsjs");
  fetchandchange("position", "positionjs");
  fetchandchange("members", "committee");
});
function fetchandchange(categ, boxId) {
  url = "https://admin.biplabchem.com/get-details-by-category";
  data = `{"accesskey":"9494", "category" : "${categ}"}`;
  params = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  };
  fetch(url, params)
    .then((response) => response.json())
    .then((data) => {
      var strings = "";
      console.log(data, "MAATAS");
      var datas = data["data"];
      for (let prop of datas) {
        strings += ` <i class="fas fa-angle-double-right"></i>&nbsp;
                    <b>${prop["first_part"]} :</b> ${prop["second_part"]}<br />
                    <br>`;
      }

      document.querySelector(`#${boxId}`).innerHTML = strings;
    });
  // TODO :  Now put the data into the html using DOM
}
function init(data) {
  var datas = data["data"];
  document.querySelector("#namejs").innerHTML = datas["name"];
  document.querySelector("#shortbiojs").innerHTML = datas["bio"];
  document.querySelector("#fullbiojs").innerHTML = datas["full_bio"];
  document.querySelector("#facebookjs").href = datas["facebook"];
  document.querySelector("#linkedinjs").href = datas["linkdin"];
//   document.querySelector("#twitterjs").href = datas["twitter"];
  document.querySelector("#contactnamejs").innerHTML = datas["name"];
  document.querySelector("#contactnumberjs").innerHTML = datas["phone_no"];
  document.querySelector("#contactemailjs").innerHTML = datas["email"];
  document.querySelector("#contactaddressjs").innerHTML = datas["address"];
  console.log("Welcome Dear Developer Fellow ;)");
}
