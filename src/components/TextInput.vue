<template>
    <div class = "text-input-wrap">
        <input v-if = "type == 'text'" type = "text" v-model = "value" />
        <input v-else type = "password" v-model = "value" />

        <span class = "text-input-focus-line"></span>
        <label v-if = "!value.length">{{placeholder}}</label>
    </div>
</template>

<script>
    export default {
        data () { return { value: '' }; },
        props: ['type', 'placeholder'],
        methods: {

        }
    };
</script>

<style lang = "sass">
    $scale : .67;
    .text-input-wrap {
        display: block;
        position: relative;
        margin: 15px 0;
    }
    .text-input-wrap {
        label {
            position: absolute;
            top:0;left:0;
            font-size: 1.2rem;
            line-height: 2.4rem;
            transition: transform .3s ease-in-out;
        }
        input {
            outline: none;
            width: 100%;
            font-size: 1.2rem;
            height: 2.4rem;
            line-height: 2.4rem;
            border: none;
            box-sizing: border-box;
            border-bottom: 1px solid #E1E1E1;
            padding: 1px 1px 6px 5px;
            transition: border-bottom .3s, border-width .3s, border-color .1s;
        }
        input:hover, input:active {
            border-bottom: 1px solid #6B7881;
        }
        input:focus {
           border: none;
        }
        input:focus ~ label {
            transform: translate3d(-5px, -20px, 0) scale($scale);
        }
        .text-input-focus-line {
            width: 0;
            display: inline-block;
            transition: width .4s;
        }
        input:focus ~ .text-input-focus-line {
            width: 99.8%;
            height: 2px;
            border-bottom: 2px solid #3899EC;
        }
    }
</style>
