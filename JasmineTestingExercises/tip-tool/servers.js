let serverForm = document.getElementById('serverForm');
let serverNameInput = document.getElementById('serverName');


let serverTbody = document.querySelector('#serverTable tbody');

let allServers = {};
let serverId = 0;

serverForm.addEventListener('submit', submitServerInfo);



// create server object and add to allServers, update html and reset input
function submitServerInfo(evt) {
  if (evt) evt.preventDefault(); // when running tests there is no event

  // get server's name from input
  let serverName = serverNameInput.value;

  if (serverName !== '') {
    serverId++;
    allServers['server' + serverId] = { serverName };

    updateServerTable();

    serverNameInput.value = '';
  }
   
}

// Create table row element and pass to appendTd function with input value
function updateServerTable() {
  serverTbody.innerHTML = '';

  for (let key in allServers) {  //eg: server1: {serverName: 'Alice'}      key: server1
    let curServer = allServers[key];
   
    let newTr = document.createElement('tr');
    newTr.setAttribute('id', key);

    let tipAverage = sumPaymentTotal('tipAmt') / Object.keys(allServers).length;
    
    // same newTr will be passed in twice to collect two diffirent newTds
    appendTd(newTr, curServer.serverName);
    appendTd(newTr, '$' + tipAverage.toFixed(2));
    appendDeleteBtn(newTr, 'server')
    serverTbody.append(newTr);
  }
   
}


// function appendDeleteBtn(tr){
//   let button= document.createElement('td')
//   button.className='deleteBtn'
//   button.innerText=" X "
//   button.addEventListener('click', function(e){
//     let ele=e.target.closest('tr')
//     delete allServers[ele.id]
//     ele.parentNode.removeChild(ele)
//     updateServerTable()
//   })
//   tr.appendChild(button)
// }

 
