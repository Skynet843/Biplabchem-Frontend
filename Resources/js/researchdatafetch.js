$(document).ready(
    () =>{
       
            url = "https://admin.biplabchem.com/get-research";
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
    
    var mainstring = "";
    var strings = "";
    var imagestring = "";
    var endstring = "";
    var datas = data['data'];
    if(datas.length == 0){
        mainstring = `<div class="card-research">
        <h1 style="text-align:center; color:yellow">Coming Soon </h1>
      </div>`;
    }else{

    
    for(let prop of datas){
        strings = `<div class="card-research">
        <div class="card-title">
           <h3> ${prop['title']}</h3>
        </div>
        <div class="card-details">
          ${prop['body']}
        </div>`;
        if(!(prop['image'] == 'null' || prop['image_filename'] == 'null')){
            imagestring = `<div class="card-images">
            <img src="https://admin.biplabchem.com${prop['image']}" alt="Images">
        </div>`;
        }
    endstring = `</div>`;
          mainstring += strings + imagestring + endstring;
    }
}
    document.getElementById('cardconjs').innerHTML = mainstring;
  
}