const Donation = require('../models/donationModel');

const CURRENCY_LIST = [
    {name: 'US Dollar', code: 'USD', symbol: '$', rate: 1},
    {name: 'Euro', code: 'EUR', symbol: '€', rate: 0.8495},
    {name: 'British Pound', code: 'GBP', symbol: '£', rate: 0.7273},
    {name: 'Russian Ruble', code: 'RUB', symbol: '₽', rate: 73.8129},
];
const CURRENCY_CODES_LIST = CURRENCY_LIST.map(currency => currency.code);

/**
 * Создать пожертвование
 */
exports.createDonation = async (ctx) => {
    const requestBody = ctx.request.body
    ctx.assert(requestBody.amount, 422, 'Amount required');
    ctx.assert(requestBody.currency, 422, 'Currency required');
    ctx.assert(requestBody.amount > 0, 422, 'Amount must be above zero');
    ctx.assert(CURRENCY_CODES_LIST.includes(requestBody.currency), 422, `Currency must be one from the list: ${CURRENCY_CODES_LIST}`);

    // Если при создании возникнет ошибка, её обработает отдельный middleware
    const newDonation = await Donation.create(requestBody);
    if (newDonation) {
        ctx.status = 201;
        ctx.body = {
            ok: true,
        }
    }
};