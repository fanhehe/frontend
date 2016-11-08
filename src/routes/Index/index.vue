<template >
    <div class = "main-wrap" :class = "device_type">
        <div class = "main-header"></div>
        <div class = "main-content"></div>
        <div class = "main-footer">
            <div class = "main-door"></div>
            <div class = "main-footer-step"></div>
        </div>
    </div>
</template>

<script >
export default {
    data: () => {
        return { msg: 'hehe' };
    },
    computed: {
        device_type () {
            const deviceType = 'client';
            switch (deviceType) {
                case 'client': return 'full-screen-client';
                case 'mobile': return 'full-screen-mobile';
                default: return 'full=screen-client';
            }
        }
    }
};
</script>

<style lang = "sass" scoped>
    $leftSpace : 100px;

    html, body {
        padding: 0;
        margin: 0;
    }
    .main-wrap {
        background: #212737;
    }
    .full-screen-client {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
    }
    .full-screen-client .main-footer {
        bottom: 2rem;
    }

    .full-screen-client:after{
        /*content: ".";*/
        font-size: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        background: linear-gradient(to right bottom, 50% #1F2535, 75% transparent, 100% #212737);
        filter: blur(400px);
    }
    .main-footer {
        display: block;
        width: 100%;
        height: 4rem;
        position: absolute;
        bottom: 0;
        background-color:#393031;
        z-index: 1;
        
        .main-footer-step {
            display: block;
            width:100%;
            height: 70%;
            position: absolute;
            top: 0;
            background: #5E5453;
        }
        .main-door {
            
        }
        .main-footer-step:after {
            content: ".";
            font-size: 0;
            display: block;
            width: 40%;
            position: absolute;
            left: $leftSpace;
            clip-path: polygon(5% 0, 95% 0, 100% 100%, 0 100%);
            background-color: #393031;
            height: 100%;
        }

    }
</style>
