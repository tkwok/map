/* TODO - Refactor me */

(function() {
  let imageElement = null,
  xImageElement = null,
  yImageElement = null,
  defaultMapWidth = null,
  defaultMapHeight = null;

  let mapElement = document.getElementById('map-drag-container');
  let zoominInputElement = document.getElementById('zoomin')


  let mapElementObject = {
    xDefaultPos: null,
    yDefaultPos: null,
    xCurrentPos: null,
    yCurrentPos: null
  };

  // run code as soon as window loads after all elements rendered
  window.onload = function() {
      let map = document.getElementById('map-drag-container');
      defaultMapWidth = map.clientWidth;
      defaultMapHeight = map.clientHeight;

      drawDots();
  };

  function zoomAction(zoomIncrement) {
      let imageElement = document.getElementById('map-drag-image');

    var preWidth = imageElement.getBoundingClientRect().width,
       preHeight = imageElement.getBoundingClientRect().height;

       var newWidth = (preWidth * zoomIncrement);


    if (newWidth <= defaultMapWidth) {
        console.log("NO");

        document.getElementById('zoomin').disabled = true;
    } else {
        document.getElementById('zoomin').disabled = false;

        imageElement.style.width = (preWidth * zoomIncrement) + 'px';
        imageElement.style.height = (preHeight * zoomIncrement) + 'px';
    }
    //   imageElement.style.width = newWidth + 'px';
    //   imageElement.style.height = (preHeight * zoomIncrement) + 'px';
    // }


    console.log(imageElement.style.width + ":" + imageElement.style.height);

    imageElement = null;
  }

  // zoom control event listeners
  document.getElementById('zoomin').addEventListener('click', function() {
    zoomAction(0.5);
  });

  document.getElementById('zoomout').addEventListener('click', function() {
    zoomAction(1.5);
  });

  function startDrag() {
    imageElement = this;

    xImageElement = window.event.clientX - document.getElementById('map-drag-container').offsetLeft;
    yImageElement = window.event.clientY - document.getElementById('map-drag-container').offsetTop;
    console.log("start drag");
  }

  function stopDrag() {
    imageElement = null;
    console.log("stop drag");
  }

  function whileDrag() {
    var xPositionCursor = window.event.clientX;
    var yPositionCursor = window.event.clientY;

    var pinElement = document.getElementById("pin");


    if (imageElement !== null) {
      imageElement.style.left = (xPositionCursor - xImageElement) + 'px';
      imageElement.style.top = ( window.event.clientY - yImageElement ) + 'px';

      pinElement.style.position = "absolute";
      pinElement.style.left = imageElement.style.left;
      pinElement.style.top = imageElement.style.top;

      console.log("x: " + imageElement.style.left + " y: " +  imageElement.style.top);
    }
  }

  // draw a location dot
  function drawDots() {  
    console.log('draw dot');
  }

  // drag-drop control event listeners
  document.getElementById('map-drag-container').addEventListener('mousedown', startDrag);
  document.getElementById('container').addEventListener('mousemove', whileDrag);
  document.getElementById('container').addEventListener('mouseup', stopDrag);
  document.getElementById('container').addEventListener('mouseout', stopDrag);

})();
