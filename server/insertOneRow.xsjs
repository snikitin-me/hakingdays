var query = "SELECT max(\"id\") FROM \"SYSTEM\".\"hack.data::sensor3\""; 
var oConnection = $.db.getConnection(); 
var oStatement = oConnection.prepareStatement(query); 
oStatement.execute(); 
var oResultSet = oStatement.getResultSet();
var maxId;
while (oResultSet.next()) { 
  maxId = oResultSet.getInteger(1);
} 

if (maxId === null) {
    query = "INSERT INTO \"SYSTEM\".\"hack.data::sensor1\" (SELECT \"id\", \"time\", \"sensor1\" FROM \"SYSTEM\".\"hack.data::input\" where \"id\"=1 )";
    oStatement = oConnection.prepareStatement(query); 
    oStatement.execute(); 
    query = "INSERT INTO \"SYSTEM\".\"hack.data::sensor2\" (SELECT \"id\", \"time\", \"sensor2\" FROM \"SYSTEM\".\"hack.data::input\" where \"id\"=1 )";
    oStatement = oConnection.prepareStatement(query); 
    oStatement.execute(); 
    query = "INSERT INTO \"SYSTEM\".\"hack.data::sensor3\" (SELECT \"id\", \"time\", \"sensor3\" FROM \"SYSTEM\".\"hack.data::input\" where \"id\"=1 )";
    oStatement = oConnection.prepareStatement(query); 
    oStatement.execute(); 
    $.response.status = $.net.http.OK; 
    maxId = 1;
} else if (maxId <= 310) {
    maxId++;
    query = "INSERT INTO \"SYSTEM\".\"hack.data::sensor1\" (SELECT \"id\", \"time\", \"sensor1\" FROM \"SYSTEM\".\"hack.data::input\"where \"id\"=" + maxId + ")";
    oStatement = oConnection.prepareStatement(query); 
    oStatement.execute();
    query = "INSERT INTO \"SYSTEM\".\"hack.data::sensor2\" (SELECT \"id\", \"time\", \"sensor2\" FROM \"SYSTEM\".\"hack.data::input\"where \"id\"=" + maxId + ")";
    oStatement = oConnection.prepareStatement(query); 
    oStatement.execute(); 
    query = "INSERT INTO \"SYSTEM\".\"hack.data::sensor3\" (SELECT \"id\", \"time\", \"sensor3\" FROM \"SYSTEM\".\"hack.data::input\"where \"id\"=" + maxId + ")";
    oStatement = oConnection.prepareStatement(query); 
    oStatement.execute(); 
    $.response.status = $.net.http.OK; 
}
oConnection.commit();
oStatement.close(); 
oConnection.close(); 
var result = {success: true};
$.response.contentType = "application/json; charset=UTF-8"; 
$.response.setBody(JSON.stringify(result));
