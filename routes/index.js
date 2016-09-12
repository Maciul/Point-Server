var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGODB_URI || 'mongodb://localhost:27017/database');
var companies = db.get('companies');
var sciencebase = db.get('sciencebase');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    message: 'We are in great success!'
  });
});

router.get('/companies', function(req, res, next) {
   companies.find({}, function(err, data) {
     res.json({data: data});
   });
 });

 router.get('/companies/:id', function(req, res, next) {
    companies.findOne({name : req.params.id}, function(err, data) {
      res.json({data : data});

    });
  });


  router.get('/sciencebase', function(req, res, next) {
     return sciencebase.find({}, function(err, data) {
       res.json({data : data});
     });
   });

   router.get('/sciencebase/:year', function(req, res, next) {
      sciencebase.find({year: req.params.year}, function(err, data) {
        res.json({data : data});
      });
    });


// Testing attention please!
    router.get('/test', function(req, res, next) {
      var promises = [
       new Promise(function(resolve, reject) {
           sciencebase.find({year: '1990'}, function(err, done){
            //  console.log(done)
                if(err)
                    reject(err);
                else
                    resolve(done);
           });
       }),
       new Promise(function(resolve, reject) {
           sciencebase.find({year: '1995'}, function(err, done){
            //  console.log(done)
                if(err)
                    reject(err);
                else
                    resolve(done);
           });
    })
  ];
  return Promise.all(promises).then(function(data) {
    console.log(data);
  });
});


module.exports = router;
