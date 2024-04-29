/**
 * author: @SimarCakmak
 * gh: @madmediaz2
 * 
 * it is a simple signature pad that allows you to draw a signature on a canvas element.
 * it supports both mouse and touch events.
 */


$(document).ready(function() {
    var canvas = $('#signature-pad')[0];
    var context = canvas.getContext('2d');
    var drawing = false;
    var lastPos = { x: 0, y: 0 };

    function getEventPosition(e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX || e.touches[0].clientX) - rect.left,
            y: (e.clientY || e.touches[0].clientY) - rect.top
        };
    }

    function startDrawing(e) {
        drawing = true;
        lastPos = getEventPosition(e);
        e.preventDefault(); // Prevent scrolling on touch devices
    }

    function draw(e) {
        if (drawing) {
            var newPos = getEventPosition(e);
            drawLine(lastPos.x, lastPos.y, newPos.x, newPos.y);
            lastPos = newPos;
        }
        e.preventDefault(); // Prevent scrolling and other unwanted gestures
    }

    function stopDrawing() {
        drawing = false;
    }

    function drawLine(x1, y1, x2, y2) {
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }

    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function saveSignature() {
        var dataURL = canvas.toDataURL('image/png');
        console.log(dataURL);  // Or send this data to a server
    }

    // Mouse events
    $(canvas).on('mousedown', startDrawing);
    $(canvas).on('mousemove', draw);
    $(canvas).on('mouseup mouseleave', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);

    // Button events
    $('#save-button').on('click', saveSignature);
    $('#clear-button').on('click', clearCanvas);
});

