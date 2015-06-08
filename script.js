//node script for generating complex cartoCSS for torque
//as value increases, duration of marker gets longer, 
//radius gets larger, and color moves up the ramp.

//these are set manually, but could also be calculated based on the range
var breaks = [0,10,50,100]
//should be the same number of colors as breaks
var colors = ['#eff3ff','#bdd7e7','#6baed6','#2171b5'];

var data = {
  "tableName":"#mytable",
  "valueCondition":0,
  "numSteps":10,
  "startMarkerWidth":1,
  "endMarkerWidth":10,
  "startOpacity":1,
  "endOpacity":.1
};

var d = data;

for(var i=0;i<breaks.length;i++){
  d.valueCondition=breaks[i];
  //d.startMarkerWidth+=5;
  d.endMarkerWidth+=(3*i);
  //d.numSteps+=1; //can't have more than 10 offsets
  calc(i);
}

function calc(i) {
  //figure out the incremental steps for width and opacity for this iteration
  var widthDiff = (d.endMarkerWidth-d.startMarkerWidth) / (d.numSteps - 1);
  var opacityDiff = (d.endOpacity-d.startOpacity) / (d.numSteps - 1);

  //build out cartoCSS for each step
  for(var j=0;j<d.numSteps;j++) {
    //figure out marker width and opacity for this step
    var l = d.tableName
      + '[value>=' + d.valueCondition + ']';

    if(j>0) {
      l+= '[frame-offset=' + j + ']';
    } 

    l+= '{\n';
    if(j==0) {
      l+= 'marker-fill:' + colors[i] + ';\n';
    }
    var width = d.startMarkerWidth + (widthDiff * j);
    l+= '  marker-width: ' + width + ';\n';
    var opacity = d.startOpacity + (opacityDiff * j);
    l+= '  marker-fill-opacity: ' + opacity + ';\n';
    l+= '}'
    
    console.log(l);
  }
}