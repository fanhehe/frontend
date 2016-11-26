<template>
  <div class = "wrap">
  	<div class="container">
  	  <div class="night-sky"></div>
  	  <div class="stars"></div>
  	  <div class="stars2"></div>
  	  <div class="stars3"></div>
  	  <div class="mountains">
  	    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" preserveAspectRatio="xMaxYMin meet" viewbox="0 0 110 160">
  	      <!-- Where the magic happens -->
  	      <defs>
  	        <polygon id="tall"
  	                 points="0,100 100,0 200,100"
  	                 stroke-linejoin="round"
  	                 stroke-linecap="round"
  	                 stroke="#311B46" stroke-width="5"
  	                 fill="#311B46" />

  	        <polygon id="long"
  	                 points="0,70 80,0 160,70"
  	                 stroke-linejoin="round"
  	                 stroke-linecap="round"
  	                 stroke="#963D5A" stroke-width="5"
  	                 fill="#963D5A" />

  	        <polygon id="short"
  	                 points="0,100 80,0 160,100"
  	                 stroke-linejoin="round"
  	                 stroke-linecap="round"
  	                 stroke="#FFA987" stroke-width="5"
  	                 fill="#FFA987" />

  	        <g id="mountain-range">
  	          <use xlink:href="#tall" x="-220" y="30"/>
  	          <use xlink:href="#tall" x="-180" y="40"/>
  	          <use xlink:href="#tall" x="-100" y="60"/>
  	          <use xlink:href="#tall" x="0" y="40"/>
  	          <use xlink:href="#tall" x="90" y="20"/>
  	          <use xlink:href="#tall" x="150" y="50"/>

  	          <use xlink:href="#long" x="-180" y="60"/>
  	          <use xlink:href="#long" x="-150" y="70"/>
  	          <use xlink:href="#long" x="-70" y="65"/>
  	          <use xlink:href="#long" x="20" y="70"/>
  	          <use xlink:href="#long" x="90" y="60"/>
  	          <use xlink:href="#long" x="180" y="50"/>

  	          <use xlink:href="#short" x="-160" y="90"/>
  	          <use xlink:href="#short" x="-110" y="70"/>
  	          <use xlink:href="#short" x="100" y="90"/>
  	        </g>
  	      </defs>

  	      <use xlink:href="#mountain-range" x="-100%" y="55"/>
  	      <use xlink:href="#mountain-range" x="-500%" y="55"/>
  	      <use xlink:href="#mountain-range" x="-760%" y="45"/>
  	      <use xlink:href="#mountain-range" x="-1000%" y="45"/>
  	      <use xlink:href="#mountain-range" x="-1500%" y="55"/>
  	      <use xlink:href="#mountain-range" x="-1760%" y="45"/>
  	      <use xlink:href="#mountain-range" x="-2250%" y="45"/>
  	      <use xlink:href="#mountain-range" x="-2700%" y="55"/>
  	    </svg>
  	  </div>
  	</div>
    <div class = "main-container">
      <div class = "slider" id = "slider1">
        <div>Fan hehe</div>
        
      </div>
      <div class = "slider" id = "slider2">3</div>
      <div class = "slider" id = "slider3">4</div>
      <div class = "slider" id = "slider4">5</div>
      <div class = "slider" id = "slider5">6</div>
      <div class = "slider" id = "slider6">7</div>
      <div class = "slider" id = "slider7">8</div>
      <div class = "slider" id = "slider8">9</div>
      <div class = "slider" id = "slider9">0</div>
    </div>
    <div class = "sidebar"></div>
  </div>
</template>

<script>
  export default {
  };
</script>

<style lang = "sass">

$starFieldWidth: 2560;
$starFieldHeight: 2000;
$starStartOffset: 600px;

$starOneScrollDuration: 75s;
$starTwoScrollDuration: 125s;
$starThreeScrollDuration: 175s;
$numStarOneStars: 1700;
$numStarTwoStars: 700;
$numStarThreeStars: 200;


$width: 100%;

html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
}
.wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.container { 
  z-index: -1;
  position: fixed;
  width: 100%; 
  height: 100%; 
}
.mountains { 
  position: absolute;
  width: $width;
  height: 40%;
  bottom: 0;
  z-index: 20;
  overflow: hidden;
  
  svg {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
}

.night-sky {
  position: relative;
  height: 100%;
  margin: 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background: linear-gradient(to bottom, #020107 0%, #311B46 50%, #592C67 60%, #803E7E 75%, #CA759C 90%, #EC9D9D 95%, #C35E4D 100%);
  &:before {
    height: 100%;
    width: 100%;
    content: ' ';
    position: absolute;
    top: 0;
    /* http://bg.siteorigin.com/ */
    background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/424395/night-sky-texture.png');
    opacity: .1;
  }
}

// n is number of stars required
@function multiple-box-shadow ($n) {
  // First star
  $stars: "#{random($starFieldWidth)}px #{random($starFieldHeight)}px #FFF";
  
  @for $i from 2 through $n {
    // Iterate through and append stars to string
    $stars: "#{$stars} , #{random($starFieldWidth)}px #{random($starFieldHeight)}px #FFF";
  }
  
  // Return all generated stars
  @return unquote($stars);
}


@mixin star-template($numStars, $starSize, $scrollSpeed) 
{  
  z-index: 10;
  width: $starSize;
  height: $starSize;
  background: transparent;
  box-shadow: multiple-box-shadow($numStars);
  animation: animStar $scrollSpeed linear infinite;
  
  &:after
  {
    content: " ";
    top: -$starStartOffset;
    width: $starSize;
    height: $starSize;
    position: absolute;
    background: transparent;
    box-shadow: multiple-box-shadow($numStars);
  }
}

.stars { @include star-template($numStarOneStars, 1px, $starOneScrollDuration); }
.stars2 { @include star-template($numStarTwoStars, 2px, $starTwoScrollDuration); }
.stars3 { @include star-template($numStarThreeStars, 3px, $starThreeScrollDuration); }

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-#{$starFieldHeight}px);
  }
}

.main-container {
  width: 100%;
  height: 100%;

  .slider {
    color: #ffffff;
    width: 100%;
    height: 100%;
  }
}
</style>
