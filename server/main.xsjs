$.response.contentType = "text/html";
var output = "Hello User, " + $.session.getUsername() + " <br><br>";
var conn = $.db.getConnection();

$.response.setBody(output);