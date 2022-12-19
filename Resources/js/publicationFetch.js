$(document).ready(() => {
  var url = "https://admin.biplabchem.com/get-publication";
  var urlForCover = "https://admin.biplabchem.com/get-cover_photo";
  var dataForCover = '{"accesskey":"9494"}';
  var paramsForCover = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: dataForCover,
  };
  var data = '{"accesskey":"9494"}';
  var params = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  };
  var callOne = fetch(url, params).then((res) => res.json());
  var callTwo = fetch(urlForCover, paramsForCover).then((res) => res.json());
  Promise.all([callOne, callTwo])
    .then((values) => {
      init([values[0], values[1]]);
      // values[0].json().then((res) => console.log(res));

      // console.log(values[1].json());
    })
    .catch((error) => console.log("EROR in Publications : ", error));
});
function init(data) {
  console.log(data, "BATA");
  var count = 1;
  var mainstring = "";
  var strings = "";
  var imagestring = "";
  var endstring = "";
  var datas = data[0]["data"];
  var coverData = data[1]["data"];
  for (let prop of datas) {
    strings = `<div class="card-publication">
          <div class="number">
            ${count++}
          </div>
          <div class="card-details-section">
            <div class="card-title">
               <h3>${prop["title"]}</h3>
            </div>
            <div class="card-details">
            <p>${prop["author"]}
            </p>
            <p>${prop["ref_no"]}</p>
        </div>`;

    if (!(prop["image"] === null || prop["image_filename"] === null)) {
      imagestring = `<div class="card-images">
          <img src="https://admin.biplabchem.com${prop["image"]}" alt="">
      </div>`;
    }
    endstring = `<div class="btn-section">
        <a href='${prop["pdf_link"]}' class="btn btn-yellow">Read More
        </a>
      </div>
  </div>
  </div>`;
    mainstring += strings + imagestring + endstring;
  }
  var cardContainerString =
    '<div class="card-publication" style="display:flex; flex-direction:row; flex-wrap: wrap; padding-top:50px; justify-content: flex-start;">';
  var imagestringCover = "";
  for (let prop of coverData) {
    if (!(prop["image"] === null || prop["image_filename"] === null)) {
      imagestringCover += `<a href="${
        prop["link"].includes("https://")
          ? prop["link"]
          : "https://" + prop["link"]
      }" target="_blank" style="width:22%; margin-left: 10px; margin-right:10px; margin-bottom:20px" >
          <img src="https://admin.biplabchem.com${
            prop["image"]
          }" alt="" style="width:100%"></a>`;
    }
  }
  var lastString = "</div>";
  document.getElementById("cardconjs").innerHTML = mainstring;
  document.getElementById("cardOfCover").innerHTML =
    cardContainerString + imagestringCover + lastString;
}
