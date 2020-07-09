// const ResturantDetails = require('../models/resturantDetailsModel');
// const jwt = require('jsonwebtoken');

// module.exports = async (req, res) => {
//   let details;
//   await ResturantDetails.findOne({ name: req.body.name })
//     .then((result) => {
//       details = result;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   console.log('Log In', details);
//   if (details) {
//     if (details.password !== req.body.password) {
//       return res.status(400).send('Invalid username or password');
//     }
//     let accessToken = jwt.sign(
//       {
//         resturant_id: details._id,
//       },
//       process.env.JWT_KEY
//     );
//     res.cookie('clientIdToken', accessToken, {
//       maxAge: 9000000,
//       httpOnly: true,
//     });
//     return res.status(200).send('Login Successful');
//   }
// };
