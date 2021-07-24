<template>
    <form
        class="form"
        @submit.prevent="onSubmitForm"
    >
        <div
            v-if="currency.symbol"
            class="form__grid"
        >
            <ButtonItem
                v-for="(presetObject, presetIndex) in formattedPresets"
                type="button"
                :isActive="presetObject.value === amount"
                :key="presetIndex"
                @click="onChangeAmount(presetObject.value)"
            >
                {{ presetObject.formattedValue }}
            </ButtonItem>
        </div>

        <AmountInput
            class="form__amount"
            :amount="amount"
            :currency="currency"
            :currencyList="currencyList"
            @changeAmount="onChangeAmount"
            @changeCurrency="onChangeCurrency"
        />

        <ButtonItem
            class="form__submit"
            is-active
            type="submit"
        >
            Donate
        </ButtonItem>
    </form>
</template>

<script>
import ButtonItem from '@/components/UI/ButtonItem';
import AmountInput from '@/components/UI/AmountInput';
import {roundValuePrettily} from '@/utils/roundValuePrettily';
import {convertCurrency} from "@/utils/convertCurrency";
import {formatNumberAccordingLocale} from "@/utils/formatNumberAccordingLocale";

const CURRENCY_LIST = [
    {name: 'US Dollar', code: 'USD', symbol: '$', rate: 1},
    {name: 'Euro', code: 'EUR', symbol: '€', rate: 0.8495},
    {name: 'British Pound', code: 'GBP', symbol: '£', rate: 0.7273},
    {name: 'Russian Ruble', code: 'RUB', symbol: '₽', rate: 73.8129},
];

const CURRENCY_CODE_USD = 'USD';

export default {
    name: 'Donation',

    components: {
        AmountInput,
        ButtonItem,
    },

    data() {
        return {
            /**
             * Предустановленные суммы подсказок в долларах
             */
            presets: [40, 100, 200, 1000, 2500, 5000],

            /**
             * Выбранная сумма пожертвования
             */
            amount: 40,

            /**
             * Выбранная валюта
             */
            currency: CURRENCY_LIST[0]
        }
    },

    computed: {
        /**
         * @returns {Array} - Список валют
         */
        currencyList() {
            return CURRENCY_LIST;
        },

        /**
         * @returns {Array} - Предустановленные суммы подсказок в текущей выбранной валюте
         */
        formattedPresets() {
            return this.presets.map((rawValue) => {
                const currencyCode = this.currency.code;
                const currencyRate = this.currency.rate;
                const currencySymbol = this.currency.symbol;

                let convertedValue = rawValue;

                if (currencyCode !== CURRENCY_CODE_USD) {
                    // Если это не доллары, то конвертируем валюту и округляем "красиво" сумму подсказки
                    convertedValue = roundValuePrettily(rawValue * currencyRate);
                }

                return {
                    value: convertedValue,
                    formattedValue: `${currencySymbol}${formatNumberAccordingLocale(convertedValue)}`,
                };
            });
        }
    },

    methods: {
        /**
         * Отправить данные формы
         */
        onSubmitForm() {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: this.amount,
                    currency: this.currency?.code ?? null,
                })
            };
            const url = process.env.VUE_APP_API_URL;
            fetch(`${url}/donate`, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.ok) {
                        alert('Thank you for your donation!');
                    }
                })
                .catch((error) => {
                    console.error('error->', error);
                });
        },

        /**
         * Изменить стоимость
         * @param {number} amount - Стоимость
         */
        onChangeAmount(amount) {
            this.$set(this, 'amount', amount);
        },

        /**
         * Изменить валюту
         * @param {string} newCurrency - Валюта
         */
        onChangeCurrency(newCurrency) {
            const currencyRate = newCurrency.rate;
            this.onChangeAmount(convertCurrency(this.amount, this.currency.rate, currencyRate))
            this.$set(this, 'currency', newCurrency);
        },
    },
}
</script>

<style scoped>
.form {
    margin: 40px;
    padding: 20px;
    width: 300px;
    display: flex;
    flex-direction: column;
    background-color: lightgray;
    border-radius: 4px;
    border: 1px solid gray;
}

.form__grid {
    margin-bottom: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px;
}

.form__amount {
    height: 40px;
    margin-bottom: 30px;
}

.form__submit {
    height: 70px;
    width: 100%;
    font-size: 24px;
}
</style>
