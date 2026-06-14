/* nothing-ui · minimal vanilla JS */
const t_dark=document.getElementById('t-dark'),t_light=document.getElementById('t-light');
  function setTheme(t){document.documentElement.setAttribute('data-theme',t);t_dark.setAttribute('aria-pressed',t==='dark');t_light.setAttribute('aria-pressed',t==='light');}
  // spacing ruler
  const steps=[4,8,12,16,24,32,40,48,56,64,72,80,96,128];
  const ru=document.getElementById('ruler'),rc=document.getElementById('rulercap');
  steps.forEach(s=>{const i=document.createElement('i');i.style.height=Math.min(s/128*48,48)+'px';ru.appendChild(i);
    const c=document.createElement('span');c.textContent=s;rc.appendChild(c);});
  // calendar
  const cal=document.getElementById('cal');['Mo','Tu','We','Th','Fr','Sa','Su'].forEach(w=>{const e=document.createElement('div');e.className='wd';e.textContent=w;cal.appendChild(e);});
  for(let blank=0;blank<2;blank++){const e=document.createElement('div');cal.appendChild(e);}
  for(let d=1;d<=31;d++){const e=document.createElement('div');e.className='d';e.textContent=d;if(d===20)e.classList.add('today');if(d===8)e.classList.add('sel');cal.appendChild(e);}
  // icon library
  // dot-matrix icons — real 9×9 bitmaps, every '#' = one complete round dot
  const G={
    signal:['.......#.','.....#.#.','.....#.#.','...#.#.#.','...#.#.#.','...#.#.#.','.#.#.#.#.','.#.#.#.#.','.#.#.#.#.'],
    wifi:['..#####..','.#.....#.','#.......#','...###...','..#...#..','.........','....#....','.........','.........'],
    battery:['.........','.#######.','#.......#','#.#####.#','#.#####.#','#.#####.#','#.......#','.#######.','.........'],
    bell:['....#....','...###...','..#...#..','..#...#..','.#.....#.','.#.....#.','#########','.........','...###...'],
    search:['.#####...','#.....#..','#.....#..','#.....#..','.#####...','....##...','.....##..','......##.','.........'],
    gear:['...#.#...','.#######.','.#.....#.','.#.###.#.','##.#.#.##','.#.###.#.','.#.....#.','.#######.','...#.#...'],
    heart:['.##...##.','####.####','#########','#########','#########','.#######.','..#####..','...###...','....#....'],
    star:['....#....','...###...','...###...','#########','.#######.','..#####..','.##.#.##.','.#.....#.','.........'],
    play:['..#......','..##.....','..###....','..####...','..#####..','..####...','..###....','..##.....','..#......'],
    pause:['.##...##.','.##...##.','.##...##.','.##...##.','.##...##.','.##...##.','.##...##.','.##...##.','.##...##.'],
    lock:['..#####..','.#.....#.','.#.....#.','#########','####.####','###.#.###','###.#.###','####.####','#########'],
    clock:['.#######.','#.......#','#...#...#','#...#...#','#...####.','#.......#','#.......#','#.......#','.#######.'],
    home:['....#....','...###...','..#####..','.#######.','#########','.#.....#.','.#.###.#.','.#.#.#.#.','.#.#.#.#.'],
    user:['...###...','..#...#..','..#...#..','..#...#..','...###...','.#######.','#########','#########','#########'],
    music:['.....###.','....####.','....#..#.','....#..#.','....#..#.','.##.#..#.','###.#..#.','.#...##..','.........'],
    camera:['.........','..##.####','#########','#..###..#','#.#####.#','#.#####.#','#..###..#','#########','.........'],
    grid:['####.####','####.####','####.####','####.####','.........','####.####','####.####','####.####','####.####'],
    plus:['....#....','....#....','....#....','....#....','#########','....#....','....#....','....#....','....#....'],
    check:['.........','........#','.......##','......##.','#....##..','##..##...','.####....','..##.....','.........'],
    close:['#.......#','##.....##','.##...##.','..##.##..','...###...','..##.##..','.##...##.','##.....##','#.......#'],
    power:['....#....','..#.#.#..','.#..#..#.','#...#...#','#.......#','#.......#','.#.....#.','..#...#..','...###...'],
    more:['.........','.........','.........','.........','#...#...#','.........','.........','.........','.........'],
    folder:['.........','.###.....','#...#....','#########','#.......#','#.......#','#.......#','#########','.........'],
    up:['....#....','...###...','..#.#.#..','.#..#..#.','#...#...#','....#....','....#....','....#....','....#....'],
    sun:['....#....','#...#...#','..#####..','.#######.','#######.#','.#######.','..#####..','#...#...#','....#....'],
    moon:['...###...','..##.....','.##......','.#.......','.#.......','.#.......','.##......','..##.....','...###...'],
    cloud:['.........','...###...','..#...##.','.#.....#.','#.......##','#........#','##########','.........','.........'],
    mail:['.........','#########','##.....##','#.#...#.#','#..#.#..#','#...#...#','#.......#','#########','.........'],
    calendar:['.#.....#.','#########','#.......#','#.#.#.#.#','#.......#','#.#.#.#.#','#.......#','#########','.........'],
    trash:['..#####..','.#.....#.','#########','.#.#.#.#.','.#.#.#.#.','.#.#.#.#.','.#.#.#.#.','..#####..','.........'],
    eye:['.........','..#####..','.#.....#.','#..###..#','#.#####.#','#..###..#','.#.....#.','..#####..','.........'],
    bolt:['...###...','..##.....','.##......','#######..','....##...','...##....','..##.....','.##......','#........'],
    download:['....#....','....#....','....#....','#...#...#','.#..#..#.','..#.#.#..','...###...','....#....','#########'],
    mappin:['...###...','..#...#..','.#.....#.','.#.....#.','..#...#..','...#.#...','....#....','....#....','....#....'],
    chat:['#########','#.......#','#.#.#.#.#','#.......#','#########','...##....','..##.....','.#.......','.........']
  };
  function gico(name){let h='<span class="gico">';(G[name]||[]).forEach(r=>{for(const c of r)h+=(c==='#'?'<i class="on"></i>':'<i></i>');});return h+'</span>';}
  const sysList=['signal','wifi','battery','bell','search','gear','heart','star','play','lock','clock','home','user','music','camera','grid'];
  const sys=document.getElementById('sysico');
  sysList.forEach(n=>{const s=document.createElement('span');s.className='i';s.innerHTML=gico(n);sys.appendChild(s);});
  const lib=document.getElementById('iconlib');
  Object.keys(G).forEach(n=>{const s=document.createElement('span');s.className='i';s.innerHTML=gico(n);lib.appendChild(s);});
  // inline dot-icons via [data-dot] (empty state, dropzone, …) — fill existing .gico hosts
  document.querySelectorAll('[data-dot]').forEach(el=>{const r=G[el.getAttribute('data-dot')];if(!r)return;let h='';r.forEach(row=>{for(const c of row)h+=(c==='#'?'<i class="on"></i>':'<i></i>');});el.innerHTML=h;});
  // === Glyph Matrix · authentic 25×25 circular-masked panel ===
  // each glyph is a geometric function (x,y,c)->bool on a 25×25 grid, masked to a circle.
  const GMX = [
    {name:'power', sig:false, fn:(x,y,c)=>{const d=Math.hypot(x-c,y-c);
      const ring=d>=6.5&&d<=8.4&&!(y<c-1&&Math.abs(x-c)<=2.3);
      const bar=Math.abs(x-c)<=1&&y>=c-9&&y<=c-0.5; return ring||bar;}},
    {name:'play', sig:false, fn:(x,y,c)=>{const rx=x-(c-6); if(rx<0||x>c+7)return false; return Math.abs(y-c)<=(13-rx)/13*7;}},
    {name:'heart', sig:false, fn:(x,y,c)=>{const X=(x-c)/7.6,Y=-(y-c-1.6)/7.6; return Math.pow(X*X+Y*Y-1,3)-X*X*Y*Y*Y<=0;}},
    {name:'live', sig:true, fn:(x,y,c)=>Math.hypot(x-c,y-c)<=6},
    {name:'arrow', sig:false, fn:(x,y,c)=>{const bar=Math.abs(x-c)<=1&&y>=c-3&&y<=c+8;
      const head=y>=c-9&&y<=c-3&&Math.abs(x-c)<=(y-(c-9)); return bar||head;}},
    {name:'sound', sig:false, fn:(x,y,c)=>{const cols={[c-8]:4,[c-4]:8,[c]:6,[c+4]:9,[c+8]:3};
      for(const k in cols){if(Math.abs(x-(+k))<=1&&y<=c+8&&y>=c+8-cols[k])return true;} return false;}},
    {name:'smiley', sig:false, fn:(x,y,c)=>{const d=Math.hypot(x-c,y-c);
      const ring=d>=9.5&&d<=11; const eyes=Math.hypot(x-(c-4),y-(c-3))<=1.4||Math.hypot(x-(c+4),y-(c-3))<=1.4;
      const md=Math.hypot(x-c,y-(c-2)); const smile=md>=6&&md<=7.3&&y>c+1; return ring||eyes||smile;}},
    {name:'plus', sig:false, fn:(x,y,c)=>(Math.abs(x-c)<=1&&Math.abs(y-c)<=8)||(Math.abs(y-c)<=1&&Math.abs(x-c)<=8)}
  ];
  const gmxHost=document.getElementById('gmx');
  if(gmxHost){const N=25,c=12,R=12.3;
    GMX.forEach(g=>{let h='';
      for(let y=0;y<N;y++)for(let x=0;x<N;x++){
        if(Math.hypot(x-c,y-c)>R){h+='<i class="void"></i>';continue;}
        h+= g.fn(x,y,c)?`<i class="${g.sig?'sig':'on'}"></i>`:'<i class="off"></i>';
      }
      const cell=document.createElement('div');cell.className='gmx-cell';
      cell.innerHTML=`<div class="gmx">${h}</div><span class="label">${g.name}</span>`;
      gmxHost.appendChild(cell);});
  }
  // scalable 9×9 demo — same glyph at increasing --gs sizes
  const gsc=document.getElementById('gicoscale');
  if(gsc){[16,24,34,48].forEach(px=>{const s=document.createElement('span');s.innerHTML=gico('gear');s.firstChild.style.setProperty('--gs',px+'px');gsc.appendChild(s);});}
  // segmented bars
  function seg(id,total,filled,color){const el=document.getElementById(id);if(!el)return;for(let i=0;i<total;i++){const s=document.createElement('i');s.style.background=i<filled?color:'var(--line)';el.appendChild(s);}}
  seg('card-seg',16,12,'var(--display)'); // module 13 (Cards) battery segbar

  /* ===== interactive components — click to activate. State changes reuse the existing
     `.on` / `.sel` inversion classes only; never introduces a new color. ===== */
  document.addEventListener('click',e=>{
    // single active among siblings: tabs, pill tabs, segmented, button group, nav bar
    const seg=e.target.closest('.tabs span,.tabpills span,.seg button,.bgroup .btn,.navbar .i,.appscreen .rail .r-i');
    if(seg&&seg.parentElement){[...seg.parentElement.children].forEach(c=>c.classList&&c.classList.remove('on'));seg.classList.add('on');}
    // pagination — numeric pages only (skip arrows / ellipsis)
    const pg=e.target.closest('.pager a');
    if(pg&&/^\d+$/.test(pg.textContent.trim())){pg.parentElement.querySelectorAll('a').forEach(a=>a.classList.remove('on'));pg.classList.add('on');}
    // chips & tags toggle (skip inline-styled status chips like ● CONNECTED)
    const chip=e.target.closest('.chip,.tag'); if(chip&&!chip.getAttribute('style')) chip.classList.toggle('on');
    // calendar day select (leave today's marker)
    const day=e.target.closest('.cal .grid .d');
    if(day&&!day.classList.contains('today')){day.parentElement.querySelectorAll('.d.sel').forEach(d=>d.classList.remove('sel'));day.classList.add('sel');}
    // rating — fill up to the clicked dot
    const star=e.target.closest('.rate i');
    if(star){const s=[...star.parentElement.children],idx=s.indexOf(star);s.forEach((x,k)=>x.classList.toggle('on',k<=idx));}
    // tree node select
    const node=e.target.closest('.tree .n');
    if(node){node.closest('.tree').querySelectorAll('.n.sel').forEach(n=>n.classList.remove('sel'));node.classList.add('sel');}
    // checkbox toggle (inject / remove the dot-matrix check)
    const box=e.target.closest('.box');
    if(box){box.classList.toggle('on');box.innerHTML=box.classList.contains('on')?'<svg class="ico sm" style="width:12px;height:12px"><use href="#i-check"/></svg>':'';}
    // radio select within its module
    const rdo=e.target.closest('.rdo');
    if(rdo){(rdo.closest('.mod')||document).querySelectorAll('.rdo').forEach(r=>r.classList.remove('on'));rdo.classList.add('on');}
  });
  // number stepper +/-
  document.querySelectorAll('.nstep').forEach(ns=>{const v=ns.querySelector('.v'),b=ns.querySelectorAll('button');
    if(b[0])b[0].onclick=()=>v.textContent=Math.max(0,(+v.textContent||0)-1);
    if(b[1])b[1].onclick=()=>v.textContent=(+v.textContent||0)+1;});

  /* Applied · Workspace screen: the deploying-row progress + live dot are pure CSS;
     rail nav / tabs / pagination are handled by the delegated click handler above. */

  /* ===== additional dynamic components (41–46) ===== */
  // 41 rotary knob — vertical drag, value 0–100, indicator rotates -135°…135°
  const knob=document.getElementById('knob'),knobval=document.getElementById('knobval');
  if(knob&&knobval){let v=50,drag=false,sy=0,sv=50;
    const set=x=>{v=Math.max(0,Math.min(100,x));knob.style.setProperty('--a',(-135+v/100*270)+'deg');knobval.textContent=Math.round(v);};
    set(50);
    knob.addEventListener('pointerdown',e=>{drag=true;sy=e.clientY;sv=v;knob.setPointerCapture(e.pointerId);});
    knob.addEventListener('pointermove',e=>{if(drag)set(sv+(sy-e.clientY)*0.7);});
    const stop=()=>drag=false;knob.addEventListener('pointerup',stop);knob.addEventListener('pointercancel',stop);}

  // 42 dot-matrix spinner — 8 dots on a ring, staggered fade
  const dspin=document.getElementById('dspin');
  if(dspin){for(let i=0;i<8;i++){const d=document.createElement('i');
    d.style.transform='rotate('+(i*45)+'deg) translateY(-19px)';d.style.animationDelay=(i/8)+'s';dspin.appendChild(d);}}

  // 43 verification (OTP) input — auto-advance, backspace-back, success when full
  const otp=document.getElementById('otp');
  if(otp){const ins=[...otp.querySelectorAll('input')];
    ins.forEach((inp,i)=>{
      inp.addEventListener('input',()=>{inp.value=inp.value.replace(/\D/g,'').slice(0,1);
        if(inp.value&&i<ins.length-1)ins[i+1].focus();
        otp.classList.toggle('done',ins.every(x=>x.value));});
      inp.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!inp.value&&i>0)ins[i-1].focus();});
    });}

  // 44 live counter — count up with easing when scrolled into view
  document.querySelectorAll('.ticker .tval[data-to]').forEach(el=>{const to=+el.getAttribute('data-to');
    const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){let s=null;const D=1200;
      const step=t=>{if(!s)s=t;const k=Math.min(1,(t-s)/D);const e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;
        el.textContent=Math.round(to*e);if(k<1)requestAnimationFrame(step);else el.textContent=to;};
      requestAnimationFrame(step);io.disconnect();}}),{threshold:.6});io.observe(el);});

  // 45 activity stream — mono log lines appended live, newest on top
  const stream=document.getElementById('stream');
  if(stream){const L=[['user.auth · session opened',0],['build #482 · passed',0],['agent-core · 3 files changed',0],['rate limit · 12% used',0],['deploy · review required',1],['cache · purged',0],['webhook · delivered',0],['db · migration applied',0]];
    let i=0;const pad=n=>String(n).padStart(2,'0');
    const push=()=>{const d=new Date();const t=pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds());const[m,sig]=L[i++%L.length];
      const row=document.createElement('div');row.className='s-l'+(sig?' sig':'');row.innerHTML='<span class="t">'+t+'</span>'+m;
      stream.prepend(row);while(stream.children.length>7)stream.removeChild(stream.lastChild);};
    for(let k=0;k<6;k++)push();setInterval(push,1900);}

  // 46 copy field — click → "Copied" inline confirm
  document.querySelectorAll('.cbtn[data-copy]').forEach(b=>b.addEventListener('click',()=>{
    const t=b.getAttribute('data-copy');try{navigator.clipboard&&navigator.clipboard.writeText(t);}catch(_){}
    const o=b.textContent;b.textContent='Copied';b.classList.add('ok');
    setTimeout(()=>{b.textContent=o;b.classList.remove('ok');},1200);}));
