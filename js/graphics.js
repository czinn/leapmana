var Renderer = (function() {
  var canvas = null;
  var game = null;
  var spells = [];

  // Colors
  var COLOR_BG = "#333";
  var COLOR_HP_BAR = "#a00";

  window.addEventListener('resize', resizeCanvas, false);

  function drawFireball(g) {
    // Draw a red circle
    g.beginPath();
    g.arc(canvas.width/2, canvas.height/2, 20, 0, 2*Math.PI);
    g.fillStyle = "#f51";
    g.fill();
  }

  function render() {
    // Called every frame to render graphics.
    var g = canvas.getContext('2d');

    // Fill entire frame with bg color
    g.beginPath();
    g.rect(0, 0, canvas.width, canvas.height);
    g.fillStyle = COLOR_BG;
    g.fill();

    // Player 1 health
    var w = canvas.width/2-10;
    g.beginPath();
    g.rect(0, 0, w, 20);
    g.fillStyle = COLOR_HP_BAR;
    g.fill();

    // Player 2 health
    var w = canvas.width/2-10;
    g.beginPath();
    g.rect(canvas.width - w, 0, w, 20);
    g.fillStyle = COLOR_HP_BAR;
    g.fill();

    // Draw a blue circle in the center
    g.beginPath();
    g.arc(canvas.width/2, canvas.height/2, 20, 0, 2*Math.PI);
    g.fillStyle = "#89f";
    g.fill();
  }
  function resizeCanvas() {
    // Called whenever the window is resized.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight-50;
  }
  function initGraphics(game) {
    // Called when the document is loaded.
    canvas = document.getElementById('game_canvas');
    game = game;
    resizeCanvas();
    setInterval(render, 30);
  }
  return initGraphics;
})();

//$(document).ready(function() {Renderer({})});