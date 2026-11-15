/* ============================================================
   THE THINGS WE LEFT BEHIND — minigames.js
   Ten real interactive activities. Mouse + keyboard.
   ============================================================ */
'use strict';
(function (TL) {

  var MG = {
    active: null, id: null, cfg: null, cb: null,
    t: 0, msg: null, msgT: 0, msgColor: '#f0a050',
    success: false, successT: 0,
    game: null
  };
  TL.MG = MG;

  /* ---------- wave sounds (used by quake minigame) ---------- */
  TL.audio.playWave = function (kind) {
    var A = TL.audio;
    if (!A.ready) return;
    var c = A.ctx, t = c.currentTime, dur = 2.6;
    if (kind === 'wind') {
      var buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate), d = buf.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1);
      var s = c.createBufferSource(); s.buffer = buf;
      var f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 500; f.Q.value = 0.8;
      var g = c.createGain(); g.gain.value = 0.0001;
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.5);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      s.connect(f); f.connect(g); g.connect(A.sfxG); s.start(t);
      var lfo = c.createOscillator(); lfo.frequency.value = 1.7;
      var lg = c.createGain(); lg.gain.value = 220; lfo.connect(lg); lg.connect(f.frequency); lfo.start(t); lfo.stop(t + dur);
    } else if (kind === 'quake') {
      [42, 84, 126].forEach(function (fq, i) {
        var o = c.createOscillator(), g = c.createGain();
        o.type = 'sine'; o.frequency.value = fq;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.16 / (i + 1), t + 1.1);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(A.sfxG); o.start(t); o.stop(t + dur + 0.1);
      });
    } else {
      A.static(dur, 0.04);
    }
  };

  /* ---------- helpers ---------- */
  /* ---------- per-instrument identity (draw-only chrome) ---------- */
  var THEMES = {
    rock_scan:     { ac: '#f0a050', tag: 'APXS SPECTROMETER', sub: 'SOJOURNER · ARES VALLIS · 1997' },
    spirit_layers: { ac: '#7ef0c8', tag: 'STRATIGRAPHIC LOG', sub: 'SPIRIT · GUSEV CRATER · 2004' },
    spirit_route:  { ac: '#7ef0c8', tag: 'MOBILITY COMPUTER', sub: 'SPIRIT · GUSEV CRATER · 2004' },
    oppy_order:    { ac: '#59c8f0', tag: 'JOURNEY LOG BAY', sub: 'OPPORTUNITY · MERIDIANI · 2004' },
    oppy_route:    { ac: '#59c8f0', tag: 'TRAVERSE NAV UNIT', sub: 'OPPORTUNITY · MERIDIANI · 2004' },
    viking1_data:  { ac: '#e8c060', tag: 'LR · LABELED RELEASE', sub: 'VIKING 1 · CHRYSE PLANITIA · 1976' },
    viking2_data:  { ac: '#c86a8a', tag: 'GCMS OVEN SEQUENCE', sub: 'VIKING 2 · UTOPIA PLANITIA · 1976' },
    ice_dig:       { ac: '#9ad0e8', tag: 'THERMAL EVOLUTION PROBE', sub: 'PHOENIX · VASTITAS BOREALIS · 2008' },
    quake_listen:  { ac: '#a88ad0', tag: 'SEISMIC ARCHIVE TERMINAL', sub: 'INSIGHT · ELYSIUM PLANITIA · 2018' },
    flight:        { ac: '#7ef0c8', tag: 'ROTOR TELEMETRY UNIT', sub: 'INGENUITY · JEZERO CRATER · 2021' },
    drill:         { ac: '#f0a050', tag: 'SAMPLE SEAL ARM', sub: 'PERSEVERANCE · JEZERO CRATER · 2021' },
    laser:         { ac: '#ff9060', tag: 'CHEMCAM TARGETING SUITE', sub: 'CURIOSITY · GALE CRATER · 2012' },
    mosaic:        { ac: '#59c8f0', tag: 'FRAME DECODER', sub: 'MARINER 4 · DEEP SPACE · 1965' },
    final_tx:      { ac: '#7ef0c8', tag: 'TRANSMISSION ASSEMBLY', sub: 'MAI TEAM · DX-7 SEEKER' }
  };

  function frame(ctx, title, prompt) {
    var th = THEMES[MG.id] || { ac: '#7ef0c8', tag: 'FIELD INSTRUMENT', sub: 'MAI TEAM · DX-7' };
    var ac = th.ac;
    /* deep-space grid background, tinted per instrument */
    ctx.fillStyle = '#030d12';
    ctx.fillRect(0, 0, TL.W, TL.H);
    ctx.save(); ctx.globalAlpha = 0.07; ctx.strokeStyle = ac; ctx.lineWidth = 1;
    for (var x = 0; x < TL.W; x += 48) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, TL.H); ctx.stroke(); }
    for (var y = 0; y < TL.H; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(TL.W, y); ctx.stroke(); }
    ctx.restore();
    /* side chassis rails */
    ctx.fillStyle = '#10161c'; ctx.fillRect(0, 0, 22, TL.H); ctx.fillRect(TL.W - 22, 0, 22, TL.H);
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(20, 0, 2, TL.H); ctx.fillRect(TL.W - 22, 0, 2, TL.H);
    ctx.fillStyle = '#3a4048';
    ctx.fillRect(8, 100, 5, 5); ctx.fillRect(8, TL.H - 108, 5, 5);
    ctx.fillRect(TL.W - 14, 100, 5, 5); ctx.fillRect(TL.W - 14, TL.H - 108, 5, 5);
    /* top instrument bezel */
    ctx.fillStyle = '#0a1016'; ctx.fillRect(0, 0, TL.W, 86);
    ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(0, 82, TL.W, 2);
    ctx.globalAlpha = 0.7; ctx.fillStyle = ac; ctx.fillRect(0, 84, TL.W, 2); ctx.globalAlpha = 1;
    /* instrument tag chip */
    ctx.save();
    ctx.font = TL.font(TL.effSize(6));
    var tw = Math.ceil(ctx.measureText(th.tag).width) + 20;
    ctx.restore();
    ctx.fillStyle = 'rgba(16,28,34,0.95)'; ctx.fillRect(34, 8, tw, 14);
    ctx.strokeStyle = ac; ctx.lineWidth = 1; ctx.strokeRect(34.5, 8.5, tw - 1, 13);
    TL.text(ctx, th.tag, 42, 11, 6, ac);
    /* title + prompt */
    var titleSize = 11;
    while (TL.wrap(ctx, title, TL.W - 300, titleSize).length > 1) titleSize--;
    TL.text(ctx, title, 48, 30, titleSize, ac);
    var promptLines = TL.wrap(ctx, prompt, TL.W - 96, 8);
    for (var p = 0; p < promptLines.length; p++) {
      TL.text(ctx, promptLines[p], 48, 51 + p * 13, 8, '#9fd8c8');
    }
    /* single calm, static status line — no LEDs, no dial, no blinker */
    TL.text(ctx, 'SYS NOMINAL', TL.W - 26, 11, 6, 'rgba(126,240,200,0.55)', 'right');
    TL.text(ctx, th.sub, TL.W - 26, 32, 6, '#7ab8a8', 'right');
  }

  function button(ctx, x, y, w, h, label, hot, active) {
    var hovered = TL.mouse.x >= x && TL.mouse.x <= x + w && TL.mouse.y >= y && TL.mouse.y <= y + h;
    TL.panel(ctx, x, y, w, h, { bg: active ? 'rgba(20,60,56,0.95)' : 'rgba(8,22,28,0.92)', corner: active || hovered ? '#7ef0c8' : '#3a7a6a' });
    TL.text(ctx, label, x + w / 2, y + h / 2 - 5, 9, active ? '#aef0dd' : (hovered ? '#c8f0e4' : '#7ab8a8'), 'center');
    return { hovered: hovered, clicked: hovered && TL.mouse.clicked };
  }

  function shuffle(arr, rnd) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor((rnd ? rnd() : Math.random()) * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ================= BUILDERS ================= */
  var builders = {};

  /* ---- A. ROCK SCAN (Sojourner) ---- */
  builders.scan = function (cfg) {
    var g = {
      scanned: [false, false, false, false],
      sel: -1,
      update: function (dt) {
        for (var i = 0; i < 4; i++) {
          if (TL.hit(String(i + 1))) { g.scanned[i] = true; g.sel = i; TL.audio.blip(900 + i * 120, 0.06, 0.1); }
        }
        var bx = 80, by = 170, cw = 190, ch = 170;
        for (var r = 0; r < 4; r++) {
          var x = bx + r * (cw + 18);
          var hov = TL.mouse.x >= x && TL.mouse.x <= x + cw && TL.mouse.y >= by && TL.mouse.y <= by + ch;
          if (hov && TL.mouse.clicked) { g.scanned[r] = true; g.sel = r; TL.audio.blip(900 + r * 120, 0.06, 0.1); }
        }
        if (g.sel >= 0 && g.scanned[g.sel] && (TL.hit('e') || TL.hit('enter'))) g.try();
      },
      try: function () {
        var rock = cfg.rocks[g.sel];
        if (rock.wet) { MG.win(); }
        else { MG.fail('Not water-weathered. Look for ROUND shapes and LAYERING with clay alteration.'); TL.audio.deny(); }
      },
      draw: function (ctx) {
        frame(ctx, cfg.title, cfg.prompt);
        var bx = 80, by = 170, cw = 190, ch = 170;
        var names = ['BARNACLE BILL?', 'GERALD?', 'YOGI?', 'MOE?'];
        for (var r = 0; r < 4; r++) {
          var x = bx + r * (cw + 18);
          var rock = cfg.rocks[r];
          var hov = TL.mouse.x >= x && TL.mouse.x <= x + cw && TL.mouse.y >= by && TL.mouse.y <= by + ch;
          TL.panel(ctx, x, by, cw, ch, { bg: 'rgba(10,26,32,0.9)', corner: (g.sel === r) ? '#f0a050' : hov ? '#7ef0c8' : '#3a7a6a' });
          /* sample tray header strip */
          ctx.fillStyle = g.scanned[r] ? 'rgba(240,160,80,0.14)' : 'rgba(255,255,255,0.03)';
          ctx.fillRect(x + 1, by + 1, cw - 2, 13);
          TL.text(ctx, 'SAMPLE ' + (r + 1) + '/4', x + 8, by + 4, 6, g.scanned[r] ? '#f0a050' : '#5a8a7a');
          /* draw rock pixel art */
          ctx.save(); ctx.translate(x + cw / 2, by + 52);
          ctx.fillStyle = '#7d4a30';
          ctx.beginPath();
          if (r === 1) { ctx.ellipse(0, 0, 34, 22, 0, 0, Math.PI * 2); ctx.fill(); }
          else { ctx.moveTo(-28, 14); ctx.lineTo(-18, -14); ctx.lineTo(6, -20); ctx.lineTo(24, -4); ctx.lineTo(28, 14); ctx.closePath(); ctx.fill(); }
          ctx.fillStyle = '#b0784a';
          if (r === 1) { ctx.beginPath(); ctx.ellipse(-6, -6, 16, 9, 0, 0, Math.PI * 2); ctx.fill(); }
          else ctx.fillRect(-14, -14, 14, 8);
          if (r === 1) { /* layering */
            ctx.fillStyle = '#8a5a38';
            for (var L = 0; L < 3; L++) ctx.fillRect(-24, -4 + L * 8, 48, 2);
          }
          ctx.restore();
          TL.text(ctx, names[r], x + 10, by + 92, 8, '#d8b25a');
          TL.text(ctx, g.scanned[r] ? '[SCANNED]' : 'CLICK TO SCAN', x + 10, by + 110, 7, g.scanned[r] ? '#7ef0c8' : '#5a8a7a');
          TL.text(ctx, 'SPECTRUM:', x + 10, by + 128, 7, '#9fd8c8');
          for (var b = 0; b < 4; b++) {
            var pct = g.scanned[r] ? rock.bars[b] : 0.04;
            TL.bar(ctx, x + 78, by + 128 + b * 9, cw - 92, 6, pct, ['#7ef0c8', '#59c8f0', '#f0a050', '#c86a8a'][b]);
          }
        }
        /* readout panel */
        var ry = 360;
        TL.panel(ctx, 80, ry, TL.W - 160, 120, {});
        if (g.sel >= 0 && g.scanned[g.sel]) {
          var rock = cfg.rocks[g.sel];
          TL.text(ctx, cfg.rocks[g.sel].name + ' — APXS READOUT', 100, ry + 14, 9, '#59c8f0');
          var lines = TL.wrap(ctx, rock.desc, TL.W - 260, 8);
          for (var i2 = 0; i2 < lines.length; i2++) TL.text(ctx, lines[i2], 100, ry + 38 + i2 * 14, 8, '#c8e8dc');
          TL.text(ctx, 'Press E / ENTER to submit this rock as WATER-ALTERED', 100, ry + 96, 8, '#f0a050');
        } else {
          TL.text(ctx, 'Scan a rock (click or keys 1-4). Sojourner is watching with great excitement.', 100, ry + 18, 8, '#9fd8c8');
          TL.text(ctx, 'WATER-ALTERED ROCKS: rounded, layered, chemically weathered. Wind does not make clay.', 100, ry + 40, 8, '#6a9a8a');
          TL.text(ctx, 'APXS = Alpha-Particle X-ray Spectrometer. It reads rock chemistry without touching a sample.', 100, ry + 62, 8, '#6a9a8a');
        }
      }
    };
    return g;
  };

  /* ---- B. ORDER / SIGNAL RECONSTRUCTION ---- */
  builders.order = function (cfg) {
    var rnd = TL.RNG((Math.random() * 1e9) | 0);
    var chips = [];
    var fails = 0;
    function hintText() {
      if (!cfg.hints || !cfg.hints.length) return '';
      return cfg.hints[Math.min(fails - 1, cfg.hints.length - 1)];
    }
    cfg.order.forEach(function (k, i) {
      var label = cfg.labels ? cfg.labels[k] : null;
      var title, sub;
      if (cfg.id === 'final_tx' || !label) {
        var fr = TL.D.FRAGS[k];
        title = TL.D.CHARS[k] ? TL.D.CHARS[k].name : k.toUpperCase();
        sub = fr ? fr.label : '';
      } else {
        title = k.toUpperCase();
        sub = label;
      }
      chips.push({ key: k, title: title, sub: sub });
    });
    do { chips = shuffle(chips, rnd); } while (isSolved() && chips.length > 1);
    var selIdx = -1;
    function isSolved() {
      for (var i = 0; i < cfg.order.length; i++) if (chips[i].key !== cfg.order[i]) return false;
      return true;
    }
    var cols = chips.length <= 4 ? 2 : chips.length <= 6 ? 3 : 4;
    var rows = Math.ceil(chips.length / cols);
    var cw = Math.min(200, (TL.W - 160) / cols - 10), ch = chips.length <= 4 ? 96 : 86;
    var gx = (TL.W - (cols * (cw + 12) - 12)) / 2, gy = 140;
    var g = {
      update: function (dt) {
        for (var i = 0; i < chips.length; i++) {
          var cxx = gx + (i % cols) * (cw + 12), cyy = gy + Math.floor(i / cols) * (ch + 12);
          if (TL.mouse.x >= cxx && TL.mouse.x <= cxx + cw && TL.mouse.y >= cyy && TL.mouse.y <= cyy + ch && TL.mouse.clicked) {
            TL.audio.ui();
            if (selIdx === -1) selIdx = i;
            else if (selIdx === i) selIdx = -1;
            else {
              var t = chips[selIdx]; chips[selIdx] = chips[i]; chips[i] = t;
              TL.audio.blip(660, 0.06, 0.08);
              selIdx = -1;
            }
          }
        }
        var bw = 200, bxx = TL.W / 2 - bw / 2, byy = TL.H - 74;
        if (TL.mouse.x >= bxx && TL.mouse.x <= bxx + bw && TL.mouse.y >= byy && TL.mouse.y <= byy + 40 && TL.mouse.clicked) g.confirm();
        if (TL.hit('e') || TL.hit('enter')) g.confirm();
      },
      confirm: function () {
        if (isSolved()) MG.win();
        else {
          fails++;
          var msg = 'Sequence rejected. Chronology matters — oldest voice first.';
          if (fails > 0 && hintText()) msg += '  HINT: ' + hintText();
          MG.fail(msg);
          TL.audio.deny();
        }
      },
      draw: function (ctx) {
        frame(ctx, cfg.title, cfg.prompt);
        for (var i = 0; i < chips.length; i++) {
          var cxx = gx + (i % cols) * (cw + 12), cyy = gy + Math.floor(i / cols) * (ch + 12);
          var hov = TL.mouse.x >= cxx && TL.mouse.x <= cxx + cw && TL.mouse.y >= cyy && TL.mouse.y <= cyy + ch;
          TL.panel(ctx, cxx, cyy, cw, ch, { bg: 'rgba(10,26,32,0.92)', corner: selIdx === i ? '#f0a050' : hov ? '#7ef0c8' : '#3a7a6a' });
          TL.text(ctx, (i + 1) + '.', cxx + 8, cyy + 8, 8, '#5a8a7a');
          TL.text(ctx, chips[i].title, cxx + 42, cyy + 8, 9, '#d8b25a');
          var lines = TL.wrap(ctx, chips[i].sub, cw - 20, 7);
          for (var L = 0; L < Math.min(lines.length, 4); L++) {
            TL.text(ctx, lines[L], cxx + 8, cyy + 26 + L * 12, 7, '#9fd8c8');
          }
        }
        var bw = 200, bxx = TL.W / 2 - bw / 2, byy = TL.H - 74;
        var ok = isSolved();
        button(ctx, bxx, byy, bw, 40, ok ? '▶ TRANSMIT' : 'CONFIRM ORDER [E]', false, ok);
        /* persistent hint after a wrong answer */
        if (fails > 0 && hintText()) {
          var hLines = TL.wrap(ctx, 'HINT: ' + hintText(), TL.W - 320, 7);
          for (var hh = 0; hh < hLines.length; hh++) {
            TL.text(ctx, hLines[hh], TL.W / 2, TL.H - 22 + hh * 10, 7, 'rgba(216,178,90,0.75)', 'center');
          }
        }
      }
    };
    g.chips = chips;
    return g;
  };

  /* ---- C. GRID ROVER ROUTE ---- */
  builders.grid = function (cfg) {
    var cell = Math.min(64, (TL.H - 220) / cfg.rows, (TL.W - 260) / cfg.cols);
    var gx = (TL.W - cfg.cols * cell) / 2 + 40, gy = 130;
    var pos = { c: cfg.start[0], r: cfg.start[1] };
    var flash = 0, moves = 0, fails = 0;
    function hintText() {
      if (!cfg.hints || !cfg.hints.length) return '';
      return cfg.hints[Math.min(fails - 1, cfg.hints.length - 1)];
    }
    function isHaz(c, r) {
      for (var i = 0; i < cfg.hazards.length; i++) if (cfg.hazards[i][0] === c && cfg.hazards[i][1] === r) return true;
      return false;
    }
    var g = {
      update: function (dt) {
        flash = Math.max(0, flash - dt);
        var move = null;
        if (TL.hit('arrowleft') || TL.hit('a')) move = [-1, 0];
        else if (TL.hit('arrowright') || TL.hit('d')) move = [1, 0];
        else if (TL.hit('arrowup') || TL.hit('w')) move = [0, -1];
        else if (TL.hit('arrowdown') || TL.hit('s')) move = [0, 1];
        else {
          /* click adjacent cell */
          if (TL.mouse.clicked) {
            var c = Math.floor((TL.mouse.x - gx) / cell), r = Math.floor((TL.mouse.y - gy) / cell);
            if (c >= 0 && c < cfg.cols && r >= 0 && r < cfg.rows) {
              var dc = c - pos.c, dr = r - pos.r;
              if (Math.abs(dc) + Math.abs(dr) === 1) move = [dc, dr];
            }
          }
        }
        if (move) {
          var nc = pos.c + move[0], nr = pos.r + move[1];
          if (nc < 0 || nc >= cfg.cols || nr < 0 || nr >= cfg.rows) { TL.audio.deny(); return; }
          pos.c = nc; pos.r = nr; moves++;
          TL.audio.blip(500 + moves * 8, 0.04, 0.05);
          if (isHaz(nc, nr)) {
            flash = 0.8;
            fails++;
            TL.audio.deny(); TL.audio.static(0.3, 0.08);
            var msg = 'Rover immobilized — wheels bogged. Recomputing route from start.';
            if (hintText()) msg += '  HINT: ' + hintText();
            MG.fail(msg);
            pos = { c: cfg.start[0], r: cfg.start[1] }; moves = 0;
            return;
          }
          if (nc === cfg.goal[0] && nr === cfg.goal[1]) MG.win();
        }
      },
      draw: function (ctx) {
        frame(ctx, cfg.title, cfg.prompt);
        for (var c = 0; c < cfg.cols; c++) {
          for (var r = 0; r < cfg.rows; r++) {
            var x = gx + c * cell, y = gy + r * cell;
            ctx.fillStyle = 'rgba(60,120,105,0.08)';
            ctx.fillRect(x, y, cell - 2, cell - 2);
            ctx.strokeStyle = 'rgba(110,220,200,0.18)';
            ctx.strokeRect(x + 0.5, y + 0.5, cell - 3, cell - 3);
            if (isHaz(c, r)) {
              ctx.fillStyle = 'rgba(200,90,60,0.5)';
              if ((c + r) % 2 === 0) { /* sand ripple */
                for (var w = 0; w < 3; w++) ctx.fillRect(x + 8, y + 14 + w * 9, cell - 22, 3);
              } else { /* rock */
                ctx.beginPath(); ctx.moveTo(x + 12, y + cell - 12); ctx.lineTo(x + 18, y + 12); ctx.lineTo(x + 30, y + 8); ctx.lineTo(x + 40, y + cell - 12); ctx.closePath(); ctx.fill();
              }
            }
            if (c === cfg.goal[0] && r === cfg.goal[1]) {
              var p = 0.5 + 0.5 * Math.sin(MG.t * 5);
              ctx.strokeStyle = 'rgba(126,240,200,' + (0.4 + p * 0.5) + ')';
              ctx.lineWidth = 2;
              ctx.strokeRect(x + 4, y + 4, cell - 10, cell - 10);
              TL.text(ctx, '◎', x + cell / 2 - 6, y + cell / 2 - 8, 12, '#7ef0c8');
            }
          }
        }
        /* rover icon */
        var rx = gx + pos.c * cell + cell / 2, ry = gy + pos.r * cell + cell / 2;
        ctx.fillStyle = '#d8b25a';
        ctx.fillRect(rx - 10, ry - 7, 20, 10);
        ctx.fillStyle = '#0a1e26'; ctx.fillRect(rx - 6, ry - 5, 8, 4);
        ctx.fillStyle = '#5df0d0'; ctx.fillRect(rx - 5 + Math.sin(MG.t * 3) * 1.5, ry - 4, 3, 2);
        for (var w2 = -1; w2 <= 1; w2++) { ctx.fillStyle = '#22262c'; ctx.fillRect(rx - 10 + (w2 + 1) * 7, ry + 3, 5, 4); }
        /* flavor */
        TL.panel(ctx, 30, TL.H - 110, TL.W - 60, 76, {});
        var lines = TL.wrap(ctx, cfg.flavor, TL.W - 120, 8);
        for (var i = 0; i < lines.length; i++) TL.text(ctx, lines[i], 52, TL.H - 94 + i * 14, 8, '#9fd8c8');
        TL.text(ctx, 'MOVES: ' + moves + '   ·   ARROWS/WASD or click adjacent cell', TL.W - 60, TL.H - 46, 8, '#5a8a7a', 'right');
        if (fails > 0 && hintText()) {
          var htLines = TL.wrap(ctx, 'HINT: ' + hintText(), TL.W - 320, 7);
          for (var h3 = 0; h3 < htLines.length; h3++) {
            TL.text(ctx, htLines[h3], TL.W / 2, TL.H - 24 + h3 * 10, 7, 'rgba(216,178,90,0.75)', 'center');
          }
        }
        if (flash > 0) TL.staticOverlay(ctx, flash * 0.5);
      }
    };
    g.pos = pos;
    return g;
  };

  /* ---- D. CHART INSTRUMENT (Vikings) ---- */
  builders.chart = function (cfg) {
    var phase = 'idle'; // idle | running | done
    var prog = 0, sel = -1;
    /* wrap the question once so click hitboxes and drawn boxes agree */
    var qLines = TL.wrap(TL.ctx, cfg.question, TL.W - 200, 9);
    var g = {
      update: function (dt) {
        if (phase === 'idle') {
          if (TL.hit('space') || TL.hit('e') || TL.hit('enter') || (TL.mouse.clicked && TL.mouse.y > 150 && TL.mouse.y < 330)) {
            phase = 'running'; TL.audio.blip(520, 0.06, 0.15); TL.audio.static(0.6, 0.04);
          }
        } else if (phase === 'running') {
          prog += dt / 5;
          TL.audio.blip(300 + prog * 400, 0.008, 0.03);
          if (prog >= 1) { prog = 1; phase = 'done'; TL.audio.chime(1.4); }
        } else {
          for (var i = 0; i < cfg.options.length; i++) {
            var y = 356 + i * 40 + qLines.length * 13;
            if (TL.mouse.x > 80 && TL.mouse.x < TL.W - 80 && TL.mouse.y > y && TL.mouse.y < y + 34 && TL.mouse.clicked) { sel = i; g.check(); }
            if (TL.hit(String(i + 1))) { sel = i; g.check(); }
          }
        }
      },
      check: function () {
        if (sel === cfg.answer) MG.win();
        else {
          MG.fail('The data does not support that reading. Honesty is the mission.');
          TL.audio.deny();
          sel = -1;
        }
      },
      draw: function (ctx) {
        frame(ctx, cfg.title, cfg.prompt);
        /* graph panel */
        TL.panel(ctx, 80, 110, TL.W - 160, 210, {});
        var gx = 120, gy = 140, gw = TL.W - 280, gh = 150;
        ctx.strokeStyle = 'rgba(110,220,200,0.35)';
        ctx.strokeRect(gx, gy, gw, gh);
        ctx.fillStyle = 'rgba(110,220,200,0.6)';
        for (var i = 0; i <= 4; i++) { ctx.fillRect(gx - 4, gy + gh - i * gh / 4 - 1, 4, 2); TL.text(ctx, String(i * 25), gx - 34, gy + gh - i * gh / 4 - 5, 7, '#5a8a7a'); }
        TL.text(ctx, 'GAS RELEASE (counts/s)', gx - 34, gy - 16, 7, '#5a8a7a');
        TL.text(ctx, 'SOLS OF OPERATION →', gx + gw - 150, gy + gh + 8, 7, '#5a8a7a');
        /* curve */
        ctx.save();
        ctx.beginPath();
        var maxT = prog;
        for (var t2 = 0; t2 <= maxT; t2 += 0.005) {
          var v;
          if (cfg.graph.kind === 'release') {
            v = t2 < 0.06 ? 0 : Math.min(1, (t2 - 0.06) * 2.2) * (0.85 + 0.1 * Math.sin(t2 * 40));
          } else {
            v = 0.03 + Math.abs(Math.sin(t2 * 60)) * 0.02;
          }
          var x = gx + t2 * gw, y = gy + gh - v * gh * 0.92;
          if (t2 === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#7ef0c8'; ctx.lineWidth = 2; ctx.stroke();
        ctx.restore();
        if (phase === 'idle') {
          var p = 0.5 + 0.5 * Math.sin(MG.t * 4);
          TL.text(ctx, '▶ PRESS SPACE TO RUN EXPERIMENT', TL.W / 2, gy + gh / 2 + 30, 10, 'rgba(126,240,200,' + (0.5 + p * 0.5) + ')', 'center');
        }
        if (phase === 'done') {
          TL.text(ctx, cfg.graph.kind === 'release' ? 'RESULT: STEADY GAS RELEASE ON NUTRIENT INPUT' : 'RESULT: FLAT BASELINE — NO ORGANICS DETECTED', gx, gy + gh + 26, 8, '#f0a050');
        }
        /* question + options */
        if (phase === 'done') {
          var qy = 336;
          for (var q = 0; q < qLines.length; q++) TL.text(ctx, qLines[q], 80, qy + q * 13, 9, '#c8e8dc');
          for (var o = 0; o < cfg.options.length; o++) {
            var y2 = 356 + o * 40 + qLines.length * 13;
            var hov = TL.mouse.x > 80 && TL.mouse.x < TL.W - 80 && TL.mouse.y > y2 && TL.mouse.y < y2 + 34;
            TL.panel(ctx, 80, y2, TL.W - 160, 34, { bg: 'rgba(8,22,28,0.92)', corner: sel === o ? '#f0a050' : hov ? '#7ef0c8' : '#3a7a6a' });
            TL.text(ctx, cfg.options[o], 96, y2 + 12, 8, hov ? '#c8f0e4' : '#9fd8c8');
          }
        }
      }
    };
    return g;
  };

  /* ---- E. ICE DIG (Phoenix) ---- */
  builders.grid2 = function (cfg) {
    var cell = Math.min(74, (TL.H - 250) / cfg.rows, (TL.W - 320) / cfg.cols);
    var gx = (TL.W - cfg.cols * cell) / 2, gy = 140;
    var rnd = TL.RNG((Math.random() * 1e9) | 0);
    /* ice cluster: 3 cells in an L within a 2x2 block */
    var bc = 1 + Math.floor(rnd() * (cfg.cols - 3)), br = 1 + Math.floor(rnd() * (cfg.rows - 3));
    var ice = {};
    var spots = [[0, 0], [1, 0], [0, 1], [1, 1]];
    spots = shuffle(spots, rnd).slice(0, 3);
    spots.forEach(function (s) { ice[(bc + s[0]) + ',' + (br + s[1])] = true; });
    function nearIce(c, r) {
      for (var dc = -1; dc <= 1; dc++) for (var dr = -1; dr <= 1; dr++) if (ice[(c + dc) + ',' + (r + dr)]) return true;
      return false;
    }
    var dug = {}, found = 0, digs = 0;
    var g = {
      update: function (dt) {
        if (TL.mouse.clicked) {
          var c = Math.floor((TL.mouse.x - gx) / cell), r = Math.floor((TL.mouse.y - gy) / cell);
          if (c >= 0 && c < cfg.cols && r >= 0 && r < cfg.rows && !dug[c + ',' + r]) {
            dug[c + ',' + r] = nearIce(c, r) ? (ice[c + ',' + r] ? 'ice' : 'near') : 'soil';
            digs++;
            if (dug[c + ',' + r] === 'ice') { found++; TL.audio.chime(1.6); }
            else TL.audio.step();
            TL.audio.static(0.15, 0.05);
            if (digs >= cfg.digs && found < 3) {
              MG.fail('Dig budget exhausted. The ice sits in a tight cluster — cold readings point the way.');
              TL.audio.deny();
              /* reset */
              rnd = TL.RNG((Math.random() * 1e9) | 0);
              bc = 1 + Math.floor(rnd() * (cfg.cols - 3)); br = 1 + Math.floor(rnd() * (cfg.rows - 3));
              spots = shuffle(spots, rnd).slice(0, 3); ice = {};
              spots.forEach(function (s) { ice[(bc + s[0]) + ',' + (br + s[1])] = true; });
              dug = {}; found = 0; digs = 0;
            }
            if (found >= 3) MG.win();
          }
        }
      },
      draw: function (ctx) {
        frame(ctx, cfg.title, cfg.prompt);
        for (var c = 0; c < cfg.cols; c++) {
          for (var r = 0; r < cfg.rows; r++) {
            var x = gx + c * cell, y = gy + r * cell;
            var key = c + ',' + r;
            ctx.fillStyle = 'rgba(120,90,60,0.35)';
            ctx.fillRect(x, y, cell - 3, cell - 3);
            ctx.strokeStyle = 'rgba(110,220,200,0.2)';
            ctx.strokeRect(x + 0.5, y + 0.5, cell - 4, cell - 4);
            var st = dug[key];
            if (st) {
              ctx.fillStyle = '#4a3626';
              ctx.fillRect(x + 2, y + 2, cell - 7, cell - 7);
              if (st === 'ice') {
                ctx.fillStyle = '#cfeef8';
                ctx.beginPath();
                ctx.moveTo(x + cell / 2, y + 12); ctx.lineTo(x + cell - 14, y + cell / 2);
                ctx.lineTo(x + cell / 2, y + cell - 12); ctx.lineTo(x + 14, y + cell / 2);
                ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#8ac8e0';
                ctx.fillRect(x + cell / 2 - 3, y + cell / 2 - 3, 6, 6);
              } else {
                var cold = st === 'near';
                TL.text(ctx, cold ? '-34°C' : '-58°C', x + cell / 2, y + cell / 2 - 5, 8, cold ? '#9ad0e8' : '#8a7a6a', 'center');
              }
            } else {
              TL.text(ctx, 'DIG', x + cell / 2, y + cell / 2 - 5, 8, 'rgba(220,190,150,0.4)', 'center');
            }
          }
        }
        TL.panel(ctx, 30, TL.H - 130, TL.W - 60, 96, {});
        TL.text(ctx, 'THERMAL READINGS: soil is -58°C. Near-ice soil warms to -34°C (ice holds heat). Ice reads bright white.', 52, TL.H - 112, 8, '#c8e8dc');
        TL.text(ctx, 'DIGS USED: ' + digs + ' / ' + cfg.digs + '      ICE FOUND: ' + found + ' / 3', 52, TL.H - 92, 9, found >= 1 ? '#7ef0c8' : '#f0a050');
        var lines = TL.wrap(ctx, cfg.flavor, TL.W - 120, 7);
        for (var i = 0; i < lines.length; i++) TL.text(ctx, lines[i], 52, TL.H - 68 + i * 11, 7, '#6a9a8a');
      }
    };
    g.ice = ice; g.dug = dug;
    return g;
  };

  /* ---- F. WAVEFORM LISTENING (InSight) ---- */
  function waveSample(kind, t) {
    if (kind === 'quake') {
      var env2 = Math.min(1, t * 0.8) * Math.max(0, 1 - Math.max(0, t - 0.9) / 1.7);
      return Math.sin(t * 14) * 0.7 * env2 + Math.sin(t * 27) * 0.2 * env2;
    } else if (kind === 'wind') {
      return (Math.sin(t * 9 + Math.sin(t * 2.3) * 3) + Math.sin(t * 13.7) * 0.5 + Math.sin(t * 3.1 + 1) * 0.6) * 0.45;
    }
    return (Math.sin(t * 61) * 0.12) * (Math.sin(t * 7) > 0.6 ? 1 : 0.2);
  }
  builders.wave = function (cfg) {
    var round = 0, playing = -1, playT = 0, sel = -1;
    function wfs() { return cfg.rounds[Math.min(round, cfg.rounds.length - 1)].waveforms; }
    var g = {
      update: function (dt) {
        if (playing >= 0) {
          playT += dt;
          if (playT > 2.8) { playing = -1; playT = 0; }
        }
        for (var i = 0; i < 3; i++) {
          var x = 90 + i * 270;
          if (TL.mouse.x > x && TL.mouse.x < x + 240 && TL.mouse.y > 110 && TL.mouse.y < 250 && TL.mouse.clicked && playing < 0) {
            playing = i; playT = 0;
            TL.audio.playWave(wfs()[i].kind);
          }
          if (TL.hit(String(i + 1)) && playing < 0) {
            playing = i; playT = 0;
            TL.audio.playWave(wfs()[i].kind);
          }
        }
        if (playing < 0) {
          var qy = 300;
          for (var o = 0; o < 3; o++) {
            var y = qy + o * 44;
            if (TL.mouse.x > 120 && TL.mouse.x < TL.W - 120 && TL.mouse.y > y && TL.mouse.y < y + 38 && TL.mouse.clicked) { sel = o; g.check(); }
            if (TL.hit(String(o + 1)) && TL.keys['shift']) { }
          }
          if (TL.hit('a')) { sel = 0; g.check(); }
          if (TL.hit('b')) { sel = 1; g.check(); }
          if (TL.hit('c')) { sel = 2; g.check(); }
        }
      },
      check: function () {
        if (sel === cfg.rounds[round].answer) {
          round++;
          sel = -1;
          TL.audio.chime(1.2);
          if (round >= cfg.rounds.length) MG.win();
        } else {
          MG.fail('Not the quake. Wind wavers, noise stays flat — a quake RINGS: slow build, long clean decay.');
          TL.audio.deny();
          sel = -1;
        }
      },
      draw: function (ctx) {
        var safeRound = Math.min(round, cfg.rounds.length - 1);
        var r = cfg.rounds[safeRound];
        frame(ctx, cfg.title, cfg.prompt + '  —  ROUND ' + (safeRound + 1) + '/' + cfg.rounds.length);
        for (var i = 0; i < 3; i++) {
          var x = 90 + i * 270, y = 110, w = 240, h = 140;
          var wf = wfs()[i];
          var hov = TL.mouse.x > x && TL.mouse.x < x + w && TL.mouse.y > y && TL.mouse.y < y + h;
          TL.panel(ctx, x, y, w, h, { bg: 'rgba(8,22,28,0.92)', corner: playing === i ? '#f0a050' : hov ? '#7ef0c8' : '#3a7a6a' });
          TL.text(ctx, wf.label, x + 10, y + 8, 8, '#d8b25a');
          /* waveform */
          ctx.save();
          ctx.beginPath();
          for (var s = 0; s <= 200; s++) {
            var tt = s / 200 * 2.6 + (playing === i ? playT : 1.3);
            var v = waveSample(wf.kind, tt) * (playing === i ? 1.25 : 1);
            var yy = y + h / 2 + v * (h / 2 - 18);
            var xx = x + 12 + s / 200 * (w - 24);
            if (s === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
          }
          ctx.strokeStyle = playing === i ? '#f0a050' : '#59c8f0';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
          /* live level meter */
          var tt2 = playing === i ? playT : 1.3;
          var lvl = Math.min(1, Math.abs(waveSample(wf.kind, tt2)));
          TL.bar(ctx, x + 12, y + h - 9, w - 24, 4, lvl * 0.55 + 0.05, playing === i ? '#f0a050' : '#3a7a6a', 'rgba(16,28,34,0.9)');
          TL.text(ctx, playing === i ? '► PLAYING…' : '► PLAY [click / ' + (i + 1) + ']', x + 10, y + h - 20, 7, '#6a9a8a');
        }
        /* question */
        var qLines = TL.wrap(ctx, r.question, TL.W - 280, 9);
        var qy = 292;
        for (var q = 0; q < qLines.length; q++) TL.text(ctx, qLines[q], 120, qy + q * 13, 9, '#c8e8dc');
        var opts = ['SIGNAL A', 'SIGNAL B', 'SIGNAL C'];
        for (var o2 = 0; o2 < 3; o2++) {
          if (playing >= 0) continue;
          var y2 = 336 + o2 * 44;
          var hov2 = TL.mouse.x > 120 && TL.mouse.x < TL.W - 120 && TL.mouse.y > y2 && TL.mouse.y < y2 + 38;
          TL.panel(ctx, 120, y2, TL.W - 240, 38, { bg: 'rgba(8,22,28,0.92)', corner: sel === o2 ? '#f0a050' : hov2 ? '#7ef0c8' : '#3a7a6a' });
          TL.text(ctx, 'THAT WAS THE QUAKE → ' + opts[o2] + '  [A/B/C]', 140, y2 + 14, 8, hov2 ? '#c8f0e4' : '#9fd8c8');
        }
      }
    };
    return g;
  };

  /* ---- G. FLIGHT (Ingenuity) ---- */
  builders.fly = function (cfg) {
    var cy = 260, vy = 0, scroll = 0, gates = [], passed = 0, dead = 0, started = false;
    var GAP = 150, SPD = 120;
    function mkGate(x) {
      var gTop = 90 + Math.random() * 200;
      return { x: x, top: gTop, bot: gTop + GAP, hit: false };
    }
    for (var i = 0; i < cfg.gates; i++) gates.push(mkGate(620 + i * 640));
    var g = {
      update: function (dt) {
        if (dead > 0) {
          dead -= dt;
          if (dead <= 0) { /* full reset */
            cy = 260; vy = 0; scroll = 0; passed = 0; gates = [];
            for (i = 0; i < cfg.gates; i++) gates.push(mkGate(620 + i * 640));
            started = false;
          }
          return;
        }
        if (!started) {
          if (TL.hit('space') || TL.mouse.clicked) started = true;
          return;
        }
        var thrust = TL.key('space') || TL.mouse.down;
        vy += (thrust ? -620 : 560) * dt;
        vy = TL.clamp(vy, -180, 200);
        cy += vy * dt;
        scroll += SPD * dt;
        if (cy < 24 || cy > TL.H - 60) {
          dead = 1.2; TL.audio.deny(); TL.audio.static(0.4, 0.1);
          MG.fail('Rotor strike. Mars air is 1% of Earth\'s — every meter of climb must be bought with spin.');
          return;
        }
        var copterX = 220;
        for (i = 0; i < gates.length; i++) {
          var gt = gates[i];
          var gx = gt.x - scroll;
          if (!gt.hit && gx < copterX - 18) { gt.hit = true; passed++; TL.audio.chime(1.8); }
          if (gx > copterX - 26 && gx < copterX + 26) {
            if (cy - 16 < gt.top || cy + 16 > gt.bot) {
              dead = 1.2; TL.audio.deny(); TL.audio.static(0.4, 0.1);
              MG.fail('Collision with gate structure. Recalculating…');
              return;
            }
          }
        }
        if (passed >= cfg.gates) MG.win();
      },
      draw: function (ctx) {
        frame(ctx, cfg.title, cfg.prompt);
        var th = TL.World.area ? TL.World.area.def.theme : { skyA: '#c86a3c', skyB: '#8a3f28', ground: '#b56536', dust: '#e8a070' };
        /* sky */
        var grd = ctx.createLinearGradient(0, 92, 0, TL.H);
        grd.addColorStop(0, th.skyA); grd.addColorStop(1, th.skyB);
        ctx.fillStyle = grd; ctx.fillRect(0, 92, TL.W, TL.H - 92);
        /* stars faint */
        /* ground */
        ctx.fillStyle = th.ground;
        ctx.fillRect(0, TL.H - 60, TL.W, 60);
        ctx.fillStyle = 'rgba(255,220,180,0.4)';
        ctx.fillRect(0, TL.H - 60, TL.W, 3);
        /* dust specks */
        ctx.globalAlpha = 0.4;
        for (var d2 = 0; d2 < 20; d2++) {
          var dx2 = ((d2 * 173 - scroll * 1.6) % (TL.W + 40) + TL.W + 40) % (TL.W + 40) - 20;
          ctx.fillStyle = th.dust;
          ctx.fillRect(dx2, 120 + (d2 * 61) % 320, 2, 2);
        }
        ctx.globalAlpha = 1;
        /* gates */
        for (var i = 0; i < gates.length; i++) {
          var gt = gates[i], gx = gt.x - scroll;
          if (gx < -80 || gx > TL.W + 80) continue;
          ctx.fillStyle = gt.hit ? 'rgba(126,240,200,0.35)' : '#5c3a26';
          ctx.fillRect(gx - 16, 92, 32, Math.max(0, gt.top - 92));
          ctx.fillRect(gx - 16, gt.bot, 32, TL.H - 60 - gt.bot);
          ctx.fillStyle = '#7a4a30';
          ctx.fillRect(gx - 20, gt.top - 8, 40, 8);
          ctx.fillRect(gx - 20, gt.bot, 40, 8);
          if (gt.hit) TL.text(ctx, '✓', gx - 4, gt.top + GAP / 2 - 8, 12, '#7ef0c8');
        }
        /* copter */
        var cx = 220;
        ctx.save();
        ctx.translate(cx, cy);
        if (dead > 0) ctx.rotate(Math.min(1.2, (1.2 - dead) * 2));
        var tilt = TL.clamp(vy / 220, -0.5, 0.5);
        ctx.rotate(tilt * 0.5);
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.beginPath(); ctx.ellipse(0, TL.H - 66 - cy, 10, 3, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#3a3f47'; ctx.fillRect(-8, -6, 16, 10);
        ctx.fillStyle = '#d8b25a'; ctx.fillRect(-7, -3, 14, 3);
        ctx.fillStyle = '#26365c'; ctx.fillRect(-6, -10, 12, 3);
        ctx.strokeStyle = '#b8d8e0'; ctx.lineWidth = 1.5;
        var rot = started ? performance.now() * 0.03 : 0.6;
        for (var r2 = 0; r2 < 2; r2++) {
          var a2 = rot + r2 * Math.PI / 2;
          ctx.beginPath();
          ctx.moveTo(-Math.cos(a2) * 18, -12 - Math.sin(a2) * 5);
          ctx.lineTo(Math.cos(a2) * 18, -12 + Math.sin(a2) * 5);
          ctx.stroke();
        }
        ctx.restore();
        /* HUD */
        TL.text(ctx, 'GATES: ' + passed + ' / ' + cfg.gates, 48, 100, 10, '#7ef0c8');
        TL.text(ctx, 'AIR DENSITY: 0.020 kg/m³ (1% OF EARTH)', 48, 118, 7, '#9fd8c8');
        if (dead > 0) TL.staticOverlay(ctx, 0.5);
        if (!started && dead <= 0) {
          var p = 0.5 + 0.5 * Math.sin(MG.t * 4);
          TL.text(ctx, 'PRESS SPACE TO SPIN UP', TL.W / 2, 220, 10, 'rgba(126,240,200,' + (0.5 + p * 0.5) + ')', 'center');
        }
      }
    };
    g.state = function () { return { cy: cy, vy: vy, scroll: scroll, started: started, passed: passed, dead: dead }; };
    return g;
  };

  /* ---- H. DRILL TIMING (Perseverance) ----
     Accessible timing game: the cursor rides a slow, smooth sinusoidal
     wave (fully predictable), the seal window is generous with a soft
     tolerance buffer, a tone cues you as the cursor ENTERS the window,
     misses cost nothing but feedback, and input has a short cooldown. */
  builders.drill = function (cfg) {
    var tube = 0, ph = 0, sealed = [], zoneW = 0.34, cool = 0, flashT = 0, flashOK = false, inZonePrev = false;
    for (var i0 = 0; i0 < cfg.tubes; i0++) sealed.push(false);
    var g = {
      update: function (dt) {
        /* slow sinusoidal sweep: 1 full wave in ~2.9s, easing gently per tube */
        ph += dt * (0.35 + tube * 0.06);
        var cursor = g.cursor();
        var inZone = Math.abs(cursor - 0.5) < zoneW / 2;
        cool = Math.max(0, cool - dt);
        flashT = Math.max(0, flashT - dt);
        /* entry cue: a soft tone the moment the cursor crosses into the window */
        if (inZone && !inZonePrev) TL.audio.blip(980, 0.06, 0.12);
        inZonePrev = inZone;
        if ((TL.hit('space') || TL.mouse.clicked) && cool <= 0) {
          cool = 0.2;
          if (inZone) {
            sealed[tube] = true;
            flashT = 0.7; flashOK = true;
            TL.audio.chime(1.7 + tube * 0.2);
            tube++;
            zoneW = Math.max(0.24, zoneW - 0.04);   /* gentle narrowing, stays fair */
            if (tube >= cfg.tubes) MG.win();
          } else {
            flashT = 0.6; flashOK = false;
            TL.audio.deny();
            MG.fail('Just wide of the window. No sample lost — the arm realigns automatically. Wait for the entry tone, then press.');
          }
        }
      },
      draw: function (ctx) {
        frame(ctx, cfg.title, cfg.prompt);
        var bx = 120, bw = TL.W - 240, by = 220, bh = 40;
        TL.panel(ctx, bx - 20, by - 60, bw + 40, bh + 130, {});
        var cursor = g.cursor();
        var inZone = Math.abs(cursor - 0.5) < zoneW / 2;
        /* zones — the window glows while the cursor is inside it */
        ctx.fillStyle = 'rgba(60,180,140,' + (inZone ? 0.5 + 0.15 * Math.sin(MG.t * 10) : 0.3) + ')';
        ctx.fillRect(bx + (0.5 - zoneW / 2) * bw, by, zoneW * bw, bh);
        ctx.strokeStyle = inZone ? '#aef0dd' : '#7ef0c8';
        ctx.lineWidth = inZone ? 2 : 1;
        ctx.strokeRect(bx + (0.5 - zoneW / 2) * bw, by, zoneW * bw, bh);
        ctx.lineWidth = 1;
        /* ghost of the sinusoidal wave so the rhythm is readable */
        ctx.save();
        ctx.globalAlpha = 0.35;
        ctx.strokeStyle = '#7ef0c8';
        ctx.beginPath();
        for (var s = 0; s <= 64; s++) {
          var sx = bx + (s / 64) * bw;
          var sy = by + bh / 2 - Math.sin(s / 64 * Math.PI * 2 + ph) * (bh / 2 + 4);
          if (s === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
        ctx.restore();
        ctx.fillStyle = 'rgba(110,220,200,0.12)';
        ctx.fillRect(bx, by + bh / 2 - 1, bw, 2);
        /* cursor rides the wave */
        var cx2 = bx + cursor * bw;
        ctx.fillStyle = flashT > 0 ? (flashOK ? '#aef0dd' : '#f0a050') : '#f8f4ec';
        ctx.fillRect(cx2 - 3, by - 14, 6, bh + 28);
        /* live cue while inside the window */
        if (inZone) TL.text(ctx, '\u266a IN WINDOW', bx + (0.5 - zoneW / 2) * bw, by - 26, 6, '#aef0dd', 'center');
        /* tube icons */
        for (var i = 0; i < cfg.tubes; i++) {
          var tx = TL.W / 2 - (cfg.tubes * 60) / 2 + i * 60 + 14, ty = 360;
          ctx.fillStyle = sealed[i] ? '#7ef0c8' : '#8a8a92';
          ctx.fillRect(tx, ty, 14, 34);
          ctx.fillStyle = sealed[i] ? '#3a8a6a' : '#5a5a62';
          ctx.fillRect(tx - 3, ty - 4, 20, 6);
          ctx.fillStyle = sealed[i] ? '#aef0dd' : '#42444a';
          ctx.fillRect(tx + 3, ty + 6, 8, 18);
        }
        TL.text(ctx, 'TUBE ' + Math.min(tube + 1, cfg.tubes) + ' / ' + cfg.tubes, 120, 150, 10, '#7ef0c8');
        TL.text(ctx, 'PRESS SPACE / CLICK WHEN THE CURSOR CROSSES THE GREEN WINDOW', 120, 320, 8, '#9fd8c8');
        TL.text(ctx, 'A SOFT TONE SOUNDS AS THE CURSOR ENTERS — PRESS ON THE TONE', 120, 336, 6, '#6a9a8a');
        if (flashT > 0 && !flashOK) TL.staticOverlay(ctx, flashT * 0.5);
      }
    };
    /* current cursor position on the sine wave, 0..1 */
    g.cursor = function () {
      return (1 - Math.cos(ph * Math.PI * 2)) / 2;
    };
    g.state = function () { return { tube: tube, sealed: sealed, zoneW: zoneW }; };
    return g;
  };

  /* ---- H2. STRATIGRAPHY (Spirit) — tactile two-column core builder ----
     Left: specimen tray with grab handles and hover highlights.
     Right: vertical core column, top = youngest, bottom = oldest.
     Drag-and-drop plus click-to-place. Placing a sample renders its
     rock texture with a mechanical lock animation and a scanner sweep.
     ANALYZE CORE [E] unlocks only when every slot is filled, then runs
     a bottom-to-top validation scan. */
  builders.strata = function (cfg) {
    var byId = {}, ids = [];
    for (var i0 = 0; i0 < cfg.samples.length; i0++) { byId[cfg.samples[i0].id] = cfg.samples[i0]; ids.push(cfg.samples[i0].id); }
    var order = cfg.order;                 /* oldest..youngest == bottom..top */
    var n = order.length;
    var slots = [], locks = [], scans = [], wrong = [];
    for (var i1 = 0; i1 < n; i1++) { slots.push(null); locks.push(0); scans.push(0); wrong.push(false); }
    var tray = shuffle(ids);
    var carry = null, carryX = 0, carryY = 0, moved = 0, liftFrom = -1;
    var phase = 'solve', scanT = 0, checked = -1;
    var cardHover = -1, slotHover = -1;

    /* geometry */
    var trayX = 48, trayW = 320, cardH = 66, cardGap = 12, trayY = 128;
    var colX = 560, colW = 240, slotH = 62, slotGap = 6, colY = 140;
    var slotY = function (i) { return colY + i * (slotH + slotGap); };
    var expectedFor = function (i) { return order[n - 1 - i]; };  /* slot 0 = top = youngest */

    function slotAt(x, y) {
      if (x < colX || x > colX + colW) return -1;
      for (var i = 0; i < n; i++) if (y >= slotY(i) && y <= slotY(i) + slotH) return i;
      return -1;
    }
    function cardAt(x, y) {
      if (x < trayX || x > trayX + trayW) return -1;
      for (var i = 0; i < tray.length; i++) {
        var cy = trayY + i * (cardH + cardGap);
        if (y >= cy && y <= cy + cardH) return i;
      }
      return -1;
    }
    function allFilled() {
      for (var i = 0; i < n; i++) if (!slots[i]) return false;
      return true;
    }
    function place(si) {
      if (slots[si]) tray.push(slots[si]);           /* swap: occupant back to tray */
      slots[si] = carry.id;
      carry = null; moved = 0; liftFrom = -1;
      locks[si] = 0.65; scans[si] = 0.9;
      TL.audio.blip(240 + si * 50, 0.07, 0.12);
      TL.audio.static(0.08, 0.05);
    }
    function toTray(id) { tray.push(id); }

    /* ---- rock texture: banded, speckled, deterministic per sample ---- */
    function drawRock(ctx, x, y, w, h, id, ghost) {
      var s = byId[id];
      ctx.save();
      if (ghost) ctx.globalAlpha = 0.35;
      ctx.fillStyle = s.color;
      ctx.fillRect(x, y, w, h);
      var rr = TL.RNG(1000 + id.length * 77 + id.charCodeAt(0) * 13);
      /* horizontal deposition bands */
      for (var b = 0; b < 4; b++) {
        var by = y + h * (0.12 + b * 0.22);
        ctx.fillStyle = 'rgba(0,0,0,0.16)';
        ctx.fillRect(x, by, w, 2 + rr() * 3);
        ctx.fillStyle = s.hi;
        ctx.globalAlpha = (ghost ? 0.35 : 1) * 0.35;
        ctx.fillRect(x, by + 2, w, 1);
        ctx.globalAlpha = ghost ? 0.35 : 1;
      }
      /* mineral speckles */
      ctx.fillStyle = 'rgba(255,255,255,0.16)';
      for (var p = 0; p < 14; p++) ctx.fillRect(x + rr() * (w - 4), y + rr() * (h - 4), 2, 1);
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      for (p = 0; p < 8; p++) ctx.fillRect(x + rr() * (w - 4), y + rr() * (h - 4), 2, 2);
      ctx.restore();
    }

    var g = {
      update: function (dt) {
        var mx = TL.mouse.x, my = TL.mouse.y;
        for (var i = 0; i < n; i++) { locks[i] = Math.max(0, locks[i] - dt); scans[i] = Math.max(0, scans[i] - dt); }

        if (phase === 'solve') {
          slotHover = carry ? slotAt(mx, my) : slotAt(mx, my);
          cardHover = carry ? -1 : cardAt(mx, my);
          if (carry) moved += Math.abs(mx - carryX) + Math.abs(my - carryY);
          carryX = mx; carryY = my;

          if (carry) {
            if (TL.mouse.released) {
              var si = slotAt(mx, my);
              if (si >= 0 && !(si === liftFrom && moved < 10)) place(si);
              else if (moved > 10) { toTray(carry.id); carry = null; TL.audio.blip(180, 0.05, 0.08); }
              /* else: a simple click picked it up — keep carrying */
            }
          } else if (TL.mouse.clicked) {
            var s2 = slotAt(mx, my), c2 = cardAt(mx, my);
            if (s2 >= 0 && slots[s2]) {          /* click-to-lift from a slot */
              carry = { id: slots[s2] }; slots[s2] = null; liftFrom = s2;
              TL.audio.blip(200, 0.05, 0.08);
            } else if (c2 >= 0) {                /* click / grab from the tray */
              carry = { id: tray[c2] }; tray.splice(c2, 1); liftFrom = -1;
              TL.audio.blip(320, 0.05, 0.08);
            }
          }
          /* ANALYZE CORE [E] — button click or the E key, only when full */
          var btnY = slotY(n) + 26;
          var overBtn = mx >= colX && mx <= colX + colW && my >= btnY && my <= btnY + 40;
          if (allFilled() && (TL.actHit() || (TL.mouse.clicked && overBtn))) {
            phase = 'analyze'; scanT = 0; checked = -1;
            for (var w0 = 0; w0 < n; w0++) wrong[w0] = false;
            TL.audio.static(0.2, 0.06);
          }
        } else {
          /* bottom-to-top validation scan */
          scanT += dt;
          var si2 = Math.floor(scanT / 0.45);
          if (si2 < n && si2 !== checked) {
            checked = si2;
            var slotIdx = n - 1 - si2;              /* bottom slot first */
            scans[slotIdx] = 0.8;
            if (slots[slotIdx] === expectedFor(slotIdx)) {
              locks[slotIdx] = 0.7;
              TL.audio.chime(1.2 + si2 * 0.15);
            } else {
              wrong[slotIdx] = true;
              TL.audio.deny();
            }
          }
          if (scanT > n * 0.45 + 0.6) {
            var bad = [];
            for (var b1 = 0; b1 < n; b1++) if (wrong[b1]) bad.push(b1);
            if (bad.length) {
              for (var b2 = 0; b2 < bad.length; b2++) { toTray(slots[bad[b2]]); slots[bad[b2]] = null; wrong[bad[b2]] = false; }
              MG.fail('Core rejected: ' + (bad.length > 1 ? bad.length + ' layers are out of sequence' : 'one layer is out of sequence') + '. Youngest on top, bedrock at the bottom. The rejected specimens are back in the tray.');
              phase = 'solve';
            } else {
              MG.win();
            }
          }
        }
      },

      draw: function (ctx) {
        frame(ctx, cfg.title, cfg.prompt);
        var mx = TL.mouse.x, my = TL.mouse.y;

        /* ============ LEFT — SPECIMEN TRAY ============ */
        TL.text(ctx, 'SPECIMEN TRAY', trayX, 108, 9, '#d8b25a');
        ctx.fillStyle = 'rgba(216,178,90,0.25)'; ctx.fillRect(trayX, 118, trayW, 1);
        for (var i = 0; i < tray.length; i++) {
          var id = tray[i], s = byId[id];
          var cy = trayY + i * (cardH + cardGap);
          var hot = cardHover === i;
          /* card: flat semi-transparent, crisp highlight on hover */
          ctx.fillStyle = hot ? 'rgba(16,34,38,0.92)' : 'rgba(10,24,30,0.82)';
          ctx.fillRect(trayX, cy, trayW, cardH);
          ctx.strokeStyle = hot ? s.hi : 'rgba(110,220,200,0.28)';
          ctx.lineWidth = hot ? 2 : 1;
          ctx.strokeRect(trayX + 0.5, cy + 0.5, trayW - 1, cardH - 1);
          /* grab handle: three grip ridges */
          ctx.fillStyle = hot ? s.hi : 'rgba(150,190,180,0.5)';
          for (var hLine = 0; hLine < 3; hLine++) ctx.fillRect(trayX + 8, cy + 22 + hLine * 8, 5, 3);
          /* colour swatch + name + description */
          ctx.fillStyle = s.color;
          ctx.fillRect(trayX + 24, cy + 8, 30, cardH - 16);
          ctx.strokeStyle = s.hi; ctx.lineWidth = 1;
          ctx.strokeRect(trayX + 24.5, cy + 8.5, 29, cardH - 17);
          TL.text(ctx, s.name, trayX + 64, cy + 9, 8, hot ? '#e8fff4' : '#c8e8dc');
          var dl = TL.wrap(ctx, s.desc, trayW - 74, 6);
          for (var d = 0; d < dl.length && d < 2; d++) TL.text(ctx, dl[d], trayX + 64, cy + 24 + d * 11, 6, '#8fb8ac');
          if (hot) TL.text(ctx, 'CLICK OR DRAG INTO THE CORE', trayX + 64, cy + cardH - 12, 6, s.hi);
        }
        /* hints, calm and static */
        TL.text(ctx, 'TIP: ' + cfg.hints[0], trayX, slotY(n) + 34, 6, 'rgba(140,180,170,0.6)');

        /* ============ RIGHT — CORE COLUMN ============ */
        TL.text(ctx, 'CORE COLUMN', colX, 108, 9, '#59c8f0');
        ctx.fillStyle = 'rgba(89,200,240,0.25)'; ctx.fillRect(colX, 118, colW, 1);
        TL.text(ctx, 'SURFACE · YOUNGEST', colX, colY - 8, 6, '#7ab8a8', 'center');
        /* column backing */
        ctx.fillStyle = 'rgba(6,16,22,0.7)';
        ctx.fillRect(colX - 8, colY - 4, colW + 16, n * (slotH + slotGap) + 4);
        ctx.strokeStyle = 'rgba(110,220,200,0.3)';
        ctx.strokeRect(colX - 7.5, colY - 3.5, colW + 15, n * (slotH + slotGap) + 3);
        for (var s3 = 0; s3 < n; s3++) {
          var sy = slotY(s3);
          var filled = !!slots[s3];
          var isHover = slotHover === s3 && carry;
          /* empty slot: dark magnetic socket */
          ctx.fillStyle = filled ? 'rgba(20,30,34,0.9)' : (isHover ? 'rgba(30,60,58,0.7)' : 'rgba(8,18,24,0.85)');
          ctx.fillRect(colX, sy, colW, slotH);
          ctx.strokeStyle = wrong[s3] ? '#f05848' : (isHover ? '#7ef0c8' : 'rgba(110,220,200,0.35)');
          ctx.lineWidth = wrong[s3] || isHover ? 2 : 1;
          ctx.strokeRect(colX + 0.5, sy + 0.5, colW - 1, slotH - 1);
          ctx.lineWidth = 1;
          if (filled) {
            drawRock(ctx, colX + 2, sy + 2, colW - 4, slotH - 4, slots[s3]);
            TL.text(ctx, byId[slots[s3]].name, colX + 12, sy + 8, 7, '#0c1216');
          } else {
            TL.text(ctx, 'DROP LAYER HERE', colX + colW / 2, sy + slotH / 2 - 4, 6, 'rgba(120,180,170,0.45)', 'center');
          }
          /* scanner sweep: bright line gliding across the fresh layer */
          if (scans[s3] > 0) {
            var pr = 1 - scans[s3] / 0.9;
            var lx = colX + pr * colW;
            ctx.save();
            ctx.globalAlpha = Math.min(1, scans[s3] * 2.5) * 0.9;
            ctx.fillStyle = '#9ffce0';
            ctx.fillRect(lx, sy + 1, 3, slotH - 2);
            ctx.globalAlpha *= 0.35;
            ctx.fillRect(lx - 12, sy + 1, 12, slotH - 2);
            ctx.restore();
          }
          /* mechanical lock animation: converging brackets + tick marks */
          if (locks[s3] > 0) {
            var lp = 1 - locks[s3] / 0.65;         /* 0..1 */
            var inset = (1 - lp) * 14;
            ctx.strokeStyle = wrong[s3] ? '#f05848' : '#7ef0c8';
            ctx.lineWidth = 2;
            var L = 12;
            ctx.beginPath();
            ctx.moveTo(colX + inset, sy + 4); ctx.lineTo(colX + inset, sy + 4 + L);
            ctx.moveTo(colX + colW - inset, sy + 4); ctx.lineTo(colX + colW - inset, sy + 4 + L);
            ctx.moveTo(colX + inset, sy + slotH - 4); ctx.lineTo(colX + inset, sy + slotH - 4 - L);
            ctx.moveTo(colX + colW - inset, sy + slotH - 4); ctx.lineTo(colX + colW - inset, sy + slotH - 4 - L);
            ctx.stroke();
            ctx.lineWidth = 1;
          }
        }
        TL.text(ctx, 'BEDROCK · OLDEST', colX, slotY(n) + 12, 6, '#7ab8a8', 'center');

        /* ---- ANALYZE CORE [E] ---- */
        var ready = allFilled();
        var btnY2 = slotY(n) + 26;
        var hot2 = mx >= colX && mx <= colX + colW && my >= btnY2 && my <= btnY2 + 40;
        ctx.fillStyle = ready ? (hot2 ? 'rgba(26,72,64,0.95)' : 'rgba(10,40,36,0.92)') : 'rgba(10,20,24,0.7)';
        ctx.fillRect(colX, btnY2, colW, 40);
        ctx.strokeStyle = ready ? (hot2 ? '#7ef0c8' : '#3a9a84') : 'rgba(110,220,200,0.15)';
        ctx.strokeRect(colX + 0.5, btnY2 + 0.5, colW - 1, 39);
        TL.text(ctx, 'ANALYZE CORE', colX + colW / 2, btnY2 + 10, 9, ready ? '#aef0dd' : 'rgba(140,180,170,0.4)', 'center');
        TL.text(ctx, ready ? '[ E ]' : 'FILL ALL ' + n + ' SLOTS', colX + colW / 2, btnY2 + 26, 6, ready ? '#6ee6c8' : 'rgba(120,160,150,0.4)', 'center');

        /* ---- carried specimen follows the cursor ---- */
        if (carry) {
          drawRock(ctx, mx - 70, my - 22, 140, 44, carry.id, true);
          TL.text(ctx, byId[carry.id].name, mx - 66, my - 14, 7, '#e8fff4');
        }

        /* validation sweep line during analysis */
        if (phase === 'analyze') {
          var sp = Math.min(1, scanT / (n * 0.45));
          var sweepY = slotY(n - 1) + slotH - sp * (n * (slotH + slotGap));
          ctx.save();
          ctx.globalAlpha = 0.8;
          ctx.fillStyle = 'rgba(126,240,200,0.5)';
          ctx.fillRect(colX - 8, sweepY, colW + 16, 2);
          ctx.restore();
        }
      }
    };
    /* test/introspection handle */
    g.state = function () { return { slots: slots, tray: tray, carry: carry, phase: phase, allFilled: allFilled() }; };
    return g;
  };

  /* ---- I. LASER TARGETS (Curiosity) ---- */
  builders.laser = function (cfg) {
    var rnd = TL.RNG((Math.random() * 1e9) | 0);
    var targets = [], dusts = [], hit = 0, time = cfg.time, beam = 0, beamX = 0, beamY = 0;
    for (var i = 0; i < cfg.targets; i++) targets.push({ x: 140 + (i % 5) * 150 + rnd() * 40, y: 160 + Math.floor(i / 5) * 130 + rnd() * 50, hit: false });
    for (i = 0; i < 3; i++) dusts.push({ x: 200 + rnd() * 560, y: 150 + rnd() * 220 });
    var g = {
      update: function (dt) {
        time -= dt;
        beam = Math.max(0, beam - dt * 4);
        if (time <= 0) {
          MG.fail('Sol window closed. ChemCam needs clear line of sight — dust eats a full spectrum.');
          /* reset */
          targets.forEach(function (t2) { t2.hit = false; });
          hit = 0; time = cfg.time;
          return;
        }
        if (TL.mouse.clicked) {
          var mx = TL.mouse.x, my = TL.mouse.y, done = false;
          for (var i2 = 0; i2 < targets.length; i2++) {
            var t2 = targets[i2];
            if (!t2.hit && TL.dist(mx, my, t2.x, t2.y) < 30) {
              t2.hit = true; hit++;
              beam = 1; beamX = t2.x; beamY = t2.y;
              TL.audio.blip(1400, 0.07, 0.14); TL.audio.blip(700, 0.05, 0.2);
              done = true;
              break;
            }
          }
          if (!done) {
            for (var d2 = 0; d2 < dusts.length; d2++) {
              if (TL.dist(mx, my, dusts[d2].x, dusts[d2].y) < 26) {
                time = Math.max(0.1, time - 3);
                beam = 0.6; beamX = mx; beamY = my;
                TL.audio.deny();
                TL.toast('DUST -3s', '#f0a050');
                break;
              }
            }
          }
          if (hit >= cfg.targets) MG.win();
        }
      },
      draw: function (ctx) {
        frame(ctx, cfg.title, cfg.prompt);
        /* rock wall */
        ctx.fillStyle = '#5c3a26';
        ctx.fillRect(60, 100, TL.W - 120, TL.H - 220);
        ctx.fillStyle = '#6e4630';
        for (var i = 0; i < 26; i++) {
          var rx = 70 + (i * 97) % (TL.W - 150), ry = 110 + (i * 53) % (TL.H - 250);
          ctx.fillRect(rx, ry, 30 + (i * 31) % 40, 14 + (i * 17) % 18);
        }
        /* dust patches */
        for (var d2 = 0; d2 < dusts.length; d2++) {
          var du = dusts[d2];
          ctx.fillStyle = 'rgba(200,150,100,0.4)';
          ctx.beginPath(); ctx.ellipse(du.x, du.y, 24, 16, 0, 0, Math.PI * 2); ctx.fill();
          TL.text(ctx, 'DUST', du.x - 14, du.y - 5, 7, 'rgba(60,40,30,0.9)');
        }
        /* targets */
        for (i = 0; i < targets.length; i++) {
          var t3 = targets[i];
          if (t3.hit) {
            ctx.strokeStyle = '#7ef0c8'; ctx.lineWidth = 2;
            ctx.strokeRect(t3.x - 14, t3.y - 14, 28, 28);
            TL.text(ctx, '✓', t3.x - 5, t3.y - 7, 10, '#7ef0c8');
          } else {
            var p = 0.5 + 0.5 * Math.sin(MG.t * 4 + i);
            ctx.strokeStyle = 'rgba(240,160,80,' + (0.4 + p * 0.6) + ')';
            ctx.lineWidth = 2;
            ctx.strokeRect(t3.x - 12, t3.y - 12, 24, 24);
            ctx.fillStyle = 'rgba(240,160,80,0.5)';
            ctx.fillRect(t3.x - 3, t3.y - 3, 6, 6);
          }
        }
        /* beam */
        if (beam > 0) {
          ctx.save();
          ctx.globalAlpha = beam;
          ctx.strokeStyle = '#ff9060'; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(TL.W / 2, TL.H - 120); ctx.lineTo(beamX, beamY); ctx.stroke();
          ctx.strokeStyle = '#ffe0c0'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(TL.W / 2, TL.H - 120); ctx.lineTo(beamX, beamY); ctx.stroke();
          ctx.restore();
        }
        /* timer */
        TL.text(ctx, 'SOL WINDOW: ' + Math.ceil(time) + 's', TL.W - 90, 84, 10, time < 8 ? '#f0a050' : '#7ef0c8');
        TL.text(ctx, 'TARGETS: ' + hit + '/' + cfg.targets, 70, 84, 10, '#7ef0c8');
        /* targeting reticle at cursor */
        ctx.strokeStyle = 'rgba(255,144,96,0.8)'; ctx.lineWidth = 1;
        ctx.strokeRect(TL.mouse.x - 7.5, TL.mouse.y - 7.5, 15, 15);
        ctx.beginPath();
        ctx.moveTo(TL.mouse.x - 13, TL.mouse.y); ctx.lineTo(TL.mouse.x - 4, TL.mouse.y);
        ctx.moveTo(TL.mouse.x + 4, TL.mouse.y); ctx.lineTo(TL.mouse.x + 13, TL.mouse.y);
        ctx.moveTo(TL.mouse.x, TL.mouse.y - 13); ctx.lineTo(TL.mouse.x, TL.mouse.y - 4);
        ctx.moveTo(TL.mouse.x, TL.mouse.y + 4); ctx.lineTo(TL.mouse.x, TL.mouse.y + 13);
        ctx.stroke();
      }
    };
    g.targets = targets;
    return g;
  };

  /* ---- J. MOSAIC (Mariner 4 relay) ---- */
  function mosaicImage() {
    var cv = document.createElement('canvas');
    cv.width = 240; cv.height = 200;
    var c2 = cv.getContext('2d');
    /* sky */
    var g = c2.createLinearGradient(0, 0, 0, 110);
    g.addColorStop(0, '#1a1620'); g.addColorStop(1, '#3a2c24');
    c2.fillStyle = g; c2.fillRect(0, 0, 240, 110);
    /* ground */
    c2.fillStyle = '#6a5140'; c2.fillRect(0, 110, 240, 90);
    /* sun glare corner (like frame 1) */
    c2.fillStyle = 'rgba(240,230,210,0.85)';
    c2.beginPath(); c2.arc(214, 30, 26, 0, Math.PI * 2); c2.fill();
    c2.globalAlpha = 0.35;
    c2.beginPath(); c2.arc(214, 30, 46, 0, Math.PI * 2); c2.fill();
    c2.globalAlpha = 1;
    /* horizon haze */
    c2.fillStyle = 'rgba(180,150,120,0.25)';
    c2.fillRect(0, 100, 240, 14);
    /* big crater */
    c2.fillStyle = '#57422f';
    c2.beginPath(); c2.ellipse(110, 150, 78, 34, 0, 0, Math.PI * 2); c2.fill();
    c2.fillStyle = '#3e2e1f';
    c2.beginPath(); c2.ellipse(110, 156, 58, 24, 0, 0, Math.PI * 2); c2.fill();
    c2.fillStyle = '#8a6c50';
    c2.beginPath(); c2.ellipse(110, 128, 76, 14, 0, Math.PI, Math.PI * 2); c2.fill();
    /* small craters */
    [[36, 128, 14, 5], [190, 170, 20, 7], [60, 180, 12, 4]].forEach(function (cr) {
      c2.fillStyle = '#57422f';
      c2.beginPath(); c2.ellipse(cr[0], cr[1], cr[2], cr[3], 0, 0, Math.PI * 2); c2.fill();
      c2.fillStyle = '#8a6c50';
      c2.beginPath(); c2.ellipse(cr[0], cr[1] - cr[3] * 0.7, cr[2], cr[3] * 0.6, 0, Math.PI, Math.PI * 2); c2.fill();
    });
    /* pixel scan noise */
    c2.globalAlpha = 0.18;
    for (var i = 0; i < 400; i++) {
      c2.fillStyle = Math.random() > 0.5 ? '#000' : '#fff';
      c2.fillRect((Math.random() * 240) | 0, (Math.random() * 200) | 0, 2, 2);
    }
    c2.globalAlpha = 1;
    return cv;
  }
  builders.mosaic = function (cfg) {
    var img = mosaicImage();
    var cellW = 240 / cfg.cols, cellH = 200 / cfg.rows;   /* source tile size in the image */
    var rev = [], total = cfg.cols * cfg.rows;
    for (var i = 0; i < total; i++) rev.push(false);
    var revealed = 0, phase = 'dig', sel = -1;
    var gx = (TL.W - 240 - 320) / 2, gy = 130;
    var dw = cellW * 1.5, dh = cellH * 1.5; /* drawn cell size == grid pitch */
    var g = {
      update: function (dt) {
        if (phase === 'dig') {
          if (TL.mouse.clicked) {
            /* strict 1-to-1 mapping: the cell you click IS the piece you unlock.
               Grid pitch equals the drawn cell size (dw x dh), so cell (c, r)
               always reveals source tile (c, r) — never a random piece. */
            var c = Math.floor((TL.mouse.x - gx) / dw), r = Math.floor((TL.mouse.y - gy) / dh);
            if (c >= 0 && c < cfg.cols && r >= 0 && r < cfg.rows) {
              var idx = r * cfg.cols + c;
              if (!rev[idx]) {
                rev[idx] = true; revealed++;
                TL.audio.static(0.12, 0.06); TL.audio.blip(600 + idx * 12, 0.03, 0.05);
                if (revealed >= total) { phase = 'question'; TL.audio.chime(1.3); }
              }
            }
          }
        } else {
          for (var o = 0; o < cfg.options.length; o++) {
            var y = 160 + o * 44;
            if (TL.mouse.x > TL.W / 2 - 40 && TL.mouse.x < TL.W - 60 && TL.mouse.y > y && TL.mouse.y < y + 38 && TL.mouse.clicked) { sel = o; g.check(); }
            if (TL.hit(String(o + 1))) { sel = o; g.check(); }
          }
        }
      },
      check: function () {
        if (sel === cfg.answer) MG.win();
        else { MG.fail('The archive rejects that reading. Mariner 4 saw craters — and no canals.'); TL.audio.deny(); sel = -1; }
      },
      draw: function (ctx) {
        frame(ctx, cfg.title, cfg.prompt);
        for (var i = 0; i < total; i++) {
          var c = i % cfg.cols, r = Math.floor(i / cfg.cols);
          /* grid pitch == drawn cell size: each cell occupies exactly one
             dw x dh slot, so clicks map 1-to-1 onto pieces */
          var x = gx + c * dw, y = gy + r * dh;
          if (rev[i]) {
            ctx.drawImage(img, c * cellW, r * cellH, cellW, cellH, x, y, dw, dh);
          } else {
            ctx.fillStyle = '#0a1418';
            ctx.fillRect(x, y, dw - 2, dh - 2);
            var rr = TL.RNG(i * 7 + 3);
            ctx.fillStyle = 'rgba(120,220,200,0.25)';
            for (var n = 0; n < 6; n++) ctx.fillRect(x + rr() * (dw - 8), y + rr() * (dh - 8), 3, 2);
            /* packet index so the mapping is visible while decoding */
            TL.text(ctx, String(i + 1).padStart(2, '0'), x + 6, y + dh - 14, 6, 'rgba(140,220,200,0.5)');
          }
          ctx.strokeStyle = 'rgba(110,220,200,0.25)';
          ctx.strokeRect(x + 0.5, y + 0.5, dw - 1, dh - 1);
        }
        var gridH = cfg.rows * dh;
        TL.text(ctx, 'DATA PACKETS: ' + revealed + ' / ' + total, gx, gy + gridH + 12, 8, '#7ef0c8');
        TL.text(ctx, 'CLICK CELLS TO TRANSMIT', gx + 240, gy + gridH + 12, 8, '#5a8a7a');
        TL.text(ctx, 'SIGNAL 8½ bit/s · FRAME 11/22', TL.W - 60, gy + gridH + 12, 6, '#5a8a7a', 'right');
        if (phase === 'question') {
          TL.panel(ctx, TL.W / 2 - 40, 100, TL.W / 2 + 100, 340, {});
          var qLines = TL.wrap(ctx, cfg.question, TL.W / 2 + 20, 9);
          for (var q = 0; q < qLines.length; q++) TL.text(ctx, qLines[q], TL.W / 2 - 20, 116 + q * 14, 9, '#c8e8dc');
          for (var o2 = 0; o2 < cfg.options.length; o2++) {
            var y2 = 160 + o2 * 44;
            var hov = TL.mouse.x > TL.W / 2 - 40 && TL.mouse.x < TL.W - 60 && TL.mouse.y > y2 && TL.mouse.y < y2 + 38;
            TL.panel(ctx, TL.W / 2 - 20, y2, TL.W / 2 + 20, 38, { bg: 'rgba(8,22,28,0.92)', corner: hov ? '#7ef0c8' : '#3a7a6a' });
            var oLines = TL.wrap(ctx, cfg.options[o2], TL.W / 2, 8);
            TL.text(ctx, oLines[0], TL.W / 2 - 4, y2 + 6, 8, hov ? '#c8f0e4' : '#9fd8c8');
            if (oLines[1]) TL.text(ctx, oLines[1], TL.W / 2 + 8, y2 + 20, 8, hov ? '#c8f0e4' : '#9fd8c8');
          }
        }
      }
    };
    return g;
  };

  /* ================= MANAGER ================= */
  MG.start = function (id, cb) {
    var cfg = TL.D.MG[id] || TL.D.MG;
    var builder = builders[cfg.type];
    if (!builder) { if (cb) cb(); return; }
    MG.id = id; MG.cfg = cfg; MG.cb = cb;
    MG.game = builder(cfg);
    MG.t = 0; MG.msg = null; MG.msgT = 0;
    MG.success = false; MG.successT = 0;
    TL.G.mode = 'minigame';
    TL.audio.static(0.3, 0.06);
    TL.audio.blip(880, 0.06, 0.1);
  };
  MG.win = function () {
    if (MG.success) return;
    MG.success = true; MG.successT = 0;
    TL.audio.sting();
    TL.toast('ACTIVITY COMPLETE', '#7ef0c8');
  };
  MG.fail = function (msg) {
    MG.msg = msg; MG.msgT = 3.2;
  };
  MG.update = function (dt) {
    MG.t += dt;
    if (MG.msgT > 0) MG.msgT -= dt;
    if (MG.success) {
      MG.successT += dt;
      if (MG.successT > 1.8) {
        TL.G.mode = 'play';
        var cb = MG.cb; MG.cb = null;
        if (cb) cb();
      }
    } else if (MG.game) {
      MG.game.update(dt);
    }
    /* escape pauses mid-activity */
    if (TL.hit('escape')) {
      TL.G.pauseReturn = 'minigame';
      TL.G.setMode('pause');
      TL.audio.uiBack();
    }
  };
  MG.draw = function (ctx) {
    if (MG.game) MG.game.draw(ctx);
    if (MG.msgT > 0 && MG.msg) {
      ctx.save();
      ctx.globalAlpha = Math.min(1, MG.msgT);
      /* taller box + roomier leading so fail messages never crowd */
      var fw = 560;
      TL.panel(ctx, TL.W / 2 - fw / 2, TL.H - 104, fw, 64, { corner: '#f0a050', bg: 'rgba(30,16,8,0.92)' });
      var lines = TL.wrap(ctx, MG.msg, fw - 70, 8);
      for (var i = 0; i < lines.length; i++) TL.text(ctx, lines[i], TL.W / 2, TL.H - 92 + i * 14, 8, '#f0c090', 'center');
      ctx.restore();
    }
    if (MG.success) {
      ctx.save();
      ctx.globalAlpha = Math.min(1, MG.successT * 2);
      TL.panel(ctx, TL.W / 2 - 200, TL.H / 2 - 46, 400, 92, { corner: '#7ef0c8', bg: 'rgba(6,24,20,0.94)' });
      TL.text(ctx, '✔ ACTIVITY COMPLETE', TL.W / 2, TL.H / 2 - 30, 12, '#7ef0c8', 'center');
      TL.text(ctx, 'DATA LOGGED TO MISSION ARCHIVE', TL.W / 2, TL.H / 2 + 6, 8, '#9fd8c8', 'center');
      ctx.restore();
    }
    TL.staticOverlay(ctx, 0.06 + 0.04 * Math.sin(MG.t * 3));
  };

})(window.TL);
