// Step One: Complete server.test.js
// Clean up the dom after the test is run using afterEach
// Write a test for each function found in server.js

describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  if('should update server table on updateServerTable()', function(){
    updateServerTable();
    let newTr = document.createElement('tr');
    serverTbody.append(newTr)

    expect(serverTbody.innerHTML).toEqual('')
    expect(serverTbody.childElementCount).toEqual(1)
     
  })

  afterEach(function() {
    // teardown logic
    serverNameInput.value= '';
    allServers={}
    serverTbody.innerHTML= ''
  });
});
