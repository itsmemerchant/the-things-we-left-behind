const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
(async () => {
  const fs = require('node:fs');
  const server = require('node:http').createServer((req,res)=>{
    if(req.url==='/favicon.ico') { res.writeHead(204); res.end(); return; }
    const file=path.join(__dirname,'..',decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));
    fs.readFile(file,(err,data)=>{if(err){console.log('MISSING',req.url);res.writeHead(404);res.end();return;}
      const ext=path.extname(file); res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.png':'image/png','.jpg':'image/jpeg'})[ext]||'application/octet-stream');res.end(data);});
  }).listen(8766,'127.0.0.1');
  server.unref();
  const browser = await chromium.launch({executablePath:process.env.MOBILE_TEST_BROWSER || undefined,headless:true});
  const errors = [];
  for (const [width,height,touch] of [[390,844,true],[844,390,true],[320,568,true],[667,375,true],[1024,768,true],[1440,900,false]]) {
    const context = await browser.newContext({viewport:{width,height},hasTouch:touch,isMobile:touch});
    const page = await context.newPage();
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error' && !m.text().includes('net::')) errors.push(m.text());});
    await page.goto('http://127.0.0.1:8766');
    await page.waitForFunction(()=>window.TL && TL.G);
    await page.waitForTimeout(300);
    const layout = await page.evaluate(()=>{
      const r = TL.canvas.getBoundingClientRect();
      return {canvas:[r.x,r.y,r.right,r.bottom], buttons:[...document.querySelectorAll('#touch button')].filter(e=>e.getBoundingClientRect().width).map(e=>{const r=e.getBoundingClientRect();return [r.x,r.y,r.width,r.height]}),w:innerWidth,h:innerHeight};
    });
    assert(layout.canvas[0]>=-1 && layout.canvas[1]>=-1 && layout.canvas[2]<=width+1 && layout.canvas[3]<=height+1,JSON.stringify(layout));
    if(touch) for(const b of layout.buttons) assert(b[2]>=44 && b[3]>=44 && b[0]>=0 && b[1]>=0 && b[0]+b[2]<=width+1 && b[1]+b[3]<=height+1,JSON.stringify(b));
    if(width===390) {
      await page.locator('[data-key="arrowdown"]').tap();
      await page.waitForTimeout(60);
      assert.equal(await page.evaluate(()=>TL.Title.sel),1);
      await page.locator('#t-act').tap();
      await page.waitForTimeout(60);
      assert.equal(await page.evaluate(()=>TL.G.mode),'archive');
      await page.locator('#t-back').tap();
      await page.waitForTimeout(60);
      assert.equal(await page.evaluate(()=>TL.G.mode),'title');
      // Start a real world and test simultaneous touch key ownership, release and pause.
      await page.evaluate(()=>{TL.G.enterArea('chryse',120);TL.G.setMode('play');});
      await page.waitForTimeout(60);
      // Synthetic pointer capture is not supported: use CDP for actual multitouch.
      const cdp = await context.newCDPSession(page);
      const boxes = await Promise.all(['[data-key="arrowright"]','#t-jump'].map(s=>page.locator(s).boundingBox()));
      const points=boxes.map((r,i)=>({x:r.x+r.width/2,y:r.y+r.height/2,id:i+1}));
      await page.evaluate(()=>TL.clearInput());
      await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:points});
      await page.waitForTimeout(60);
      assert(await page.evaluate(()=>TL.right() && TL.key('space')));
      await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      await page.waitForTimeout(60);
      assert(await page.evaluate(()=>!TL.right() && !TL.key('space')));
      await page.locator('#t-back').tap(); await page.waitForTimeout(60);
      assert.equal(await page.evaluate(()=>TL.G.mode),'pause');
      await page.locator('#t-back').tap(); await page.waitForTimeout(60);
      assert.equal(await page.evaluate(()=>TL.G.mode),'play');
      // Touch slider drag through the common canvas pointer pipeline.
      await page.evaluate(()=>{TL.G.settingsBack='play';TL.G.setMode('settings');});
      const r=await page.locator('#game').boundingBox();
      const point=(x,y)=>({x:r.x+x*r.width/960,y:r.y+y*r.height/540,id:1});
      await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point(440,176)]});
      await page.waitForTimeout(60);
      await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[point(640,176)]});
      await page.waitForTimeout(60);
      await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      assert(await page.evaluate(()=>TL.S.settings.vol>0.85 && !TL.mouse.down));
      await page.locator('#t-zoom').tap();
      assert.equal(await page.locator('#t-zoom').getAttribute('aria-pressed'),'true');
      assert.equal(await page.locator('#game').evaluate(e=>e.getBoundingClientRect().width),960);
      await page.locator('#t-zoom').tap();
      await page.screenshot({path:path.join(require('node:os').tmpdir(),'ttlb-mobile-portrait.png')});
      // Every activity still constructs and runs with the shared touch controls.
      const activities=await page.evaluate(()=>Object.keys(TL.D.MG));
      for(const id of activities) {
        await page.evaluate(id=>TL.MG.start(id,()=>{}),id);
        await page.waitForTimeout(60);
        assert.equal(await page.evaluate(()=>TL.G.mode),'minigame',id);
      }
      console.log('PASS activity smoke checks:',activities.length);
      await page.evaluate(()=>{TL.MG.game=null;TL.Slides.open(Object.keys(TL.D.ARCHIVES)[0],'archive');});
      await page.waitForTimeout(100);
      const mute=await page.evaluate(()=>TL.S.settings.mute);
      await page.locator('#t-act').tap(); await page.waitForTimeout(60);
      assert.equal(await page.evaluate(()=>TL.Slides.slide),1);
      await page.locator('#t-jump').tap(); await page.waitForTimeout(60);
      assert.equal(await page.evaluate(()=>TL.Slides.slide),0);
      await page.locator('#t-back').tap(); await page.waitForTimeout(60);
      assert.equal(await page.evaluate(()=>TL.G.mode),'archive');
    }
    if(width===844) await page.screenshot({path:path.join(require('node:os').tmpdir(),'ttlb-mobile-landscape.png')});
    console.log(`PASS ${width}x${height} ${touch?'touch':'desktop'}`);
    await context.close();
  }
  await browser.close();
  assert.deepEqual(errors,[]);
})().catch(e=>{console.error(e);process.exit(1);});
