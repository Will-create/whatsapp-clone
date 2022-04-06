"use strict";
//var Auth = SOURCE('auth');
exports.install = function () {
    ROUTE('POST     ', authTest);
}
function authTest() {
    var self = this;
    console.log('Test auth data -->>', self.body);
    return self.json(self.body).cancel();
    // let id = self.body.id;
    // let key = self.body.key;
    // let ip = self.req.ip;
    // Auth.nodeToToken('MNO', id, key, ip).then((token) => {
    //     self.jsonSuccess(token);
    // }).catch((err) => {
    //     self.jsonFail(FUNC.safeErrorMessage(err));
    // });
}