exports.install = function(){
    ROUTE('GET /api/profile/',profile);
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

function livereload(){
    
}