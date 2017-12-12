
function regions() {
var regionCodes = document.getElementById('region_codes');
fetch('http://api.lmiforall.org.uk/api/v1/wf/filters/info/region')
  .then(response => response.json())
  .then(function(json){
    var str = '';
    for (i=0;i<12;i++) {
       str += `${i + 1} = ${json.coding[i].description} ;` + ' ';
    }
    regionCodes.innerHTML = str;
  });
}

function searchSoc(query) {
var socCodes = document.getElementById('soc_codes');
fetch(`http://api.lmiforall.org.uk/api/v1/soc/search?q=${query}`)
  .then(response => response.json())
  .then(function(json){
    var str = '';
    for (i=0;i<json.length;i++) {
      str += `${json[i].soc} = ${json[i].title} ;` + ' '
    }
    socCodes.innerHTML = str;
  });
}

function test(para) {

}
