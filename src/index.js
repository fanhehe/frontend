import Vue from 'vue';
import App from './container/App.vue';

new Vue({
    el: 'body',
    data: ()=> {
        return {
            message: 'fanhehe'
        }
    },
    components: { App }
});
