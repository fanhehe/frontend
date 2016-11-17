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
            <h1>Fan hehe</h1>
            <input type = "text" maxlength = "20" placeholder = "痕迹" tabindex="2" @keydown.13= "search" autofocus />
            <p>数是数以数的数。</p>
        </div>
        <div class = "main-footer">
            
        </div>
    </div>
</template>

<script >
import { deviceDetect } from '../../utils/';
export default {
    data: () => {
        return { msg: 'hehe' };
    },
    methods: {
        search (event) {
            const value = event.target.value.trim();
            let href = 'https://www.baidu.com/s?wd=';
            href = 'https://www.google.co.jp/#q=';
            location.href = `${href}${value}`;
        },
    },
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
            position: relative;
            z-index: 1;
            margin: 30px 0;

            nav {
                text-align: right;
                white-space: nowrap;
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
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            position: absolute;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            z-index: 0;

            color: #fff;

            h1, p {
                white-space: nowrap;

            }
            h1 {
                /*font-size: 0;*/
                /*background: url("./assets/logo.png") no-repeat;*/
                font-size: 3rem;
                background-size: contain;
                min-height: 3rem;
                line-height: 3rem;
            }
            
            input {
                background: transparent;
                padding: 10 10px;
                border: 1px solid rgba(255, 255, 255, .5);
                color: rgba(255, 255, 255, .5);
                width: 80%;
                max-width: 400px;
                outline: 0;

                &::selection {
                    background: green;
                }

                &:hover, &:focus {
                    display: block;

                }
            }
        }

        .main-footer {

        }
    }
    .full-screen-mobile {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
    }
    .full-screen-client {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
    }
</style>
