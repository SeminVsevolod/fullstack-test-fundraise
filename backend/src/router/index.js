const Router = require('@koa/router');
const router = new Router();

const donationController = require('../controllers/donationController');

router.post('/donate', donationController.createDonation);

module.exports = router;