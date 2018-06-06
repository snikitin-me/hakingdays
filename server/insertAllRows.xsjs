var query = "SELECT max(\"id\") FROM \"SYSTEM\".\"hack.data::sensor3\""; 
var oConnection = $.db.getConnection(); 
var oStatement;
query = "INSERT INTO \"SYSTEM\".\"hack.data::sensor1\" (SELECT \"id\", \"time\", \"sensor1\" FROM \"SYSTEM\".\"hack.data::input\")";
oStatement = oConnection.prepareStatement(query); 
oStatement.execute(); 
query = "INSERT INTO \"SYSTEM\".\"hack.data::sensor2\" (SELECT \"id\", \"time\", \"sensor2\" FROM \"SYSTEM\".\"hack.data::input\")";
oStatement = oConnection.prepareStatement(query); 
oStatement.execute(); 
query = "INSERT INTO \"SYSTEM\".\"hack.data::sensor3\" (SELECT \"id\", \"time\", \"sensor3\" FROM \"SYSTEM\".\"hack.data::input\")";
oStatement = oConnection.prepareStatement(query); 
oStatement.execute(); 
    
 
oConnection.commit();
oStatement.close(); 
oConnection.close(); 
var result = {success: true};
$.response.contentType = "application/json; charset=UTF-8"; 
$.response.setBody(JSON.stringify(result));
$.response.status = $.net.http.OK; 
