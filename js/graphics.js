var Renderer = (function() {
  var canvas = null;
  var game = null;
  var spells = [];

  // colours
  var COLOUR_BG = "#333";
  var COLOUR_HP_BAR = "#a00";
  var COLOUR_HP_GONE = "#bbb";

  window.addEventListener('resize', resizeCanvas, false);

  function drawFireball(g, x, y) {
    // Draw a red circle
    g.beginPath();
    g.arc(x, y, 80, 0, 2*Math.PI);
    g.fillStyle = "#f51";
    g.fill();
  }
  function drawMagicMissile(g, x, y) {
    // Draw a blue circle
    g.beginPath();
    g.arc(x, y, 30, 0, 2*Math.PI);
    g.fillStyle = "#68a";
    g.fill();
  }
  function drawPoison(g, x, y) {
    g.beginPath();
    g.arc(x, y, 65, 0, 2*Math.PI);
    g.fillStyle = "#3c2";
    g.fill();
  }
  function drawHeal(g, x, y, completion) {
    g.beginPath();
    g.arc(x, y, 350*completion, 0, 2*Math.PI);
    g.fillStyle = "rgba(170, 248, 210, " + ((1-completion)*(1-completion)) + ")";
    g.fill();
  }

  function drawSpell (g, xstart, xdir, spelly, spell) {
    timeDelta = new Date().getTime() - spell.timestamp;
    if (timeDelta < 500) {
      if (spell.type === "MAGICMISSILE") {
        drawMagicMissile(g, xstart+(xdir*Math.pow(timeDelta / 500, 2)), spelly);
      } else if (spell.type === "FIREBALL") {
         drawFireball(g, xstart+(xdir*Math.pow(timeDelta / 500, 1.5)), spelly);
      } else if (spell.type === "POISON") {
        drawPoison(g, xstart+(xdir*Math.pow(timeDelta / 500, 1.3)), spelly);
      } else if (spell.type == "HEAL") {
        drawHeal(g, xstart+(xdir*0.1), spelly, timeDelta / 500);
      }
    }
  }

  function render() {
    // Called every frame to render graphics.
    var g = canvas.getContext('2d');

    // Fill entire frame with bg colour
    g.beginPath();
    g.rect(0, 0, canvas.width, canvas.height);
    g.fillStyle = COLOUR_BG;
    g.fill();

    // Health bars
    var max_hp_bar_width = canvas.width/2-10;

    // Player 1 health
    var hp = game.playerLeft.health;
    var w = max_hp_bar_width * (hp/Player.MAX_HEALTH);
    g.beginPath();
    g.rect(0, 0, w, 20);
    g.fillStyle = COLOUR_HP_BAR;
    g.fill();

    // Player 2 health
    var hp = game.playerRight.health;
    var w = max_hp_bar_width * (hp/Player.MAX_HEALTH);
    g.beginPath();
    g.rect(canvas.width - w, 0, w, 20);
    g.fillStyle = COLOUR_HP_BAR;
    g.fill();

    var players = [game.playerLeft, game.playerRight];
    for (var pid=0; pid<=1; pid++) {
      var p = players[pid];

      // If player 2, offset by half the canvas width.
      var xofs = (pid * canvas.width / 2 + 30);
      // x-coord that spell effects start at
      var xstart = canvas.width/2 + canvas.width/2*1.1*(pid*2-1);
      // Total x-movement of spell effects
      var xdir = canvas.width*(-pid*2+1)*1.2;
      // y-coordinate of most spell effects
      var spelly = 300;

      // Log of recent gestures
      var str = "";
      p.gestureHistory.forEach (function (gesture, i) {
        if (i+1 >= p.gestureHistory.length) {
          str += gesture.type + " ";
        }
      });
      g.font = "24px sans";
      g.fillStyle = "#ff0";
      g.fillText(str, 20+xofs, 60);

      // Spells
      var str = "";
      p.spellHistory.forEach (function (spell, i) {
        drawSpell(g, xstart, xdir, spelly, spell);

        if (timeDelta < 500) {
          str += spell.type + " ";
        }
      });
      g.font = "24px sans";
      g.fillStyle = "#ff0";
      g.fillText(str, 20+xofs, 120);

      // Defense
      if (p.defense === "SHIELD") {
        g.fillText("Shield!", 20+xofs, 180);
      }
      else if (p.defense === "GREATERSHIELD") {
        g.fillText("Greater shield!", 20+xofs, 180);
      }
      else if (p.defense !== "NONE") {
        g.fillText(p.defense, 20+xofs, 180);
      }

      // Augment
      if (p.augmentSpell) {
        g.fillText("Augment!", 20+xofs, 500);
      }
    }
  }
  function resizeCanvas() {
    // Called whenever the window is resized.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  function initGraphics(g) {
    // Called when the document is loaded.
    canvas = document.getElementById('game_canvas');
    game = g;
    resizeCanvas();
    setInterval(render, 17);
  }
  return initGraphics;
})();

//$(document).ready(function() {Renderer({})});
