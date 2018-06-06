var query = "TRUNCATE TABLE \"SYSTEM\".\"hack.data::sensor3\""; 
var oConnection = $.db.getConnection(); 
var oStatement = oConnection.prepareStatement(query); 
oStatement.execute(); 
query = "TRUNCATE TABLE \"SYSTEM\".\"hack.data::sensor1\"";
oStatement = oConnection.prepareStatement(query); 
oStatement.execute(); 
query = "TRUNCATE TABLE \"SYSTEM\".\"hack.data::sensor2\""; 
oStatement = oConnection.prepareStatement(query); 
oStatement.execute(); 

oStatement.close(); 
oConnection.close(); 
var result = {success: true};
$.response.contentType = "application/json; charset=UTF-8"; 
$.response.setBody(JSON.stringify(result));
$.response.status = $.net.http.OK; 