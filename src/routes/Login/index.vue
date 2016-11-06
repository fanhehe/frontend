<template>
    <section>
        <i class = "app-icon"></i>
        <div class = "login-header">
            <p> Sign up </p>
            <p> Already have a account? <a href = "#">Login</a></p>
        </div>
        <div class = "login-form">
            <TextInput type = "text" placeholder = "手机号" />
            <TextInput type = "password" placeholder = "密码" />
        </div>
    </section>
</template>

<script>
    import cx from 'classnames';
    import TextInput from '../../components/TextInput';

    export default {
        data: ()=> {
            return {
                name: 'sssssiis'
            }
        },
        methods: {
            changed: function () {
                concole.log(this.$refs);
            }
        },
        components: {
            TextInput,
        }
    }

</script>
<style lang = "sass"></style>
