<template>
    <button
        class="button"
        :type="type"
        :class="{
            'button--active': isActive
        }"
        @click="$emit('click')"
    >
        <slot>Кнопка</slot>
    </button>
</template>

<script>
export default {
    name: "ButtonItem",

    props: {
        isActive: {
            type: Boolean,
            default: false,
        },

        /**
         * Тип кнопки
         */
        type: {
            type: String,
            default: 'button',
            validator(value) {
                // Значение должно соответствовать одной из этих строк
                return ['submit', 'button', 'reset'].indexOf(value) !== -1;
            },
        },

    },
}
</script>

<style scoped>
.button {
    min-height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-size: 18px;
    border-radius: 4px;
    box-shadow: none;
    border: none;
    padding: 0;
    cursor: pointer;
}

.button:hover {
    color: white;
    background-color: lightskyblue;
}

.button--active {
    color: white;
    background-color: dodgerblue;
}
</style>