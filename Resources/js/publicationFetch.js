$(document).ready(
    () =>{
       
            url = "https://admin.biplabchem.com/get-publication";
            data = '{"accesskey":"9494"}'
            params = {
                method:'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            }
            fetch(url, params).then(response=> response.json())
            .then(data => init(data)
            )

    }
)
function init(data){
    var count = 1;
    var mainstring = "";
    var strings = "";
    var imagestring = "";
    var endstring = "";
    var datas = data['data'];
    for(let prop of datas){
        strings = `<div class="card-publication">
        <div class="number">
          ${count++}
        </div>
        <div class="card-details-section">
          <div class="card-title">
             <h3>${prop['title']}</h3>
          </div>
          <div class="card-details">
          <p>${prop['author']} 
          </p>
          <p>${prop['ref_no']}</p>
      </div>`;
     
      if(!(prop['image'] == "null" || prop['image_filename'] == "null")){
        imagestring = `<div class="card-images">
        <img src="https://admin.biplabchem.com${prop['image']}" alt="">
    </div>`
      }
      endstring = `<div class="btn-section">
      <a href='https://admin.biplabchem.com${prop['pdf_link']}' class="btn btn-yellow">Read More
      </a>
    </div>
</div>
</div>`
          mainstring += strings + imagestring + endstring;
    }
    document.getElementById('cardconjs').innerHTML = mainstring;
  
}