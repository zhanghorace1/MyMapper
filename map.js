mapboxgl.accessToken = 'pk.eyJ1Ijoiemhhbmdob3JhY2UiLCJhIjoiY2tkeXI5cGl3MWU5bTJ5b2dtNDFydzkxaiJ9.OTcfVLUmtpYwzulo8NdQ4Q';

// New instance of map with population density style
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/zhanghorace/ckjq5bokc1qff19pjvqqv1m37', // stylesheet location
  center: [-100, 37], // starting position [lng, lat]
  zoom: 3.5 // starting zoom
});

// on load...populate legend (lower right corner) with data
map.on('load', function () {
  var layers = ['0-10', '10-20', '20-50', '50-100', '100-200', '200-500', '500-1000', '1000+'];
  var colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];

  for (i = 0; i < layers.length; i++) {
    var layer = layers[i];
    var color = colors[i];
    var item = document.createElement('div');
    var key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    var value = document.createElement('span');
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }
});

// on mouseover...display state's population density in ledgend
map.on('mousemove', function (e) {
  var states = map.queryRenderedFeatures(e.point, {
    layers: ['statedata']
  });

  if (states.length > 0) {
    document.getElementById('pd').innerHTML = '<h3><strong>' + states[0].properties.name + '</strong></h3><p><strong><em>' + states[0].properties.density + '</strong> people per square mile</em></p>';
  } else {
    document.getElementById('pd').innerHTML = '<p>Hover over a state!</p>';
  }
});

// give the map a default pointer cursor
map.getCanvas().style.cursor = 'default';

// set bounds of the map on load
map.fitBounds([[-133.2421875, 16.972741], [-47.63671875, 52.696361]]);
