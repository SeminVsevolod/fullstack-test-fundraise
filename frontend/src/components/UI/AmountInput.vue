<template>
    <div class="amount-input">
        <div class="amount-input__currency">
            {{ currency.symbol }}
        </div>

        <input
            id="amount"
            class="amount-input__amount"
            v-model="amountModel"
            step="1"
            @keypress="onKeypress"
        />

        <select
            v-model="currencyModel"
            id="currency"
            class="amount-input__select"
        >
            <option
                disabled
                value=""
            >
                -
            </option>
            <option
                v-for="(currencyOption, currencyIndex) in currencyList"
                :key="currencyIndex"
                :value="currencyOption"
            >
                {{ currencyOption.code }}
            </option>
        </select>
    </div>
</template>

<script>
import {formatNumberAccordingLocale} from "@/utils/formatNumberAccordingLocale";

export default {
    name: "AmountInput",

    props: {
        /**
         * Выбранная стоимость
         */
        amount: {
            type: [Number, String],
            required: true,
        },

        /**
         * Выбранная валюта
         */
        currency: {
            type: Object,
            required: true,
        },

        /**
         * Список валют
         */
        currencyList: {
            type: Array,
            required: true,
        }
    },

    computed: {
        currencyModel: {
            get() {
                return this.currency;
            },
            set(value) {
                this.$emit('changeCurrency', value);
            }
        },

        amountModel: {
            get() {
                return formatNumberAccordingLocale(this.amount);
            },
            set(value) {
                const result = value.length ? parseInt(value.replace(/\D/g,'')) : '';
                this.$emit('changeAmount', result);
            }
        },
    },

    methods: {
        /**
         * Запретить ввод всех символов, кроме чисел
         * @param {object} event - Событие нажатия клавиши
         */
        onKeypress(event) {
            if (event.keyCode > 31 && (event.keyCode < 48 || event.keyCode > 57)) {
                event.preventDefault();
            }
        }
    },
}
</script>

<style scoped>
.amount-input {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background: white;
    border-radius: 4px;
    border: 1px solid gray;
}

.amount-input__currency {
    margin: 10px;
    font-size: 24px;
}

.amount-input__amount {
    width: 75%;
    border: none;
    outline: none;
    font-size: 30px;
    color: dodgerblue;
}

.amount-input__select {
    border: none;
    outline: none;
    font-size: 16px;
}

</style>