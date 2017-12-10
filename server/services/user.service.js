var users = require('../models/User');
var bcrypt = require('bcryptjs');
var Q = require('q');
var _ = require('lodash'); 
var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
//service.getById = getById;
service.create = create;
//service.update = update;
//service.delete = _delete;


module.exports = service;

function authenticate(username, password)
{
    var deferred = Q.defer();

    users.findOne({username: username}, function(err,user){
        if(err) 
            deferred.reject(err.name + ':' + err.message);
        if(user && bcrypt.compareSync(password, user.hash))
        {
            // authentication successful
            deferred.resolve({
                _id: user.id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname

            });
        }
        else
        {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam)
{
    var deferred = Q.defer();

    users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

        function createUser() {
            // set user object to userParam without the cleartext password
            var user = _.omit(userParam, 'password');
    
            // add hashed password to user object
            user.hash = bcrypt.hashSync(userParam.password, 10);
    
            users.create(
                user,
                function (err, doc) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
    
                    deferred.resolve();
                });
        }
        return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    users.find().exec(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}