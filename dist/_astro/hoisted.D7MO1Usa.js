function Kt(t,e){t.indexOf(e)===-1&&t.push(e)}const Et=(t,e,n)=>Math.min(Math.max(n,t),e),b={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},V=t=>typeof t=="number",R=t=>Array.isArray(t)&&!V(t[0]),zt=(t,e,n)=>{const r=e-t;return((n-t)%r+r)%r+t};function Yt(t,e){return R(t)?t[zt(0,t.length,e)]:t}const Tt=(t,e,n)=>-n*t+n*e+t,At=()=>{},S=t=>t,et=(t,e,n)=>e-t===0?1:(n-t)/(e-t);function St(t,e){const n=t[t.length-1];for(let r=1;r<=e;r++){const s=et(0,e,r);t.push(Tt(n,1,s))}}function Gt(t){const e=[0];return St(e,t-1),e}function Zt(t,e=Gt(t.length),n=S){const r=t.length,s=r-e.length;return s>0&&St(e,s),i=>{let a=0;for(;a<r-2&&!(i<e[a+1]);a++);let c=Et(0,1,et(e[a],e[a+1],i));return c=Yt(n,a)(c),Tt(t[a],t[a+1],c)}}const Lt=t=>Array.isArray(t)&&V(t[0]),Z=t=>typeof t=="object"&&!!t.createAnimation,O=t=>typeof t=="function",Jt=t=>typeof t=="string",C={ms:t=>t*1e3,s:t=>t/1e3},Pt=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,Qt=1e-7,te=12;function ee(t,e,n,r,s){let i,a,c=0;do a=e+(n-e)/2,i=Pt(a,r,s)-t,i>0?n=a:e=a;while(Math.abs(i)>Qt&&++c<te);return a}function k(t,e,n,r){if(t===e&&n===r)return S;const s=i=>ee(i,0,1,t,n);return i=>i===0||i===1?i:Pt(s(i),e,r)}const ne=(t,e="end")=>n=>{n=e==="end"?Math.min(n,.999):Math.max(n,.001);const r=n*t,s=e==="end"?Math.floor(r):Math.ceil(r);return Et(0,1,s/t)},re={ease:k(.25,.1,.25,1),"ease-in":k(.42,0,1,1),"ease-in-out":k(.42,0,.58,1),"ease-out":k(0,0,.58,1)},se=/\((.*?)\)/;function lt(t){if(O(t))return t;if(Lt(t))return k(...t);const e=re[t];if(e)return e;if(t.startsWith("steps")){const n=se.exec(t);if(n){const r=n[1].split(",");return ne(parseFloat(r[0]),r[1].trim())}}return S}class Dt{constructor(e,n=[0,1],{easing:r,duration:s=b.duration,delay:i=b.delay,endDelay:a=b.endDelay,repeat:c=b.repeat,offset:o,direction:u="normal",autoplay:l=!0}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=S,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((d,w)=>{this.resolve=d,this.reject=w}),r=r||b.easing,Z(r)){const d=r.createAnimation(n);r=d.easing,n=d.keyframes||n,s=d.duration||s}this.repeat=c,this.easing=R(r)?S:lt(r),this.updateDuration(s);const h=Zt(n,o,R(r)?r.map(lt):S);this.tick=d=>{var w;i=i;let y=0;this.pauseTime!==void 0?y=this.pauseTime:y=(d-this.startTime)*this.rate,this.t=y,y/=1e3,y=Math.max(y-i,0),this.playState==="finished"&&this.pauseTime===void 0&&(y=this.totalDuration);const f=y/this.duration;let m=Math.floor(f),v=f%1;!v&&f>=1&&(v=1),v===1&&m--;const q=m%2;(u==="reverse"||u==="alternate"&&q||u==="alternate-reverse"&&!q)&&(v=1-v);const I=y>=this.totalDuration?1:Math.min(v,1),P=h(this.easing(I));e(P),this.pauseTime===void 0&&(this.playState==="finished"||y>=this.totalDuration+a)?(this.playState="finished",(w=this.resolve)===null||w===void 0||w.call(this,P)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},l&&this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class ie{setAnimation(e){this.animation=e,e?.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const z=new WeakMap;function xt(t){return z.has(t)||z.set(t,{transforms:[],values:new Map}),z.get(t)}function oe(t,e){return t.has(e)||t.set(e,new ie),t.get(e)}const ae=["","X","Y","Z"],ce=["translate","scale","rotate","skew"],H={x:"translateX",y:"translateY",z:"translateZ"},ut={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},le={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:ut,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:S},skew:ut},_=new Map,nt=t=>`--motion-${t}`,B=["x","y","z"];ce.forEach(t=>{ae.forEach(e=>{B.push(t+e),_.set(nt(t+e),le[t])})});const ue=(t,e)=>B.indexOf(t)-B.indexOf(e),de=new Set(B),Rt=t=>de.has(t),fe=(t,e)=>{H[e]&&(e=H[e]);const{transforms:n}=xt(t);Kt(n,e),t.style.transform=he(n)},he=t=>t.sort(ue).reduce(me,"").trim(),me=(t,e)=>`${t} ${e}(var(${nt(e)}))`,J=t=>t.startsWith("--"),dt=new Set;function pe(t){if(!dt.has(t)){dt.add(t);try{const{syntax:e,initialValue:n}=_.has(t)?_.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:n})}catch{}}}const Y=(t,e)=>document.createElement("div").animate(t,e),ft={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{Y({opacity:[1]})}catch{return!1}return!0},finished:()=>!!Y({opacity:[0,1]},{duration:.001}).finished,linearEasing:()=>{try{Y({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},G={},x={};for(const t in ft)x[t]=()=>(G[t]===void 0&&(G[t]=ft[t]()),G[t]);const ge=.015,ye=(t,e)=>{let n="";const r=Math.round(e/ge);for(let s=0;s<r;s++)n+=t(et(0,r-1,s))+", ";return n.substring(0,n.length-2)},ht=(t,e)=>O(t)?x.linearEasing()?`linear(${ye(t,e)})`:b.easing:Lt(t)?we(t):t,we=([t,e,n,r])=>`cubic-bezier(${t}, ${e}, ${n}, ${r})`;function ve(t,e){for(let n=0;n<t.length;n++)t[n]===null&&(t[n]=n?t[n-1]:e());return t}const be=t=>Array.isArray(t)?t:[t];function Q(t){return H[t]&&(t=H[t]),Rt(t)?nt(t):t}const N={get:(t,e)=>{e=Q(e);let n=J(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!n&&n!==0){const r=_.get(e);r&&(n=r.initialValue)}return n},set:(t,e,n)=>{e=Q(e),J(e)?t.style.setProperty(e,n):t.style[e]=n}};function Ot(t,e=!0){if(!(!t||t.playState==="finished"))try{t.stop?t.stop():(e&&t.commitStyles(),t.cancel())}catch{}}function Ee(t,e){var n;let r=e?.toDefaultUnit||S;const s=t[t.length-1];if(Jt(s)){const i=((n=s.match(/(-?[\d.]+)([a-z%]*)/))===null||n===void 0?void 0:n[2])||"";i&&(r=a=>a+i)}return r}function Te(){return window.__MOTION_DEV_TOOLS_RECORD}function Ae(t,e,n,r={},s){const i=Te(),a=r.record!==!1&&i;let c,{duration:o=b.duration,delay:u=b.delay,endDelay:l=b.endDelay,repeat:h=b.repeat,easing:d=b.easing,persist:w=!1,direction:y,offset:f,allowWebkitAcceleration:m=!1,autoplay:v=!0}=r;const q=xt(t),I=Rt(e);let P=x.waapi();I&&fe(t,e);const E=Q(e),$=oe(q.values,E),T=_.get(E);return Ot($.animation,!(Z(d)&&$.generator)&&r.record!==!1),()=>{const U=()=>{var p,M;return(M=(p=N.get(t,E))!==null&&p!==void 0?p:T?.initialValue)!==null&&M!==void 0?M:0};let g=ve(be(n),U);const ct=Ee(g,T);if(Z(d)){const p=d.createAnimation(g,e!=="opacity",U,E,$);d=p.easing,g=p.keyframes||g,o=p.duration||o}if(J(E)&&(x.cssRegisterProperty()?pe(E):P=!1),I&&!x.linearEasing()&&(O(d)||R(d)&&d.some(O))&&(P=!1),P){T&&(g=g.map(L=>V(L)?T.toDefaultUnit(L):L)),g.length===1&&(!x.partialKeyframes()||a)&&g.unshift(U());const p={delay:C.ms(u),duration:C.ms(o),endDelay:C.ms(l),easing:R(d)?void 0:ht(d,o),direction:y,iterations:h+1,fill:"both"};c=t.animate({[E]:g,offset:f,easing:R(d)?d.map(L=>ht(L,o)):void 0},p),c.finished||(c.finished=new Promise((L,Xt)=>{c.onfinish=L,c.oncancel=Xt}));const M=g[g.length-1];c.finished.then(()=>{w||(N.set(t,E,M),c.cancel())}).catch(At),m||(c.playbackRate=1.000001)}else if(s&&I)g=g.map(p=>typeof p=="string"?parseFloat(p):p),g.length===1&&g.unshift(parseFloat(U())),c=new s(p=>{N.set(t,E,ct?ct(p):p)},g,Object.assign(Object.assign({},r),{duration:o,easing:d}));else{const p=g[g.length-1];N.set(t,E,T&&V(p)?T.toDefaultUnit(p):p)}return a&&i(t,e,g,{duration:o,delay:u,easing:d,repeat:h,offset:f},"motion-one"),$.setAnimation(c),c&&!v&&c.pause(),c}}const Se=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function Le(t,e){return typeof t=="string"?t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t||[])}const Pe=t=>t(),It=(t,e,n=b.duration)=>new Proxy({animations:t.map(Pe).filter(Boolean),duration:n,options:e},xe),De=t=>t.animations[0],xe={get:(t,e)=>{const n=De(t);switch(e){case"duration":return t.duration;case"currentTime":return C.s(n?.[e]||0);case"playbackRate":case"playState":return n?.[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map(Re)).catch(At)),t.finished;case"stop":return()=>{t.animations.forEach(r=>Ot(r))};case"forEachNative":return r=>{t.animations.forEach(s=>r(s,t))};default:return typeof n?.[e]>"u"?void 0:()=>t.animations.forEach(r=>r[e]())}},set:(t,e,n)=>{switch(e){case"currentTime":n=C.ms(n);case"playbackRate":for(let r=0;r<t.animations.length;r++)t.animations[r][e]=n;return!0}return!1}},Re=t=>t.finished;function Oe(t,e,n){return O(t)?t(e,n):t}function Ie(t){return function(n,r,s={}){n=Le(n);const i=n.length,a=[];for(let c=0;c<i;c++){const o=n[c];for(const u in r){const l=Se(s,u);l.delay=Oe(l.delay,c,i);const h=Ae(o,u,r[u],l,t);a.push(h)}}return It(a,s,s.duration)}}const Me=Ie(Dt);function ke(t,e={}){return It([()=>{const n=new Dt(t,[0,1],e);return n.finished.catch(()=>{}),n}],e,e.duration)}function Ce(t,e,n){return(O(t)?ke:Me)(t,e,n)}document.addEventListener("click",t=>{const e=document.getElementById("astro-header-drawer"),n=document.getElementById("astro-header-drawer-button");e?.contains(t.target)||n?.contains(t.target)?e?.classList.toggle("translate-x-96"):e?.classList.add("translate-x-96")});class _e extends HTMLElement{constructor(){super();const e=this.querySelector("button");e&&e.addEventListener("click",n=>{if(n.currentTarget instanceof HTMLButtonElement){let r=n.currentTarget.getAttribute("aria-pressed")==="true",s=new CustomEvent("theme-change",{detail:{theme:r?"light":"dark"}});document.dispatchEvent(s),e.setAttribute("aria-pressed",String(!r))}})}}"customElements"in window&&customElements.define("theme-toggle",_e);const Fe="modulepreload",qe=function(t){return"/"+t},mt={},$e=function(e,n,r){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),a=i?.nonce||i?.getAttribute("nonce");s=Promise.all(n.map(c=>{if(c=qe(c),c in mt)return;mt[c]=!0;const o=c.endsWith(".css"),u=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const l=document.createElement("link");if(l.rel=o?"stylesheet":Fe,o||(l.as="script",l.crossOrigin=""),l.href=c,a&&l.setAttribute("nonce",a),document.head.appendChild(l),o)return new Promise((h,d)=>{l.addEventListener("load",h),l.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${c}`)))})}))}return s.then(()=>e()).catch(i=>{const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=i,window.dispatchEvent(a),!a.defaultPrevented)throw i})};class Ue extends HTMLElement{constructor(){super();const e=this.querySelector("button[data-open-modal]"),n=this.querySelector("button[data-close-modal]"),r=this.querySelector("dialog"),s=this.querySelector(".dialog-frame"),i=u=>{document.body.contains(u.target)&&!s.contains(u.target)&&o()},a=u=>{if(u.key==="Escape"&&r.open)o(),window.removeEventListener("keydown",a);else return},c=u=>{r.showModal(),Ce("dialog",{clipPath:["polygon(0 0, 100% 0, 100% -200%, -200% -200%)","polygon(0 0, 100% 0, 100% 100%, 0% 100%)"],opacity:[0,1]},{duration:.2}),document.body.classList.add("overflow-hidden"),this.querySelector("input")?.focus(),u?.stopPropagation(),window.addEventListener("click",i),window.addEventListener("keydown",a)},o=()=>{r.close(),document.body.classList.remove("overflow-hidden"),window.removeEventListener("click",i),window.addEventListener("keydown",a)};e.addEventListener("click",c),e.disabled=!1,n.addEventListener("click",o),document.addEventListener("astro:after-swap",o),window.addEventListener("keydown",u=>{u.key==="/"&&!r.open&&(c(),u.preventDefault())}),window.addEventListener("DOMContentLoaded",()=>{(window.requestIdleCallback||(l=>setTimeout(l,1)))(async()=>{const{PagefindUI:l}=await $e(async()=>{const{PagefindUI:h}=await import("./ui-core.B8NFHpRj.js");return{PagefindUI:h}},[]);new l({element:"#pagefind__search",baseUrl:"/",bundlePath:"/".replace(/\/$/,"")+"/pagefind/",showImages:!1})})})}}customElements.define("site-search",Ue);const Ne="astro:before-preparation",Ve="astro:after-preparation",He="astro:before-swap",Be="astro:after-swap",We=t=>document.dispatchEvent(new Event(t));class Mt extends Event{from;to;direction;navigationType;sourceElement;info;newDocument;constructor(e,n,r,s,i,a,c,o,u){super(e,n),this.from=r,this.to=s,this.direction=i,this.navigationType=a,this.sourceElement=c,this.info=o,this.newDocument=u,Object.defineProperties(this,{from:{enumerable:!0},to:{enumerable:!0,writable:!0},direction:{enumerable:!0,writable:!0},navigationType:{enumerable:!0},sourceElement:{enumerable:!0},info:{enumerable:!0},newDocument:{enumerable:!0,writable:!0}})}}class je extends Mt{formData;loader;constructor(e,n,r,s,i,a,c,o,u){super(Ne,{cancelable:!0},e,n,r,s,i,a,c),this.formData=o,this.loader=u.bind(this,this),Object.defineProperties(this,{formData:{enumerable:!0},loader:{enumerable:!0,writable:!0}})}}class Xe extends Mt{direction;viewTransition;swap;constructor(e,n,r){super(He,void 0,e.from,e.to,e.direction,e.navigationType,e.sourceElement,e.info,e.newDocument),this.direction=e.direction,this.viewTransition=n,this.swap=r.bind(this,this),Object.defineProperties(this,{direction:{enumerable:!0},viewTransition:{enumerable:!0},swap:{enumerable:!0,writable:!0}})}}async function Ke(t,e,n,r,s,i,a,c){const o=new je(t,e,n,r,s,i,window.document,a,c);return document.dispatchEvent(o)&&(await o.loader(),o.defaultPrevented||(We(Ve),o.navigationType!=="traverse"&&st({scrollX,scrollY}))),o}async function ze(t,e,n){const r=new Xe(t,e,n);return document.dispatchEvent(r),r.swap(),r}const Ye=history.pushState.bind(history),rt=history.replaceState.bind(history),st=t=>{history.state&&(history.scrollRestoration="manual",rt({...history.state,...t},""))},it=!!document.startViewTransition,ot=()=>!!document.querySelector('[name="astro-view-transitions-enabled"]'),kt=(t,e)=>t.pathname===e.pathname&&t.search===e.search;let K,D,W=!1,Ct;const _t=t=>document.dispatchEvent(new Event(t)),Ft=()=>_t("astro:page-load"),Ge=()=>{let t=document.createElement("div");t.setAttribute("aria-live","assertive"),t.setAttribute("aria-atomic","true"),t.className="astro-route-announcer",document.body.append(t),setTimeout(()=>{let e=document.title||document.querySelector("h1")?.textContent||location.pathname;t.textContent=e},60)},A="data-astro-transition-persist",qt="data-astro-transition",$t="data-astro-transition-fallback";let pt,F=0;history.state?(F=history.state.index,scrollTo({left:history.state.scrollX,top:history.state.scrollY})):ot()&&(rt({index:F,scrollX,scrollY},""),history.scrollRestoration="manual");const Ze=(t,e)=>{let n=!1,r=!1;return(...s)=>{if(n){r=!0;return}t(...s),n=!0,setTimeout(()=>{r&&(r=!1,t(...s)),n=!1},e)}};async function Je(t,e){try{const n=await fetch(t,e),s=(n.headers.get("content-type")??"").split(";",1)[0].trim();return s!=="text/html"&&s!=="application/xhtml+xml"?null:{html:await n.text(),redirected:n.redirected?n.url:void 0,mediaType:s}}catch{return null}}function Ut(){const t=document.querySelector('[name="astro-view-transitions-fallback"]');return t?t.getAttribute("content"):"animate"}function Qe(){let t=Promise.resolve();for(const e of Array.from(document.scripts)){if(e.dataset.astroExec==="")continue;const n=document.createElement("script");n.innerHTML=e.innerHTML;for(const r of e.attributes){if(r.name==="src"){const s=new Promise(i=>{n.onload=i});t=t.then(()=>s)}n.setAttribute(r.name,r.value)}n.dataset.astroExec="",e.replaceWith(n)}return t}const Nt=(t,e,n,r)=>{const s=kt(e,t);let i=!1;if(t.href!==location.href&&!r)if(n.history==="replace"){const a=history.state;rt({...n.state,index:a.index,scrollX:a.scrollX,scrollY:a.scrollY},"",t.href)}else Ye({...n.state,index:++F,scrollX:0,scrollY:0},"",t.href);K=t,s||(scrollTo({left:0,top:0,behavior:"instant"}),i=!0),r?scrollTo(r.scrollX,r.scrollY):(t.hash?(history.scrollRestoration="auto",location.href=t.href):i||scrollTo({left:0,top:0,behavior:"instant"}),history.scrollRestoration="manual")};function tn(t){const e=[];for(const n of t.querySelectorAll("head link[rel=stylesheet]"))if(!document.querySelector(`[${A}="${n.getAttribute(A)}"], link[rel=stylesheet][href="${n.getAttribute("href")}"]`)){const r=document.createElement("link");r.setAttribute("rel","preload"),r.setAttribute("as","style"),r.setAttribute("href",n.getAttribute("href")),e.push(new Promise(s=>{["load","error"].forEach(i=>r.addEventListener(i,s)),document.head.append(r)}))}return e}async function gt(t,e,n,r){const s=(l,h)=>{const d=l.getAttribute(A),w=d&&h.head.querySelector(`[${A}="${d}"]`);if(w)return w;if(l.matches("link[rel=stylesheet]")){const y=l.getAttribute("href");return h.head.querySelector(`link[rel=stylesheet][href="${y}"]`)}return null},i=()=>{const l=document.activeElement;if(l?.closest(`[${A}]`)){if(l instanceof HTMLInputElement||l instanceof HTMLTextAreaElement){const h=l.selectionStart,d=l.selectionEnd;return{activeElement:l,start:h,end:d}}return{activeElement:l}}else return{activeElement:null}},a=({activeElement:l,start:h,end:d})=>{l&&(l.focus(),(l instanceof HTMLInputElement||l instanceof HTMLTextAreaElement)&&(l.selectionStart=h,l.selectionEnd=d))},c=l=>{const h=document.documentElement,d=[...h.attributes].filter(({name:f})=>(h.removeAttribute(f),f.startsWith("data-astro-")));[...l.newDocument.documentElement.attributes,...d].forEach(({name:f,value:m})=>h.setAttribute(f,m));for(const f of document.scripts)for(const m of l.newDocument.scripts)if(!f.src&&f.textContent===m.textContent||f.src&&f.type===m.type&&f.src===m.src){m.dataset.astroExec="";break}for(const f of Array.from(document.head.children)){const m=s(f,l.newDocument);m?m.remove():f.remove()}document.head.append(...l.newDocument.head.children);const w=document.body,y=i();document.body.replaceWith(l.newDocument.body);for(const f of w.querySelectorAll(`[${A}]`)){const m=f.getAttribute(A),v=document.querySelector(`[${A}="${m}"]`);v&&v.replaceWith(f)}a(y)};async function o(l){function h(f){const m=f.effect;return!m||!(m instanceof KeyframeEffect)||!m.target?!1:window.getComputedStyle(m.target,m.pseudoElement).animationIterationCount==="infinite"}const d=document.getAnimations();document.documentElement.setAttribute($t,l);const y=document.getAnimations().filter(f=>!d.includes(f)&&!h(f));return Promise.all(y.map(f=>f.finished))}if(!W)document.documentElement.setAttribute(qt,t.direction),r==="animate"&&await o("old");else throw new DOMException("Transition was skipped");const u=await ze(t,D,c);Nt(u.to,u.from,e,n),_t(Be),r==="animate"&&!W&&o("new").then(()=>Ct())}async function Vt(t,e,n,r,s){if(!ot()||location.origin!==n.origin){location.href=n.href;return}const i=s?"traverse":r.history==="replace"?"replace":"push";if(i!=="traverse"&&st({scrollX,scrollY}),kt(e,n)&&n.hash){Nt(n,e,r,s);return}const a=await Ke(e,n,t,i,r.sourceElement,r.info,r.formData,c);if(a.defaultPrevented){location.href=n.href;return}async function c(o){const u=o.to.href,l={};if(o.formData){l.method="POST";const w=o.sourceElement instanceof HTMLFormElement?o.sourceElement:o.sourceElement instanceof HTMLElement&&"form"in o.sourceElement?o.sourceElement.form:o.sourceElement?.closest("form");l.body=w?.attributes.getNamedItem("enctype")?.value==="application/x-www-form-urlencoded"?new URLSearchParams(o.formData):o.formData}const h=await Je(u,l);if(h===null){o.preventDefault();return}if(h.redirected&&(o.to=new URL(h.redirected)),pt??=new DOMParser,o.newDocument=pt.parseFromString(h.html,h.mediaType),o.newDocument.querySelectorAll("noscript").forEach(w=>w.remove()),!o.newDocument.querySelector('[name="astro-view-transitions-enabled"]')&&!o.formData){o.preventDefault();return}const d=tn(o.newDocument);d.length&&await Promise.all(d)}if(W=!1,it)D=document.startViewTransition(async()=>await gt(a,r,s));else{const o=(async()=>{await new Promise(u=>setTimeout(u)),await gt(a,r,s,Ut())})();D={updateCallbackDone:o,ready:o,finished:new Promise(u=>Ct=u),skipTransition:()=>{W=!0}}}D.ready.then(async()=>{await Qe(),Ft(),Ge()}),D.finished.then(()=>{document.documentElement.removeAttribute(qt),document.documentElement.removeAttribute($t)}),await D.ready}async function yt(t,e){await Vt("forward",K,new URL(t,location.href),e??{})}function en(t){if(!ot()&&t.state){location.reload();return}if(t.state===null)return;const e=history.state,n=e.index,r=n>F?"forward":"back";F=n,Vt(r,K,new URL(location.href),{},e)}const wt=()=>{st({scrollX,scrollY})};{(it||Ut()!=="none")&&(K=new URL(location.href),addEventListener("popstate",en),addEventListener("load",Ft),"onscrollend"in window?addEventListener("scrollend",wt):addEventListener("scroll",Ze(wt,350),{passive:!0}));for(const t of document.scripts)t.dataset.astroExec=""}const Ht=new Set,j=new WeakSet;let tt,Bt,vt=!1;function nn(t){vt||(vt=!0,tt??=t?.prefetchAll,Bt??=t?.defaultStrategy??"hover",rn(),sn(),on())}function rn(){for(const t of["touchstart","mousedown"])document.body.addEventListener(t,e=>{X(e.target,"tap")&&at(e.target.href,{with:"fetch",ignoreSlowConnection:!0})},{passive:!0})}function sn(){let t;document.body.addEventListener("focusin",r=>{X(r.target,"hover")&&e(r)},{passive:!0}),document.body.addEventListener("focusout",n,{passive:!0}),jt(()=>{for(const r of document.getElementsByTagName("a"))j.has(r)||X(r,"hover")&&(j.add(r),r.addEventListener("mouseenter",e,{passive:!0}),r.addEventListener("mouseleave",n,{passive:!0}))});function e(r){const s=r.target.href;t&&clearTimeout(t),t=setTimeout(()=>{at(s,{with:"fetch"})},80)}function n(){t&&(clearTimeout(t),t=0)}}function on(){let t;jt(()=>{for(const e of document.getElementsByTagName("a"))j.has(e)||X(e,"viewport")&&(j.add(e),t??=an(),t.observe(e))})}function an(){const t=new WeakMap;return new IntersectionObserver((e,n)=>{for(const r of e){const s=r.target,i=t.get(s);r.isIntersecting?(i&&clearTimeout(i),t.set(s,setTimeout(()=>{n.unobserve(s),t.delete(s),at(s.href,{with:"link"})},300))):i&&(clearTimeout(i),t.delete(s))}})}function at(t,e){const n=e?.ignoreSlowConnection??!1;if(!cn(t,n))return;if(Ht.add(t),(e?.with??"link")==="link"){const s=document.createElement("link");s.rel="prefetch",s.setAttribute("href",t),document.head.append(s)}else fetch(t).catch(s=>{console.log(`[astro] Failed to prefetch ${t}`),console.error(s)})}function cn(t,e){if(!navigator.onLine||!e&&Wt())return!1;try{const n=new URL(t,location.href);return location.origin===n.origin&&(location.pathname!==n.pathname||location.search!==n.search)&&!Ht.has(t)}catch{}return!1}function X(t,e){if(t?.tagName!=="A")return!1;const n=t.dataset.astroPrefetch;return n==="false"?!1:e==="tap"&&(n!=null||tt)&&Wt()?!0:n==null&&tt||n===""?e===Bt:n===e}function Wt(){if("connection"in navigator){const t=navigator.connection;return t.saveData||/(2|3)g/.test(t.effectiveType)}return!1}function jt(t){t();let e=!1;document.addEventListener("astro:page-load",()=>{if(!e){e=!0;return}t()})}function ln(){const t=document.querySelector('[name="astro-view-transitions-fallback"]');return t?t.getAttribute("content"):"animate"}function bt(t){return t.dataset.astroReload!==void 0}(it||ln()!=="none")&&(document.addEventListener("click",t=>{let e=t.target;if(e instanceof Element&&(e=e.closest("a, area")),!(e instanceof HTMLAnchorElement)&&!(e instanceof SVGAElement)&&!(e instanceof HTMLAreaElement))return;const n=e instanceof HTMLElement?e.target:e.target.baseVal,r=e instanceof HTMLElement?e.href:e.href.baseVal,s=new URL(r,location.href).origin;bt(e)||e.hasAttribute("download")||!e.href||n&&n!=="_self"||s!==location.origin||t.button!==0||t.metaKey||t.ctrlKey||t.altKey||t.shiftKey||t.defaultPrevented||(t.preventDefault(),yt(r,{history:e.dataset.astroHistory==="replace"?"replace":"auto",sourceElement:e}))}),document.addEventListener("submit",t=>{let e=t.target;if(e.tagName!=="FORM"||t.defaultPrevented||bt(e))return;const n=e,r=t.submitter,s=new FormData(n,r);let i=r?.getAttribute("formaction")??n.action??location.pathname;const a=r?.getAttribute("formmethod")??n.method;if(a==="dialog")return;const c={sourceElement:r??n};if(a==="get"){const o=new URLSearchParams(s),u=new URL(i);u.search=o.toString(),i=u.toString()}else c.formData=s;t.preventDefault(),yt(i,c)}),nn({prefetchAll:!0}));export{$e as _,Ce as a};
