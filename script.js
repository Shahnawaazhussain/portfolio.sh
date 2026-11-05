/* ===== WORK FILTER: show/hide projects by tag ===== */
document.querySelectorAll('.filters button').forEach(function(b){b.onclick=function(){
document.querySelectorAll('.filters button').forEach(function(x){x.classList.remove('on')});b.classList.add('on');
document.querySelectorAll('.project').forEach(function(p){p.style.display=(b.dataset.f==='all'||p.dataset.t.indexOf(b.dataset.f)>-1)?'':'none'})}});
/* ===== TICKER + SCROLL REVEAL: duplicate ticker text, fade sections in ===== */
try{var t=document.querySelector('.ticker'),s=t.textContent.trim()+'　';t.innerHTML='<div class="mq"><span>'+s+'</span><span>'+s+'</span><span>'+s+'</span><span>'+s+'</span></div>';
var els=document.querySelectorAll('.heading,.project,.timeline article,.skills div,.sgrid div,.bio,.steps span,.cgrid>div,.contact h2,.about h2');
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
els.forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=((i%4)*70)+'ms';io.observe(el)})}}catch(e){}
/* ===== THEME TOGGLE: light / dark ===== */
document.getElementById('theme').onclick=function(){var r=document.documentElement,d=matchMedia('(prefers-color-scheme: dark)').matches;
var c=r.dataset.theme||(d?'dark':'light');r.dataset.theme=c==='dark'?'light':'dark'};
/* ===== ENQUIRY FORM: builds an email and opens the mail app ===== */
document.getElementById('f').onsubmit=function(e){e.preventDefault();var f=e.target;
var body='Name: '+f.n.value+'\nEmail: '+f.e.value+'\nProject: '+f.t.value+'\nBudget: '+f.b.value+'\n\n'+f.m.value;
location.href='mailto:shahnawaaz2001@gmail.com?subject='+encodeURIComponent('Portfolio enquiry from '+f.n.value)+'&body='+encodeURIComponent(body);
document.getElementById('ok').textContent='THANKS! YOUR EMAIL APP SHOULD OPEN TO SEND THIS.'};
/* ===== MOBILE MENU: hamburger toggle; closes on link click, Esc or resize ===== */
var mb=document.getElementById('menu'),mn=document.getElementById('mobnav');
function tm(o){mb.classList.toggle('open',o);mn.classList.toggle('open',o);mb.setAttribute('aria-expanded',o);mb.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.classList.toggle('noscroll',o)}
mb.onclick=function(){tm(!mn.classList.contains('open'))};
mn.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){tm(false)})});
addEventListener('keydown',function(e){if(e.key==='Escape')tm(false)});
addEventListener('resize',function(){if(innerWidth>800)tm(false)});
document.getElementById('theme2').onclick=function(){document.getElementById('theme').click()};

/* ===== SCROLL PROGRESS BAR: thin orange line at the top ===== */
var pg=document.createElement('div');pg.className='prog';document.body.appendChild(pg);
function prog(){var h=document.documentElement,m=h.scrollHeight-innerHeight;pg.style.transform='scaleX('+(m>0?h.scrollTop/m:0)+')'}
addEventListener('scroll',prog,{passive:true});prog();

/* ===== ACTIVE NAV LINK: highlights the section in view ===== */
try{var map={};document.querySelectorAll('.links a[href^="#"]').forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
var so=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){Object.keys(map).forEach(function(k){map[k].classList.toggle('act',k===x.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
Object.keys(map).forEach(function(k){var s=document.getElementById(k);if(s)so.observe(s)})}catch(e){}

/* ===== IMAGES: project cover thumbnails =====
   Paste an image into COVERS as a data: URI to make it permanent for everyone
   (published pages can only load embedded images, not outside links).
   Quick preview: open this page with #edit at the end of the link, then use
   SET COVER on a project. That is saved in your own browser only. */
var COVERS={mecworks:'',campus:'',movieflix:''};
function setCover(k,src){var v=document.querySelector('[data-cover="'+k+'"]');if(!v)return;var im=v.querySelector('.cover');
if(!src){if(im)im.remove();v.classList.remove('hascover');return}
if(!im){im=document.createElement('img');im.className='cover';im.alt=k+' project cover';v.insertBefore(im,v.firstChild)}
im.src=src;v.classList.add('hascover')}
function shrink(file,cb){var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var sc=Math.min(1,1600/im.width),c=document.createElement('canvas');c.width=im.width*sc;c.height=im.height*sc;c.getContext('2d').drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.85))};im.src=r.result};r.readAsDataURL(file)}
function editMode(){document.querySelectorAll('.covtools').forEach(function(x){x.remove()});if(location.hash!=='#edit')return;
document.querySelectorAll('[data-cover]').forEach(function(v){var k=v.dataset.cover,d=document.createElement('div');d.className='covtools';
var a=document.createElement('button');a.type='button';a.textContent='SET COVER';
var b=document.createElement('button');b.type='button';b.textContent='CLEAR';
var inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.hidden=true;
inp.onclick=function(e){e.stopPropagation()};
a.onclick=function(e){e.preventDefault();e.stopPropagation();inp.click()};
inp.onchange=function(){if(inp.files[0])shrink(inp.files[0],function(u){setCover(k,u);try{localStorage.setItem('cover:'+k,u)}catch(x){alert('That image is too large to save in this browser.')}})};
b.onclick=function(e){e.preventDefault();e.stopPropagation();try{localStorage.removeItem('cover:'+k)}catch(x){}setCover(k,COVERS[k])};
d.appendChild(a);d.appendChild(b);d.appendChild(inp);v.appendChild(d)})}
Object.keys(COVERS).forEach(function(k){var s=COVERS[k];try{s=localStorage.getItem('cover:'+k)||s}catch(e){}if(s)setCover(k,s)});
addEventListener('hashchange',editMode);editMode();