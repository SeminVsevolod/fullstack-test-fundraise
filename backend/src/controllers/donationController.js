const Donation = require('../models/donationModel');

/**
 * Создать пожертвование
 */
exports.createDonation = async (ctx) => {
    const requestBody = ctx.request.body

    // Если при создании возникнет ошибка, её обработает отдельный middleware
    const newDonation = await Donation.create(requestBody);
    if (newDonation) {
        ctx.status = 201;
        ctx.body = {
            ok: true,
        }
    }
};