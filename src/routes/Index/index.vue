<template >
    <div class = "main-wrap" :class = "device_type">
        <canvas id = "background" ref = "background"></canvas>
        <div class = "main-header">
            <nav>
                <a href = "https://github.com/fanhehe" target = "_black">Github</a>
                <router-link :to = "{name: 'about', path: 'about'}">About</router-link>
            </nav>
        </div>
        <div class = "main-content">
            <h1>Fanhehe</h1>
            <p>数是数以数的数。</p>
        </div>
        <div class = "main-footer"></div>
    </div>
</template>

<script >
import { deviceDetect } from '../../utils/';
export default {
    data: () => {
        return { msg: 'hehe' };
    },
    methods: {},
    computed: {
        device_type () {
            const deviceType = deviceDetect() || 'client';
            return `full-screen-${deviceType}`;
        }
    },
    mounted () {
        const canvas = this.$refs['background'];
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const w = canvas.width;
        const h = canvas.height;
        ctx.strokeStyle = 'rgba(174,194,224,0.5)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';

        var init = [];
        var maxParts = 1000;
        for (let a = 0; a < maxParts; a++) {
          init.push({
            x: Math.random() * w,
            y: Math.random() * h,
            l: Math.random() * 1,
            xs: -4 + Math.random() * 4 + 2,
            ys: Math.random() * 10 + 10
          });
        }
        var particles = [];
        for (var b = 0; b < maxParts; b++) {
            particles[b] = init[b];
        }

        function draw () {
          ctx.clearRect(0, 0, w, h);
          for (var c = 0; c < particles.length; c++) {
            var p = particles[c];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
            ctx.stroke();
          }
          move();
        }

        function move () {
          for (var b = 0; b < particles.length; b++) {
            var p = particles[b];
            p.x += p.xs;
            p.y += p.ys;
            if (p.x > w || p.y > h) {
              p.x = Math.random() * w;
              p.y = -20;
            }
          }
        }
    setInterval(draw, 30);
  }
};
</script>

<style lang = "sass" scoped>
    $leftSpace : 100px;

    html, body {
        padding: 0;
        margin: 0;
        font: 62.5% "Lucida Grande","Lucida Sans Unicode",Helvetica,Arial,Verdana,sans-serif;
    }
    ::selection {
        background: transparent;
    };
    .main-wrap {
        background: #212737 repeat;
        position: relative;
        
        #background {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
        }

        .main-header {
            display: block;
            margin: 30px 0;

            nav {
                text-align: right;
                a {
                    font-size: 1.6rem;
                    display: inline-block;
                    padding: 8px 16px;
                    border: 1px solid #fff;
                    text-decoration: none;
                    color: #fff;
                    cursor: pointer;
                    transition: border-color .5s ease-in-out;
                    margin-right: 1rem;
                    &:hover, &:focus {
                        border-color: red;
                        outline: none;
                    }
                }
            }
        }

        .main-content {
            color: #fff;
            position: absolute;
            display: block;


            h1 {
                font-size: 0;
                background: url("./assets/logo.png") no-repeat;
                background-size: contain;
                min-height: 3rem;
                line-height: 3rem;
            }

            p1 {}
        }

        .main-footer {

        }
    }
    .full-screen-mobile {
        background: #000000;
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
    }
</style>
