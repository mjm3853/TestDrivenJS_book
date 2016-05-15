var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportlocal = require("passport-local");

var addTicketSchema = new Schema ({
    user: String,
    email: String,
    issuetype: String,
    department: String,
    ticketstate: String,
    comments: String,
    createddate: String
}, {
    collection: 'tickets'
});

var TicketDetail = mongoose.model('tickets', addTicketSchema);

module.exports = TicketDetail;