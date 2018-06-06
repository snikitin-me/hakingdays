var result = {
    sensors : [ ]   
}; 
////s1
var query = "SELECT \"id\",	\"time\",	\"value\" FROM \"SYSTEM\".\"hack.data::sensor1\""; 
var oConnection = $.db.getConnection(); 
var oStatement = oConnection.prepareStatement(query); 
oStatement.execute(); 
var oResultSet = oStatement.getResultSet();
var sensor1 = {
                "name":"Трансформатор №1",
                "id":"1",
                "unit":"°C",
                values: []
};
while (oResultSet.next()) { 
  sensor1.values.push({
                        time : oResultSet.getNString(2),
                        value: oResultSet.getDecimal(3)
  }); 
} 
result.sensors.push(sensor1);

////s2
query = "SELECT \"id\",	\"time\",	\"value\" FROM \"SYSTEM\".\"hack.data::sensor2\""; 
oConnection = $.db.getConnection(); 
oStatement = oConnection.prepareStatement(query); 
oStatement.execute(); 
oResultSet = oStatement.getResultSet();
var sensor2 = {
                "name":"Щиток №2",
                "id":"2",
                "unit":"°C",
                values: []
};
while (oResultSet.next()) { 
  sensor2.values.push({
                        time : oResultSet.getNString(2),
                        value: oResultSet.getDecimal(3)
  }); 
} 
result.sensors.push(sensor2);

////s3
query = "SELECT \"id\",	\"time\",	\"value\" FROM \"SYSTEM\".\"hack.data::sensor3\""; 
oConnection = $.db.getConnection(); 
oStatement = oConnection.prepareStatement(query); 
oStatement.execute(); 
oResultSet = oStatement.getResultSet();
var sensor3 = {
                "name":"Подстанция №3",
                "id":"3",
                "unit":"°C",
                values: []
};
while (oResultSet.next()) { 
  sensor3.values.push({
                        time : oResultSet.getNString(2),
                        value: oResultSet.getDecimal(3)
  }); 
} 
result.sensors.push(sensor3);
////
oResultSet.close(); 
oStatement.close(); 
oConnection.close(); 
$.response.contentType = "application/json; charset=UTF-8"; 
$.response.setBody(JSON.stringify(result)); 
$.response.status = $.net.http.OK; 