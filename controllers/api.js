const db = MAIN.openDB;
const db2 = MAIN.openDB2;

exports.install = function(){
    ROUTE('GET /api/profile/',profile);
    ROUTE('GET /opendb/',db_connect);
    ROUTE('GET /sendsms/',send_sms);
    ROUTE('POST      /api/v1/messages/new/    *Messages --> insert');
     
}

function profile(){
    var self = this;
    var profile = {
        "id" : 1, 
        "firstname" : "Louis",
        "lastname" : "Bertson",
        "email" : "louisbertson@gmail.com",
        "image" : "/img/bugatti.jpg"
    }
    self.json(profile);
};

function db_connect(){
    var self = this;
    db2.rpc({db : "users", type : "find",filter : "true"},function(err, res){
        if(err) 
            console.log(err);
        self.json(res);
    })
}   


function send_sms(){
    var self = this;
    var token = '20211111xrdn12e0fimk3b24dzjuiop50';
    TotalAPI(token,'sms', { from: 'L.Bertson', to: '+22652133010', body: 'Have a sweet night dear Agape. Louis Bertson' }, function(err, response){
        if(err)
            console.log(err);
        
        self.json(response);
    });
}