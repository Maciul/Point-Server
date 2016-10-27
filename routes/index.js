var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGODB_URI || 'mongodb://localhost:27017/database');
var companies = db.get('companies');
var sciencebase = db.get('sciencebase');
var cors = require('cors');

var whitelist = ['https://point380-d4eac.firebaseapp.com', 'https://point-380.firebaseapp.com'];
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
  }
};

/* GET home page. */
router.get('/', cors(), function(req, res, next) {
  res.json({
    message: 'We are in great success!'
  });
});

router.get('/companies', cors(corsOptions), function(req, res, next) {
   companies.find({}, function(err, data) {
     res.json({data: data});
   });
 });

 router.get('/companies/:id', cors(corsOptions), function(req, res, next) {
    companies.findOne({name : req.params.id}, function(err, data) {
      res.json({data : data});

    });
  });

  router.get('/sciencebase', cors(corsOptions), function(req, res, next) {
     return sciencebase.find({}, function(err, data) {
       res.json({data : data});
     });
   });

   router.get('/sciencebase/:year', cors(corsOptions), function(req, res, next) {
      sciencebase.find({year: req.params.year}, function(err, data) {
        res.json({data : data});
      });
    });

    router.get('/admin', cors(), function(req, res, next) {
      res.render('admin');
    });

module.exports = router;
