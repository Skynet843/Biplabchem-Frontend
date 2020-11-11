$(document).ready(
    () =>{
            url = "https://admin.biplabchem.com/get-gallery";
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
            
            )}
    
)
function init(data){
    var strings = "";
    var datas = data['data'];
    for(let prop of datas){
        strings += `<img src="https://admin.biplabchem.com${prop['pic_link']}" alt="${prop['id']}"/>`;
    }
    document.querySelector('#galleryidjs').innerHTML = strings;
    
}
