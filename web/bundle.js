(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=i(s);fetch(s.href,r)}})();const gt=(function(){if(typeof globalThis<"u")return globalThis;if(typeof global<"u")return global;if(typeof self<"u")return self;if(typeof window<"u")return window;try{return new Function("return this")()}catch{return{}}})();gt.trustedTypes===void 0&&(gt.trustedTypes={createPolicy:(e,t)=>t});const Ss={configurable:!1,enumerable:!1,writable:!1};gt.FAST===void 0&&Reflect.defineProperty(gt,"FAST",Object.assign({value:Object.create(null)},Ss));const ce=gt.FAST;if(ce.getById===void 0){const e=Object.create(null);Reflect.defineProperty(ce,"getById",Object.assign({value(t,i){let n=e[t];return n===void 0&&(n=i?e[t]=i():null),n}},Ss))}const ee=Object.freeze([]);function $s(){const e=new WeakMap;return function(t){let i=e.get(t);if(i===void 0){let n=Reflect.getPrototypeOf(t);for(;i===void 0&&n!==null;)i=e.get(n),n=Reflect.getPrototypeOf(n);i=i===void 0?[]:i.slice(0),e.set(t,i)}return i}}const fi=gt.FAST.getById(1,()=>{const e=[],t=[];function i(){if(t.length)throw t.shift()}function n(o){try{o.call()}catch(a){t.push(a),setTimeout(i,0)}}function s(){let a=0;for(;a<e.length;)if(n(e[a]),a++,a>1024){for(let l=0,c=e.length-a;l<c;l++)e[l]=e[l+a];e.length-=a,a=0}e.length=0}function r(o){e.length<1&&gt.requestAnimationFrame(s),e.push(o)}return Object.freeze({enqueue:r,process:s})}),Cs=gt.trustedTypes.createPolicy("fast-html",{createHTML:e=>e});let pi=Cs;const ie=`fast-${Math.random().toString(36).substring(2,8)}`,ks=`${ie}{`,Ki=`}${ie}`,$=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(e){if(pi!==Cs)throw new Error("The HTML policy can only be set once.");pi=e},createHTML(e){return pi.createHTML(e)},isMarker(e){return e&&e.nodeType===8&&e.data.startsWith(ie)},extractDirectiveIndexFromMarker(e){return parseInt(e.data.replace(`${ie}:`,""))},createInterpolationPlaceholder(e){return`${ks}${e}${Ki}`},createCustomAttributePlaceholder(e,t){return`${e}="${this.createInterpolationPlaceholder(t)}"`},createBlockPlaceholder(e){return`<!--${ie}:${e}-->`},queueUpdate:fi.enqueue,processUpdates:fi.process,nextUpdate(){return new Promise(fi.enqueue)},setAttribute(e,t,i){i==null?e.removeAttribute(t):e.setAttribute(t,i)},setBooleanAttribute(e,t,i){i?e.setAttribute(t,""):e.removeAttribute(t)},removeChildNodes(e){for(let t=e.firstChild;t!==null;t=e.firstChild)e.removeChild(t)},createTemplateWalker(e){return document.createTreeWalker(e,133,null,!1)}});let Mi=class{constructor(t,i){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=t,this.sub1=i}has(t){return this.spillover===void 0?this.sub1===t||this.sub2===t:this.spillover.indexOf(t)!==-1}subscribe(t){const i=this.spillover;if(i===void 0){if(this.has(t))return;if(this.sub1===void 0){this.sub1=t;return}if(this.sub2===void 0){this.sub2=t;return}this.spillover=[this.sub1,this.sub2,t],this.sub1=void 0,this.sub2=void 0}else i.indexOf(t)===-1&&i.push(t)}unsubscribe(t){const i=this.spillover;if(i===void 0)this.sub1===t?this.sub1=void 0:this.sub2===t&&(this.sub2=void 0);else{const n=i.indexOf(t);n!==-1&&i.splice(n,1)}}notify(t){const i=this.spillover,n=this.source;if(i===void 0){const s=this.sub1,r=this.sub2;s!==void 0&&s.handleChange(n,t),r!==void 0&&r.handleChange(n,t)}else for(let s=0,r=i.length;s<r;++s)i[s].handleChange(n,t)}},Ts=class{constructor(t){this.subscribers={},this.sourceSubscribers=null,this.source=t}notify(t){var i;const n=this.subscribers[t];n!==void 0&&n.notify(t),(i=this.sourceSubscribers)===null||i===void 0||i.notify(t)}subscribe(t,i){var n;if(i){let s=this.subscribers[i];s===void 0&&(this.subscribers[i]=s=new Mi(this.source)),s.subscribe(t)}else this.sourceSubscribers=(n=this.sourceSubscribers)!==null&&n!==void 0?n:new Mi(this.source),this.sourceSubscribers.subscribe(t)}unsubscribe(t,i){var n;if(i){const s=this.subscribers[i];s!==void 0&&s.unsubscribe(t)}else(n=this.sourceSubscribers)===null||n===void 0||n.unsubscribe(t)}};const F=ce.getById(2,()=>{const e=/(:|&&|\|\||if)/,t=new WeakMap,i=$.queueUpdate;let n,s=c=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function r(c){let h=c.$fastController||t.get(c);return h===void 0&&(Array.isArray(c)?h=s(c):t.set(c,h=new Ts(c))),h}const o=$s();class a{constructor(h){this.name=h,this.field=`_${h}`,this.callback=`${h}Changed`}getValue(h){return n!==void 0&&n.watch(h,this.name),h[this.field]}setValue(h,u){const p=this.field,g=h[p];if(g!==u){h[p]=u;const y=h[this.callback];typeof y=="function"&&y.call(h,g,u),r(h).notify(this.name)}}}class l extends Mi{constructor(h,u,p=!1){super(h,u),this.binding=h,this.isVolatileBinding=p,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(h,u){this.needsRefresh&&this.last!==null&&this.disconnect();const p=n;n=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const g=this.binding(h,u);return n=p,g}disconnect(){if(this.last!==null){let h=this.first;for(;h!==void 0;)h.notifier.unsubscribe(this,h.propertyName),h=h.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(h,u){const p=this.last,g=r(h),y=p===null?this.first:{};if(y.propertySource=h,y.propertyName=u,y.notifier=g,g.subscribe(this,u),p!==null){if(!this.needsRefresh){let w;n=void 0,w=p.propertySource[p.propertyName],n=this,h===w&&(this.needsRefresh=!0)}p.next=y}this.last=y}handleChange(){this.needsQueue&&(this.needsQueue=!1,i(this))}call(){this.last!==null&&(this.needsQueue=!0,this.notify(this))}records(){let h=this.first;return{next:()=>{const u=h;return u===void 0?{value:void 0,done:!0}:(h=h.next,{value:u,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(c){s=c},getNotifier:r,track(c,h){n!==void 0&&n.watch(c,h)},trackVolatile(){n!==void 0&&(n.needsRefresh=!0)},notify(c,h){r(c).notify(h)},defineProperty(c,h){typeof h=="string"&&(h=new a(h)),o(c).push(h),Reflect.defineProperty(c,h.name,{enumerable:!0,get:function(){return h.getValue(this)},set:function(u){h.setValue(this,u)}})},getAccessors:o,binding(c,h,u=this.isVolatileBinding(c)){return new l(c,h,u)},isVolatileBinding(c){return e.test(c.toString())}})});function _(e,t){F.defineProperty(e,t)}const yn=ce.getById(3,()=>{let e=null;return{get(){return e},set(t){e=t}}});let he=class{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return yn.get()}get isEven(){return this.index%2===0}get isOdd(){return this.index%2!==0}get isFirst(){return this.index===0}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(t){yn.set(t)}};F.defineProperty(he.prototype,"index");F.defineProperty(he.prototype,"length");const ne=Object.seal(new he);let tn=class{constructor(){this.targetIndex=0}};class Fs extends tn{constructor(){super(...arguments),this.createPlaceholder=$.createInterpolationPlaceholder}}class As extends tn{constructor(t,i,n){super(),this.name=t,this.behavior=i,this.options=n}createPlaceholder(t){return $.createCustomAttributePlaceholder(this.name,t)}createBehavior(t){return new this.behavior(t,this.options)}}function Ur(e,t){this.source=e,this.context=t,this.bindingObserver===null&&(this.bindingObserver=F.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(e,t))}function Wr(e,t){this.source=e,this.context=t,this.target.addEventListener(this.targetName,this)}function Gr(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function Qr(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const e=this.target.$fastView;e!==void 0&&e.isComposed&&(e.unbind(),e.needsBindOnly=!0)}function Xr(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function Yr(e){$.setAttribute(this.target,this.targetName,e)}function Jr(e){$.setBooleanAttribute(this.target,this.targetName,e)}function Zr(e){if(e==null&&(e=""),e.create){this.target.textContent="";let t=this.target.$fastView;t===void 0?t=e.create():this.target.$fastTemplate!==e&&(t.isComposed&&(t.remove(),t.unbind()),t=e.create()),t.isComposed?t.needsBindOnly&&(t.needsBindOnly=!1,t.bind(this.source,this.context)):(t.isComposed=!0,t.bind(this.source,this.context),t.insertBefore(this.target),this.target.$fastView=t,this.target.$fastTemplate=e)}else{const t=this.target.$fastView;t!==void 0&&t.isComposed&&(t.isComposed=!1,t.remove(),t.needsBindOnly?t.needsBindOnly=!1:t.unbind()),this.target.textContent=e}}function Kr(e){this.target[this.targetName]=e}function to(e){const t=this.classVersions||Object.create(null),i=this.target;let n=this.version||0;if(e!=null&&e.length){const s=e.split(/\s+/);for(let r=0,o=s.length;r<o;++r){const a=s[r];a!==""&&(t[a]=n,i.classList.add(a))}}if(this.classVersions=t,this.version=n+1,n!==0){n-=1;for(const s in t)t[s]===n&&i.classList.remove(s)}}let en=class extends Fs{constructor(t){super(),this.binding=t,this.bind=Ur,this.unbind=Gr,this.updateTarget=Yr,this.isBindingVolatile=F.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(t){if(this.originalTargetName=t,t!==void 0)switch(t[0]){case":":if(this.cleanedTargetName=t.substr(1),this.updateTarget=Kr,this.cleanedTargetName==="innerHTML"){const i=this.binding;this.binding=(n,s)=>$.createHTML(i(n,s))}break;case"?":this.cleanedTargetName=t.substr(1),this.updateTarget=Jr;break;case"@":this.cleanedTargetName=t.substr(1),this.bind=Wr,this.unbind=Xr;break;default:this.cleanedTargetName=t,t==="class"&&(this.updateTarget=to);break}}targetAtContent(){this.updateTarget=Zr,this.unbind=Qr}createBehavior(t){return new eo(t,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}};class eo{constructor(t,i,n,s,r,o,a){this.source=null,this.context=null,this.bindingObserver=null,this.target=t,this.binding=i,this.isBindingVolatile=n,this.bind=s,this.unbind=r,this.updateTarget=o,this.targetName=a}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(t){he.setEvent(t);const i=this.binding(this.source,this.context);he.setEvent(null),i!==!0&&t.preventDefault()}}let gi=null,io=class Rs{addFactory(t){t.targetIndex=this.targetIndex,this.behaviorFactories.push(t)}captureContentBinding(t){t.targetAtContent(),this.addFactory(t)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){gi=this}static borrow(t){const i=gi||new Rs;return i.directives=t,i.reset(),gi=null,i}};function no(e){if(e.length===1)return e[0];let t;const i=e.length,n=e.map(o=>typeof o=="string"?()=>o:(t=o.targetName||t,o.binding)),s=(o,a)=>{let l="";for(let c=0;c<i;++c)l+=n[c](o,a);return l},r=new en(s);return r.targetName=t,r}const so=Ki.length;function Ds(e,t){const i=t.split(ks);if(i.length===1)return null;const n=[];for(let s=0,r=i.length;s<r;++s){const o=i[s],a=o.indexOf(Ki);let l;if(a===-1)l=o;else{const c=parseInt(o.substring(0,a));n.push(e.directives[c]),l=o.substring(a+so)}l!==""&&n.push(l)}return n}function wn(e,t,i=!1){const n=t.attributes;for(let s=0,r=n.length;s<r;++s){const o=n[s],a=o.value,l=Ds(e,a);let c=null;l===null?i&&(c=new en(()=>a),c.targetName=o.name):c=no(l),c!==null&&(t.removeAttributeNode(o),s--,r--,e.addFactory(c))}}function ro(e,t,i){const n=Ds(e,t.textContent);if(n!==null){let s=t;for(let r=0,o=n.length;r<o;++r){const a=n[r],l=r===0?t:s.parentNode.insertBefore(document.createTextNode(""),s.nextSibling);typeof a=="string"?l.textContent=a:(l.textContent=" ",e.captureContentBinding(a)),s=l,e.targetIndex++,l!==t&&i.nextNode()}e.targetIndex--}}function oo(e,t){const i=e.content;document.adoptNode(i);const n=io.borrow(t);wn(n,e,!0);const s=n.behaviorFactories;n.reset();const r=$.createTemplateWalker(i);let o;for(;o=r.nextNode();)switch(n.targetIndex++,o.nodeType){case 1:wn(n,o);break;case 3:ro(n,o,r);break;case 8:$.isMarker(o)&&n.addFactory(t[$.extractDirectiveIndexFromMarker(o)])}let a=0;($.isMarker(i.firstChild)||i.childNodes.length===1&&t.length)&&(i.insertBefore(document.createComment(""),i.firstChild),a=-1);const l=n.behaviorFactories;return n.release(),{fragment:i,viewBehaviorFactories:l,hostBehaviorFactories:s,targetOffset:a}}const bi=document.createRange();let ao=class{constructor(t,i){this.fragment=t,this.behaviors=i,this.source=null,this.context=null,this.firstChild=t.firstChild,this.lastChild=t.lastChild}appendTo(t){t.appendChild(this.fragment)}insertBefore(t){if(this.fragment.hasChildNodes())t.parentNode.insertBefore(this.fragment,t);else{const i=this.lastChild;if(t.previousSibling===i)return;const n=t.parentNode;let s=this.firstChild,r;for(;s!==i;)r=s.nextSibling,n.insertBefore(s,t),s=r;n.insertBefore(i,t)}}remove(){const t=this.fragment,i=this.lastChild;let n=this.firstChild,s;for(;n!==i;)s=n.nextSibling,t.appendChild(n),n=s;t.appendChild(i)}dispose(){const t=this.firstChild.parentNode,i=this.lastChild;let n=this.firstChild,s;for(;n!==i;)s=n.nextSibling,t.removeChild(n),n=s;t.removeChild(i);const r=this.behaviors,o=this.source;for(let a=0,l=r.length;a<l;++a)r[a].unbind(o)}bind(t,i){const n=this.behaviors;if(this.source!==t)if(this.source!==null){const s=this.source;this.source=t,this.context=i;for(let r=0,o=n.length;r<o;++r){const a=n[r];a.unbind(s),a.bind(t,i)}}else{this.source=t,this.context=i;for(let s=0,r=n.length;s<r;++s)n[s].bind(t,i)}}unbind(){if(this.source===null)return;const t=this.behaviors,i=this.source;for(let n=0,s=t.length;n<s;++n)t[n].unbind(i);this.source=null}static disposeContiguousBatch(t){if(t.length!==0){bi.setStartBefore(t[0].firstChild),bi.setEndAfter(t[t.length-1].lastChild),bi.deleteContents();for(let i=0,n=t.length;i<n;++i){const s=t[i],r=s.behaviors,o=s.source;for(let a=0,l=r.length;a<l;++a)r[a].unbind(o)}}}},xn=class{constructor(t,i){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=t,this.directives=i}create(t){if(this.fragment===null){let c;const h=this.html;if(typeof h=="string"){c=document.createElement("template"),c.innerHTML=$.createHTML(h);const p=c.content.firstElementChild;p!==null&&p.tagName==="TEMPLATE"&&(c=p)}else c=h;const u=oo(c,this.directives);this.fragment=u.fragment,this.viewBehaviorFactories=u.viewBehaviorFactories,this.hostBehaviorFactories=u.hostBehaviorFactories,this.targetOffset=u.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const i=this.fragment.cloneNode(!0),n=this.viewBehaviorFactories,s=new Array(this.behaviorCount),r=$.createTemplateWalker(i);let o=0,a=this.targetOffset,l=r.nextNode();for(let c=n.length;o<c;++o){const h=n[o],u=h.targetIndex;for(;l!==null;)if(a===u){s[o]=h.createBehavior(l);break}else l=r.nextNode(),a++}if(this.hasHostBehaviors){const c=this.hostBehaviorFactories;for(let h=0,u=c.length;h<u;++h,++o)s[o]=c[h].createBehavior(t)}return new ao(i,s)}render(t,i,n){typeof i=="string"&&(i=document.getElementById(i)),n===void 0&&(n=i);const s=this.create(n);return s.bind(t,ne),s.appendTo(i),s}};const lo=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function wt(e,...t){const i=[];let n="";for(let s=0,r=e.length-1;s<r;++s){const o=e[s];let a=t[s];if(n+=o,a instanceof xn){const l=a;a=()=>l}if(typeof a=="function"&&(a=new en(a)),a instanceof Fs){const l=lo.exec(o);l!==null&&(a.targetName=l[2])}a instanceof tn?(n+=a.createPlaceholder(i.length),i.push(a)):n+=a}return n+=e[e.length-1],new xn(n,i)}let tt=class{constructor(){this.targets=new WeakSet}addStylesTo(t){this.targets.add(t)}removeStylesFrom(t){this.targets.delete(t)}isAttachedTo(t){return this.targets.has(t)}withBehaviors(...t){return this.behaviors=this.behaviors===null?t:this.behaviors.concat(t),this}};tt.create=(()=>{if($.supportsAdoptedStyleSheets){const e=new Map;return t=>new co(t,e)}return e=>new fo(e)})();function nn(e){return e.map(t=>t instanceof tt?nn(t.styles):[t]).reduce((t,i)=>t.concat(i),[])}function Os(e){return e.map(t=>t instanceof tt?t.behaviors:null).reduce((t,i)=>i===null?t:(t===null&&(t=[]),t.concat(i)),null)}const Ns=Symbol("prependToAdoptedStyleSheets");function Bs(e){const t=[],i=[];return e.forEach(n=>(n[Ns]?t:i).push(n)),{prepend:t,append:i}}let Vs=(e,t)=>{const{prepend:i,append:n}=Bs(t);e.adoptedStyleSheets=[...i,...e.adoptedStyleSheets,...n]},Ps=(e,t)=>{e.adoptedStyleSheets=e.adoptedStyleSheets.filter(i=>t.indexOf(i)===-1)};if($.supportsAdoptedStyleSheets)try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),Vs=(e,t)=>{const{prepend:i,append:n}=Bs(t);e.adoptedStyleSheets.splice(0,0,...i),e.adoptedStyleSheets.push(...n)},Ps=(e,t)=>{for(const i of t){const n=e.adoptedStyleSheets.indexOf(i);n!==-1&&e.adoptedStyleSheets.splice(n,1)}}}catch{}let co=class extends tt{constructor(t,i){super(),this.styles=t,this.styleSheetCache=i,this._styleSheets=void 0,this.behaviors=Os(t)}get styleSheets(){if(this._styleSheets===void 0){const t=this.styles,i=this.styleSheetCache;this._styleSheets=nn(t).map(n=>{if(n instanceof CSSStyleSheet)return n;let s=i.get(n);return s===void 0&&(s=new CSSStyleSheet,s.replaceSync(n),i.set(n,s)),s})}return this._styleSheets}addStylesTo(t){Vs(t,this.styleSheets),super.addStylesTo(t)}removeStylesFrom(t){Ps(t,this.styleSheets),super.removeStylesFrom(t)}},ho=0;function uo(){return`fast-style-class-${++ho}`}let fo=class extends tt{constructor(t){super(),this.styles=t,this.behaviors=null,this.behaviors=Os(t),this.styleSheets=nn(t),this.styleClass=uo()}addStylesTo(t){const i=this.styleSheets,n=this.styleClass;t=this.normalizeTarget(t);for(let s=0;s<i.length;s++){const r=document.createElement("style");r.innerHTML=i[s],r.className=n,t.append(r)}super.addStylesTo(t)}removeStylesFrom(t){t=this.normalizeTarget(t);const i=t.querySelectorAll(`.${this.styleClass}`);for(let n=0,s=i.length;n<s;++n)t.removeChild(i[n]);super.removeStylesFrom(t)}isAttachedTo(t){return super.isAttachedTo(this.normalizeTarget(t))}normalizeTarget(t){return t===document?document.body:t}};const Ne=Object.freeze({locate:$s()}),po={toView(e){return e?"true":"false"},fromView(e){return!(e==null||e==="false"||e===!1||e===0)}},sn={toView(e){if(e==null)return null;const t=e*1;return isNaN(t)?null:t.toString()},fromView(e){if(e==null)return null;const t=e*1;return isNaN(t)?null:t}};let go=class Ei{constructor(t,i,n=i.toLowerCase(),s="reflect",r){this.guards=new Set,this.Owner=t,this.name=i,this.attribute=n,this.mode=s,this.converter=r,this.fieldName=`_${i}`,this.callbackName=`${i}Changed`,this.hasCallback=this.callbackName in t.prototype,s==="boolean"&&r===void 0&&(this.converter=po)}setValue(t,i){const n=t[this.fieldName],s=this.converter;s!==void 0&&(i=s.fromView(i)),n!==i&&(t[this.fieldName]=i,this.tryReflectToAttribute(t),this.hasCallback&&t[this.callbackName](n,i),t.$fastController.notify(this.name))}getValue(t){return F.track(t,this.name),t[this.fieldName]}onAttributeChangedCallback(t,i){this.guards.has(t)||(this.guards.add(t),this.setValue(t,i),this.guards.delete(t))}tryReflectToAttribute(t){const i=this.mode,n=this.guards;n.has(t)||i==="fromView"||$.queueUpdate(()=>{n.add(t);const s=t[this.fieldName];switch(i){case"reflect":const r=this.converter;$.setAttribute(t,this.attribute,r!==void 0?r.toView(s):s);break;case"boolean":$.setBooleanAttribute(t,this.attribute,s);break}n.delete(t)})}static collect(t,...i){const n=[];i.push(Ne.locate(t));for(let s=0,r=i.length;s<r;++s){const o=i[s];if(o!==void 0)for(let a=0,l=o.length;a<l;++a){const c=o[a];typeof c=="string"?n.push(new Ei(t,c)):n.push(new Ei(t,c.property,c.attribute,c.mode,c.converter))}}return n}};function m(e,t){let i;function n(s,r){arguments.length>1&&(i.property=r),Ne.locate(s.constructor).push(i)}if(arguments.length>1){i={},n(e,t);return}return i=e===void 0?{}:e,n}const Sn={mode:"open"},$n={},Ii=ce.getById(4,()=>{const e=new Map;return Object.freeze({register(t){return e.has(t.type)?!1:(e.set(t.type,t),!0)},getByType(t){return e.get(t)}})});let ze=class{constructor(t,i=t.definition){typeof i=="string"&&(i={name:i}),this.type=t,this.name=i.name,this.template=i.template;const n=go.collect(t,i.attributes),s=new Array(n.length),r={},o={};for(let a=0,l=n.length;a<l;++a){const c=n[a];s[a]=c.attribute,r[c.name]=c,o[c.attribute]=c}this.attributes=n,this.observedAttributes=s,this.propertyLookup=r,this.attributeLookup=o,this.shadowOptions=i.shadowOptions===void 0?Sn:i.shadowOptions===null?void 0:Object.assign(Object.assign({},Sn),i.shadowOptions),this.elementOptions=i.elementOptions===void 0?$n:Object.assign(Object.assign({},$n),i.elementOptions),this.styles=i.styles===void 0?void 0:Array.isArray(i.styles)?tt.create(i.styles):i.styles instanceof tt?i.styles:tt.create([i.styles])}get isDefined(){return!!Ii.getByType(this.type)}define(t=customElements){const i=this.type;if(Ii.register(this)){const n=this.attributes,s=i.prototype;for(let r=0,o=n.length;r<o;++r)F.defineProperty(s,n[r]);Reflect.defineProperty(i,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return t.get(this.name)||t.define(this.name,i,this.elementOptions),this}};ze.forType=Ii.getByType;const Ls=new WeakMap,bo={bubbles:!0,composed:!0,cancelable:!0};function vi(e){return e.shadowRoot||Ls.get(e)||null}class rn extends Ts{constructor(t,i){super(t),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=t,this.definition=i;const n=i.shadowOptions;if(n!==void 0){const r=t.attachShadow(n);n.mode==="closed"&&Ls.set(t,r)}const s=F.getAccessors(t);if(s.length>0){const r=this.boundObservables=Object.create(null);for(let o=0,a=s.length;o<a;++o){const l=s[o].name,c=t[l];c!==void 0&&(delete t[l],r[l]=c)}}}get isConnected(){return F.track(this,"isConnected"),this._isConnected}setIsConnected(t){this._isConnected=t,F.notify(this,"isConnected")}get template(){return this._template}set template(t){this._template!==t&&(this._template=t,this.needsInitialization||this.renderTemplate(t))}get styles(){return this._styles}set styles(t){this._styles!==t&&(this._styles!==null&&this.removeStyles(this._styles),this._styles=t,!this.needsInitialization&&t!==null&&this.addStyles(t))}addStyles(t){const i=vi(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)i.append(t);else if(!t.isAttachedTo(i)){const n=t.behaviors;t.addStylesTo(i),n!==null&&this.addBehaviors(n)}}removeStyles(t){const i=vi(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)i.removeChild(t);else if(t.isAttachedTo(i)){const n=t.behaviors;t.removeStylesFrom(i),n!==null&&this.removeBehaviors(n)}}addBehaviors(t){const i=this.behaviors||(this.behaviors=new Map),n=t.length,s=[];for(let r=0;r<n;++r){const o=t[r];i.has(o)?i.set(o,i.get(o)+1):(i.set(o,1),s.push(o))}if(this._isConnected){const r=this.element;for(let o=0;o<s.length;++o)s[o].bind(r,ne)}}removeBehaviors(t,i=!1){const n=this.behaviors;if(n===null)return;const s=t.length,r=[];for(let o=0;o<s;++o){const a=t[o];if(n.has(a)){const l=n.get(a)-1;l===0||i?n.delete(a)&&r.push(a):n.set(a,l)}}if(this._isConnected){const o=this.element;for(let a=0;a<r.length;++a)r[a].unbind(o)}}onConnectedCallback(){if(this._isConnected)return;const t=this.element;this.needsInitialization?this.finishInitialization():this.view!==null&&this.view.bind(t,ne);const i=this.behaviors;if(i!==null)for(const[n]of i)n.bind(t,ne);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const t=this.view;t!==null&&t.unbind();const i=this.behaviors;if(i!==null){const n=this.element;for(const[s]of i)s.unbind(n)}}onAttributeChangedCallback(t,i,n){const s=this.definition.attributeLookup[t];s!==void 0&&s.onAttributeChangedCallback(this.element,n)}emit(t,i,n){return this._isConnected?this.element.dispatchEvent(new CustomEvent(t,Object.assign(Object.assign({detail:i},bo),n))):!1}finishInitialization(){const t=this.element,i=this.boundObservables;if(i!==null){const s=Object.keys(i);for(let r=0,o=s.length;r<o;++r){const a=s[r];t[a]=i[a]}this.boundObservables=null}const n=this.definition;this._template===null&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():n.template&&(this._template=n.template||null)),this._template!==null&&this.renderTemplate(this._template),this._styles===null&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():n.styles&&(this._styles=n.styles||null)),this._styles!==null&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(t){const i=this.element,n=vi(i)||i;this.view!==null?(this.view.dispose(),this.view=null):this.needsInitialization||$.removeChildNodes(n),t&&(this.view=t.render(i,n,i))}static forCustomElement(t){const i=t.$fastController;if(i!==void 0)return i;const n=ze.forType(t.constructor);if(n===void 0)throw new Error("Missing FASTElement definition.");return t.$fastController=new rn(t,n)}}function Cn(e){return class extends e{constructor(){super(),rn.forCustomElement(this)}$emit(t,i,n){return this.$fastController.emit(t,i,n)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(t,i,n){this.$fastController.onAttributeChangedCallback(t,i,n)}}}const _e=Object.assign(Cn(HTMLElement),{from(e){return Cn(e)},define(e,t){return new ze(e,t).define().type}});let vo=class{createCSS(){return""}createBehavior(){}};class mo{constructor(t,i){this.target=t,this.propertyName=i}bind(t){t[this.propertyName]=this.target}unbind(){}}function rt(e){return new As("fast-ref",mo,e)}class yo{constructor(t,i){this.target=t,this.options=i,this.source=null}bind(t){const i=this.options.property;this.shouldUpdate=F.getAccessors(t).some(n=>n.name===i),this.source=t,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(ee),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let t=this.getNodes();return this.options.filter!==void 0&&(t=t.filter(this.options.filter)),t}updateTarget(t){this.source[this.options.property]=t}}class wo extends yo{constructor(t,i){super(t,i)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function xo(e){return typeof e=="string"&&(e={property:e}),new As("fast-slotted",wo,e)}class So{handleStartContentChange(){this.startContainer.classList.toggle("start",this.start.assignedNodes().length>0)}handleEndContentChange(){this.endContainer.classList.toggle("end",this.end.assignedNodes().length>0)}}const $o=(e,t)=>wt`
    <span
        part="end"
        ${rt("endContainer")}
        class=${i=>t.end?"end":void 0}
    >
        <slot name="end" ${rt("end")} @slotchange="${i=>i.handleEndContentChange()}">
            ${t.end||""}
        </slot>
    </span>
`,Co=(e,t)=>wt`
    <span
        part="start"
        ${rt("startContainer")}
        class="${i=>t.start?"start":void 0}"
    >
        <slot
            name="start"
            ${rt("start")}
            @slotchange="${i=>i.handleStartContentChange()}"
        >
            ${t.start||""}
        </slot>
    </span>
`,Zh=wt`
    <span part="end" ${rt("endContainer")}>
        <slot
            name="end"
            ${rt("end")}
            @slotchange="${e=>e.handleEndContentChange()}"
        ></slot>
    </span>
`,Kh=wt`
    <span part="start" ${rt("startContainer")}>
        <slot
            name="start"
            ${rt("start")}
            @slotchange="${e=>e.handleStartContentChange()}"
        ></slot>
    </span>
`;/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function b(e,t,i,n){var s=arguments.length,r=s<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,i):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(s<3?o(r):s>3?o(t,i,r):o(t,i))||r);return s>3&&r&&Object.defineProperty(t,i,r),r}const mi=new Map;"metadata"in Reflect||(Reflect.metadata=function(e,t){return function(i){Reflect.defineMetadata(e,t,i)}},Reflect.defineMetadata=function(e,t,i){let n=mi.get(i);n===void 0&&mi.set(i,n=new Map),n.set(e,t)},Reflect.getOwnMetadata=function(e,t){const i=mi.get(t);if(i!==void 0)return i.get(e)});class ko{constructor(t,i){this.container=t,this.key=i}instance(t){return this.registerResolver(0,t)}singleton(t){return this.registerResolver(1,t)}transient(t){return this.registerResolver(2,t)}callback(t){return this.registerResolver(3,t)}cachedCallback(t){return this.registerResolver(3,Es(t))}aliasTo(t){return this.registerResolver(5,t)}registerResolver(t,i){const{container:n,key:s}=this;return this.container=this.key=void 0,n.registerResolver(s,new J(s,t,i))}}function Xt(e){const t=e.slice(),i=Object.keys(e),n=i.length;let s;for(let r=0;r<n;++r)s=i[r],Is(s)||(t[s]=e[s]);return t}const To=Object.freeze({none(e){throw Error(`${e.toString()} not registered, did you forget to add @singleton()?`)},singleton(e){return new J(e,1,e)},transient(e){return new J(e,2,e)}}),yi=Object.freeze({default:Object.freeze({parentLocator:()=>null,responsibleForOwnerRequests:!1,defaultResolver:To.singleton})}),kn=new Map;function Tn(e){return t=>Reflect.getOwnMetadata(e,t)}let Fn=null;const C=Object.freeze({createContainer(e){return new se(null,Object.assign({},yi.default,e))},findResponsibleContainer(e){const t=e.$$container$$;return t&&t.responsibleForOwnerRequests?t:C.findParentContainer(e)},findParentContainer(e){const t=new CustomEvent(Ms,{bubbles:!0,composed:!0,cancelable:!0,detail:{container:void 0}});return e.dispatchEvent(t),t.detail.container||C.getOrCreateDOMContainer()},getOrCreateDOMContainer(e,t){return e?e.$$container$$||new se(e,Object.assign({},yi.default,t,{parentLocator:C.findParentContainer})):Fn||(Fn=new se(null,Object.assign({},yi.default,t,{parentLocator:()=>null})))},getDesignParamtypes:Tn("design:paramtypes"),getAnnotationParamtypes:Tn("di:paramtypes"),getOrCreateAnnotationParamTypes(e){let t=this.getAnnotationParamtypes(e);return t===void 0&&Reflect.defineMetadata("di:paramtypes",t=[],e),t},getDependencies(e){let t=kn.get(e);if(t===void 0){const i=e.inject;if(i===void 0){const n=C.getDesignParamtypes(e),s=C.getAnnotationParamtypes(e);if(n===void 0)if(s===void 0){const r=Object.getPrototypeOf(e);typeof r=="function"&&r!==Function.prototype?t=Xt(C.getDependencies(r)):t=[]}else t=Xt(s);else if(s===void 0)t=Xt(n);else{t=Xt(n);let r=s.length,o;for(let c=0;c<r;++c)o=s[c],o!==void 0&&(t[c]=o);const a=Object.keys(s);r=a.length;let l;for(let c=0;c<r;++c)l=a[c],Is(l)||(t[l]=s[l])}}else t=Xt(i);kn.set(e,t)}return t},defineProperty(e,t,i,n=!1){const s=`$di_${t}`;Reflect.defineProperty(e,t,{get:function(){let r=this[s];if(r===void 0&&(r=(this instanceof HTMLElement?C.findResponsibleContainer(this):C.getOrCreateDOMContainer()).get(i),this[s]=r,n&&this instanceof _e)){const a=this.$fastController,l=()=>{const h=C.findResponsibleContainer(this).get(i),u=this[s];h!==u&&(this[s]=r,a.notify(t))};a.subscribe({handleChange:l},"isConnected")}return r}})},createInterface(e,t){const i=typeof e=="function"?e:t,n=typeof e=="string"?e:e&&"friendlyName"in e&&e.friendlyName||On,s=typeof e=="string"?!1:e&&"respectConnection"in e&&e.respectConnection||!1,r=function(o,a,l){if(o==null||new.target!==void 0)throw new Error(`No registration for interface: '${r.friendlyName}'`);if(a)C.defineProperty(o,a,r,s);else{const c=C.getOrCreateAnnotationParamTypes(o);c[l]=r}};return r.$isInterface=!0,r.friendlyName=n??"(anonymous)",i!=null&&(r.register=function(o,a){return i(new ko(o,a??r))}),r.toString=function(){return`InterfaceSymbol<${r.friendlyName}>`},r},inject(...e){return function(t,i,n){if(typeof n=="number"){const s=C.getOrCreateAnnotationParamTypes(t),r=e[0];r!==void 0&&(s[n]=r)}else if(i)C.defineProperty(t,i,e[0]);else{const s=n?C.getOrCreateAnnotationParamTypes(n.value):C.getOrCreateAnnotationParamTypes(t);let r;for(let o=0;o<e.length;++o)r=e[o],r!==void 0&&(s[o]=r)}}},transient(e){return e.register=function(i){return ue.transient(e,e).register(i)},e.registerInRequestor=!1,e},singleton(e,t=Ao){return e.register=function(n){return ue.singleton(e,e).register(n)},e.registerInRequestor=t.scoped,e}}),Fo=C.createInterface("Container");C.inject;const Ao={scoped:!1};class J{constructor(t,i,n){this.key=t,this.strategy=i,this.state=n,this.resolving=!1}get $isResolver(){return!0}register(t){return t.registerResolver(this.key,this)}resolve(t,i){switch(this.strategy){case 0:return this.state;case 1:{if(this.resolving)throw new Error(`Cyclic dependency found: ${this.state.name}`);return this.resolving=!0,this.state=t.getFactory(this.state).construct(i),this.strategy=0,this.resolving=!1,this.state}case 2:{const n=t.getFactory(this.state);if(n===null)throw new Error(`Resolver for ${String(this.key)} returned a null factory`);return n.construct(i)}case 3:return this.state(t,i,this);case 4:return this.state[0].resolve(t,i);case 5:return i.get(this.state);default:throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`)}}getFactory(t){var i,n,s;switch(this.strategy){case 1:case 2:return t.getFactory(this.state);case 5:return(s=(n=(i=t.getResolver(this.state))===null||i===void 0?void 0:i.getFactory)===null||n===void 0?void 0:n.call(i,t))!==null&&s!==void 0?s:null;default:return null}}}function An(e){return this.get(e)}function Ro(e,t){return t(e)}class Do{constructor(t,i){this.Type=t,this.dependencies=i,this.transformers=null}construct(t,i){let n;return i===void 0?n=new this.Type(...this.dependencies.map(An,t)):n=new this.Type(...this.dependencies.map(An,t),...i),this.transformers==null?n:this.transformers.reduce(Ro,n)}registerTransformer(t){(this.transformers||(this.transformers=[])).push(t)}}const Oo={$isResolver:!0,resolve(e,t){return t}};function Te(e){return typeof e.register=="function"}function No(e){return Te(e)&&typeof e.registerInRequestor=="boolean"}function Rn(e){return No(e)&&e.registerInRequestor}function Bo(e){return e.prototype!==void 0}const Vo=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]),Ms="__DI_LOCATE_PARENT__",wi=new Map;class se{constructor(t,i){this.owner=t,this.config=i,this._parent=void 0,this.registerDepth=0,this.context=null,t!==null&&(t.$$container$$=this),this.resolvers=new Map,this.resolvers.set(Fo,Oo),t instanceof Node&&t.addEventListener(Ms,n=>{n.composedPath()[0]!==this.owner&&(n.detail.container=this,n.stopImmediatePropagation())})}get parent(){return this._parent===void 0&&(this._parent=this.config.parentLocator(this.owner)),this._parent}get depth(){return this.parent===null?0:this.parent.depth+1}get responsibleForOwnerRequests(){return this.config.responsibleForOwnerRequests}registerWithContext(t,...i){return this.context=t,this.register(...i),this.context=null,this}register(...t){if(++this.registerDepth===100)throw new Error("Unable to autoregister dependency");let i,n,s,r,o;const a=this.context;for(let l=0,c=t.length;l<c;++l)if(i=t[l],!!Nn(i))if(Te(i))i.register(this,a);else if(Bo(i))ue.singleton(i,i).register(this);else for(n=Object.keys(i),r=0,o=n.length;r<o;++r)s=i[n[r]],Nn(s)&&(Te(s)?s.register(this,a):this.register(s));return--this.registerDepth,this}registerResolver(t,i){xe(t);const n=this.resolvers,s=n.get(t);return s==null?n.set(t,i):s instanceof J&&s.strategy===4?s.state.push(i):n.set(t,new J(t,4,[s,i])),i}registerTransformer(t,i){const n=this.getResolver(t);if(n==null)return!1;if(n.getFactory){const s=n.getFactory(this);return s==null?!1:(s.registerTransformer(i),!0)}return!1}getResolver(t,i=!0){if(xe(t),t.resolve!==void 0)return t;let n=this,s;for(;n!=null;)if(s=n.resolvers.get(t),s==null){if(n.parent==null){const r=Rn(t)?this:n;return i?this.jitRegister(t,r):null}n=n.parent}else return s;return null}has(t,i=!1){return this.resolvers.has(t)?!0:i&&this.parent!=null?this.parent.has(t,!0):!1}get(t){if(xe(t),t.$isResolver)return t.resolve(this,this);let i=this,n;for(;i!=null;)if(n=i.resolvers.get(t),n==null){if(i.parent==null){const s=Rn(t)?this:i;return n=this.jitRegister(t,s),n.resolve(i,this)}i=i.parent}else return n.resolve(i,this);throw new Error(`Unable to resolve key: ${String(t)}`)}getAll(t,i=!1){xe(t);const n=this;let s=n,r;if(i){let o=ee;for(;s!=null;)r=s.resolvers.get(t),r!=null&&(o=o.concat(Dn(r,s,n))),s=s.parent;return o}else for(;s!=null;)if(r=s.resolvers.get(t),r==null){if(s=s.parent,s==null)return ee}else return Dn(r,s,n);return ee}getFactory(t){let i=wi.get(t);if(i===void 0){if(Po(t))throw new Error(`${t.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);wi.set(t,i=new Do(t,C.getDependencies(t)))}return i}registerFactory(t,i){wi.set(t,i)}createChild(t){return new se(null,Object.assign({},this.config,t,{parentLocator:()=>this}))}jitRegister(t,i){if(typeof t!="function")throw new Error(`Attempted to jitRegister something that is not a constructor: '${t}'. Did you forget to register this dependency?`);if(Vo.has(t.name))throw new Error(`Attempted to jitRegister an intrinsic type: ${t.name}. Did you forget to add @inject(Key)`);if(Te(t)){const n=t.register(i);if(!(n instanceof Object)||n.resolve==null){const s=i.resolvers.get(t);if(s!=null)return s;throw new Error("A valid resolver was not returned from the static register method")}return n}else{if(t.$isInterface)throw new Error(`Attempted to jitRegister an interface: ${t.friendlyName}`);{const n=this.config.defaultResolver(t,i);return i.resolvers.set(t,n),n}}}}const xi=new WeakMap;function Es(e){return function(t,i,n){if(xi.has(n))return xi.get(n);const s=e(t,i,n);return xi.set(n,s),s}}const ue=Object.freeze({instance(e,t){return new J(e,0,t)},singleton(e,t){return new J(e,1,t)},transient(e,t){return new J(e,2,t)},callback(e,t){return new J(e,3,t)},cachedCallback(e,t){return new J(e,3,Es(t))},aliasTo(e,t){return new J(t,5,e)}});function xe(e){if(e==null)throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?")}function Dn(e,t,i){if(e instanceof J&&e.strategy===4){const n=e.state;let s=n.length;const r=new Array(s);for(;s--;)r[s]=n[s].resolve(t,i);return r}return[e.resolve(t,i)]}const On="(anonymous)";function Nn(e){return typeof e=="object"&&e!==null||typeof e=="function"}const Po=(function(){const e=new WeakMap;let t=!1,i="",n=0;return function(s){return t=e.get(s),t===void 0&&(i=s.toString(),n=i.length,t=n>=29&&n<=100&&i.charCodeAt(n-1)===125&&i.charCodeAt(n-2)<=32&&i.charCodeAt(n-3)===93&&i.charCodeAt(n-4)===101&&i.charCodeAt(n-5)===100&&i.charCodeAt(n-6)===111&&i.charCodeAt(n-7)===99&&i.charCodeAt(n-8)===32&&i.charCodeAt(n-9)===101&&i.charCodeAt(n-10)===118&&i.charCodeAt(n-11)===105&&i.charCodeAt(n-12)===116&&i.charCodeAt(n-13)===97&&i.charCodeAt(n-14)===110&&i.charCodeAt(n-15)===88,e.set(s,t)),t}})(),Se={};function Is(e){switch(typeof e){case"number":return e>=0&&(e|0)===e;case"string":{const t=Se[e];if(t!==void 0)return t;const i=e.length;if(i===0)return Se[e]=!1;let n=0;for(let s=0;s<i;++s)if(n=e.charCodeAt(s),s===0&&n===48&&i>1||n<48||n>57)return Se[e]=!1;return Se[e]=!0}default:return!1}}function Bn(e){return`${e.toLowerCase()}:presentation`}const $e=new Map,Hs=Object.freeze({define(e,t,i){const n=Bn(e);$e.get(n)===void 0?$e.set(n,t):$e.set(n,!1),i.register(ue.instance(n,t))},forTag(e,t){const i=Bn(e),n=$e.get(i);return n===!1?C.findResponsibleContainer(t).get(i):n||null}});class Lo{constructor(t,i){this.template=t||null,this.styles=i===void 0?null:Array.isArray(i)?tt.create(i):i instanceof tt?i:tt.create([i])}applyTo(t){const i=t.$fastController;i.template===null&&(i.template=this.template),i.styles===null&&(i.styles=this.styles)}}class at extends _e{constructor(){super(...arguments),this._presentation=void 0}get $presentation(){return this._presentation===void 0&&(this._presentation=Hs.forTag(this.tagName,this)),this._presentation}templateChanged(){this.template!==void 0&&(this.$fastController.template=this.template)}stylesChanged(){this.styles!==void 0&&(this.$fastController.styles=this.styles)}connectedCallback(){this.$presentation!==null&&this.$presentation.applyTo(this),super.connectedCallback()}static compose(t){return(i={})=>new Mo(this===at?class extends at{}:this,t,i)}}b([_],at.prototype,"template",void 0);b([_],at.prototype,"styles",void 0);function Yt(e,t,i){return typeof e=="function"?e(t,i):e}class Mo{constructor(t,i,n){this.type=t,this.elementDefinition=i,this.overrideDefinition=n,this.definition=Object.assign(Object.assign({},this.elementDefinition),this.overrideDefinition)}register(t,i){const n=this.definition,s=this.overrideDefinition,o=`${n.prefix||i.elementPrefix}-${n.baseName}`;i.tryDefineElement({name:o,type:this.type,baseClass:this.elementDefinition.baseClass,callback:a=>{const l=new Lo(Yt(n.template,a,n),Yt(n.styles,a,n));a.definePresentation(l);let c=Yt(n.shadowOptions,a,n);a.shadowRootMode&&(c?s.shadowOptions||(c.mode=a.shadowRootMode):c!==null&&(c={mode:a.shadowRootMode})),a.defineElement({elementOptions:Yt(n.elementOptions,a,n),shadowOptions:c,attributes:Yt(n.attributes,a,n)})}})}}function js(e,...t){const i=Ne.locate(e);t.forEach(n=>{Object.getOwnPropertyNames(n.prototype).forEach(r=>{r!=="constructor"&&Object.defineProperty(e.prototype,r,Object.getOwnPropertyDescriptor(n.prototype,r))}),Ne.locate(n).forEach(r=>i.push(r))})}const ht={horizontal:"horizontal",vertical:"vertical"};function Eo(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function Io(){const e=document.querySelector('meta[property="csp-nonce"]');return e?e.getAttribute("content"):null}let Ct;function Ho(){if(typeof Ct=="boolean")return Ct;if(!Eo())return Ct=!1,Ct;const e=document.createElement("style"),t=Io();t!==null&&e.setAttribute("nonce",t),document.head.appendChild(e);try{e.sheet.insertRule("foo:focus-visible {color:inherit}",0),Ct=!0}catch{Ct=!1}finally{document.head.removeChild(e)}return Ct}var Vn;(function(e){e[e.alt=18]="alt",e[e.arrowDown=40]="arrowDown",e[e.arrowLeft=37]="arrowLeft",e[e.arrowRight=39]="arrowRight",e[e.arrowUp=38]="arrowUp",e[e.back=8]="back",e[e.backSlash=220]="backSlash",e[e.break=19]="break",e[e.capsLock=20]="capsLock",e[e.closeBracket=221]="closeBracket",e[e.colon=186]="colon",e[e.colon2=59]="colon2",e[e.comma=188]="comma",e[e.ctrl=17]="ctrl",e[e.delete=46]="delete",e[e.end=35]="end",e[e.enter=13]="enter",e[e.equals=187]="equals",e[e.equals2=61]="equals2",e[e.equals3=107]="equals3",e[e.escape=27]="escape",e[e.forwardSlash=191]="forwardSlash",e[e.function1=112]="function1",e[e.function10=121]="function10",e[e.function11=122]="function11",e[e.function12=123]="function12",e[e.function2=113]="function2",e[e.function3=114]="function3",e[e.function4=115]="function4",e[e.function5=116]="function5",e[e.function6=117]="function6",e[e.function7=118]="function7",e[e.function8=119]="function8",e[e.function9=120]="function9",e[e.home=36]="home",e[e.insert=45]="insert",e[e.menu=93]="menu",e[e.minus=189]="minus",e[e.minus2=109]="minus2",e[e.numLock=144]="numLock",e[e.numPad0=96]="numPad0",e[e.numPad1=97]="numPad1",e[e.numPad2=98]="numPad2",e[e.numPad3=99]="numPad3",e[e.numPad4=100]="numPad4",e[e.numPad5=101]="numPad5",e[e.numPad6=102]="numPad6",e[e.numPad7=103]="numPad7",e[e.numPad8=104]="numPad8",e[e.numPad9=105]="numPad9",e[e.numPadDivide=111]="numPadDivide",e[e.numPadDot=110]="numPadDot",e[e.numPadMinus=109]="numPadMinus",e[e.numPadMultiply=106]="numPadMultiply",e[e.numPadPlus=107]="numPadPlus",e[e.openBracket=219]="openBracket",e[e.pageDown=34]="pageDown",e[e.pageUp=33]="pageUp",e[e.period=190]="period",e[e.print=44]="print",e[e.quote=222]="quote",e[e.scrollLock=145]="scrollLock",e[e.shift=16]="shift",e[e.space=32]="space",e[e.tab=9]="tab",e[e.tilde=192]="tilde",e[e.windowsLeft=91]="windowsLeft",e[e.windowsOpera=219]="windowsOpera",e[e.windowsRight=92]="windowsRight"})(Vn||(Vn={}));const jo="ArrowDown",zo="ArrowLeft",_o="ArrowRight",qo="ArrowUp",Uo="Enter";const Wo="Home",Go="End";var ft;(function(e){e.ltr="ltr",e.rtl="rtl"})(ft||(ft={}));function Qo(e,t,i){return Math.min(Math.max(i,e),t)}var d;(function(e){e.Canvas="Canvas",e.CanvasText="CanvasText",e.LinkText="LinkText",e.VisitedText="VisitedText",e.ActiveText="ActiveText",e.ButtonFace="ButtonFace",e.ButtonText="ButtonText",e.Field="Field",e.FieldText="FieldText",e.Highlight="Highlight",e.HighlightText="HighlightText",e.GrayText="GrayText"})(d||(d={}));class R{}b([m({attribute:"aria-atomic"})],R.prototype,"ariaAtomic",void 0);b([m({attribute:"aria-busy"})],R.prototype,"ariaBusy",void 0);b([m({attribute:"aria-controls"})],R.prototype,"ariaControls",void 0);b([m({attribute:"aria-current"})],R.prototype,"ariaCurrent",void 0);b([m({attribute:"aria-describedby"})],R.prototype,"ariaDescribedby",void 0);b([m({attribute:"aria-details"})],R.prototype,"ariaDetails",void 0);b([m({attribute:"aria-disabled"})],R.prototype,"ariaDisabled",void 0);b([m({attribute:"aria-errormessage"})],R.prototype,"ariaErrormessage",void 0);b([m({attribute:"aria-flowto"})],R.prototype,"ariaFlowto",void 0);b([m({attribute:"aria-haspopup"})],R.prototype,"ariaHaspopup",void 0);b([m({attribute:"aria-hidden"})],R.prototype,"ariaHidden",void 0);b([m({attribute:"aria-invalid"})],R.prototype,"ariaInvalid",void 0);b([m({attribute:"aria-keyshortcuts"})],R.prototype,"ariaKeyshortcuts",void 0);b([m({attribute:"aria-label"})],R.prototype,"ariaLabel",void 0);b([m({attribute:"aria-labelledby"})],R.prototype,"ariaLabelledby",void 0);b([m({attribute:"aria-live"})],R.prototype,"ariaLive",void 0);b([m({attribute:"aria-owns"})],R.prototype,"ariaOwns",void 0);b([m({attribute:"aria-relevant"})],R.prototype,"ariaRelevant",void 0);b([m({attribute:"aria-roledescription"})],R.prototype,"ariaRoledescription",void 0);const Xo=e=>{const t=e.closest("[dir]");return t!==null&&t.dir==="rtl"?ft.rtl:ft.ltr},Yo=(e,t)=>wt`
    <template class="${i=>i.circular?"circular":""}">
        <div class="control" part="control" style="${i=>i.generateBadgeStyle()}">
            <slot></slot>
        </div>
    </template>
`;class qe extends at{constructor(){super(...arguments),this.generateBadgeStyle=()=>{if(!this.fill&&!this.color)return;const t=`background-color: var(--badge-fill-${this.fill});`,i=`color: var(--badge-color-${this.color});`;return this.fill&&!this.color?t:this.color&&!this.fill?i:`${i} ${t}`}}}b([m({attribute:"fill"})],qe.prototype,"fill",void 0);b([m({attribute:"color"})],qe.prototype,"color",void 0);b([m({mode:"boolean"})],qe.prototype,"circular",void 0);const Jo=(e,t)=>wt`
    <button
        class="control"
        part="control"
        ?autofocus="${i=>i.autofocus}"
        ?disabled="${i=>i.disabled}"
        form="${i=>i.formId}"
        formaction="${i=>i.formaction}"
        formenctype="${i=>i.formenctype}"
        formmethod="${i=>i.formmethod}"
        formnovalidate="${i=>i.formnovalidate}"
        formtarget="${i=>i.formtarget}"
        name="${i=>i.name}"
        type="${i=>i.type}"
        value="${i=>i.value}"
        aria-atomic="${i=>i.ariaAtomic}"
        aria-busy="${i=>i.ariaBusy}"
        aria-controls="${i=>i.ariaControls}"
        aria-current="${i=>i.ariaCurrent}"
        aria-describedby="${i=>i.ariaDescribedby}"
        aria-details="${i=>i.ariaDetails}"
        aria-disabled="${i=>i.ariaDisabled}"
        aria-errormessage="${i=>i.ariaErrormessage}"
        aria-expanded="${i=>i.ariaExpanded}"
        aria-flowto="${i=>i.ariaFlowto}"
        aria-haspopup="${i=>i.ariaHaspopup}"
        aria-hidden="${i=>i.ariaHidden}"
        aria-invalid="${i=>i.ariaInvalid}"
        aria-keyshortcuts="${i=>i.ariaKeyshortcuts}"
        aria-label="${i=>i.ariaLabel}"
        aria-labelledby="${i=>i.ariaLabelledby}"
        aria-live="${i=>i.ariaLive}"
        aria-owns="${i=>i.ariaOwns}"
        aria-pressed="${i=>i.ariaPressed}"
        aria-relevant="${i=>i.ariaRelevant}"
        aria-roledescription="${i=>i.ariaRoledescription}"
        ${rt("control")}
    >
        ${Co(e,t)}
        <span class="content" part="content">
            <slot ${xo("defaultSlottedContent")}></slot>
        </span>
        ${$o(e,t)}
    </button>
`,Pn="form-associated-proxy",Ln="ElementInternals",Mn=Ln in window&&"setFormValue"in window[Ln].prototype,En=new WeakMap;function zs(e){const t=class extends e{constructor(...i){super(...i),this.dirtyValue=!1,this.disabled=!1,this.proxyEventsToBlock=["change","click"],this.proxyInitialized=!1,this.required=!1,this.initialValue=this.initialValue||"",this.elementInternals||(this.formResetCallback=this.formResetCallback.bind(this))}static get formAssociated(){return Mn}get validity(){return this.elementInternals?this.elementInternals.validity:this.proxy.validity}get form(){return this.elementInternals?this.elementInternals.form:this.proxy.form}get validationMessage(){return this.elementInternals?this.elementInternals.validationMessage:this.proxy.validationMessage}get willValidate(){return this.elementInternals?this.elementInternals.willValidate:this.proxy.willValidate}get labels(){if(this.elementInternals)return Object.freeze(Array.from(this.elementInternals.labels));if(this.proxy instanceof HTMLElement&&this.proxy.ownerDocument&&this.id){const i=this.proxy.labels,n=Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)),s=i?n.concat(Array.from(i)):n;return Object.freeze(s)}else return ee}valueChanged(i,n){this.dirtyValue=!0,this.proxy instanceof HTMLElement&&(this.proxy.value=this.value),this.currentValue=this.value,this.setFormValue(this.value),this.validate()}currentValueChanged(){this.value=this.currentValue}initialValueChanged(i,n){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}disabledChanged(i,n){this.proxy instanceof HTMLElement&&(this.proxy.disabled=this.disabled),$.queueUpdate(()=>this.classList.toggle("disabled",this.disabled))}nameChanged(i,n){this.proxy instanceof HTMLElement&&(this.proxy.name=this.name)}requiredChanged(i,n){this.proxy instanceof HTMLElement&&(this.proxy.required=this.required),$.queueUpdate(()=>this.classList.toggle("required",this.required)),this.validate()}get elementInternals(){if(!Mn)return null;let i=En.get(this);return i||(i=this.attachInternals(),En.set(this,i)),i}connectedCallback(){super.connectedCallback(),this.addEventListener("keypress",this._keypressHandler),this.value||(this.value=this.initialValue,this.dirtyValue=!1),this.elementInternals||(this.attachProxy(),this.form&&this.form.addEventListener("reset",this.formResetCallback))}disconnectedCallback(){super.disconnectedCallback(),this.proxyEventsToBlock.forEach(i=>this.proxy.removeEventListener(i,this.stopPropagation)),!this.elementInternals&&this.form&&this.form.removeEventListener("reset",this.formResetCallback)}checkValidity(){return this.elementInternals?this.elementInternals.checkValidity():this.proxy.checkValidity()}reportValidity(){return this.elementInternals?this.elementInternals.reportValidity():this.proxy.reportValidity()}setValidity(i,n,s){this.elementInternals?this.elementInternals.setValidity(i,n,s):typeof n=="string"&&this.proxy.setCustomValidity(n)}formDisabledCallback(i){this.disabled=i}formResetCallback(){this.value=this.initialValue,this.dirtyValue=!1}attachProxy(){var i;this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.display="none",this.proxyEventsToBlock.forEach(n=>this.proxy.addEventListener(n,this.stopPropagation)),this.proxy.disabled=this.disabled,this.proxy.required=this.required,typeof this.name=="string"&&(this.proxy.name=this.name),typeof this.value=="string"&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",Pn),this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",Pn)),(i=this.shadowRoot)===null||i===void 0||i.appendChild(this.proxySlot),this.appendChild(this.proxy)}detachProxy(){var i;this.removeChild(this.proxy),(i=this.shadowRoot)===null||i===void 0||i.removeChild(this.proxySlot)}validate(i){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage,i)}setFormValue(i,n){this.elementInternals&&this.elementInternals.setFormValue(i,n||i)}_keypressHandler(i){switch(i.key){case Uo:if(this.form instanceof HTMLFormElement){const n=this.form.querySelector("[type=submit]");n==null||n.click()}break}}stopPropagation(i){i.stopPropagation()}};return m({mode:"boolean"})(t.prototype,"disabled"),m({mode:"fromView",attribute:"value"})(t.prototype,"initialValue"),m({attribute:"current-value"})(t.prototype,"currentValue"),m(t.prototype,"name"),m({mode:"boolean"})(t.prototype,"required"),_(t.prototype,"value"),t}class Zo extends at{}class Ko extends zs(Zo){constructor(){super(...arguments),this.proxy=document.createElement("input")}}let et=class extends Ko{constructor(){super(...arguments),this.handleClick=t=>{var i;this.disabled&&((i=this.defaultSlottedContent)===null||i===void 0?void 0:i.length)<=1&&t.stopPropagation()},this.handleSubmission=()=>{if(!this.form)return;const t=this.proxy.isConnected;t||this.attachProxy(),typeof this.form.requestSubmit=="function"?this.form.requestSubmit(this.proxy):this.proxy.click(),t||this.detachProxy()},this.handleFormReset=()=>{var t;(t=this.form)===null||t===void 0||t.reset()},this.handleUnsupportedDelegatesFocus=()=>{var t;window.ShadowRoot&&!window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus")&&(!((t=this.$fastController.definition.shadowOptions)===null||t===void 0)&&t.delegatesFocus)&&(this.focus=()=>{this.control.focus()})}}formactionChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formAction=this.formaction)}formenctypeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formEnctype=this.formenctype)}formmethodChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formMethod=this.formmethod)}formnovalidateChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formNoValidate=this.formnovalidate)}formtargetChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formTarget=this.formtarget)}typeChanged(t,i){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type),i==="submit"&&this.addEventListener("click",this.handleSubmission),t==="submit"&&this.removeEventListener("click",this.handleSubmission),i==="reset"&&this.addEventListener("click",this.handleFormReset),t==="reset"&&this.removeEventListener("click",this.handleFormReset)}validate(){super.validate(this.control)}connectedCallback(){var t;super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.handleUnsupportedDelegatesFocus();const i=Array.from((t=this.control)===null||t===void 0?void 0:t.children);i&&i.forEach(n=>{n.addEventListener("click",this.handleClick)})}disconnectedCallback(){var t;super.disconnectedCallback();const i=Array.from((t=this.control)===null||t===void 0?void 0:t.children);i&&i.forEach(n=>{n.removeEventListener("click",this.handleClick)})}};b([m({mode:"boolean"})],et.prototype,"autofocus",void 0);b([m({attribute:"form"})],et.prototype,"formId",void 0);b([m],et.prototype,"formaction",void 0);b([m],et.prototype,"formenctype",void 0);b([m],et.prototype,"formmethod",void 0);b([m({mode:"boolean"})],et.prototype,"formnovalidate",void 0);b([m],et.prototype,"formtarget",void 0);b([m],et.prototype,"type",void 0);b([_],et.prototype,"defaultSlottedContent",void 0);class Ue{}b([m({attribute:"aria-expanded"})],Ue.prototype,"ariaExpanded",void 0);b([m({attribute:"aria-pressed"})],Ue.prototype,"ariaPressed",void 0);js(Ue,R);js(et,So,Ue);const ta=(e,t)=>wt`
    <slot></slot>
`;let _s=class extends at{};function Be(e){const t=e.parentElement;if(t)return t;{const i=e.getRootNode();if(i.host instanceof HTMLElement)return i.host}return null}function ea(e,t){let i=t;for(;i!==null;){if(i===e)return!0;i=Be(i)}return!1}const dt=document.createElement("div");function ia(e){return e instanceof _e}class on{setProperty(t,i){$.queueUpdate(()=>this.target.setProperty(t,i))}removeProperty(t){$.queueUpdate(()=>this.target.removeProperty(t))}}class na extends on{constructor(t){super();const i=new CSSStyleSheet;i[Ns]=!0,this.target=i.cssRules[i.insertRule(":host{}")].style,t.$fastController.addStyles(tt.create([i]))}}class sa extends on{constructor(){super();const t=new CSSStyleSheet;this.target=t.cssRules[t.insertRule(":root{}")].style,document.adoptedStyleSheets=[...document.adoptedStyleSheets,t]}}class ra extends on{constructor(){super(),this.style=document.createElement("style"),document.head.appendChild(this.style);const{sheet:t}=this.style;if(t){const i=t.insertRule(":root{}",t.cssRules.length);this.target=t.cssRules[i].style}}}class qs{constructor(t){this.store=new Map,this.target=null;const i=t.$fastController;this.style=document.createElement("style"),i.addStyles(this.style),F.getNotifier(i).subscribe(this,"isConnected"),this.handleChange(i,"isConnected")}targetChanged(){if(this.target!==null)for(const[t,i]of this.store.entries())this.target.setProperty(t,i)}setProperty(t,i){this.store.set(t,i),$.queueUpdate(()=>{this.target!==null&&this.target.setProperty(t,i)})}removeProperty(t){this.store.delete(t),$.queueUpdate(()=>{this.target!==null&&this.target.removeProperty(t)})}handleChange(t,i){const{sheet:n}=this.style;if(n){const s=n.insertRule(":host{}",n.cssRules.length);this.target=n.cssRules[s].style}else this.target=null}}b([_],qs.prototype,"target",void 0);class oa{constructor(t){this.target=t.style}setProperty(t,i){$.queueUpdate(()=>this.target.setProperty(t,i))}removeProperty(t){$.queueUpdate(()=>this.target.removeProperty(t))}}class O{setProperty(t,i){O.properties[t]=i;for(const n of O.roots.values())Vt.getOrCreate(O.normalizeRoot(n)).setProperty(t,i)}removeProperty(t){delete O.properties[t];for(const i of O.roots.values())Vt.getOrCreate(O.normalizeRoot(i)).removeProperty(t)}static registerRoot(t){const{roots:i}=O;if(!i.has(t)){i.add(t);const n=Vt.getOrCreate(this.normalizeRoot(t));for(const s in O.properties)n.setProperty(s,O.properties[s])}}static unregisterRoot(t){const{roots:i}=O;if(i.has(t)){i.delete(t);const n=Vt.getOrCreate(O.normalizeRoot(t));for(const s in O.properties)n.removeProperty(s)}}static normalizeRoot(t){return t===dt?document:t}}O.roots=new Set;O.properties={};const Si=new WeakMap,aa=$.supportsAdoptedStyleSheets?na:qs,Vt=Object.freeze({getOrCreate(e){if(Si.has(e))return Si.get(e);let t;return e===dt?t=new O:e instanceof Document?t=$.supportsAdoptedStyleSheets?new sa:new ra:ia(e)?t=new aa(e):t=new oa(e),Si.set(e,t),t}});class z extends vo{constructor(t){super(),this.subscribers=new WeakMap,this._appliedTo=new Set,this.name=t.name,t.cssCustomPropertyName!==null&&(this.cssCustomProperty=`--${t.cssCustomPropertyName}`,this.cssVar=`var(${this.cssCustomProperty})`),this.id=z.uniqueId(),z.tokensById.set(this.id,this)}get appliedTo(){return[...this._appliedTo]}static from(t){return new z({name:typeof t=="string"?t:t.name,cssCustomPropertyName:typeof t=="string"?t:t.cssCustomPropertyName===void 0?t.name:t.cssCustomPropertyName})}static isCSSDesignToken(t){return typeof t.cssCustomProperty=="string"}static isDerivedDesignTokenValue(t){return typeof t=="function"}static getTokenById(t){return z.tokensById.get(t)}getOrCreateSubscriberSet(t=this){return this.subscribers.get(t)||this.subscribers.set(t,new Set)&&this.subscribers.get(t)}createCSS(){return this.cssVar||""}getValueFor(t){const i=T.getOrCreate(t).get(this);if(i!==void 0)return i;throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${t} or an ancestor of ${t}.`)}setValueFor(t,i){return this._appliedTo.add(t),i instanceof z&&(i=this.alias(i)),T.getOrCreate(t).set(this,i),this}deleteValueFor(t){return this._appliedTo.delete(t),T.existsFor(t)&&T.getOrCreate(t).delete(this),this}withDefault(t){return this.setValueFor(dt,t),this}subscribe(t,i){const n=this.getOrCreateSubscriberSet(i);i&&!T.existsFor(i)&&T.getOrCreate(i),n.has(t)||n.add(t)}unsubscribe(t,i){const n=this.subscribers.get(i||this);n&&n.has(t)&&n.delete(t)}notify(t){const i=Object.freeze({token:this,target:t});this.subscribers.has(this)&&this.subscribers.get(this).forEach(n=>n.handleChange(i)),this.subscribers.has(t)&&this.subscribers.get(t).forEach(n=>n.handleChange(i))}alias(t){return(i=>t.getValueFor(i))}}z.uniqueId=(()=>{let e=0;return()=>(e++,e.toString(16))})();z.tokensById=new Map;class la{startReflection(t,i){t.subscribe(this,i),this.handleChange({token:t,target:i})}stopReflection(t,i){t.unsubscribe(this,i),this.remove(t,i)}handleChange(t){const{token:i,target:n}=t;this.add(i,n)}add(t,i){Vt.getOrCreate(i).setProperty(t.cssCustomProperty,this.resolveCSSValue(T.getOrCreate(i).get(t)))}remove(t,i){Vt.getOrCreate(i).removeProperty(t.cssCustomProperty)}resolveCSSValue(t){return t&&typeof t.createCSS=="function"?t.createCSS():t}}class ca{constructor(t,i,n){this.source=t,this.token=i,this.node=n,this.dependencies=new Set,this.observer=F.binding(t,this,!1),this.observer.handleChange=this.observer.call,this.handleChange()}disconnect(){this.observer.disconnect()}handleChange(){try{this.node.store.set(this.token,this.observer.observe(this.node.target,ne))}catch(t){console.error(t)}}}class ha{constructor(){this.values=new Map}set(t,i){this.values.get(t)!==i&&(this.values.set(t,i),F.getNotifier(this).notify(t.id))}get(t){return F.track(this,t.id),this.values.get(t)}delete(t){this.values.delete(t),F.getNotifier(this).notify(t.id)}all(){return this.values.entries()}}const Jt=new WeakMap,Zt=new WeakMap;class T{constructor(t){this.target=t,this.store=new ha,this.children=[],this.assignedValues=new Map,this.reflecting=new Set,this.bindingObservers=new Map,this.tokenValueChangeHandler={handleChange:(i,n)=>{const s=z.getTokenById(n);s&&(s.notify(this.target),this.updateCSSTokenReflection(i,s))}},Jt.set(t,this),F.getNotifier(this.store).subscribe(this.tokenValueChangeHandler),t instanceof _e?t.$fastController.addBehaviors([this]):t.isConnected&&this.bind()}static getOrCreate(t){return Jt.get(t)||new T(t)}static existsFor(t){return Jt.has(t)}static findParent(t){if(dt!==t.target){let i=Be(t.target);for(;i!==null;){if(Jt.has(i))return Jt.get(i);i=Be(i)}return T.getOrCreate(dt)}return null}static findClosestAssignedNode(t,i){let n=i;do{if(n.has(t))return n;n=n.parent?n.parent:n.target!==dt?T.getOrCreate(dt):null}while(n!==null);return null}get parent(){return Zt.get(this)||null}updateCSSTokenReflection(t,i){if(z.isCSSDesignToken(i)){const n=this.parent,s=this.isReflecting(i);if(n){const r=n.get(i),o=t.get(i);r!==o&&!s?this.reflectToCSS(i):r===o&&s&&this.stopReflectToCSS(i)}else s||this.reflectToCSS(i)}}has(t){return this.assignedValues.has(t)}get(t){const i=this.store.get(t);if(i!==void 0)return i;const n=this.getRaw(t);if(n!==void 0)return this.hydrate(t,n),this.get(t)}getRaw(t){var i;return this.assignedValues.has(t)?this.assignedValues.get(t):(i=T.findClosestAssignedNode(t,this))===null||i===void 0?void 0:i.getRaw(t)}set(t,i){z.isDerivedDesignTokenValue(this.assignedValues.get(t))&&this.tearDownBindingObserver(t),this.assignedValues.set(t,i),z.isDerivedDesignTokenValue(i)?this.setupBindingObserver(t,i):this.store.set(t,i)}delete(t){this.assignedValues.delete(t),this.tearDownBindingObserver(t);const i=this.getRaw(t);i?this.hydrate(t,i):this.store.delete(t)}bind(){const t=T.findParent(this);t&&t.appendChild(this);for(const i of this.assignedValues.keys())i.notify(this.target)}unbind(){this.parent&&Zt.get(this).removeChild(this);for(const t of this.bindingObservers.keys())this.tearDownBindingObserver(t)}appendChild(t){t.parent&&Zt.get(t).removeChild(t);const i=this.children.filter(n=>t.contains(n));Zt.set(t,this),this.children.push(t),i.forEach(n=>t.appendChild(n)),F.getNotifier(this.store).subscribe(t);for(const[n,s]of this.store.all())t.hydrate(n,this.bindingObservers.has(n)?this.getRaw(n):s),t.updateCSSTokenReflection(t.store,n)}removeChild(t){const i=this.children.indexOf(t);if(i!==-1&&this.children.splice(i,1),F.getNotifier(this.store).unsubscribe(t),t.parent!==this)return!1;const n=Zt.delete(t);for(const[s]of this.store.all())t.hydrate(s,t.getRaw(s)),t.updateCSSTokenReflection(t.store,s);return n}contains(t){return ea(this.target,t.target)}reflectToCSS(t){this.isReflecting(t)||(this.reflecting.add(t),T.cssCustomPropertyReflector.startReflection(t,this.target))}stopReflectToCSS(t){this.isReflecting(t)&&(this.reflecting.delete(t),T.cssCustomPropertyReflector.stopReflection(t,this.target))}isReflecting(t){return this.reflecting.has(t)}handleChange(t,i){const n=z.getTokenById(i);n&&(this.hydrate(n,this.getRaw(n)),this.updateCSSTokenReflection(this.store,n))}hydrate(t,i){if(!this.has(t)){const n=this.bindingObservers.get(t);z.isDerivedDesignTokenValue(i)?n?n.source!==i&&(this.tearDownBindingObserver(t),this.setupBindingObserver(t,i)):this.setupBindingObserver(t,i):(n&&this.tearDownBindingObserver(t),this.store.set(t,i))}}setupBindingObserver(t,i){const n=new ca(i,t,this);return this.bindingObservers.set(t,n),n}tearDownBindingObserver(t){return this.bindingObservers.has(t)?(this.bindingObservers.get(t).disconnect(),this.bindingObservers.delete(t),!0):!1}}T.cssCustomPropertyReflector=new la;b([_],T.prototype,"children",void 0);function ua(e){return z.from(e)}const We=Object.freeze({create:ua,notifyConnection(e){return!e.isConnected||!T.existsFor(e)?!1:(T.getOrCreate(e).bind(),!0)},notifyDisconnection(e){return e.isConnected||!T.existsFor(e)?!1:(T.getOrCreate(e).unbind(),!0)},registerRoot(e=dt){O.registerRoot(e)},unregisterRoot(e=dt){O.unregisterRoot(e)}}),$i=Object.freeze({definitionCallbackOnly:null,ignoreDuplicate:Symbol()}),Ci=new Map,Fe=new Map;let Mt=null;const Kt=C.createInterface(e=>e.cachedCallback(t=>(Mt===null&&(Mt=new Ws(null,t)),Mt))),Us=Object.freeze({tagFor(e){return Fe.get(e)},responsibleFor(e){const t=e.$$designSystem$$;return t||C.findResponsibleContainer(e).get(Kt)},getOrCreate(e){if(!e)return Mt===null&&(Mt=C.getOrCreateDOMContainer().get(Kt)),Mt;const t=e.$$designSystem$$;if(t)return t;const i=C.getOrCreateDOMContainer(e);if(i.has(Kt,!1))return i.get(Kt);{const n=new Ws(e,i);return i.register(ue.instance(Kt,n)),n}}});function da(e,t,i){return typeof e=="string"?{name:e,type:t,callback:i}:e}class Ws{constructor(t,i){this.owner=t,this.container=i,this.designTokensInitialized=!1,this.prefix="fast",this.shadowRootMode=void 0,this.disambiguate=()=>$i.definitionCallbackOnly,t!==null&&(t.$$designSystem$$=this)}withPrefix(t){return this.prefix=t,this}withShadowRootMode(t){return this.shadowRootMode=t,this}withElementDisambiguation(t){return this.disambiguate=t,this}withDesignTokenRoot(t){return this.designTokenRoot=t,this}register(...t){const i=this.container,n=[],s=this.disambiguate,r=this.shadowRootMode,o={elementPrefix:this.prefix,tryDefineElement(a,l,c){const h=da(a,l,c),{name:u,callback:p,baseClass:g}=h;let{type:y}=h,w=u,j=Ci.get(w),$t=!0;for(;j;){const ct=s(w,y,j);switch(ct){case $i.ignoreDuplicate:return;case $i.definitionCallbackOnly:$t=!1,j=void 0;break;default:w=ct,j=Ci.get(w);break}}$t&&((Fe.has(y)||y===at)&&(y=class extends y{}),Ci.set(w,y),Fe.set(y,w),g&&Fe.set(g,w)),n.push(new fa(i,w,y,r,p,$t))}};this.designTokensInitialized||(this.designTokensInitialized=!0,this.designTokenRoot!==null&&We.registerRoot(this.designTokenRoot)),i.registerWithContext(o,...t);for(const a of n)a.callback(a),a.willDefine&&a.definition!==null&&a.definition.define();return this}}class fa{constructor(t,i,n,s,r,o){this.container=t,this.name=i,this.type=n,this.shadowRootMode=s,this.callback=r,this.willDefine=o,this.definition=null}definePresentation(t){Hs.define(this.name,t,this.container)}defineElement(t){this.definition=new ze(this.type,Object.assign(Object.assign({},t),{name:this.name}))}tagFor(t){return Us.tagFor(t)}}function In(e,t,i,n){let s=Qo(0,1,(e-t)/(i-t));return n===ft.rtl&&(s=1-s),s}const pa=(e,t)=>wt`
    <template
        role="slider"
        class="${i=>i.readOnly?"readonly":""}
        ${i=>i.orientation||ht.horizontal}"
        tabindex="${i=>i.disabled?null:0}"
        aria-valuetext="${i=>i.valueTextFormatter(i.value)}"
        aria-valuenow="${i=>i.value}"
        aria-valuemin="${i=>i.min}"
        aria-valuemax="${i=>i.max}"
        aria-disabled="${i=>i.disabled?!0:void 0}"
        aria-readonly="${i=>i.readOnly?!0:void 0}"
        aria-orientation="${i=>i.orientation}"
        class="${i=>i.orientation}"
    >
        <div part="positioning-region" class="positioning-region">
            <div ${rt("track")} part="track-container" class="track">
                <slot name="track"></slot>
                <div part="track-start" class="track-start" style="${i=>i.position}">
                    <slot name="track-start"></slot>
                </div>
            </div>
            <slot></slot>
            <div
                ${rt("thumb")}
                part="thumb-container"
                class="thumb-container"
                style="${i=>i.position}"
            >
                <slot name="thumb">${t.thumb||""}</slot>
            </div>
        </div>
    </template>
`;class ga extends at{}class ba extends zs(ga){constructor(){super(...arguments),this.proxy=document.createElement("input")}}const va={singleValue:"single-value"};class H extends ba{constructor(){super(...arguments),this.direction=ft.ltr,this.isDragging=!1,this.trackWidth=0,this.trackMinWidth=0,this.trackHeight=0,this.trackLeft=0,this.trackMinHeight=0,this.valueTextFormatter=()=>null,this.min=0,this.max=10,this.step=1,this.orientation=ht.horizontal,this.mode=va.singleValue,this.keypressHandler=t=>{if(!this.readOnly){if(t.key===Wo)t.preventDefault(),this.value=`${this.min}`;else if(t.key===Go)t.preventDefault(),this.value=`${this.max}`;else if(!t.shiftKey)switch(t.key){case _o:case qo:t.preventDefault(),this.increment();break;case zo:case jo:t.preventDefault(),this.decrement();break}}},this.setupTrackConstraints=()=>{const t=this.track.getBoundingClientRect();this.trackWidth=this.track.clientWidth,this.trackMinWidth=this.track.clientLeft,this.trackHeight=t.bottom,this.trackMinHeight=t.top,this.trackLeft=this.getBoundingClientRect().left,this.trackWidth===0&&(this.trackWidth=1)},this.setupListeners=(t=!1)=>{const i=`${t?"remove":"add"}EventListener`;this[i]("keydown",this.keypressHandler),this[i]("mousedown",this.handleMouseDown),this.thumb[i]("mousedown",this.handleThumbMouseDown,{passive:!0}),this.thumb[i]("touchstart",this.handleThumbMouseDown,{passive:!0}),t&&(this.handleMouseDown(null),this.handleThumbMouseDown(null))},this.initialValue="",this.handleThumbMouseDown=t=>{if(t){if(this.readOnly||this.disabled||t.defaultPrevented)return;t.target.focus()}const i=`${t!==null?"add":"remove"}EventListener`;window[i]("mouseup",this.handleWindowMouseUp),window[i]("mousemove",this.handleMouseMove,{passive:!0}),window[i]("touchmove",this.handleMouseMove,{passive:!0}),window[i]("touchend",this.handleWindowMouseUp),this.isDragging=t!==null},this.handleMouseMove=t=>{if(this.readOnly||this.disabled||t.defaultPrevented)return;const i=window.TouchEvent&&t instanceof TouchEvent?t.touches[0]:t,n=this.orientation===ht.horizontal?i.pageX-document.documentElement.scrollLeft-this.trackLeft:i.pageY-document.documentElement.scrollTop;this.value=`${this.calculateNewValue(n)}`},this.calculateNewValue=t=>{const i=In(t,this.orientation===ht.horizontal?this.trackMinWidth:this.trackMinHeight,this.orientation===ht.horizontal?this.trackWidth:this.trackHeight,this.direction),n=(this.max-this.min)*i+this.min;return this.convertToConstrainedValue(n)},this.handleWindowMouseUp=t=>{this.stopDragging()},this.stopDragging=()=>{this.isDragging=!1,this.handleMouseDown(null),this.handleThumbMouseDown(null)},this.handleMouseDown=t=>{const i=`${t!==null?"add":"remove"}EventListener`;if((t===null||!this.disabled&&!this.readOnly)&&(window[i]("mouseup",this.handleWindowMouseUp),window.document[i]("mouseleave",this.handleWindowMouseUp),window[i]("mousemove",this.handleMouseMove),t)){t.preventDefault(),this.setupTrackConstraints(),t.target.focus();const n=this.orientation===ht.horizontal?t.pageX-document.documentElement.scrollLeft-this.trackLeft:t.pageY-document.documentElement.scrollTop;this.value=`${this.calculateNewValue(n)}`}},this.convertToConstrainedValue=t=>{isNaN(t)&&(t=this.min);let i=t-this.min;const n=Math.round(i/this.step),s=i-n*(this.stepMultiplier*this.step)/this.stepMultiplier;return i=s>=Number(this.step)/2?i-s+Number(this.step):i-s,i+this.min}}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}get valueAsNumber(){return parseFloat(super.value)}set valueAsNumber(t){this.value=t.toString()}valueChanged(t,i){super.valueChanged(t,i),this.$fastController.isConnected&&this.setThumbPositionForOrientation(this.direction),this.$emit("change")}minChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.min=`${this.min}`),this.validate()}maxChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.max=`${this.max}`),this.validate()}stepChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.step=`${this.step}`),this.updateStepMultiplier(),this.validate()}orientationChanged(){this.$fastController.isConnected&&this.setThumbPositionForOrientation(this.direction)}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type","range"),this.direction=Xo(this),this.updateStepMultiplier(),this.setupTrackConstraints(),this.setupListeners(),this.setupDefaultValue(),this.setThumbPositionForOrientation(this.direction)}disconnectedCallback(){this.setupListeners(!0)}increment(){const t=this.direction!==ft.rtl&&this.orientation!==ht.vertical?Number(this.value)+Number(this.step):Number(this.value)-Number(this.step),i=this.convertToConstrainedValue(t),n=i<Number(this.max)?`${i}`:`${this.max}`;this.value=n}decrement(){const t=this.direction!==ft.rtl&&this.orientation!==ht.vertical?Number(this.value)-Number(this.step):Number(this.value)+Number(this.step),i=this.convertToConstrainedValue(t),n=i>Number(this.min)?`${i}`:`${this.min}`;this.value=n}setThumbPositionForOrientation(t){const n=(1-In(Number(this.value),Number(this.min),Number(this.max),t))*100;this.orientation===ht.horizontal?this.position=this.isDragging?`right: ${n}%; transition: none;`:`right: ${n}%; transition: all 0.2s ease;`:this.position=this.isDragging?`bottom: ${n}%; transition: none;`:`bottom: ${n}%; transition: all 0.2s ease;`}updateStepMultiplier(){const t=this.step+"",i=this.step%1?t.length-t.indexOf(".")-1:0;this.stepMultiplier=Math.pow(10,i)}get midpoint(){return`${this.convertToConstrainedValue((this.max+this.min)/2)}`}setupDefaultValue(){if(typeof this.value=="string")if(this.value.length===0)this.initialValue=this.midpoint;else{const t=parseFloat(this.value);!Number.isNaN(t)&&(t<this.min||t>this.max)&&(this.value=this.midpoint)}}}b([m({attribute:"readonly",mode:"boolean"})],H.prototype,"readOnly",void 0);b([_],H.prototype,"direction",void 0);b([_],H.prototype,"isDragging",void 0);b([_],H.prototype,"position",void 0);b([_],H.prototype,"trackWidth",void 0);b([_],H.prototype,"trackMinWidth",void 0);b([_],H.prototype,"trackHeight",void 0);b([_],H.prototype,"trackLeft",void 0);b([_],H.prototype,"trackMinHeight",void 0);b([_],H.prototype,"valueTextFormatter",void 0);b([m({converter:sn})],H.prototype,"min",void 0);b([m({converter:sn})],H.prototype,"max",void 0);b([m({converter:sn})],H.prototype,"step",void 0);b([m],H.prototype,"orientation",void 0);b([m],H.prototype,"mode",void 0);class ma{constructor(t){this.listenerCache=new WeakMap,this.query=t}bind(t){const{query:i}=this,n=this.constructListener(t);n.bind(i)(),i.addListener(n),this.listenerCache.set(t,n)}unbind(t){const i=this.listenerCache.get(t);i&&(this.query.removeListener(i),this.listenerCache.delete(t))}}class me extends ma{constructor(t,i){super(t),this.styles=i}static with(t){return i=>new me(t,i)}constructListener(t){let i=!1;const n=this.styles;return function(){const{matches:r}=this;r&&!i?(t.$fastController.addStyles(n),i=r):!r&&i&&(t.$fastController.removeStyles(n),i=r)}}unbind(t){super.unbind(t),t.$fastController.removeStyles(this.styles)}}const G=me.with(window.matchMedia("(forced-colors)"));me.with(window.matchMedia("(prefers-color-scheme: dark)"));me.with(window.matchMedia("(prefers-color-scheme: light)"));class ya{constructor(t,i,n){this.propertyName=t,this.value=i,this.styles=n}bind(t){F.getNotifier(t).subscribe(this,this.propertyName),this.handleChange(t,this.propertyName)}unbind(t){F.getNotifier(t).unsubscribe(this,this.propertyName),t.$fastController.removeStyles(this.styles)}handleChange(t,i){t[i]===this.value?t.$fastController.addStyles(this.styles):t.$fastController.removeStyles(this.styles)}}const Hi="not-allowed",wa=":host([hidden]){display:none}";function Ge(e){return`${wa}:host{display:${e}}`}const k=Ho()?"focus-visible":"focus",bt=(function(){if(typeof globalThis<"u")return globalThis;if(typeof global<"u")return global;if(typeof self<"u")return self;if(typeof window<"u")return window;try{return new Function("return this")()}catch{return{}}})();bt.trustedTypes===void 0&&(bt.trustedTypes={createPolicy:(e,t)=>t});const Gs={configurable:!1,enumerable:!1,writable:!1};bt.FAST===void 0&&Reflect.defineProperty(bt,"FAST",Object.assign({value:Object.create(null)},Gs));const Hn=bt.FAST;if(Hn.getById===void 0){const e=Object.create(null);Reflect.defineProperty(Hn,"getById",Object.assign({value(t,i){let n=e[t];return n===void 0&&(n=i?e[t]=i():null),n}},Gs))}function xa(){const e=new WeakMap;return function(t){let i=e.get(t);if(i===void 0){let n=Reflect.getPrototypeOf(t);for(;i===void 0&&n!==null;)i=e.get(n),n=Reflect.getPrototypeOf(n);i=i===void 0?[]:i.slice(0),e.set(t,i)}return i}}const ki=bt.FAST.getById(1,()=>{const e=[],t=[];function i(){if(t.length)throw t.shift()}function n(o){try{o.call()}catch(a){t.push(a),setTimeout(i,0)}}function s(){let a=0;for(;a<e.length;)if(n(e[a]),a++,a>1024){for(let l=0,c=e.length-a;l<c;l++)e[l]=e[l+a];e.length-=a,a=0}e.length=0}function r(o){e.length<1&&bt.requestAnimationFrame(s),e.push(o)}return Object.freeze({enqueue:r,process:s})}),Qs=bt.trustedTypes.createPolicy("fast-html",{createHTML:e=>e});let Ti=Qs;const re=`fast-${Math.random().toString(36).substring(2,8)}`,Sa=`${re}{`,$a=`}${re}`,Xs=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(e){if(Ti!==Qs)throw new Error("The HTML policy can only be set once.");Ti=e},createHTML(e){return Ti.createHTML(e)},isMarker(e){return e&&e.nodeType===8&&e.data.startsWith(re)},extractDirectiveIndexFromMarker(e){return parseInt(e.data.replace(`${re}:`,""))},createInterpolationPlaceholder(e){return`${Sa}${e}${$a}`},createCustomAttributePlaceholder(e,t){return`${e}="${this.createInterpolationPlaceholder(t)}"`},createBlockPlaceholder(e){return`<!--${re}:${e}-->`},queueUpdate:ki.enqueue,processUpdates:ki.process,nextUpdate(){return new Promise(ki.enqueue)},setAttribute(e,t,i){i==null?e.removeAttribute(t):e.setAttribute(t,i)},setBooleanAttribute(e,t,i){i?e.setAttribute(t,""):e.removeAttribute(t)},removeChildNodes(e){for(let t=e.firstChild;t!==null;t=e.firstChild)e.removeChild(t)},createTemplateWalker(e){return document.createTreeWalker(e,133,null,!1)}});let xt=class{constructor(){this.targets=new WeakSet}addStylesTo(t){this.targets.add(t)}removeStylesFrom(t){this.targets.delete(t)}isAttachedTo(t){return this.targets.has(t)}withBehaviors(...t){return this.behaviors=this.behaviors===null?t:this.behaviors.concat(t),this}};xt.create=(()=>{if(Xs.supportsAdoptedStyleSheets){const e=new Map;return t=>new ka(t,e)}return e=>new Aa(e)})();function an(e){return e.map(t=>t instanceof xt?an(t.styles):[t]).reduce((t,i)=>t.concat(i),[])}function Ys(e){return e.map(t=>t instanceof xt?t.behaviors:null).reduce((t,i)=>i===null?t:(t===null&&(t=[]),t.concat(i)),null)}const Ca=Symbol("prependToAdoptedStyleSheets");function Js(e){const t=[],i=[];return e.forEach(n=>(n[Ca]?t:i).push(n)),{prepend:t,append:i}}let Zs=(e,t)=>{const{prepend:i,append:n}=Js(t);e.adoptedStyleSheets=[...i,...e.adoptedStyleSheets,...n]},Ks=(e,t)=>{e.adoptedStyleSheets=e.adoptedStyleSheets.filter(i=>t.indexOf(i)===-1)};if(Xs.supportsAdoptedStyleSheets)try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),Zs=(e,t)=>{const{prepend:i,append:n}=Js(t);e.adoptedStyleSheets.splice(0,0,...i),e.adoptedStyleSheets.push(...n)},Ks=(e,t)=>{for(const i of t){const n=e.adoptedStyleSheets.indexOf(i);n!==-1&&e.adoptedStyleSheets.splice(n,1)}}}catch{}class ka extends xt{constructor(t,i){super(),this.styles=t,this.styleSheetCache=i,this._styleSheets=void 0,this.behaviors=Ys(t)}get styleSheets(){if(this._styleSheets===void 0){const t=this.styles,i=this.styleSheetCache;this._styleSheets=an(t).map(n=>{if(n instanceof CSSStyleSheet)return n;let s=i.get(n);return s===void 0&&(s=new CSSStyleSheet,s.replaceSync(n),i.set(n,s)),s})}return this._styleSheets}addStylesTo(t){Zs(t,this.styleSheets),super.addStylesTo(t)}removeStylesFrom(t){Ks(t,this.styleSheets),super.removeStylesFrom(t)}}let Ta=0;function Fa(){return`fast-style-class-${++Ta}`}class Aa extends xt{constructor(t){super(),this.styles=t,this.behaviors=null,this.behaviors=Ys(t),this.styleSheets=an(t),this.styleClass=Fa()}addStylesTo(t){const i=this.styleSheets,n=this.styleClass;t=this.normalizeTarget(t);for(let s=0;s<i.length;s++){const r=document.createElement("style");r.innerHTML=i[s],r.className=n,t.append(r)}super.addStylesTo(t)}removeStylesFrom(t){t=this.normalizeTarget(t);const i=t.querySelectorAll(`.${this.styleClass}`);for(let n=0,s=i.length;n<s;++n)t.removeChild(i[n]);super.removeStylesFrom(t)}isAttachedTo(t){return super.isAttachedTo(this.normalizeTarget(t))}normalizeTarget(t){return t===document?document.body:t}}const Ra=Object.freeze({locate:xa()});function Da(e,t){let i;function n(s,r){arguments.length>1&&(i.property=r),Ra.locate(s.constructor).push(i)}if(arguments.length>1){i={},n(e,t);return}return i=e===void 0?{}:e,n}let tr=class{createCSS(){return""}createBehavior(){}};function er(e,t){const i=[];let n="";const s=[];for(let r=0,o=e.length-1;r<o;++r){n+=e[r];let a=t[r];if(a instanceof tr){const l=a.createBehavior();a=a.createCSS(),l&&s.push(l)}a instanceof xt||a instanceof CSSStyleSheet?(n.trim()!==""&&(i.push(n),n=""),i.push(a)):n+=a}return n+=e[e.length-1],n.trim()!==""&&i.push(n),{styles:i,behaviors:s}}function S(e,...t){const{styles:i,behaviors:n}=er(e,t),s=xt.create(i);return n.length&&s.withBehaviors(...n),s}let Oa=class extends tr{constructor(t,i){super(),this.behaviors=i,this.css="";const n=t.reduce((s,r)=>(typeof r=="string"?this.css+=r:s.push(r),s),[]);n.length&&(this.styles=xt.create(n))}createBehavior(){return this}createCSS(){return this.css}bind(t){this.styles&&t.$fastController.addStyles(this.styles),this.behaviors.length&&t.$fastController.addBehaviors(this.behaviors)}unbind(t){this.styles&&t.$fastController.removeStyles(this.styles),this.behaviors.length&&t.$fastController.removeBehaviors(this.behaviors)}};function Na(e,...t){const{styles:i,behaviors:n}=er(e,t);return new Oa(i,n)}function ut(e,t,i){return isNaN(e)||e<=t?t:e>=i?i:e}function Fi(e,t,i){return isNaN(e)||e<=t?0:e>=i?1:e/(i-t)}function kt(e,t,i){return isNaN(e)?t:t+e*(i-t)}function jn(e){return e*(Math.PI/180)}function Ba(e){return e*(180/Math.PI)}function Va(e){const t=Math.round(ut(e,0,255)).toString(16);return t.length===1?"0"+t:t}function I(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:t+e*(i-t)}function ln(e,t,i){if(e<=0)return t%360;if(e>=1)return i%360;const n=(t-i+360)%360,s=(i-t+360)%360;return n<=s?(t-n*e+360)%360:(t+n*e+360)%360}function D(e,t){const i=Math.pow(10,t);return Math.round(e*i)/i}class At{constructor(t,i,n){this.h=t,this.s=i,this.l=n}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.l)?new At(t.h,t.s,t.l):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.l===t.l}roundToPrecision(t){return new At(D(this.h,t),D(this.s,t),D(this.l,t))}toObject(){return{h:this.h,s:this.s,l:this.l}}}class de{constructor(t,i,n){this.h=t,this.s=i,this.v=n}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.v)?new de(t.h,t.s,t.v):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.v===t.v}roundToPrecision(t){return new de(D(this.h,t),D(this.s,t),D(this.v,t))}toObject(){return{h:this.h,s:this.s,v:this.v}}}class P{constructor(t,i,n){this.l=t,this.a=i,this.b=n}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.a)&&!isNaN(t.b)?new P(t.l,t.a,t.b):null}equalValue(t){return this.l===t.l&&this.a===t.a&&this.b===t.b}roundToPrecision(t){return new P(D(this.l,t),D(this.a,t),D(this.b,t))}toObject(){return{l:this.l,a:this.a,b:this.b}}}P.epsilon=216/24389;P.kappa=24389/27;class It{constructor(t,i,n){this.l=t,this.c=i,this.h=n}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.c)&&!isNaN(t.h)?new It(t.l,t.c,t.h):null}equalValue(t){return this.l===t.l&&this.c===t.c&&this.h===t.h}roundToPrecision(t){return new It(D(this.l,t),D(this.c,t),D(this.h,t))}toObject(){return{l:this.l,c:this.c,h:this.h}}}class A{constructor(t,i,n,s){this.r=t,this.g=i,this.b=n,this.a=typeof s=="number"&&!isNaN(s)?s:1}static fromObject(t){return t&&!isNaN(t.r)&&!isNaN(t.g)&&!isNaN(t.b)?new A(t.r,t.g,t.b,t.a):null}equalValue(t){return this.r===t.r&&this.g===t.g&&this.b===t.b&&this.a===t.a}toStringHexRGB(){return"#"+[this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringHexRGBA(){return this.toStringHexRGB()+this.formatHexValue(this.a)}toStringHexARGB(){return"#"+[this.a,this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringWebRGB(){return`rgb(${Math.round(kt(this.r,0,255))},${Math.round(kt(this.g,0,255))},${Math.round(kt(this.b,0,255))})`}toStringWebRGBA(){return`rgba(${Math.round(kt(this.r,0,255))},${Math.round(kt(this.g,0,255))},${Math.round(kt(this.b,0,255))},${ut(this.a,0,1)})`}roundToPrecision(t){return new A(D(this.r,t),D(this.g,t),D(this.b,t),D(this.a,t))}clamp(){return new A(ut(this.r,0,1),ut(this.g,0,1),ut(this.b,0,1),ut(this.a,0,1))}toObject(){return{r:this.r,g:this.g,b:this.b,a:this.a}}formatHexValue(t){return Va(kt(t,0,255))}}class q{constructor(t,i,n){this.x=t,this.y=i,this.z=n}static fromObject(t){return t&&!isNaN(t.x)&&!isNaN(t.y)&&!isNaN(t.z)?new q(t.x,t.y,t.z):null}equalValue(t){return this.x===t.x&&this.y===t.y&&this.z===t.z}roundToPrecision(t){return new q(D(this.x,t),D(this.y,t),D(this.z,t))}toObject(){return{x:this.x,y:this.y,z:this.z}}}q.whitePoint=new q(.95047,1,1.08883);function ji(e){return e.r*.2126+e.g*.7152+e.b*.0722}function zi(e){function t(i){return i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4)}return ji(new A(t(e.r),t(e.g),t(e.b),1))}const zn=(e,t)=>(e+.05)/(t+.05);function _n(e,t){const i=zi(e),n=zi(t);return i>n?zn(i,n):zn(n,i)}function fe(e){const t=Math.max(e.r,e.g,e.b),i=Math.min(e.r,e.g,e.b),n=t-i;let s=0;n!==0&&(t===e.r?s=60*((e.g-e.b)/n%6):t===e.g?s=60*((e.b-e.r)/n+2):s=60*((e.r-e.g)/n+4)),s<0&&(s+=360);const r=(t+i)/2;let o=0;return n!==0&&(o=n/(1-Math.abs(2*r-1))),new At(s,o,r)}function _i(e,t=1){const i=(1-Math.abs(2*e.l-1))*e.s,n=i*(1-Math.abs(e.h/60%2-1)),s=e.l-i/2;let r=0,o=0,a=0;return e.h<60?(r=i,o=n,a=0):e.h<120?(r=n,o=i,a=0):e.h<180?(r=0,o=i,a=n):e.h<240?(r=0,o=n,a=i):e.h<300?(r=n,o=0,a=i):e.h<360&&(r=i,o=0,a=n),new A(r+s,o+s,a+s,t)}function qn(e){const t=Math.max(e.r,e.g,e.b),i=Math.min(e.r,e.g,e.b),n=t-i;let s=0;n!==0&&(t===e.r?s=60*((e.g-e.b)/n%6):t===e.g?s=60*((e.b-e.r)/n+2):s=60*((e.r-e.g)/n+4)),s<0&&(s+=360);let r=0;return t!==0&&(r=n/t),new de(s,r,t)}function Pa(e,t=1){const i=e.s*e.v,n=i*(1-Math.abs(e.h/60%2-1)),s=e.v-i;let r=0,o=0,a=0;return e.h<60?(r=i,o=n,a=0):e.h<120?(r=n,o=i,a=0):e.h<180?(r=0,o=i,a=n):e.h<240?(r=0,o=n,a=i):e.h<300?(r=n,o=0,a=i):e.h<360&&(r=i,o=0,a=n),new A(r+s,o+s,a+s,t)}function La(e){let t=0,i=0;return e.h!==0&&(t=Math.cos(jn(e.h))*e.c,i=Math.sin(jn(e.h))*e.c),new P(e.l,t,i)}function Ma(e){let t=0;(Math.abs(e.b)>.001||Math.abs(e.a)>.001)&&(t=Ba(Math.atan2(e.b,e.a))),t<0&&(t+=360);const i=Math.sqrt(e.a*e.a+e.b*e.b);return new It(e.l,i,t)}function Ea(e){const t=(e.l+16)/116,i=t+e.a/500,n=t-e.b/200,s=Math.pow(i,3),r=Math.pow(t,3),o=Math.pow(n,3);let a=0;s>P.epsilon?a=s:a=(116*i-16)/P.kappa;let l=0;e.l>P.epsilon*P.kappa?l=r:l=e.l/P.kappa;let c=0;return o>P.epsilon?c=o:c=(116*n-16)/P.kappa,a=q.whitePoint.x*a,l=q.whitePoint.y*l,c=q.whitePoint.z*c,new q(a,l,c)}function Ia(e){function t(l){return l>P.epsilon?Math.pow(l,1/3):(P.kappa*l+16)/116}const i=t(e.x/q.whitePoint.x),n=t(e.y/q.whitePoint.y),s=t(e.z/q.whitePoint.z),r=116*n-16,o=500*(i-n),a=200*(n-s);return new P(r,o,a)}function qi(e){function t(l){return l<=.04045?l/12.92:Math.pow((l+.055)/1.055,2.4)}const i=t(e.r),n=t(e.g),s=t(e.b),r=i*.4124564+n*.3575761+s*.1804375,o=i*.2126729+n*.7151522+s*.072175,a=i*.0193339+n*.119192+s*.9503041;return new q(r,o,a)}function ir(e,t=1){function i(o){return o<=.0031308?o*12.92:1.055*Math.pow(o,1/2.4)-.055}const n=i(e.x*3.2404542-e.y*1.5371385-e.z*.4985314),s=i(e.x*-.969266+e.y*1.8760108+e.z*.041556),r=i(e.x*.0556434-e.y*.2040259+e.z*1.0572252);return new A(n,s,r,t)}function Ui(e){return Ia(qi(e))}function nr(e,t=1){return ir(Ea(e),t)}function Wi(e){return Ma(Ui(e))}function sr(e,t=1){return nr(La(e),t)}function Un(e,t,i=18){const n=Wi(e);let s=n.c+t*i;return s<0&&(s=0),sr(new It(n.l,s,n.h))}function Ai(e,t){return e*t}function Wn(e,t){return new A(Ai(e.r,t.r),Ai(e.g,t.g),Ai(e.b,t.b),1)}function Ri(e,t){return e<.5?ut(2*t*e,0,1):ut(1-2*(1-t)*(1-e),0,1)}function Gn(e,t){return new A(Ri(e.r,t.r),Ri(e.g,t.g),Ri(e.b,t.b),1)}var Qn;(function(e){e[e.Burn=0]="Burn",e[e.Color=1]="Color",e[e.Darken=2]="Darken",e[e.Dodge=3]="Dodge",e[e.Lighten=4]="Lighten",e[e.Multiply=5]="Multiply",e[e.Overlay=6]="Overlay",e[e.Screen=7]="Screen"})(Qn||(Qn={}));function Ha(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new A(I(e,t.r,i.r),I(e,t.g,i.g),I(e,t.b,i.b),I(e,t.a,i.a))}function ja(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new At(ln(e,t.h,i.h),I(e,t.s,i.s),I(e,t.l,i.l))}function za(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new de(ln(e,t.h,i.h),I(e,t.s,i.s),I(e,t.v,i.v))}function _a(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new q(I(e,t.x,i.x),I(e,t.y,i.y),I(e,t.z,i.z))}function qa(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new P(I(e,t.l,i.l),I(e,t.a,i.a),I(e,t.b,i.b))}function Ua(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new It(I(e,t.l,i.l),I(e,t.c,i.c),ln(e,t.h,i.h))}var Q;(function(e){e[e.RGB=0]="RGB",e[e.HSL=1]="HSL",e[e.HSV=2]="HSV",e[e.XYZ=3]="XYZ",e[e.LAB=4]="LAB",e[e.LCH=5]="LCH"})(Q||(Q={}));function te(e,t,i,n){if(isNaN(e)||e<=0)return i;if(e>=1)return n;switch(t){case Q.HSL:return _i(ja(e,fe(i),fe(n)));case Q.HSV:return Pa(za(e,qn(i),qn(n)));case Q.XYZ:return ir(_a(e,qi(i),qi(n)));case Q.LAB:return nr(qa(e,Ui(i),Ui(n)));case Q.LCH:return sr(Ua(e,Wi(i),Wi(n)));default:return Ha(e,i,n)}}class Z{constructor(t){if(t==null||t.length===0)throw new Error("The stops argument must be non-empty");this.stops=this.sortColorScaleStops(t)}static createBalancedColorScale(t){if(t==null||t.length===0)throw new Error("The colors argument must be non-empty");const i=new Array(t.length);for(let n=0;n<t.length;n++)n===0?i[n]={color:t[n],position:0}:n===t.length-1?i[n]={color:t[n],position:1}:i[n]={color:t[n],position:n*(1/(t.length-1))};return new Z(i)}getColor(t,i=Q.RGB){if(this.stops.length===1)return this.stops[0].color;if(t<=0)return this.stops[0].color;if(t>=1)return this.stops[this.stops.length-1].color;let n=0;for(let o=0;o<this.stops.length;o++)this.stops[o].position<=t&&(n=o);let s=n+1;s>=this.stops.length&&(s=this.stops.length-1);const r=(t-this.stops[n].position)*(1/(this.stops[s].position-this.stops[n].position));return te(r,i,this.stops[n].color,this.stops[s].color)}trim(t,i,n=Q.RGB){if(t<0||i>1||i<t)throw new Error("Invalid bounds");if(t===i)return new Z([{color:this.getColor(t,n),position:0}]);const s=[];for(let a=0;a<this.stops.length;a++)this.stops[a].position>=t&&this.stops[a].position<=i&&s.push(this.stops[a]);if(s.length===0)return new Z([{color:this.getColor(t),position:t},{color:this.getColor(i),position:i}]);s[0].position!==t&&s.unshift({color:this.getColor(t),position:t}),s[s.length-1].position!==i&&s.push({color:this.getColor(i),position:i});const r=i-t,o=new Array(s.length);for(let a=0;a<s.length;a++)o[a]={color:s[a].color,position:(s[a].position-t)/r};return new Z(o)}findNextColor(t,i,n=!1,s=Q.RGB,r=.005,o=32){isNaN(t)||t<=0?t=0:t>=1&&(t=1);const a=this.getColor(t,s),l=n?0:1,c=this.getColor(l,s);if(_n(a,c)<=i)return l;let u=n?0:t,p=n?t:0,g=l,y=0;for(;y<=o;){g=Math.abs(p-u)/2+u;const w=this.getColor(g,s),j=_n(a,w);if(Math.abs(j-i)<=r)return g;j>i?n?u=g:p=g:n?p=g:u=g,y++}return g}clone(){const t=new Array(this.stops.length);for(let i=0;i<t.length;i++)t[i]={color:this.stops[i].color,position:this.stops[i].position};return new Z(t)}sortColorScaleStops(t){return t.sort((i,n)=>{const s=i.position,r=n.position;return s<r?-1:s>r?1:0})}}const Wa=/^#((?:[0-9a-f]{6}|[0-9a-f]{3}))$/i;function zt(e){const t=Wa.exec(e);if(t===null)return null;let i=t[1];if(i.length===3){const s=i.charAt(0),r=i.charAt(1),o=i.charAt(2);i=s.concat(s,r,r,o,o)}const n=parseInt(i,16);return isNaN(n)?null:new A(Fi((n&16711680)>>>16,0,255),Fi((n&65280)>>>8,0,255),Fi(n&255,0,255),1)}class vt{constructor(t){this.config=Object.assign({},vt.defaultPaletteConfig,t),this.palette=[],this.updatePaletteColors()}updatePaletteGenerationValues(t){let i=!1;for(const n in t)this.config[n]&&(this.config[n].equalValue?this.config[n].equalValue(t[n])||(this.config[n]=t[n],i=!0):t[n]!==this.config[n]&&(this.config[n]=t[n],i=!0));return i&&this.updatePaletteColors(),i}updatePaletteColors(){const t=this.generatePaletteColorScale();for(let i=0;i<this.config.steps;i++)this.palette[i]=t.getColor(i/(this.config.steps-1),this.config.interpolationMode)}generatePaletteColorScale(){const t=fe(this.config.baseColor),n=new Z([{position:0,color:this.config.scaleColorLight},{position:.5,color:this.config.baseColor},{position:1,color:this.config.scaleColorDark}]).trim(this.config.clipLight,1-this.config.clipDark),s=n.getColor(0),r=n.getColor(1);let o=s,a=r;if(t.s>=this.config.saturationAdjustmentCutoff&&(o=Un(o,this.config.saturationLight),a=Un(a,this.config.saturationDark)),this.config.multiplyLight!==0){const l=Wn(this.config.baseColor,o);o=te(this.config.multiplyLight,this.config.interpolationMode,o,l)}if(this.config.multiplyDark!==0){const l=Wn(this.config.baseColor,a);a=te(this.config.multiplyDark,this.config.interpolationMode,a,l)}if(this.config.overlayLight!==0){const l=Gn(this.config.baseColor,o);o=te(this.config.overlayLight,this.config.interpolationMode,o,l)}if(this.config.overlayDark!==0){const l=Gn(this.config.baseColor,a);a=te(this.config.overlayDark,this.config.interpolationMode,a,l)}return this.config.baseScalePosition?this.config.baseScalePosition<=0?new Z([{position:0,color:this.config.baseColor},{position:1,color:a.clamp()}]):this.config.baseScalePosition>=1?new Z([{position:0,color:o.clamp()},{position:1,color:this.config.baseColor}]):new Z([{position:0,color:o.clamp()},{position:this.config.baseScalePosition,color:this.config.baseColor},{position:1,color:a.clamp()}]):new Z([{position:0,color:o.clamp()},{position:.5,color:this.config.baseColor},{position:1,color:a.clamp()}])}}vt.defaultPaletteConfig={baseColor:zt("#808080"),steps:11,interpolationMode:Q.RGB,scaleColorLight:new A(1,1,1,1),scaleColorDark:new A(0,0,0,1),clipLight:.185,clipDark:.16,saturationAdjustmentCutoff:.05,saturationLight:.35,saturationDark:1.25,overlayLight:0,overlayDark:.25,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};vt.greyscalePaletteConfig={baseColor:zt("#808080"),steps:11,interpolationMode:Q.RGB,scaleColorLight:new A(1,1,1,1),scaleColorDark:new A(0,0,0,1),clipLight:0,clipDark:0,saturationAdjustmentCutoff:0,saturationLight:0,saturationDark:0,overlayLight:0,overlayDark:0,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};vt.defaultPaletteConfig.scaleColorLight,vt.defaultPaletteConfig.scaleColorDark;class Qe{constructor(t){this.palette=[],this.config=Object.assign({},Qe.defaultPaletteConfig,t),this.regenPalettes()}regenPalettes(){let t=this.config.steps;(isNaN(t)||t<3)&&(t=3);const i=.14,n=.06,s=new A(i,i,i,1),r=94,a=new vt(Object.assign(Object.assign({},vt.greyscalePaletteConfig),{baseColor:s,baseScalePosition:(1-i)*100/r,steps:t})).palette,l=ji(this.config.baseColor),c=fe(this.config.baseColor).l,h=(l+c)/2,p=this.matchRelativeLuminanceIndex(h,a)/(t-1),y=this.matchRelativeLuminanceIndex(i,a)/(t-1),w=fe(this.config.baseColor),j=_i(At.fromObject({h:w.h,s:w.s,l:i})),$t=_i(At.fromObject({h:w.h,s:w.s,l:n})),ct=new Array(5);ct[0]={position:0,color:new A(1,1,1,1)},ct[1]={position:p,color:this.config.baseColor},ct[2]={position:y,color:j},ct[3]={position:.99,color:$t},ct[4]={position:1,color:new A(0,0,0,1)};const _r=new Z(ct);this.palette=new Array(t);for(let we=0;we<t;we++){const qr=_r.getColor(we/(t-1),Q.RGB);this.palette[we]=qr}}matchRelativeLuminanceIndex(t,i){let n=Number.MAX_VALUE,s=0,r=0;const o=i.length;for(;r<o;r++){const a=Math.abs(ji(i[r])-t);a<n&&(n=a,s=r)}return s}}Qe.defaultPaletteConfig={baseColor:zt("#808080"),steps:94};function rr(e,t){const i=e.relativeLuminance>t.relativeLuminance?e:t,n=e.relativeLuminance>t.relativeLuminance?t:e;return(i.relativeLuminance+.05)/(n.relativeLuminance+.05)}const St=Object.freeze({create(e,t,i){return new Ve(e,t,i)},from(e){return new Ve(e.r,e.g,e.b)}});function Ga(e){const t={r:0,g:0,b:0,toColorString:()=>"",contrast:()=>0,relativeLuminance:0};for(const i in t)if(typeof t[i]!=typeof e[i])return!1;return!0}class Ve extends A{constructor(t,i,n){super(t,i,n,1),this.toColorString=this.toStringHexRGB,this.contrast=rr.bind(null,this),this.createCSS=this.toColorString,this.relativeLuminance=zi(this)}static fromObject(t){return new Ve(t.r,t.g,t.b)}}function Gi(e,t,i=0,n=e.length-1){if(n===i)return e[i];const s=Math.floor((n-i)/2)+i;return t(e[s])?Gi(e,t,i,s):Gi(e,t,s+1,n)}const Qa=(-.1+Math.sqrt(.21))/2;function Xa(e){return e.relativeLuminance<=Qa}function Ot(e){return Xa(e)?-1:1}function Ya(e,t,i){return typeof e=="number"?Pe.from(St.create(e,t,i)):Pe.from(e)}function Ja(e){return Ga(e)?Le.from(e):Le.from(St.create(e.r,e.g,e.b))}const Pe=Object.freeze({create:Ya,from:Ja});class Le{constructor(t,i){this.closestIndexCache=new Map,this.source=t,this.swatches=i,this.reversedSwatches=Object.freeze([...this.swatches].reverse()),this.lastIndex=this.swatches.length-1}colorContrast(t,i,n,s){n===void 0&&(n=this.closestIndexOf(t));let r=this.swatches;const o=this.lastIndex;let a=n;s===void 0&&(s=Ot(t));const l=c=>rr(t,c)>=i;return s===-1&&(r=this.reversedSwatches,a=o-a),Gi(r,l,a,o)}get(t){return this.swatches[t]||this.swatches[ut(t,0,this.lastIndex)]}closestIndexOf(t){if(this.closestIndexCache.has(t.relativeLuminance))return this.closestIndexCache.get(t.relativeLuminance);let i=this.swatches.indexOf(t);if(i!==-1)return this.closestIndexCache.set(t.relativeLuminance,i),i;const n=this.swatches.reduce((s,r)=>Math.abs(r.relativeLuminance-t.relativeLuminance)<Math.abs(s.relativeLuminance-t.relativeLuminance)?r:s);return i=this.swatches.indexOf(n),this.closestIndexCache.set(t.relativeLuminance,i),i}static from(t){return new Le(t,Object.freeze(new Qe({baseColor:A.fromObject(t)}).palette.map(i=>{const n=zt(i.toStringHexRGB());return St.create(n.r,n.g,n.b)})))}}function Za(e,t,i,n,s,r,o,a,l){const c=e.source,h=t.closestIndexOf(i),u=Math.max(o,a,l),p=h>=u?-1:1,y=e.closestIndexOf(c),w=y+p*-1*n,j=w+p*s,$t=w+p*r;return{rest:e.get(w),hover:e.get(y),active:e.get(j),focus:e.get($t)}}function Ka(e,t,i,n,s,r,o){const a=e.source,l=e.closestIndexOf(a),c=Ot(t),h=l+(c===1?Math.min(n,s):Math.max(c*n,c*s)),u=e.colorContrast(t,i,h,c),p=e.closestIndexOf(u),g=p+c*Math.abs(n-s),y=c===1?n<s:c*n>c*s;let w,j;return y?(w=p,j=g):(w=g,j=p),{rest:e.get(w),hover:e.get(j),active:e.get(w+c*r),focus:e.get(w+c*o)}}const Xn=St.create(1,1,1),tl=St.create(0,0,0),el=St.from(zt("#808080")),il=St.from(zt("#DA1A5F"));function nl(e,t){return e.contrast(Xn)>=t?Xn:tl}function sl(e,t,i,n,s,r){const o=e.closestIndexOf(t),a=Math.max(i,n,s,r),l=o>=a?-1:1;return{rest:e.get(o+l*i),hover:e.get(o+l*n),active:e.get(o+l*s),focus:e.get(o+l*r)}}function rl(e,t,i,n,s,r){const o=Ot(t),a=e.closestIndexOf(t);return{rest:e.get(a-o*i),hover:e.get(a-o*n),active:e.get(a-o*s),focus:e.get(a-o*r)}}function ol(e,t,i){const n=e.closestIndexOf(t);return e.get(n-(n<i?i*-1:i))}function al(e,t,i,n,s,r,o,a,l,c){const h=Math.max(i,n,s,r,o,a,l,c),u=e.closestIndexOf(t),p=u>=h?-1:1;return{rest:e.get(u+p*i),hover:e.get(u+p*n),active:e.get(u+p*s),focus:e.get(u+p*r)}}function ll(e,t,i,n,s,r){const o=Ot(t),a=e.closestIndexOf(e.colorContrast(t,4.5)),l=a+o*Math.abs(i-n),c=o===1?i<n:o*i>o*n;let h,u;return c?(h=a,u=l):(h=l,u=a),{rest:e.get(h),hover:e.get(u),active:e.get(h+o*s),focus:e.get(h+o*r)}}function cl(e,t){return e.colorContrast(t,3.5)}function hl(e,t,i){return e.colorContrast(i,3.5,e.closestIndexOf(e.source),Ot(t)*-1)}function ul(e,t){return e.colorContrast(t,14)}function dl(e,t){return e.colorContrast(t,4.5)}function Xe(e){return St.create(e,e,e)}const fl={DarkMode:.23};function pl(e,t,i){return e.get(e.closestIndexOf(Xe(t))+i)}function gl(e,t,i){const n=e.closestIndexOf(Xe(t))-i;return e.get(n-i)}function bl(e,t){return e.get(e.closestIndexOf(Xe(t)))}function cn(e,t,i,n,s,r){return Math.max(e.closestIndexOf(Xe(t))+i,n,s,r)}function vl(e,t,i,n,s,r){return e.get(cn(e,t,i,n,s,r))}function ml(e,t,i,n,s,r){return e.get(cn(e,t,i,n,s,r)+i)}function yl(e,t,i,n,s,r){return e.get(cn(e,t,i,n,s,r)+i*2)}function wl(e,t,i,n,s,r){const o=e.closestIndexOf(t),a=Ot(t),l=o+a*i,c=l+a*(n-i),h=l+a*(s-i),u=l+a*(r-i);return{rest:e.get(l),hover:e.get(c),active:e.get(h),focus:e.get(u)}}function xl(e,t,i){return e.get(e.closestIndexOf(t)+Ot(t)*i)}const{create:f}=We;function v(e){return We.create({name:e,cssCustomPropertyName:null})}const or=f("body-font").withDefault('aktiv-grotesk, "Segoe UI", Arial, Helvetica, sans-serif'),ar=f("base-height-multiplier").withDefault(10),ru=f("base-horizontal-spacing-multiplier").withDefault(3),_t=f("base-layer-luminance").withDefault(fl.DarkMode),Tt=f("control-corner-radius").withDefault(4),hn=f("density").withDefault(0),X=f("design-unit").withDefault(4),Di=f("direction").withDefault(ft.ltr),lr=f("disabled-opacity").withDefault(.3),Y=f("stroke-width").withDefault(1),nt=f("focus-stroke-width").withDefault(2),Sl=f("type-ramp-base-font-size").withDefault("14px"),$l=f("type-ramp-base-line-height").withDefault("20px"),Cl=f("type-ramp-minus-1-font-size").withDefault("12px"),kl=f("type-ramp-minus-1-line-height").withDefault("16px"),ou=f("type-ramp-minus-2-font-size").withDefault("10px"),au=f("type-ramp-minus-2-line-height").withDefault("16px"),lu=f("type-ramp-plus-1-font-size").withDefault("16px"),cu=f("type-ramp-plus-1-line-height").withDefault("24px"),hu=f("type-ramp-plus-2-font-size").withDefault("20px"),uu=f("type-ramp-plus-2-line-height").withDefault("28px"),du=f("type-ramp-plus-3-font-size").withDefault("28px"),fu=f("type-ramp-plus-3-line-height").withDefault("36px"),pu=f("type-ramp-plus-4-font-size").withDefault("34px"),gu=f("type-ramp-plus-4-line-height").withDefault("44px"),bu=f("type-ramp-plus-5-font-size").withDefault("46px"),vu=f("type-ramp-plus-5-line-height").withDefault("56px"),mu=f("type-ramp-plus-6-font-size").withDefault("60px"),yu=f("type-ramp-plus-6-line-height").withDefault("72px"),wu=v("accent-fill-rest-delta").withDefault(0),Tl=v("accent-fill-hover-delta").withDefault(4),Fl=v("accent-fill-active-delta").withDefault(-5),Al=v("accent-fill-focus-delta").withDefault(0),Rl=v("accent-foreground-rest-delta").withDefault(0),Dl=v("accent-foreground-hover-delta").withDefault(6),Ol=v("accent-foreground-active-delta").withDefault(-4),Nl=v("accent-foreground-focus-delta").withDefault(0),qt=v("neutral-fill-rest-delta").withDefault(7),Ut=v("neutral-fill-hover-delta").withDefault(10),Wt=v("neutral-fill-active-delta").withDefault(5),cr=v("neutral-fill-focus-delta").withDefault(0),Bl=v("neutral-fill-input-rest-delta").withDefault(0),Vl=v("neutral-fill-input-hover-delta").withDefault(0),Pl=v("neutral-fill-input-active-delta").withDefault(0),Ll=v("neutral-fill-input-focus-delta").withDefault(0),Ml=v("neutral-fill-stealth-rest-delta").withDefault(0),El=v("neutral-fill-stealth-hover-delta").withDefault(5),Il=v("neutral-fill-stealth-active-delta").withDefault(3),Hl=v("neutral-fill-stealth-focus-delta").withDefault(0),jl=v("neutral-fill-strong-rest-delta").withDefault(0),zl=v("neutral-fill-strong-hover-delta").withDefault(8),_l=v("neutral-fill-strong-active-delta").withDefault(-5),ql=v("neutral-fill-strong-focus-delta").withDefault(0),Gt=v("neutral-fill-layer-rest-delta").withDefault(3),Ul=v("neutral-stroke-rest-delta").withDefault(25),Wl=v("neutral-stroke-hover-delta").withDefault(40),Gl=v("neutral-stroke-active-delta").withDefault(16),Ql=v("neutral-stroke-focus-delta").withDefault(25),Xl=v("neutral-stroke-divider-rest-delta").withDefault(8),Yl=f("neutral-color").withDefault(el),E=v("neutral-palette").withDefault(e=>Pe.from(Yl.getValueFor(e))),Jl=f("accent-color").withDefault(il),un=v("accent-palette").withDefault(e=>Pe.from(Jl.getValueFor(e))),Zl=v("neutral-layer-card-container-recipe").withDefault({evaluate:e=>pl(E.getValueFor(e),_t.getValueFor(e),Gt.getValueFor(e))});f("neutral-layer-card-container").withDefault(e=>Zl.getValueFor(e).evaluate(e));const Kl=v("neutral-layer-floating-recipe").withDefault({evaluate:e=>gl(E.getValueFor(e),_t.getValueFor(e),Gt.getValueFor(e))}),xu=f("neutral-layer-floating").withDefault(e=>Kl.getValueFor(e).evaluate(e)),tc=v("neutral-layer-1-recipe").withDefault({evaluate:e=>bl(E.getValueFor(e),_t.getValueFor(e))}),ec=f("neutral-layer-1").withDefault(e=>tc.getValueFor(e).evaluate(e)),ic=v("neutral-layer-2-recipe").withDefault({evaluate:e=>vl(E.getValueFor(e),_t.getValueFor(e),Gt.getValueFor(e),qt.getValueFor(e),Ut.getValueFor(e),Wt.getValueFor(e))});f("neutral-layer-2").withDefault(e=>ic.getValueFor(e).evaluate(e));const nc=v("neutral-layer-3-recipe").withDefault({evaluate:e=>ml(E.getValueFor(e),_t.getValueFor(e),Gt.getValueFor(e),qt.getValueFor(e),Ut.getValueFor(e),Wt.getValueFor(e))});f("neutral-layer-3").withDefault(e=>nc.getValueFor(e).evaluate(e));const sc=v("neutral-layer-4-recipe").withDefault({evaluate:e=>yl(E.getValueFor(e),_t.getValueFor(e),Gt.getValueFor(e),qt.getValueFor(e),Ut.getValueFor(e),Wt.getValueFor(e))});f("neutral-layer-4").withDefault(e=>sc.getValueFor(e).evaluate(e));const M=f("fill-color").withDefault(e=>ec.getValueFor(e));var pe;(function(e){e[e.normal=4.5]="normal",e[e.large=7]="large"})(pe||(pe={}));const Ye=f({name:"accent-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>Za(un.getValueFor(e),E.getValueFor(e),t||M.getValueFor(e),Tl.getValueFor(e),Fl.getValueFor(e),Al.getValueFor(e),qt.getValueFor(e),Ut.getValueFor(e),Wt.getValueFor(e))}),Rt=f("accent-fill-rest").withDefault(e=>Ye.getValueFor(e).evaluate(e).rest),Je=f("accent-fill-hover").withDefault(e=>Ye.getValueFor(e).evaluate(e).hover),Ze=f("accent-fill-active").withDefault(e=>Ye.getValueFor(e).evaluate(e).active),hr=f("accent-fill-focus").withDefault(e=>Ye.getValueFor(e).evaluate(e).focus),ur=e=>(t,i)=>nl(i||Rt.getValueFor(t),e),Ke=v("foreground-on-accent-recipe").withDefault({evaluate:(e,t)=>ur(pe.normal)(e,t)}),rc=f("foreground-on-accent-rest").withDefault(e=>Ke.getValueFor(e).evaluate(e,Rt.getValueFor(e))),oc=f("foreground-on-accent-hover").withDefault(e=>Ke.getValueFor(e).evaluate(e,Je.getValueFor(e))),ac=f("foreground-on-accent-active").withDefault(e=>Ke.getValueFor(e).evaluate(e,Ze.getValueFor(e))),Su=f("foreground-on-accent-focus").withDefault(e=>Ke.getValueFor(e).evaluate(e,hr.getValueFor(e))),ti=v("foreground-on-accent-large-recipe").withDefault({evaluate:(e,t)=>ur(pe.large)(e,t)});f("foreground-on-accent-rest-large").withDefault(e=>ti.getValueFor(e).evaluate(e,Rt.getValueFor(e)));f("foreground-on-accent-hover-large").withDefault(e=>ti.getValueFor(e).evaluate(e,Je.getValueFor(e)));f("foreground-on-accent-active-large").withDefault(e=>ti.getValueFor(e).evaluate(e,Ze.getValueFor(e)));f("foreground-on-accent-focus-large").withDefault(e=>ti.getValueFor(e).evaluate(e,hr.getValueFor(e)));const lc=e=>(t,i)=>Ka(un.getValueFor(t),i||M.getValueFor(t),e,Rl.getValueFor(t),Dl.getValueFor(t),Ol.getValueFor(t),Nl.getValueFor(t)),ei=f({name:"accent-foreground-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>lc(pe.normal)(e,t)}),Ht=f("accent-foreground-rest").withDefault(e=>ei.getValueFor(e).evaluate(e).rest),Qi=f("accent-foreground-hover").withDefault(e=>ei.getValueFor(e).evaluate(e).hover),Xi=f("accent-foreground-active").withDefault(e=>ei.getValueFor(e).evaluate(e).active);f("accent-foreground-focus").withDefault(e=>ei.getValueFor(e).evaluate(e).focus);const ii=f({name:"neutral-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>sl(E.getValueFor(e),t||M.getValueFor(e),qt.getValueFor(e),Ut.getValueFor(e),Wt.getValueFor(e),cr.getValueFor(e))}),dr=f("neutral-fill-rest").withDefault(e=>ii.getValueFor(e).evaluate(e).rest),cc=f("neutral-fill-hover").withDefault(e=>ii.getValueFor(e).evaluate(e).hover),hc=f("neutral-fill-active").withDefault(e=>ii.getValueFor(e).evaluate(e).active);f("neutral-fill-focus").withDefault(e=>ii.getValueFor(e).evaluate(e).focus);const ni=f({name:"neutral-fill-input-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>rl(E.getValueFor(e),t||M.getValueFor(e),Bl.getValueFor(e),Vl.getValueFor(e),Pl.getValueFor(e),Ll.getValueFor(e))}),$u=f("neutral-fill-input-rest").withDefault(e=>ni.getValueFor(e).evaluate(e).rest),Cu=f("neutral-fill-input-hover").withDefault(e=>ni.getValueFor(e).evaluate(e).hover),ku=f("neutral-fill-input-active").withDefault(e=>ni.getValueFor(e).evaluate(e).active);f("neutral-fill-input-focus").withDefault(e=>ni.getValueFor(e).evaluate(e).focus);const si=f({name:"neutral-fill-stealth-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>al(E.getValueFor(e),t||M.getValueFor(e),Ml.getValueFor(e),El.getValueFor(e),Il.getValueFor(e),Hl.getValueFor(e),qt.getValueFor(e),Ut.getValueFor(e),Wt.getValueFor(e),cr.getValueFor(e))}),fr=f("neutral-fill-stealth-rest").withDefault(e=>si.getValueFor(e).evaluate(e).rest),uc=f("neutral-fill-stealth-hover").withDefault(e=>si.getValueFor(e).evaluate(e).hover),dc=f("neutral-fill-stealth-active").withDefault(e=>si.getValueFor(e).evaluate(e).active),Tu=f("neutral-fill-stealth-focus").withDefault(e=>si.getValueFor(e).evaluate(e).focus),ri=f({name:"neutral-fill-strong-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>ll(E.getValueFor(e),t||M.getValueFor(e),jl.getValueFor(e),zl.getValueFor(e),_l.getValueFor(e),ql.getValueFor(e))});f("neutral-fill-strong-rest").withDefault(e=>ri.getValueFor(e).evaluate(e).rest);f("neutral-fill-strong-hover").withDefault(e=>ri.getValueFor(e).evaluate(e).hover);f("neutral-fill-strong-active").withDefault(e=>ri.getValueFor(e).evaluate(e).active);f("neutral-fill-strong-focus").withDefault(e=>ri.getValueFor(e).evaluate(e).focus);const pr=v("neutral-fill-layer-recipe").withDefault({evaluate:(e,t)=>ol(E.getValueFor(e),t||M.getValueFor(e),Gt.getValueFor(e))});f("neutral-fill-layer-rest").withDefault(e=>pr.getValueFor(e).evaluate(e));const fc=v("focus-stroke-outer-recipe").withDefault({evaluate:e=>cl(E.getValueFor(e),M.getValueFor(e))}),mt=f("focus-stroke-outer").withDefault(e=>fc.getValueFor(e).evaluate(e)),pc=v("focus-stroke-inner-recipe").withDefault({evaluate:e=>hl(un.getValueFor(e),M.getValueFor(e),mt.getValueFor(e))}),gc=f("focus-stroke-inner").withDefault(e=>pc.getValueFor(e).evaluate(e)),bc=v("neutral-foreground-hint-recipe").withDefault({evaluate:e=>dl(E.getValueFor(e),M.getValueFor(e))}),Fu=f("neutral-foreground-hint").withDefault(e=>bc.getValueFor(e).evaluate(e)),vc=v("neutral-foreground-recipe").withDefault({evaluate:e=>ul(E.getValueFor(e),M.getValueFor(e))}),Pt=f("neutral-foreground-rest").withDefault(e=>vc.getValueFor(e).evaluate(e)),oi=f({name:"neutral-stroke-recipe",cssCustomPropertyName:null}).withDefault({evaluate:e=>wl(E.getValueFor(e),M.getValueFor(e),Ul.getValueFor(e),Wl.getValueFor(e),Gl.getValueFor(e),Ql.getValueFor(e))}),mc=f("neutral-stroke-rest").withDefault(e=>oi.getValueFor(e).evaluate(e).rest),yc=f("neutral-stroke-hover").withDefault(e=>oi.getValueFor(e).evaluate(e).hover),Au=f("neutral-stroke-active").withDefault(e=>oi.getValueFor(e).evaluate(e).active),Ru=f("neutral-stroke-focus").withDefault(e=>oi.getValueFor(e).evaluate(e).focus),wc=v("neutral-stroke-divider-recipe").withDefault({evaluate:(e,t)=>xl(E.getValueFor(e),t||M.getValueFor(e),Xl.getValueFor(e))}),Du=f("neutral-stroke-divider-rest").withDefault(e=>wc.getValueFor(e).evaluate(e)),Ou=We.create({name:"height-number",cssCustomPropertyName:null}).withDefault(e=>(ar.getValueFor(e)+hn.getValueFor(e))*X.getValueFor(e)),ge=Na`(${ar} + ${hn}) * ${X}`;/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function xc(e,t,i,n){var s=arguments.length,r=s<3?t:n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(s<3?o(r):s>3?o(t,i,r):o(t,i))||r);return s>3&&r&&Object.defineProperty(t,i,r),r}const Sc="0 0 calc((var(--elevation) * 0.225px) + 2px) rgba(0, 0, 0, calc(.11 * (2 - var(--background-luminance, 1))))",$c="0 calc(var(--elevation) * 0.4px) calc((var(--elevation) * 0.9px)) rgba(0, 0, 0, calc(.13 * (2 - var(--background-luminance, 1))))",Cc=`box-shadow: ${Sc}, ${$c};`,kc=S`
    ${Ge("inline-flex")} :host {
        font-family: ${or};
        outline: none;
        font-size: ${Sl};
        line-height: ${$l};
        height: calc(${ge} * 1px);
        min-width: calc(${ge} * 1px);
        background-color: ${dr};
        color: ${Pt};
        border-radius: calc(${Tt} * 1px);
        fill: currentcolor;
        cursor: pointer;
    }

    .control {
        background: transparent;
        height: inherit;
        flex-grow: 1;
        box-sizing: border-box;
        display: inline-flex;
        justify-content: center;
        align-items: baseline;
        padding: 0 calc((10 + (${X} * 2 * ${hn})) * 1px);
        white-space: nowrap;
        outline: none;
        text-decoration: none;
        border: calc(${Y} * 1px) solid transparent;
        color: inherit;
        border-radius: inherit;
        fill: inherit;
        cursor: inherit;
        font-weight: inherit;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }

    :host(:hover) {
        background-color: ${cc};
    }

    :host(:active) {
        background-color: ${hc};
    }

    .control:${k} {
        border-color: ${mt};
        box-shadow: 0 0 0 calc((${nt} - ${Y}) * 1px) ${mt} inset;
    }

    .control::-moz-focus-inner {
        border: 0;
    }

    .start,
    .content,
    .end {
        align-self: center;
    }

    .start,
    .end {
        display: flex;
    }

    .control.icon-only {
        padding: 0;
        line-height: 0;
    }

    ::slotted(svg) {
        ${""} width: 16px;
        height: 16px;
        pointer-events: none;
    }

    .start {
        margin-inline-end: 11px;
    }

    .end {
        margin-inline-start: 11px;
    }
`.withBehaviors(G(S`
            :host .control {
              background-color: ${d.ButtonFace};
              border-color: ${d.ButtonText};
              color: ${d.ButtonText};
              fill: currentColor;
            }

            :host(:hover) .control {
              forced-color-adjust: none;
              background-color: ${d.Highlight};
              color: ${d.HighlightText};
            }

            .control:${k} {
              forced-color-adjust: none;
              background-color: ${d.Highlight};
              border-color: ${d.ButtonText};
              box-shadow: 0 0 0 calc((${nt} - ${Y}) * 1px) ${d.ButtonText} inset;
              color: ${d.HighlightText};
            }

            .control:hover,
            :host([appearance="outline"]) .control:hover {
              border-color: ${d.ButtonText};
            }

            :host([href]) .control {
                border-color: ${d.LinkText};
                color: ${d.LinkText};
            }

            :host([href]) .control:hover,
            :host([href]) .control:${k}{
              forced-color-adjust: none;
              background: ${d.ButtonFace};
              border-color: ${d.LinkText};
              box-shadow: 0 0 0 1px ${d.LinkText} inset;
              color: ${d.LinkText};
              fill: currentColor;
            }
        `)),Tc=S`
    :host([appearance="accent"]) {
        background: ${Rt};
        color: ${rc};
    }

    :host([appearance="accent"]:hover) {
        background: ${Je};
        color: ${oc};
    }

    :host([appearance="accent"]:active) .control:active {
        background: ${Ze};
        color: ${ac};
    }

    :host([appearance="accent"]) .control:${k} {
        box-shadow: 0 0 0 calc((${nt} - ${Y}) * 1px) ${mt} inset,
            0 0 0 calc((${nt} + ${Y}) * 1px) ${gc} inset;
    }
`.withBehaviors(G(S`
            :host([appearance="accent"]) .control {
                forced-color-adjust: none;
                background: ${d.Highlight};
                color: ${d.HighlightText};
            }

            :host([appearance="accent"]) .control:hover,
            :host([appearance="accent"]:active) .control:active {
                background: ${d.HighlightText};
                border-color: ${d.Highlight};
                color: ${d.Highlight};
            }

            :host([appearance="accent"]) .control:${k} {
                border-color: ${d.Highlight};
                box-shadow: 0 0 0 calc(${nt} * 1px) ${d.HighlightText} inset;
            }

            :host([appearance="accent"][href]) .control{
                background: ${d.LinkText};
                color: ${d.HighlightText};
            }

            :host([appearance="accent"][href]) .control:hover {
                background: ${d.ButtonFace};
                border-color: ${d.LinkText};
                box-shadow: none;
                color: ${d.LinkText};
                fill: currentColor;
            }

            :host([appearance="accent"][href]) .control:${k} {
                border-color: ${d.LinkText};
                box-shadow: 0 0 0 calc(${nt} * 1px) ${d.HighlightText} inset;
            }
        `)),Nu=S`
    :host([appearance="hypertext"]) {
        font-size: inherit;
        line-height: inherit;
        height: auto;
        min-width: 0;
        background: transparent;
    }

    :host([appearance="hypertext"]) .control {
        display: inline;
        padding: 0;
        border: none;
        box-shadow: none;
        border-radius: 0;
        line-height: 1;
    }

    :host a.control:not(:link) {
        background-color: transparent;
        cursor: default;
    }
    :host([appearance="hypertext"]) .control:link,
    :host([appearance="hypertext"]) .control:visited {
        background: transparent;
        color: ${Ht};
        border-bottom: calc(${Y} * 1px) solid ${Ht};
    }

    :host([appearance="hypertext"]:hover),
    :host([appearance="hypertext"]) .control:hover {
        background: transparent;
        border-bottom-color: ${Qi};
    }

    :host([appearance="hypertext"]:active),
    :host([appearance="hypertext"]) .control:active {
        background: transparent;
        border-bottom-color: ${Xi};
    }

    :host([appearance="hypertext"]) .control:${k} {
        border-bottom: calc(${nt} * 1px) solid ${mt};
        margin-bottom: calc(calc(${Y} - ${nt}) * 1px);
    }
`.withBehaviors(G(S`
            :host([appearance="hypertext"]:hover) {
                background-color: ${d.ButtonFace};
                color: ${d.ButtonText};
            }
            :host([appearance="hypertext"][href]) .control:hover,
            :host([appearance="hypertext"][href]) .control:active,
            :host([appearance="hypertext"][href]) .control:${k} {
                color: ${d.LinkText};
                border-bottom-color: ${d.LinkText};
                box-shadow: none;
            }
        `)),Fc=S`
    :host([appearance="lightweight"]) {
        background: transparent;
        color: ${Ht};
    }

    :host([appearance="lightweight"]) .control {
        padding: 0;
        height: initial;
        border: none;
        box-shadow: none;
        border-radius: 0;
    }

    :host([appearance="lightweight"]:hover) {
        background: transparent;
        color: ${Qi};
    }

    :host([appearance="lightweight"]:active) {
        background: transparent;
        color: ${Xi};
    }

    :host([appearance="lightweight"]) .content {
        position: relative;
    }

    :host([appearance="lightweight"]) .content::before {
        content: "";
        display: block;
        height: calc(${Y} * 1px);
        position: absolute;
        top: calc(1em + 4px);
        width: 100%;
    }

    :host([appearance="lightweight"]:hover) .content::before {
        background: ${Qi};
    }

    :host([appearance="lightweight"]:active) .content::before {
        background: ${Xi};
    }

    :host([appearance="lightweight"]) .control:${k} .content::before {
        background: ${Pt};
        height: calc(${nt} * 1px);
    }
`.withBehaviors(G(S`
            :host([appearance="lightweight"]) .control:hover,
            :host([appearance="lightweight"]) .control:${k} {
                forced-color-adjust: none;
                background: ${d.ButtonFace};
                color: ${d.Highlight};
            }
            :host([appearance="lightweight"]) .control:hover .content::before,
            :host([appearance="lightweight"]) .control:${k} .content::before {
                background: ${d.Highlight};
            }

            :host([appearance="lightweight"][href]) .control:hover,
            :host([appearance="lightweight"][href]) .control:${k} {
                background: ${d.ButtonFace};
                box-shadow: none;
                color: ${d.LinkText};
            }

            :host([appearance="lightweight"][href]) .control:hover .content::before,
            :host([appearance="lightweight"][href]) .control:${k} .content::before {
                background: ${d.LinkText};
            }
        `)),Ac=S`
    :host([appearance="outline"]) {
        background: transparent;
        border-color: ${Rt};
    }

    :host([appearance="outline"]:hover) {
        border-color: ${Je};
    }

    :host([appearance="outline"]:active) {
        border-color: ${Ze};
    }

    :host([appearance="outline"]) .control {
        border-color: inherit;
    }

    :host([appearance="outline"]) .control:${k} {
        box-shadow: 0 0 0 calc((${nt} - ${Y}) * 1px) ${mt} inset;
        border-color: ${mt};
    }
`.withBehaviors(G(S`
            :host([appearance="outline"]) .control {
                border-color: ${d.ButtonText};
            }
            :host([appearance="outline"]) .control:${k} {
              forced-color-adjust: none;
              background-color: ${d.Highlight};
              border-color: ${d.ButtonText};
              box-shadow: 0 0 0 calc((${nt} - ${Y}) * 1px) ${d.ButtonText} inset;
              color: ${d.HighlightText};
              fill: currentColor;
            }
            :host([appearance="outline"][href]) .control {
                background: ${d.ButtonFace};
                border-color: ${d.LinkText};
                color: ${d.LinkText};
                fill: currentColor;
            }
            :host([appearance="outline"][href]) .control:hover,
            :host([appearance="outline"][href]) .control:${k} {
              forced-color-adjust: none;
              border-color: ${d.LinkText};
              box-shadow: 0 0 0 1px ${d.LinkText} inset;
            }
        `)),Rc=S`
    :host([appearance="stealth"]) {
        background: ${fr};
    }

    :host([appearance="stealth"]:hover) {
        background: ${uc};
    }

    :host([appearance="stealth"]:active) {
        background: ${dc};
    }
`.withBehaviors(G(S`
            :host([appearance="stealth"]),
            :host([appearance="stealth"]) .control {
                forced-color-adjust: none;
                background: ${d.ButtonFace};
                border-color: transparent;
                color: ${d.ButtonText};
                fill: currentColor;
            }

            :host([appearance="stealth"]:hover) .control {
                background: ${d.Highlight};
                border-color: ${d.Highlight};
                color: ${d.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"]:${k}) .control {
                background: ${d.Highlight};
                box-shadow: 0 0 0 1px ${d.Highlight};
                color: ${d.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]) .control {
                color: ${d.LinkText};
            }

            :host([appearance="stealth"][href]:hover) .control,
            :host([appearance="stealth"][href]:${k}) .control {
                background: ${d.LinkText};
                border-color: ${d.LinkText};
                color: ${d.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]:${k}) .control {
                forced-color-adjust: none;
                box-shadow: 0 0 0 1px ${d.LinkText};
            }
        `));class Dc{constructor(t,i){this.cache=new WeakMap,this.ltr=t,this.rtl=i}bind(t){this.attach(t)}unbind(t){const i=this.cache.get(t);i&&Di.unsubscribe(i)}attach(t){const i=this.cache.get(t)||new Oc(this.ltr,this.rtl,t),n=Di.getValueFor(t);Di.subscribe(i),i.attach(n),this.cache.set(t,i)}}class Oc{constructor(t,i,n){this.ltr=t,this.rtl=i,this.source=n,this.attached=null}handleChange({target:t,token:i}){this.attach(i.getValueFor(t))}attach(t){this.attached!==this[t]&&(this.attached!==null&&this.source.$fastController.removeStyles(this.attached),this.attached=this[t],this.attached!==null&&this.source.$fastController.addStyles(this.attached))}}function Ce(e,t){return new ya("appearance",e,t)}const Nc=(e,t)=>S`
        ${Ge("inline-block")} :host {
            box-sizing: border-box;
            font-family: ${or};
            font-size: ${Cl};
            line-height: ${kl};
        }

        .control {
            border-radius: calc(${Tt} * 1px);
            padding: calc(((${X} * 0.5) - ${Y}) * 1px)
                calc((${X} - ${Y}) * 1px);
            color: ${Ht};
            font-weight: 600;
            border: calc(${Y} * 1px) solid transparent;
        }

        .control[style] {
            font-weight: 400;
        }

        :host([circular]) .control {
            border-radius: 100px;
            padding: 0 calc(${X} * 1px);
            height: calc((${ge} - (${X} * 3)) * 1px);
            min-width: calc((${ge} - (${X} * 3)) * 1px);
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
        }
    `,Bc=qe.compose({baseName:"badge",template:Yo,styles:Nc}),Vc=(e,t)=>S`
        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:active) {
            opacity: ${lr};
            background-color: ${dr};
            cursor: ${Hi};
        }

        ${kc}
    `.withBehaviors(G(S`
                :host([disabled]),
                :host([disabled]) .control,
                :host([disabled]:hover),
                :host([disabled]:active) {
                    forced-color-adjust: none;
                    background-color: ${d.ButtonFace};
                    border-color: ${d.GrayText};
                    color: ${d.GrayText};
                    cursor: ${Hi};
                    opacity: 1;
                }
            `),Ce("accent",S`
                :host([appearance="accent"][disabled]),
                :host([appearance="accent"][disabled]:hover),
                :host([appearance="accent"][disabled]:active) {
                    background: ${Rt};
                }

                ${Tc}
            `.withBehaviors(G(S`
                        :host([appearance="accent"][disabled]) .control,
                        :host([appearance="accent"][disabled]) .control:hover {
                            background: ${d.ButtonFace};
                            border-color: ${d.GrayText};
                            color: ${d.GrayText};
                        }
                    `))),Ce("lightweight",S`
                :host([appearance="lightweight"][disabled]:hover),
                :host([appearance="lightweight"][disabled]:active) {
                    background-color: transparent;
                    color: ${Ht};
                }

                :host([appearance="lightweight"][disabled]) .content::before,
                :host([appearance="lightweight"][disabled]:hover) .content::before,
                :host([appearance="lightweight"][disabled]:active) .content::before {
                    background: transparent;
                }

                ${Fc}
            `.withBehaviors(G(S`
                        :host([appearance="lightweight"].disabled) .control {
                            forced-color-adjust: none;
                            color: ${d.GrayText};
                        }

                        :host([appearance="lightweight"].disabled)
                            .control:hover
                            .content::before {
                            background: none;
                        }
                    `))),Ce("outline",S`
                :host([appearance="outline"][disabled]),
                :host([appearance="outline"][disabled]:hover),
                :host([appearance="outline"][disabled]:active) {
                    background: transparent;
                    border-color: ${Rt};
                }

                ${Ac}
            `.withBehaviors(G(S`
                        :host([appearance="outline"][disabled]) .control {
                            border-color: ${d.GrayText};
                        }
                    `))),Ce("stealth",S`
                :host([appearance="stealth"][disabled]),
                :host([appearance="stealth"][disabled]:hover),
                :host([appearance="stealth"][disabled]:active) {
                    background: ${fr};
                }

                ${Rc}
            `.withBehaviors(G(S`
                        :host([appearance="stealth"][disabled]) {
                            background: ${d.ButtonFace};
                        }

                        :host([appearance="stealth"][disabled]) .control {
                            background: ${d.ButtonFace};
                            border-color: transparent;
                            color: ${d.GrayText};
                        }
                    `))));class gr extends et{constructor(){super(...arguments),this.appearance="neutral"}defaultSlottedContentChanged(t,i){const n=this.defaultSlottedContent.filter(s=>s.nodeType===Node.ELEMENT_NODE);n.length===1&&n[0]instanceof SVGElement?this.control.classList.add("icon-only"):this.control.classList.remove("icon-only")}}xc([Da],gr.prototype,"appearance",void 0);const Pc=gr.compose({baseName:"button",baseClass:et,template:Jo,styles:Vc,shadowOptions:{delegatesFocus:!0}}),Lc=(e,t)=>S`
        ${Ge("block")} :host {
            --elevation: 4;
            display: block;
            contain: content;
            height: var(--card-height, 100%);
            width: var(--card-width, 100%);
            box-sizing: border-box;
            background: ${M};
            border-radius: calc(${Tt} * 1px);
            ${Cc}
        }
    `.withBehaviors(G(S`
                :host {
                    forced-color-adjust: none;
                    background: ${d.Canvas};
                    box-shadow: 0 0 0 1px ${d.CanvasText};
                }
            `));class Mc extends _s{connectedCallback(){super.connectedCallback();const t=Be(this);t&&M.setValueFor(this,i=>pr.getValueFor(i).evaluate(i,M.getValueFor(t)))}}const Ec=Mc.compose({baseName:"card",baseClass:_s,template:ta,styles:Lc}),Ic=S`
    .track-start {
        left: 0;
    }
`,Hc=S`
    .track-start {
        right: 0;
    }
`,jc=(e,t)=>S`
        :host([hidden]) {
            display: none;
        }

        ${Ge("inline-grid")} :host {
            --thumb-size: calc(${ge} * 0.5 - ${X});
            --thumb-translate: calc(var(--thumb-size) * -0.5 + var(--track-width) / 2);
            --track-overhang: calc((${X} / 2) * -1);
            --track-width: ${X};
            --fast-slider-height: calc(var(--thumb-size) * 10);
            align-items: center;
            width: 100%;
            margin: calc(${X} * 1px) 0;
            user-select: none;
            box-sizing: border-box;
            border-radius: calc(${Tt} * 1px);
            outline: none;
            cursor: pointer;
        }
        :host([orientation="horizontal"]) .positioning-region {
            position: relative;
            margin: 0 8px;
            display: grid;
            grid-template-rows: calc(var(--thumb-size) * 1px) 1fr;
        }
        :host([orientation="vertical"]) .positioning-region {
            position: relative;
            margin: 0 8px;
            display: grid;
            height: 100%;
            grid-template-columns: calc(var(--thumb-size) * 1px) 1fr;
        }

        :host(:${k}) .thumb-cursor {
            box-shadow: 0 0 0 2px ${M}, 0 0 0 4px ${mt};
        }

        .thumb-container {
            position: absolute;
            height: calc(var(--thumb-size) * 1px);
            width: calc(var(--thumb-size) * 1px);
            transition: all 0.2s ease;
            color: ${Pt};
            fill: currentcolor;
        }
        .thumb-cursor {
            border: none;
            width: calc(var(--thumb-size) * 1px);
            height: calc(var(--thumb-size) * 1px);
            background: ${Pt};
            border-radius: calc(${Tt} * 1px);
        }
        .thumb-cursor:hover {
            background: ${Pt};
            border-color: ${yc};
        }
        .thumb-cursor:active {
            background: ${Pt};
        }
        .track-start {
            background: ${Ht};
            position: absolute;
            height: 100%;
            left: 0;
            border-radius: calc(${Tt} * 1px);
        }
        :host([orientation="horizontal"]) .thumb-container {
            transform: translateX(calc(var(--thumb-size) * 0.5px)) translateY(calc(var(--thumb-translate) * 1px));
        }
        :host([orientation="vertical"]) .thumb-container {
            transform: translateX(calc(var(--thumb-translate) * 1px)) translateY(calc(var(--thumb-size) * 0.5px));
        }
        :host([orientation="horizontal"]) {
            min-width: calc(var(--thumb-size) * 1px);
        }
        :host([orientation="horizontal"]) .track {
            right: calc(var(--track-overhang) * 1px);
            left: calc(var(--track-overhang) * 1px);
            align-self: start;
            height: calc(var(--track-width) * 1px);
        }
        :host([orientation="vertical"]) .track {
            top: calc(var(--track-overhang) * 1px);
            bottom: calc(var(--track-overhang) * 1px);
            width: calc(var(--track-width) * 1px);
            height: 100%;
        }
        .track {
            background: ${mc};
            position: absolute;
            border-radius: calc(${Tt} * 1px);
        }
        :host([orientation="vertical"]) {
            height: calc(var(--fast-slider-height) * 1px);
            min-height: calc(var(--thumb-size) * 1px);
            min-width: calc(${X} * 20px);
        }
        :host([orientation="vertical"]) .track-start {
            height: auto;
            width: 100%;
            top: 0;
        }
        :host([disabled]), :host([readonly]) {
            cursor: ${Hi};
        }
        :host([disabled]) {
            opacity: ${lr};
        }
    `.withBehaviors(new Dc(Ic,Hc),G(S`
                .thumb-cursor {
                    forced-color-adjust: none;
                    border-color: ${d.FieldText};
                    background: ${d.FieldText};
                }
                .thumb-cursor:hover,
                .thumb-cursor:active {
                    background: ${d.Highlight};
                }
                .track {
                    forced-color-adjust: none;
                    background: ${d.FieldText};
                }
                :host(:${k}) .thumb-cursor {
                    border-color: ${d.Highlight};
                }
                :host([disabled]) {
                    opacity: 1;
                }
                :host([disabled]) .track,
                :host([disabled]) .thumb-cursor {
                    forced-color-adjust: none;
                    background: ${d.GrayText};
                }

                :host(:${k}) .thumb-cursor {
                    background: ${d.Highlight};
                    border-color: ${d.Highlight};
                    box-shadow: 0 0 0 2px ${d.Field}, 0 0 0 4px ${d.FieldText};
                }
            `)),zc=H.compose({baseName:"slider",template:pa,styles:jc,thumb:`
        <div class="thumb-cursor"></div>
    `});function _c(e){return Us.getOrCreate(e).withPrefix("fast")}function qc(){_c().register(zc(),Pc(),Ec(),Bc())}let Ae;const Yn="fast-kernel";try{if(document.currentScript)Ae=document.currentScript.getAttribute(Yn);else{const e=document.getElementsByTagName("script");Ae=e[e.length-1].getAttribute(Yn)}}catch{Ae="isolate"}let Ft;switch(Ae){case"share":Ft=Object.freeze({updateQueue:1,observable:2,contextEvent:3,elementRegistry:4});break;case"share-v2":Ft=Object.freeze({updateQueue:1.2,observable:2.2,contextEvent:3.2,elementRegistry:4.2});break;default:const e=`-${Math.random().toString(36).substring(2,8)}`;Ft=Object.freeze({updateQueue:`1.2${e}`,observable:`2.2${e}`,contextEvent:`3.2${e}`,elementRegistry:`4.2${e}`});break}var lt;(function(e){e[e.needsArrayObservation=1101]="needsArrayObservation",e[e.onlySetDOMPolicyOnce=1201]="onlySetDOMPolicyOnce",e[e.bindingInnerHTMLRequiresTrustedTypes=1202]="bindingInnerHTMLRequiresTrustedTypes",e[e.twoWayBindingRequiresObservables=1203]="twoWayBindingRequiresObservables",e[e.hostBindingWithoutHost=1204]="hostBindingWithoutHost",e[e.unsupportedBindingBehavior=1205]="unsupportedBindingBehavior",e[e.directCallToHTMLTagNotAllowed=1206]="directCallToHTMLTagNotAllowed",e[e.onlySetTemplatePolicyOnce=1207]="onlySetTemplatePolicyOnce",e[e.cannotSetTemplatePolicyAfterCompilation=1208]="cannotSetTemplatePolicyAfterCompilation",e[e.blockedByDOMPolicy=1209]="blockedByDOMPolicy",e[e.missingElementDefinition=1401]="missingElementDefinition",e[e.noRegistrationForContext=1501]="noRegistrationForContext",e[e.noFactoryForResolver=1502]="noFactoryForResolver",e[e.invalidResolverStrategy=1503]="invalidResolverStrategy",e[e.cannotAutoregisterDependency=1504]="cannotAutoregisterDependency",e[e.cannotResolveKey=1505]="cannotResolveKey",e[e.cannotConstructNativeFunction=1506]="cannotConstructNativeFunction",e[e.cannotJITRegisterNonConstructor=1507]="cannotJITRegisterNonConstructor",e[e.cannotJITRegisterIntrinsic=1508]="cannotJITRegisterIntrinsic",e[e.cannotJITRegisterInterface=1509]="cannotJITRegisterInterface",e[e.invalidResolver=1510]="invalidResolver",e[e.invalidKey=1511]="invalidKey",e[e.noDefaultResolver=1512]="noDefaultResolver",e[e.cyclicDependency=1513]="cyclicDependency",e[e.connectUpdateRequiresController=1514]="connectUpdateRequiresController"})(lt||(lt={}));const Nt=e=>typeof e=="function",yt=e=>typeof e=="string",Uc=()=>{};var Oi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Jn={},Zn;function Wc(){return Zn||(Zn=1,(function(){if(!(typeof globalThis<"u"))if(typeof Oi<"u")Oi.globalThis=Oi;else if(typeof self<"u")self.globalThis=self;else if(typeof window<"u")window.globalThis=window;else{const t=new Function("return this")();t.globalThis=t}})(),(function(){"requestIdleCallback"in globalThis||(globalThis.requestIdleCallback=function(i,n){const s=Date.now();return setTimeout(()=>{i({didTimeout:n!=null&&n.timeout?Date.now()-s>=n.timeout:!1,timeRemaining:()=>0})},1)},globalThis.cancelIdleCallback=function(i){clearTimeout(i)})})()),Jn}Wc();const br={configurable:!1,enumerable:!1,writable:!1};globalThis.FAST===void 0&&Reflect.defineProperty(globalThis,"FAST",Object.assign({value:Object.create(null)},br));const B=globalThis.FAST;if(B.getById===void 0){const e=Object.create(null);Reflect.defineProperty(B,"getById",Object.assign({value(t,i){let n=e[t];return n===void 0&&(n=i?e[t]=i():null),n}},br))}B.error===void 0&&Object.assign(B,{warn(){},error(e){return new Error(`Error ${e}`)},addMessages(){}});function dn(){const e=new Map;return Object.freeze({register(t){return e.has(t.type)?!1:(e.set(t.type,t),!0)},getByType(t){return e.get(t)},getForInstance(t){if(t!=null)return e.get(t.constructor)}})}function vr(){const e=new WeakMap;return function(t){let i=e.get(t);if(i===void 0){let n=Reflect.getPrototypeOf(t);for(;i===void 0&&n!==null;)i=e.get(n),n=Reflect.getPrototypeOf(n);i=i===void 0?[]:i.slice(0),e.set(t,i)}return i}}function Bt(e){e.prototype.toJSON=Uc}const L=Object.freeze({none:0,attribute:1,booleanAttribute:2,property:3,content:4,tokenList:5,event:6}),Kn=e=>e,Gc=globalThis.trustedTypes?globalThis.trustedTypes.createPolicy("fast-html",{createHTML:Kn}):{createHTML:Kn};let Re=Object.freeze({createHTML(e){return Gc.createHTML(e)},protect(e,t,i,n){return n}});const Qc=Re,jt=Object.freeze({get policy(){return Re},setPolicy(e){if(Re!==Qc)throw B.error(lt.onlySetDOMPolicyOnce);Re=e},setAttribute(e,t,i){i==null?e.removeAttribute(t):e.setAttribute(t,i)},setBooleanAttribute(e,t,i){i?e.setAttribute(t,""):e.removeAttribute(t)}});class Yi{constructor(t,i){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.subject=t,this.sub1=i}has(t){return this.spillover===void 0?this.sub1===t||this.sub2===t:this.spillover.indexOf(t)!==-1}subscribe(t){const i=this.spillover;if(i===void 0){if(this.has(t))return;if(this.sub1===void 0){this.sub1=t;return}if(this.sub2===void 0){this.sub2=t;return}this.spillover=[this.sub1,this.sub2,t],this.sub1=void 0,this.sub2=void 0}else i.indexOf(t)===-1&&i.push(t)}unsubscribe(t){const i=this.spillover;if(i===void 0)this.sub1===t?this.sub1=void 0:this.sub2===t&&(this.sub2=void 0);else{const n=i.indexOf(t);n!==-1&&i.splice(n,1)}}notify(t){const i=this.spillover,n=this.subject;if(i===void 0){const s=this.sub1,r=this.sub2;s!==void 0&&s.handleChange(n,t),r!==void 0&&r.handleChange(n,t)}else for(let s=0,r=i.length;s<r;++s)i[s].handleChange(n,t)}}class mr{constructor(t){this.subscribers={},this.subjectSubscribers=null,this.subject=t}notify(t){var i,n;(i=this.subscribers[t])===null||i===void 0||i.notify(t),(n=this.subjectSubscribers)===null||n===void 0||n.notify(t)}subscribe(t,i){var n,s;let r;i?r=(n=this.subscribers[i])!==null&&n!==void 0?n:this.subscribers[i]=new Yi(this.subject):r=(s=this.subjectSubscribers)!==null&&s!==void 0?s:this.subjectSubscribers=new Yi(this.subject),r.subscribe(t)}unsubscribe(t,i){var n,s;i?(n=this.subscribers[i])===null||n===void 0||n.unsubscribe(t):(s=this.subjectSubscribers)===null||s===void 0||s.unsubscribe(t)}}const yr=B.getById(Ft.updateQueue,()=>{const e=[],t=[],i=globalThis.requestAnimationFrame;let n=!0;function s(){if(t.length)throw t.shift()}function r(l){try{l.call()}catch(c){if(n)t.push(c),setTimeout(s,0);else throw e.length=0,c}}function o(){let c=0;for(;c<e.length;)if(r(e[c]),c++,c>1024){for(let h=0,u=e.length-c;h<u;h++)e[h]=e[h+c];e.length-=c,c=0}e.length=0}function a(l){e.push(l),e.length<2&&(n?i(o):o())}return Object.freeze({enqueue:a,next:()=>new Promise(a),process:o,setMode:l=>n=l})}),ai=Object.freeze({unknown:void 0,coupled:1}),N=B.getById(Ft.observable,()=>{const e=yr.enqueue,t=/(:|&&|\|\||if|\?\.)/,i=new WeakMap;let n,s=c=>{throw B.error(lt.needsArrayObservation)};function r(c){var h;let u=(h=c.$fastController)!==null&&h!==void 0?h:i.get(c);return u===void 0&&(Array.isArray(c)?u=s(c):i.set(c,u=new mr(c))),u}const o=vr();class a{constructor(h){this.name=h,this.field=`_${h}`,this.callback=`${h}Changed`}getValue(h){return n!==void 0&&n.watch(h,this.name),h[this.field]}setValue(h,u){const p=this.field,g=h[p];if(g!==u){h[p]=u;const y=h[this.callback];Nt(y)&&y.call(h,g,u),r(h).notify(this.name)}}}class l extends Yi{constructor(h,u,p=!1){super(h,u),this.expression=h,this.isVolatileBinding=p,this.needsRefresh=!0,this.needsQueue=!0,this.isAsync=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}setMode(h){this.isAsync=this.needsQueue=h}bind(h){this.controller=h;const u=this.observe(h.source,h.context);return!h.isBound&&this.requiresUnbind(h)&&h.onUnbind(this),u}requiresUnbind(h){return h.sourceLifetime!==ai.coupled||this.first!==this.last||this.first.propertySource!==h.source}unbind(h){this.dispose()}observe(h,u){this.needsRefresh&&this.last!==null&&this.dispose();const p=n;n=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;let g;try{g=this.expression(h,u)}finally{n=p}return g}disconnect(){this.dispose()}dispose(){if(this.last!==null){let h=this.first;for(;h!==void 0;)h.notifier.unsubscribe(this,h.propertyName),h=h.next;this.last=null,this.needsRefresh=this.needsQueue=this.isAsync}}watch(h,u){const p=this.last,g=r(h),y=p===null?this.first:{};if(y.propertySource=h,y.propertyName=u,y.notifier=g,g.subscribe(this,u),p!==null){if(!this.needsRefresh){let w;n=void 0,w=p.propertySource[p.propertyName],n=this,h===w&&(this.needsRefresh=!0)}p.next=y}this.last=y}handleChange(){this.needsQueue?(this.needsQueue=!1,e(this)):this.isAsync||this.call()}call(){this.last!==null&&(this.needsQueue=this.isAsync,this.notify(this))}*records(){let h=this.first;for(;h!==void 0;)yield h,h=h.next}}return Bt(l),Object.freeze({setArrayObserverFactory(c){s=c},getNotifier:r,track(c,h){n&&n.watch(c,h)},trackVolatile(){n&&(n.needsRefresh=!0)},notify(c,h){r(c).notify(h)},defineProperty(c,h){yt(h)&&(h=new a(h)),o(c).push(h),Reflect.defineProperty(c,h.name,{enumerable:!0,get(){return h.getValue(this)},set(u){h.setValue(this,u)}})},getAccessors:o,binding(c,h,u=this.isVolatileBinding(c)){return new l(c,h,u)},isVolatileBinding(c){return t.test(c.toString())}})});function ye(e,t){N.defineProperty(e,t)}const ts=B.getById(Ft.contextEvent,()=>{let e=null;return{get(){return e},set(t){e=t}}}),be=Object.freeze({default:{index:0,length:0,get event(){return be.getEvent()},eventDetail(){return this.event.detail},eventTarget(){return this.event.target}},getEvent(){return ts.get()},setEvent(e){ts.set(e)}});class li{constructor(t,i,n=!1){this.evaluate=t,this.policy=i,this.isVolatile=n}}class Xc extends li{createObserver(t){return N.binding(this.evaluate,t,this.isVolatile)}}function fn(e,t,i=N.isVolatileBinding(e)){return new Xc(e,t,i)}class wr extends li{createObserver(){return this}bind(t){return this.evaluate(t.source,t.context)}}Bt(wr);function xr(e,t){return new wr(e,t)}const Ni=dn(),pn=Object.freeze({getForInstance:Ni.getForInstance,getByType:Ni.getByType,define(e){return Ni.register({type:e}),e}});function Bi(e,t,i){t.source.style.setProperty(e.targetAspect,i.bind(t))}class Ji{constructor(t,i){this.dataBinding=t,this.targetAspect=i}createCSS(t){return t(this),`var(${this.targetAspect})`}addedCallback(t){var i;const n=t.source;if(!n.$cssBindings){n.$cssBindings=new Map;const r=n.setAttribute;n.setAttribute=(o,a)=>{r.call(n,o,a),o==="style"&&n.$cssBindings.forEach((l,c)=>Bi(c,l.controller,l.observer))}}const s=(i=t[this.targetAspect])!==null&&i!==void 0?i:t[this.targetAspect]=this.dataBinding.createObserver(this,this);s.controller=t,t.source.$cssBindings.set(this,{controller:t,observer:s})}connectedCallback(t){Bi(this,t,t[this.targetAspect])}removedCallback(t){t.source.$cssBindings&&t.source.$cssBindings.delete(this)}handleChange(t,i){Bi(this,i.controller,i)}}pn.define(Ji);let es;function Sr(e){return e.map(t=>t instanceof U?Sr(t.styles):[t]).reduce((t,i)=>t.concat(i),[])}class U{get strategy(){return this._strategy===null&&this.withStrategy(es),this._strategy}constructor(t){this.styles=t,this.targets=new WeakSet,this._strategy=null,this.behaviors=t.map(i=>i instanceof U?i.behaviors:null).reduce((i,n)=>n===null?i:i===null?n:i.concat(n),null)}addStylesTo(t){this.strategy.addStylesTo(t),this.targets.add(t)}removeStylesFrom(t){this.strategy.removeStylesFrom(t),this.targets.delete(t)}isAttachedTo(t){return this.targets.has(t)}withBehaviors(...t){return this.behaviors=this.behaviors===null?t:this.behaviors.concat(t),this}withStrategy(t){return this._strategy=new t(Sr(this.styles)),this}static setDefaultStrategy(t){es=t}static normalize(t){return t===void 0?void 0:Array.isArray(t)?new U(t):t instanceof U?t:new U([t])}}U.supportsAdoptedStyleSheets=Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype;const Yc=`${Math.random().toString(36).substring(2,8)}`;let Jc=0;const is=()=>`--v${Yc}${++Jc}`;function $r(e,t){const i=[];let n="";const s=[],r=o=>{s.push(o)};for(let o=0,a=e.length-1;o<a;++o){n+=e[o];let l=t[o];Nt(l)?l=new Ji(fn(l),is()).createCSS(r):l instanceof li?l=new Ji(l,is()).createCSS(r):pn.getForInstance(l)!==void 0&&(l=l.createCSS(r)),l instanceof U||l instanceof CSSStyleSheet?(n.trim()!==""&&(i.push(n),n=""),i.push(l)):n+=l}return n+=e[e.length-1],n.trim()!==""&&i.push(n),{styles:i,behaviors:s}}const Cr=((e,...t)=>{const{styles:i,behaviors:n}=$r(e,t),s=new U(i);return n.length?s.withBehaviors(...n):s});class kr{constructor(t,i){this.behaviors=i,this.css="";const n=t.reduce((s,r)=>(yt(r)?this.css+=r:s.push(r),s),[]);n.length&&(this.styles=new U(n))}createCSS(t){return this.behaviors.forEach(t),this.styles&&t(this),this.css}addedCallback(t){t.addStyles(this.styles)}removedCallback(t){t.removeStyles(this.styles)}}pn.define(kr);Cr.partial=(e,...t)=>{const{styles:i,behaviors:n}=$r(e,t);return new kr(i,n)};const gn=`fast-${Math.random().toString(36).substring(2,8)}`,De=`${gn}{`,oe=`}${gn}`,Zc=oe.length;let Kc=0;const bn=()=>`${gn}-${++Kc}`,Tr=Object.freeze({interpolation:e=>`${De}${e}${oe}`,attribute:e=>`${bn()}="${De}${e}${oe}"`,comment:e=>`<!--${De}${e}${oe}-->`}),ci=Object.freeze({parse(e,t){const i=e.split(De);if(i.length===1)return null;const n=[];for(let s=0,r=i.length;s<r;++s){const o=i[s],a=o.indexOf(oe);let l;if(a===-1)l=o;else{const c=o.substring(0,a);n.push(t[c]),l=o.substring(a+Zc)}l!==""&&n.push(l)}return n}}),Vi=dn(),pt=Object.freeze({getForInstance:Vi.getForInstance,getByType:Vi.getByType,define(e,t){return t=t||{},t.type=e,Vi.register(t),e},assignAspect(e,t){if(!t){e.aspectType=L.content;return}switch(e.sourceAspect=t,t[0]){case":":e.targetAspect=t.substring(1),e.aspectType=e.targetAspect==="classList"?L.tokenList:L.property;break;case"?":e.targetAspect=t.substring(1),e.aspectType=L.booleanAttribute;break;case"@":e.targetAspect=t.substring(1),e.aspectType=L.event;break;default:e.targetAspect=t,e.aspectType=L.attribute;break}}});class Fr{constructor(t){this.options=t}createHTML(t){return Tr.attribute(t(this))}createBehavior(){return this}}Bt(Fr);const ns=/fe-b\$\$start\$\$(\d+)\$\$(.+)\$\$fe-b/,ss=/fe-b\$\$end\$\$(\d+)\$\$(.+)\$\$fe-b/,rs=/fe-repeat\$\$start\$\$(\d+)\$\$fe-repeat/,os=/fe-repeat\$\$end\$\$(\d+)\$\$fe-repeat/,as=/^(?:.{0,1000})fe-eb\$\$start\$\$(.+?)\$\$fe-eb/,ls=/fe-eb\$\$end\$\$(.{0,1000})\$\$fe-eb(?:.{0,1000})$/;function cs(e){return e&&e.nodeType===Node.COMMENT_NODE}const K=Object.freeze({attributeMarkerName:"data-fe-b",compactAttributeMarkerName:"data-fe-c",attributeBindingSeparator:" ",contentBindingStartMarker(e,t){return`fe-b$$start$$${e}$$${t}$$fe-b`},contentBindingEndMarker(e,t){return`fe-b$$end$$${e}$$${t}$$fe-b`},repeatStartMarker(e){return`fe-repeat$$start$$${e}$$fe-repeat`},repeatEndMarker(e){return`fe-repeat$$end$$${e}$$fe-repeat`},isContentBindingStartMarker(e){return ns.test(e)},isContentBindingEndMarker(e){return ss.test(e)},isRepeatViewStartMarker(e){return rs.test(e)},isRepeatViewEndMarker(e){return os.test(e)},isElementBoundaryStartMarker(e){return cs(e)&&as.test(e.data.trim())},isElementBoundaryEndMarker(e){return cs(e)&&ls.test(e.data)},parseAttributeBinding(e){const t=e.getAttribute(this.attributeMarkerName);return t===null?t:t.split(this.attributeBindingSeparator).map(i=>parseInt(i))},parseEnumeratedAttributeBinding(e){const t=[],i=this.attributeMarkerName.length+1,n=`${this.attributeMarkerName}-`;for(const s of e.getAttributeNames())if(s.startsWith(n)){const r=Number(s.slice(i));if(!Number.isNaN(r))t.push(r);else throw B.error(1601,{name:s,expectedFormat:`${n}<number>`})}return t.length===0?null:t},parseCompactAttributeBinding(e){const t=`${this.compactAttributeMarkerName}-`,i=e.getAttributeNames().find(l=>l.startsWith(t));if(!i)return null;const s=i.slice(t.length).split("-"),r=parseInt(s[0],10),o=parseInt(s[1],10);if(s.length!==2||Number.isNaN(r)||Number.isNaN(o)||r<0||o<1)throw B.error(1604,{name:i,expectedFormat:`${this.compactAttributeMarkerName}-{index}-{count}`});const a=[];for(let l=0;l<o;l++)a.push(r+l);return a},parseContentBindingStartMarker(e){return ds(ns,e)},parseContentBindingEndMarker(e){return ds(ss,e)},parseRepeatStartMarker(e){return hs(rs,e)},parseRepeatEndMarker(e){return hs(os,e)},parseElementBoundaryStartMarker(e){return us(as,e.trim())},parseElementBoundaryEndMarker(e){return us(ls,e)}});function hs(e,t){const i=e.exec(t);return i===null?i:parseInt(i[1])}function us(e,t){const i=e.exec(t);return i===null?i:i[1]}function ds(e,t){const i=e.exec(t);return i===null?i:[parseInt(i[1]),i[2]]}const Me=Symbol.for("fe-hydration");function Ee(e){return e[Me]===Me}const ke="defer-hydration";class Ar extends Error{constructor(t,i,n){super(t),this.factories=i,this.node=n}}function vn(e){return e.nodeType===Node.COMMENT_NODE}function Rr(e){return e.nodeType===Node.TEXT_NODE}function Dr(e,t){const i=document.createRange();return i.setStart(e,0),i.setEnd(t,vn(t)||Rr(t)?t.data.length:t.childNodes.length),i}function th(e){return e instanceof DocumentFragment&&"mode"in e}function eh(e,t,i){const n=Dr(e,t),s=n.commonAncestorContainer,r=rh(i),o=document.createTreeWalker(s,NodeFilter.SHOW_ELEMENT+NodeFilter.SHOW_COMMENT+NodeFilter.SHOW_TEXT,{acceptNode(h){return n.comparePoint(h,0)===0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),a={},l={};let c=o.currentNode=e;for(;c!==null;){switch(c.nodeType){case Node.ELEMENT_NODE:{ih(c,i,a,r);break}case Node.COMMENT_NODE:{nh(c,o,i,a,l,r);break}}c=o.nextNode()}return n.detach(),{targets:a,boundaries:l}}function ih(e,t,i,n){var s,r;const o=(r=(s=K.parseAttributeBinding(e))!==null&&s!==void 0?s:K.parseEnumeratedAttributeBinding(e))!==null&&r!==void 0?r:K.parseCompactAttributeBinding(e);if(o!==null){for(const a of o){const l=t[a+n];if(!l)throw new Ar(`HydrationView was unable to successfully target factory on ${e.nodeName} inside ${e.getRootNode().host.nodeName}. This likely indicates a template mismatch between SSR rendering and hydration.`,t,e);Ie(l,e,i)}e.removeAttribute(K.attributeMarkerName)}}function nh(e,t,i,n,s,r){if(K.isElementBoundaryStartMarker(e)){sh(e,t);return}if(K.isContentBindingStartMarker(e.data)){const o=K.parseContentBindingStartMarker(e.data);if(o===null)return;const[a,l]=o,c=i[a+r],h=[];let u=t.nextSibling();e.data="";const p=u;for(;u!==null;){if(vn(u)){const g=K.parseContentBindingEndMarker(u.data);if(g&&g[1]===l)break}h.push(u),u=t.nextSibling()}if(u===null){const g=e.getRootNode();throw new Error(`Error hydrating Comment node inside "${th(g)?g.host.nodeName:g.nodeName}".`)}if(u.data="",h.length===1&&Rr(h[0]))Ie(c,h[0],n);else{u!==p&&u.previousSibling!==null&&(s[c.targetNodeId]={first:p,last:u.previousSibling});const g=u.parentNode.insertBefore(document.createTextNode(""),u);Ie(c,g,n)}}}function sh(e,t){const i=K.parseElementBoundaryStartMarker(e.data);let n=t.nextSibling();for(;n!==null;){if(vn(n)){const s=K.parseElementBoundaryEndMarker(n.data);if(s&&s===i)break}n=t.nextSibling()}}function rh(e){let t=0;for(let i=0,n=e.length;i<n&&e[i].targetNodeId==="h";++i)t++;return t}function Ie(e,t,i){if(e.targetNodeId===void 0)throw new Error("Factory could not be target to the node");i[e.targetNodeId]=t}var Or;function Zi(e,t){const i=e.parentNode;let n=e,s;for(;n!==t;){if(s=n.nextSibling,!s)throw new Error(`Unmatched first/last child inside "${t.getRootNode().host.nodeName}".`);i.removeChild(n),n=s}i.removeChild(t)}class Nr{constructor(){this.index=0,this.length=0}get event(){return be.getEvent()}get isEven(){return this.index%2===0}get isOdd(){return this.index%2!==0}get isFirst(){return this.index===0}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}eventDetail(){return this.event.detail}eventTarget(){return this.event.target}}class hi extends Nr{constructor(t,i,n){super(),this.fragment=t,this.factories=i,this.targets=n,this.behaviors=null,this.unbindables=[],this.source=null,this.isBound=!1,this.sourceLifetime=ai.unknown,this.context=this,this.firstChild=t.firstChild,this.lastChild=t.lastChild}appendTo(t){t.appendChild(this.fragment)}insertBefore(t){if(this.fragment.hasChildNodes())t.parentNode.insertBefore(this.fragment,t);else{const i=this.lastChild;if(t.previousSibling===i)return;const n=t.parentNode;let s=this.firstChild,r;for(;s!==i;)r=s.nextSibling,n.insertBefore(s,t),s=r;n.insertBefore(i,t)}}remove(){const t=this.fragment,i=this.lastChild;let n=this.firstChild,s;for(;n!==i;)s=n.nextSibling,t.appendChild(n),n=s;t.appendChild(i)}dispose(){Zi(this.firstChild,this.lastChild),this.unbind()}onUnbind(t){this.unbindables.push(t)}bind(t,i=this){if(this.source===t)return;let n=this.behaviors;if(n===null){this.source=t,this.context=i,this.behaviors=n=new Array(this.factories.length);const s=this.factories;for(let r=0,o=s.length;r<o;++r){const a=s[r].createBehavior();a.bind(this),n[r]=a}}else{this.source!==null&&this.evaluateUnbindables(),this.isBound=!1,this.source=t,this.context=i;for(let s=0,r=n.length;s<r;++s)n[s].bind(this)}this.isBound=!0}unbind(){!this.isBound||this.source===null||(this.evaluateUnbindables(),this.source=null,this.context=this,this.isBound=!1)}evaluateUnbindables(){const t=this.unbindables;for(let i=0,n=t.length;i<n;++i)t[i].unbind(this);t.length=0}static disposeContiguousBatch(t){if(t.length!==0){Zi(t[0].firstChild,t[t.length-1].lastChild);for(let i=0,n=t.length;i<n;++i)t[i].unbind()}}}Bt(hi);N.defineProperty(hi.prototype,"index");N.defineProperty(hi.prototype,"length");const Lt={unhydrated:"unhydrated",hydrating:"hydrating",hydrated:"hydrated"};class oh extends Error{constructor(t,i,n,s){super(t),this.factory=i,this.fragment=n,this.templateString=s}}class ah extends Nr{get hydrationStage(){return this._hydrationStage}get targets(){return this._targets}get bindingViewBoundaries(){return this._bindingViewBoundaries}constructor(t,i,n,s){super(),this.firstChild=t,this.lastChild=i,this.sourceTemplate=n,this.hostBindingTarget=s,this[Or]=Me,this.context=this,this.source=null,this.isBound=!1,this.sourceLifetime=ai.unknown,this.unbindables=[],this.fragment=null,this.behaviors=null,this._hydrationStage=Lt.unhydrated,this._bindingViewBoundaries={},this._targets={},this.factories=n.compile().factories}insertBefore(t){if(this.fragment!==null)if(this.fragment.hasChildNodes())t.parentNode.insertBefore(this.fragment,t);else{const i=this.lastChild;if(t.previousSibling===i)return;const n=t.parentNode;let s=this.firstChild,r;for(;s!==i;)r=s.nextSibling,n.insertBefore(s,t),s=r;n.insertBefore(i,t)}}appendTo(t){this.fragment!==null&&t.appendChild(this.fragment)}remove(){const t=this.fragment||(this.fragment=document.createDocumentFragment()),i=this.lastChild;let n=this.firstChild,s;for(;n!==i;){if(s=n.nextSibling,!s)throw new Error(`Unmatched first/last child inside "${i.getRootNode().host.nodeName}".`);t.appendChild(n),n=s}t.appendChild(i)}bind(t,i=this){var n;if(this.hydrationStage!==Lt.hydrated&&(this._hydrationStage=Lt.hydrating),this.source===t)return;let s=this.behaviors;if(s===null){this.source=t,this.context=i;try{const{targets:o,boundaries:a}=eh(this.firstChild,this.lastChild,this.factories);this._targets=o,this._bindingViewBoundaries=a}catch(o){if(o instanceof Ar){let a=this.sourceTemplate.html;typeof a!="string"&&(a=a.innerHTML),o.templateString=a}throw o}this.behaviors=s=new Array(this.factories.length);const r=this.factories;for(let o=0,a=r.length;o<a;++o){const l=r[o];if(l.targetNodeId==="h"&&this.hostBindingTarget&&Ie(l,this.hostBindingTarget,this._targets),l.targetNodeId in this.targets){const c=l.createBehavior();c.bind(this),s[o]=c}else{let c=this.sourceTemplate.html;typeof c!="string"&&(c=c.innerHTML);const h=((n=this.firstChild)===null||n===void 0?void 0:n.getRootNode()).host,u=(h==null?void 0:h.nodeName)||"unknown",p=l,g=[`HydrationView was unable to successfully target bindings inside "<${u.toLowerCase()}>".`,`
Mismatch Details:`,`  - Expected target node ID: "${l.targetNodeId}"`,`  - Available target IDs: [${Object.keys(this.targets).join(", ")||"none"}]`];throw l.targetTagName&&g.push(`  - Expected tag name: "${l.targetTagName}"`),p.sourceAspect&&g.push(`  - Source aspect: "${p.sourceAspect}"`),p.aspectType!==void 0&&g.push(`  - Aspect type: ${p.aspectType}`),g.push(`
This usually means:`,"  1. The server-rendered HTML doesn't match the client template","  2. The hydration markers are missing or corrupted","  3. The DOM structure was modified before hydration",`
Template: ${c.slice(0,200)}${c.length>200?"...":""}`),new oh(g.join(`
`),l,Dr(this.firstChild,this.lastChild).cloneContents(),c)}}}else{this.source!==null&&this.evaluateUnbindables(),this.isBound=!1,this.source=t,this.context=i;for(let r=0,o=s.length;r<o;++r)s[r].bind(this)}this.isBound=!0,this._hydrationStage=Lt.hydrated}unbind(){!this.isBound||this.source===null||(this.evaluateUnbindables(),this.source=null,this.context=this,this.isBound=!1)}dispose(){Zi(this.firstChild,this.lastChild),this.unbind()}onUnbind(t){this.unbindables.push(t)}evaluateUnbindables(){const t=this.unbindables;for(let i=0,n=t.length;i<n;++i)t[i].unbind(this);t.length=0}}Or=Me;Bt(ah);function lh(e){return e.create!==void 0}function ch(e,t,i,n){if(i==null&&(i=""),lh(i)){e.textContent="";let s=e.$fastView;if(s===void 0)if(Ee(n)&&Ee(i)&&n.bindingViewBoundaries[this.targetNodeId]!==void 0&&n.hydrationStage!==Lt.hydrated){const r=n.bindingViewBoundaries[this.targetNodeId];s=i.hydrate(r.first,r.last)}else s=i.create();else e.$fastTemplate!==i&&(s.isComposed&&(s.remove(),s.unbind()),s=i.create());s.isComposed?s.needsBindOnly&&(s.needsBindOnly=!1,s.bind(n.source,n.context)):(s.isComposed=!0,s.bind(n.source,n.context),s.insertBefore(e),e.$fastView=s,e.$fastTemplate=i)}else{const s=e.$fastView;s!==void 0&&s.isComposed&&(s.isComposed=!1,s.remove(),s.needsBindOnly?s.needsBindOnly=!1:s.unbind()),e.textContent=i}}function hh(e,t,i){var n;const s=`${this.id}-t`,r=(n=e[s])!==null&&n!==void 0?n:e[s]={v:0,cv:Object.create(null)},o=r.cv;let a=r.v;const l=e[t];if(i!=null&&i.length){const c=i.split(/\s+/);for(let h=0,u=c.length;h<u;++h){const p=c[h];p!==""&&(o[p]=a,l.add(p))}}if(r.v=a+1,a!==0){a-=1;for(const c in o)o[c]===a&&l.remove(c)}}const uh={[L.attribute]:jt.setAttribute,[L.booleanAttribute]:jt.setBooleanAttribute,[L.property]:(e,t,i)=>e[t]=i,[L.content]:ch,[L.tokenList]:hh,[L.event]:()=>{}};class Et{constructor(t){this.dataBinding=t,this.updateTarget=null,this.aspectType=L.content}createHTML(t){return Tr.interpolation(t(this))}createBehavior(){var t;if(this.updateTarget===null){const i=uh[this.aspectType],n=(t=this.dataBinding.policy)!==null&&t!==void 0?t:this.policy;if(!i)throw B.error(lt.unsupportedBindingBehavior);this.data=`${this.id}-d`,this.updateTarget=n.protect(this.targetTagName,this.aspectType,this.targetAspect,i)}return this}bind(t){var i;const n=t.targets[this.targetNodeId],s=Ee(t)&&t.hydrationStage&&t.hydrationStage!==Lt.hydrated;switch(this.aspectType){case L.event:n[this.data]=t,n.addEventListener(this.targetAspect,this,this.dataBinding.options);break;case L.content:t.onUnbind(this);default:{const r=(i=n[this.data])!==null&&i!==void 0?i:n[this.data]=this.dataBinding.createObserver(this,this);if(r.target=n,r.controller=t,s&&(this.aspectType===L.attribute||this.aspectType===L.booleanAttribute)){r.bind(t);break}this.updateTarget(n,this.targetAspect,r.bind(t),t);break}}}unbind(t){const n=t.targets[this.targetNodeId].$fastView;n!==void 0&&n.isComposed&&(n.unbind(),n.needsBindOnly=!0)}handleEvent(t){const i=t.currentTarget[this.data];if(i.isBound){be.setEvent(t);const n=this.dataBinding.evaluate(i.source,i.context);be.setEvent(null),n!==!0&&t.preventDefault()}}handleChange(t,i){const n=i.controller;if(!n.isBound)return;const s=i.target;this.updateTarget(s,this.targetAspect,i.bind(n),n)}}pt.define(Et,{aspected:!0});const Br=(e,t)=>`${e}.${t}`,fs={},ot={index:0,node:null};function ps(e){e.startsWith("fast-")||B.warn(lt.hostBindingWithoutHost,{name:e})}const dh=new Proxy(document.createElement("div"),{get(e,t){ps(t);const i=Reflect.get(e,t);return Nt(i)?i.bind(e):i},set(e,t,i){return ps(t),Reflect.set(e,t,i)}});class fh{constructor(t,i,n){this.fragment=t,this.directives=i,this.policy=n,this.proto=null,this.nodeIds=new Set,this.descriptors={},this.factories=[]}addFactory(t,i,n,s,r){var o,a;this.nodeIds.has(n)||(this.nodeIds.add(n),this.addTargetDescriptor(i,n,s)),t.id=(o=t.id)!==null&&o!==void 0?o:bn(),t.targetNodeId=n,t.targetTagName=r,t.policy=(a=t.policy)!==null&&a!==void 0?a:this.policy,this.factories.push(t)}freeze(){return this.proto=Object.create(null,this.descriptors),this}addTargetDescriptor(t,i,n){const s=this.descriptors;if(i==="r"||i==="h"||s[i])return;if(!s[t]){const o=t.lastIndexOf("."),a=t.substring(0,o),l=parseInt(t.substring(o+1),10);this.addTargetDescriptor(a,t,l)}let r=fs[i];if(!r){const o=`_${i}`;fs[i]=r={get(){var a;return(a=this[o])!==null&&a!==void 0?a:this[o]=this[t].childNodes[n]}}}s[i]=r}createView(t){const i=this.fragment.cloneNode(!0),n=Object.create(this.proto);n.r=i,n.h=t??dh;for(const s of this.nodeIds)Reflect.get(n,s);return new hi(i,this.factories,n)}}function Vr(e,t,i,n,s,r=!1){const o=i.attributes,a=e.directives;for(let l=0,c=o.length;l<c;++l){const h=o[l],u=h.value,p=ci.parse(u,a);let g=null;p===null?r&&(g=new Et(xr(()=>u,e.policy)),pt.assignAspect(g,h.name)):g=mn.aggregate(p,e.policy),g!==null&&(i.removeAttributeNode(h),l--,c--,e.addFactory(g,t,n,s,i.tagName))}}function ph(e,t,i,n,s){const r=ci.parse(t.textContent,e.directives);if(r===null)return ot.node=t.nextSibling,ot.index=s+1,ot;let o,a=o=t;for(let l=0,c=r.length;l<c;++l){const h=r[l];l!==0&&(s++,n=Br(i,s),o=a.parentNode.insertBefore(document.createTextNode(""),a.nextSibling)),yt(h)?o.textContent=h:(o.textContent=" ",pt.assignAspect(h),e.addFactory(h,i,n,s,null)),a=o}return ot.index=s+1,ot.node=a.nextSibling,ot}function Pr(e,t,i){let n=0,s=t.firstChild;for(;s;){const r=gh(e,i,s,n);s=r.node,n=r.index}}function gh(e,t,i,n){const s=Br(t,n);switch(i.nodeType){case 1:Vr(e,t,i,s,n),Pr(e,i,s);break;case 3:return ph(e,i,t,s,n);case 8:{const r=ci.parse(i.data,e.directives);r!==null&&e.addFactory(mn.aggregate(r),t,s,n,null);break}}return ot.index=n+1,ot.node=i.nextSibling,ot}function bh(e,t){return e&&e.nodeType===8&&ci.parse(e.data,t)!==null}const gs="TEMPLATE",mn={compile(e,t,i=jt.policy){let n;if(yt(e)){n=document.createElement(gs),n.innerHTML=i.createHTML(e);const o=n.content.firstElementChild;o!==null&&o.tagName===gs&&(n=o)}else n=e;!n.content.firstChild&&!n.content.lastChild&&n.content.appendChild(document.createComment(""));const s=document.adoptNode(n.content),r=new fh(s,t,i);return Vr(r,"",n,"h",0,!0),(bh(s.firstChild,t)||s.childNodes.length===1&&Object.keys(t).length>0)&&s.insertBefore(document.createComment(""),s.firstChild),Pr(r,s,"r"),ot.node=null,r.freeze()},setDefaultStrategy(e){this.compile=e},aggregate(e,t=jt.policy){if(e.length===1)return e[0];let i,n=!1,s;const r=e.length,o=e.map(c=>yt(c)?()=>c:(i=c.sourceAspect||i,n=n||c.dataBinding.isVolatile,s=s||c.dataBinding.policy,c.dataBinding.evaluate)),a=(c,h)=>{let u="";for(let p=0;p<r;++p)u+=o[p](c,h);return u},l=new Et(fn(a,s??t,n));return pt.assignAspect(l,i),l}};class Lr extends Fr{bind(t){t.source[this.options]=t.targets[this.targetNodeId]}}pt.define(Lr);const vh=e=>new Lr(e),bs="boolean",vs="reflect",mh=Object.freeze({locate:vr()}),yh={toView(e){return e?"true":"false"},fromView(e){return!(e==null||e==="false"||e===!1||e===0)}};class He{constructor(t,i,n=i.toLowerCase(),s=vs,r){this.guards=new Set,this.Owner=t,this.name=i,this.attribute=n,this.mode=s,this.converter=r,this.fieldName=`_${i}`,this.callbackName=`${i}Changed`,this.hasCallback=this.callbackName in t.prototype,s===bs&&r===void 0&&(this.converter=yh)}setValue(t,i){const n=t[this.fieldName],s=this.converter;s!==void 0&&(i=s.fromView(i)),n!==i&&(t[this.fieldName]=i,this.tryReflectToAttribute(t),this.hasCallback&&t[this.callbackName](n,i),t.$fastController.notify(this.name))}getValue(t){return N.track(t,this.name),t[this.fieldName]}onAttributeChangedCallback(t,i){this.guards.has(t)||(this.guards.add(t),this.setValue(t,i),this.guards.delete(t))}tryReflectToAttribute(t){const i=this.mode,n=this.guards;n.has(t)||i==="fromView"||yr.enqueue(()=>{n.add(t);const s=t[this.fieldName];switch(i){case vs:const r=this.converter;jt.setAttribute(t,this.attribute,r!==void 0?r.toView(s):s);break;case bs:jt.setBooleanAttribute(t,this.attribute,s);break}n.delete(t)})}static collect(t,...i){const n=[];i.push(mh.locate(t));for(let s=0,r=i.length;s<r;++s){const o=i[s];if(o!==void 0)for(let a=0,l=o.length;a<l;++a){const c=o[a];yt(c)?n.push(new He(t,c)):n.push(new He(t,c.property,c.attribute,c.mode,c.converter))}}return n}}var wh=function(e,t,i,n){function s(r){return r instanceof i?r:new i(function(o){o(r)})}return new(i||(i=Promise))(function(r,o){function a(h){try{c(n.next(h))}catch(u){o(u)}}function l(h){try{c(n.throw(h))}catch(u){o(u)}}function c(h){h.done?r(h.value):s(h.value).then(a,l)}c((n=n.apply(e,t||[])).next())})},it;const ms={mode:"open"},ys={},Pi=new Set,ae=B.getById(Ft.elementRegistry,()=>dn()),xh={deferAndHydrate:"defer-and-hydrate"};class W{get isDefined(){return this.platformDefined}constructor(t,i=t.definition){var n;this.platformDefined=!1,yt(i)&&(i={name:i}),this.type=t,this.name=i.name,this.template=i.template,this.templateOptions=i.templateOptions,this.registry=(n=i.registry)!==null&&n!==void 0?n:customElements;const s=t.prototype,r=He.collect(t,i.attributes),o=new Array(r.length),a={},l={};for(let c=0,h=r.length;c<h;++c){const u=r[c];o[c]=u.attribute,a[u.name]=u,l[u.attribute]=u,N.defineProperty(s,u)}Reflect.defineProperty(t,"observedAttributes",{value:o,enumerable:!0}),this.attributes=r,this.propertyLookup=a,this.attributeLookup=l,this.shadowOptions=i.shadowOptions===void 0?ms:i.shadowOptions===null?void 0:Object.assign(Object.assign({},ms),i.shadowOptions),this.elementOptions=i.elementOptions===void 0?ys:Object.assign(Object.assign({},ys),i.elementOptions),this.styles=U.normalize(i.styles),ae.register(this),N.defineProperty(it.isRegistered,this.name),it.isRegistered[this.name]=this.type}define(t=this.registry){var i,n;const s=this.type;return t.get(this.name)||(this.platformDefined=!0,t.define(this.name,s,this.elementOptions),(n=(i=this.lifecycleCallbacks)===null||i===void 0?void 0:i.elementDidDefine)===null||n===void 0||n.call(i,this.name)),this}static compose(t,i){return Pi.has(t)||ae.getByType(t)?new it(class extends t{},i):new it(t,i)}static registerBaseType(t){Pi.add(t)}static composeAsync(t,i){return new Promise(n=>{(Pi.has(t)||ae.getByType(t))&&n(new it(class extends t{},i));const s=new it(t,i);N.getNotifier(s).subscribe({handleChange:()=>{var r,o;(o=(r=s.lifecycleCallbacks)===null||r===void 0?void 0:r.templateDidUpdate)===null||o===void 0||o.call(r,s.name),n(s)}},"template")})}}it=W;W.isRegistered={};W.getByType=ae.getByType;W.getForInstance=ae.getForInstance;W.registerAsync=e=>wh(void 0,void 0,void 0,function*(){return new Promise(t=>{it.isRegistered[e]&&t(it.isRegistered[e]),N.getNotifier(it.isRegistered).subscribe({handleChange:()=>t(it.isRegistered[e])},e)})});N.defineProperty(W.prototype,"template");const Sh=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/,$h=Object.create(null);class ve{constructor(t,i=$h){this.html=t,this.factories=i}createHTML(t){const i=this.factories;for(const n in i)t(i[n]);return this.html}}ve.empty=new ve("");pt.define(ve);function Ch(e,t,i,n=pt.getForInstance(e)){if(n.aspected){const s=Sh.exec(t);s!==null&&pt.assignAspect(e,s[2])}return e.createHTML(i)}class ui{constructor(t,i={},n){this.policy=n,this.result=null,this.html=t,this.factories=i}compile(){return this.result===null&&(this.result=mn.compile(this.html,this.factories,this.policy)),this.result}create(t){return this.compile().createView(t)}inline(){return new ve(yt(this.html)?this.html:this.html.innerHTML,this.factories)}withPolicy(t){if(this.result)throw B.error(lt.cannotSetTemplatePolicyAfterCompilation);if(this.policy)throw B.error(lt.onlySetTemplatePolicyOnce);return this.policy=t,this}render(t,i,n){const s=this.create(n);return s.bind(t),s.appendTo(i),s}static create(t,i,n){let s="";const r=Object.create(null),o=a=>{var l;const c=(l=a.id)!==null&&l!==void 0?l:a.id=bn();return r[c]=a,c};for(let a=0,l=t.length-1;a<l;++a){const c=t[a];let h=i[a],u;if(s+=c,Nt(h))h=new Et(fn(h));else if(h instanceof li)h=new Et(h);else if(!(u=pt.getForInstance(h))){const p=h;h=new Et(xr(()=>p))}s+=Ch(h,c,o,u)}return new ui(s+t[t.length-1],r,n)}}Bt(ui);const Mr=((e,...t)=>{if(Array.isArray(e)&&Array.isArray(e.raw))return ui.create(e,t);throw B.error(lt.directCallToHTMLTagNotAllowed)});Mr.partial=e=>new ve(e);class kh extends MutationObserver{constructor(t){function i(n){this.callback.call(null,n.filter(s=>this.observedNodes.has(s.target)))}super(i),this.callback=t,this.observedNodes=new Set}observe(t,i){this.observedNodes.add(t),super.observe(t,i)}unobserve(t){this.observedNodes.delete(t),this.observedNodes.size<1&&this.disconnect()}}const Th={bubbles:!0,composed:!0,cancelable:!0},Oe="isConnected",Er=new WeakMap;function le(e){var t,i;return(i=(t=e.shadowRoot)!==null&&t!==void 0?t:Er.get(e))!==null&&i!==void 0?i:null}let ws;var V;(function(e){e[e.connecting=0]="connecting",e[e.connected=1]="connected",e[e.disconnecting=2]="disconnecting",e[e.disconnected=3]="disconnected"})(V||(V={}));class st extends mr{get isConnected(){return N.track(this,Oe),this.stage===V.connected}get context(){var t,i;return(i=(t=this.view)===null||t===void 0?void 0:t.context)!==null&&i!==void 0?i:be.default}get isBound(){var t,i;return(i=(t=this.view)===null||t===void 0?void 0:t.isBound)!==null&&i!==void 0?i:!1}get sourceLifetime(){var t;return(t=this.view)===null||t===void 0?void 0:t.sourceLifetime}get template(){var t;if(this._template===null){const i=this.definition;this.source.resolveTemplate?this._template=this.source.resolveTemplate():i.template&&(this._template=(t=i.template)!==null&&t!==void 0?t:null)}return this._template}set template(t){this._template!==t&&(this._template=t,this.needsInitialization||this.renderTemplate(t))}get shadowOptions(){return this._shadowRootOptions}set shadowOptions(t){if(this._shadowRootOptions===void 0&&t!==void 0){this._shadowRootOptions=t;let i=this.source.shadowRoot;i?this.hasExistingShadowRoot=!0:(i=this.source.attachShadow(t),t.mode==="closed"&&Er.set(this.source,i))}}get mainStyles(){var t;if(this._mainStyles===null){const i=this.definition;this.source.resolveStyles?this._mainStyles=this.source.resolveStyles():i.styles&&(this._mainStyles=(t=i.styles)!==null&&t!==void 0?t:null)}return this._mainStyles}set mainStyles(t){this._mainStyles!==t&&(this._mainStyles!==null&&this.removeStyles(this._mainStyles),this._mainStyles=t,this.needsInitialization||this.addStyles(t))}constructor(t,i){super(t),this.boundObservables=null,this.needsInitialization=!0,this.hasExistingShadowRoot=!1,this._template=null,this.stage=V.disconnected,this.guardBehaviorConnection=!1,this.behaviors=null,this.behaviorsConnected=!1,this._mainStyles=null,this.$fastController=this,this.view=null,this.source=t,this.definition=i,this.shadowOptions=i.shadowOptions;const n=N.getAccessors(t);if(n.length>0){const s=this.boundObservables=Object.create(null);for(let r=0,o=n.length;r<o;++r){const a=n[r].name,l=t[a];l!==void 0&&(delete t[a],s[a]=l)}}}onUnbind(t){var i;(i=this.view)===null||i===void 0||i.onUnbind(t)}addBehavior(t){var i,n;const s=(i=this.behaviors)!==null&&i!==void 0?i:this.behaviors=new Map,r=(n=s.get(t))!==null&&n!==void 0?n:0;r===0?(s.set(t,1),t.addedCallback&&t.addedCallback(this),t.connectedCallback&&!this.guardBehaviorConnection&&(this.stage===V.connected||this.stage===V.connecting)&&t.connectedCallback(this)):s.set(t,r+1)}removeBehavior(t,i=!1){const n=this.behaviors;if(n===null)return;const s=n.get(t);s!==void 0&&(s===1||i?(n.delete(t),t.disconnectedCallback&&this.stage!==V.disconnected&&t.disconnectedCallback(this),t.removedCallback&&t.removedCallback(this)):n.set(t,s-1))}addStyles(t){var i;if(!t)return;const n=this.source;if(t instanceof HTMLElement)((i=le(n))!==null&&i!==void 0?i:this.source).append(t);else if(!t.isAttachedTo(n)){const s=t.behaviors;if(t.addStylesTo(n),s!==null)for(let r=0,o=s.length;r<o;++r)this.addBehavior(s[r])}}removeStyles(t){var i;if(!t)return;const n=this.source;if(t instanceof HTMLElement)((i=le(n))!==null&&i!==void 0?i:n).removeChild(t);else if(t.isAttachedTo(n)){const s=t.behaviors;if(t.removeStylesFrom(n),s!==null)for(let r=0,o=s.length;r<o;++r)this.removeBehavior(s[r])}}connect(){this.stage===V.disconnected&&(this.stage=V.connecting,this.bindObservables(),this.connectBehaviors(),this.needsInitialization?(this.renderTemplate(this.template),this.addStyles(this.mainStyles),this.needsInitialization=!1):this.view!==null&&this.view.bind(this.source),this.stage=V.connected,N.notify(this,Oe))}bindObservables(){if(this.boundObservables!==null){const t=this.source,i=this.boundObservables,n=Object.keys(i);for(let s=0,r=n.length;s<r;++s){const o=n[s];t[o]=i[o]}this.boundObservables=null}}connectBehaviors(){if(this.behaviorsConnected===!1){const t=this.behaviors;if(t!==null){this.guardBehaviorConnection=!0;for(const i of t.keys())i.connectedCallback&&i.connectedCallback(this);this.guardBehaviorConnection=!1}this.behaviorsConnected=!0}}disconnectBehaviors(){if(this.behaviorsConnected===!0){const t=this.behaviors;if(t!==null)for(const i of t.keys())i.disconnectedCallback&&i.disconnectedCallback(this);this.behaviorsConnected=!1}}disconnect(){this.stage===V.connected&&(this.stage=V.disconnecting,N.notify(this,Oe),this.view!==null&&this.view.unbind(),this.disconnectBehaviors(),this.stage=V.disconnected)}onAttributeChangedCallback(t,i,n){const s=this.definition.attributeLookup[t];s!==void 0&&s.onAttributeChangedCallback(this.source,n)}emit(t,i,n){return this.stage===V.connected?this.source.dispatchEvent(new CustomEvent(t,Object.assign(Object.assign({detail:i},Th),n))):!1}renderTemplate(t){var i;const n=this.source,s=(i=le(n))!==null&&i!==void 0?i:n;if(this.view!==null)this.view.dispose(),this.view=null;else if(!this.needsInitialization||this.hasExistingShadowRoot){this.hasExistingShadowRoot=!1;for(let r=s.firstChild;r!==null;r=s.firstChild)s.removeChild(r)}t&&(this.view=t.render(n,s,n),this.view.sourceLifetime=ai.coupled)}static forCustomElement(t,i=!1){const n=t.$fastController;if(n!==void 0&&!i)return n;const s=W.getForInstance(t);if(s===void 0)throw B.error(lt.missingElementDefinition);return N.getNotifier(s).subscribe({handleChange:()=>{st.forCustomElement(t,!0),t.$fastController.connect()}},"template"),N.getNotifier(s).subscribe({handleChange:()=>{st.forCustomElement(t,!0),t.$fastController.connect()}},"shadowOptions"),t.$fastController=new ws(t,s)}static setStrategy(t){ws=t}}Bt(st);st.setStrategy(st);function je(e){var t;return"adoptedStyleSheets"in e?e:(t=le(e))!==null&&t!==void 0?t:e.getRootNode()}class di{constructor(t){const i=di.styleSheetCache;this.sheets=t.map(n=>{if(n instanceof CSSStyleSheet)return n;let s=i.get(n);return s===void 0&&(s=new CSSStyleSheet,s.replaceSync(n),i.set(n,s)),s})}addStylesTo(t){Ir(je(t),this.sheets)}removeStylesFrom(t){Hr(je(t),this.sheets)}}di.styleSheetCache=new Map;let Fh=0;const Ah=()=>`fast-${++Fh}`;function xs(e){return e===document?document.body:e}class Rh{constructor(t){this.styles=t,this.styleClass=Ah()}addStylesTo(t){t=xs(je(t));const i=this.styles,n=this.styleClass;for(let s=0;s<i.length;s++){const r=document.createElement("style");r.innerHTML=i[s],r.className=n,t.append(r)}}removeStylesFrom(t){t=xs(je(t));const i=t.querySelectorAll(`.${this.styleClass}`);for(let n=0,s=i.length;n<s;++n)t.removeChild(i[n])}}let Ir=(e,t)=>{e.adoptedStyleSheets=[...e.adoptedStyleSheets,...t]},Hr=(e,t)=>{e.adoptedStyleSheets=e.adoptedStyleSheets.filter(i=>t.indexOf(i)===-1)};if(U.supportsAdoptedStyleSheets){try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),Ir=(e,t)=>{e.adoptedStyleSheets.push(...t)},Hr=(e,t)=>{for(const i of t){const n=e.adoptedStyleSheets.indexOf(i);n!==-1&&e.adoptedStyleSheets.splice(n,1)}}}catch{}U.setDefaultStrategy(di)}else U.setDefaultStrategy(Rh);const Li="needs-hydration";class x extends st{get shadowOptions(){return super.shadowOptions}set shadowOptions(t){super.shadowOptions=t,(this.hasExistingShadowRoot||t!==void 0&&!this.template)&&this.definition.templateOptions===xh.deferAndHydrate&&(this.source.toggleAttribute(ke,!0),this.source.toggleAttribute(Li,!0))}addHydratingInstance(){if(!x.hydratingInstances)return;const t=this.definition.name;let i=x.hydratingInstances.get(t);i||(i=new Set,x.hydratingInstances.set(t,i)),i.add(this.source)}static config(t){return x.lifecycleCallbacks=t,this}static hydrationObserverHandler(t){for(const i of t)i.target.hasAttribute(ke)||(x.hydrationObserver.unobserve(i.target),i.target.$fastController.connect())}static checkHydrationComplete(t){var i,n,s;if(t.didTimeout){x.idleCallbackId=requestIdleCallback(x.checkHydrationComplete,{timeout:50});return}if(((i=x.hydratingInstances)===null||i===void 0?void 0:i.size)===0){try{(s=(n=x.lifecycleCallbacks).hydrationComplete)===null||s===void 0||s.call(n)}catch{}st.setStrategy(st)}}connect(){var t,i,n,s,r,o,a;if(this.needsHydration=(t=this.needsHydration)!==null&&t!==void 0?t:this.source.hasAttribute(Li),this.needsHydration&&this.addHydratingInstance(),this.source.hasAttribute(ke)){this.addHydratingInstance(),x.hydrationObserver.observe(this.source,{attributeFilter:[ke]});return}if(!this.needsHydration){super.connect(),this.removeHydratingInstance();return}if(this.stage===V.disconnected){if(!x.hydrationStarted){x.hydrationStarted=!0;try{(n=(i=x.lifecycleCallbacks).hydrationStarted)===null||n===void 0||n.call(i)}catch{}}try{(r=(s=x.lifecycleCallbacks).elementWillHydrate)===null||r===void 0||r.call(s,this.source)}catch{}if(this.stage=V.connecting,this.bindObservables(),this.connectBehaviors(),this.template)if(Ee(this.template)){const l=this.source,c=(o=le(l))!==null&&o!==void 0?o:l;let h=c.firstChild,u=c.lastChild;l.shadowRoot===null&&(K.isElementBoundaryStartMarker(h)&&(h.data="",h=h.nextSibling),K.isElementBoundaryEndMarker(u)&&(u.data="",u=u.previousSibling)),this.view=this.template.hydrate(h,u,l),(a=this.view)===null||a===void 0||a.bind(this.source)}else this.renderTemplate(this.template);this.addStyles(this.mainStyles),this.stage=V.connected,this.source.removeAttribute(Li),this.needsInitialization=this.needsHydration=!1,this.removeHydratingInstance(),N.notify(this,Oe)}}removeHydratingInstance(){var t,i;if(!x.hydratingInstances)return;try{(i=(t=x.lifecycleCallbacks).elementDidHydrate)===null||i===void 0||i.call(t,this.source)}catch{}const n=this.definition.name,s=x.hydratingInstances.get(n);s&&(s.delete(this.source),s.size||x.hydratingInstances.delete(n),x.idleCallbackId&&cancelIdleCallback(x.idleCallbackId),x.idleCallbackId=requestIdleCallback(x.checkHydrationComplete,{timeout:50}))}disconnect(){super.disconnect(),x.hydrationObserver.unobserve(this.source)}static install(){st.setStrategy(x)}}x.hydrationObserver=new kh(x.hydrationObserverHandler);x.lifecycleCallbacks={};x.hydrationStarted=!1;x.idleCallbackId=null;x.hydratingInstances=new Map;function jr(e){const t=class extends e{constructor(){super(),st.forCustomElement(this)}$emit(i,n,s){return this.$fastController.emit(i,n,s)}connectedCallback(){this.$fastController.connect()}disconnectedCallback(){this.$fastController.disconnect()}attributeChangedCallback(i,n,s){this.$fastController.onAttributeChangedCallback(i,n,s)}};return W.registerBaseType(t),t}function Dh(e,t){return Nt(e)?W.compose(e,t):W.compose(this,e)}function Oh(e,t){return Nt(e)?new Promise(i=>{W.composeAsync(e,t).then(n=>{i(n)})}).then(i=>i.define().type):new Promise(i=>{W.composeAsync(this,e).then(n=>{i(n)})}).then(i=>i.define().type)}function zr(e,t){return Nt(e)?W.compose(e,t).define().type:W.compose(this,e).define().type}function Nh(e){return jr(e)}const Bh=Object.assign(jr(HTMLElement),{from:Nh,define:zr,compose:Dh,defineAsync:Oh});function Vh(e){return function(t){zr(t,e)}}const Ph=Mr`
	<fluent-card>
		<div class="card-title">Angle</div>
		<div class="angle-display">
			${e=>e.angle}<span>&deg;</span>
		</div>
		<fluent-slider
			min="0" max="180" step="1"
			:value="${e=>e.angle}"
			@input="${(e,t)=>{e.angle=parseInt(t.event.target.value,10)}}"
			@change="${(e,t)=>{e.angle=parseInt(t.event.target.value,10),e.commitAngle()}}">
		</fluent-slider>
	</fluent-card>

	<fluent-card>
		<div class="card-title">
			Accelerometer
			<fluent-badge appearance="neutral">
				${e=>e.accelOn?"ON":"OFF"}
			</fluent-badge>
		</div>
		<div class="accel-area ${e=>e.accelOn?"on":""}"
			 @click="${e=>e.toggleAccel()}">
			<div class="accel-icon">&#65039;</div>
			<div class="accel-error ${e=>e.accelError?"visible":""}">${e=>e.accelError}</div>
			<div class="accel-hint">${e=>e.accelOn?"Tap to disable":"Tap to enable tilt control"}</div>
		</div>
	</fluent-card>

	<fluent-card>
		<div class="card-title">Indicator</div>
		<canvas ${vh("cv")} width="300" height="80"
			style="width:100%;border-radius:8px;background:#0a0a1a">
		</canvas>
	</fluent-card>

	<div class="status-bar">
		<span class="${e=>e.connected?"connected":"disconnected"}">
			${e=>e.connected?"Connected":"Disconnected"}
		</span>
		<span>${e=>e.lastSentLabel}</span>
	</div>
`,Lh=Cr`
	:host {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		width: 100%;
		max-width: 420px;
		font-family: system-ui, -apple-system, sans-serif;
		color: #eee;
	}

	fluent-card {
		width: 100%;
		padding: 16px 20px;
		background: #1a1a2e;
		border-radius: 16px;
	}

	.card-title {
		font-size: 0.85rem;
		color: #888;
		margin-bottom: 12px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.angle-display {
		font-size: 2.8rem;
		font-weight: 300;
		text-align: center;
		color: #0af;
		margin: 4px 0;
		font-variant-numeric: tabular-nums;
	}

	.angle-display span {
		font-size: 1.1rem;
		color: #666;
	}

	fluent-slider::part(thumb) {
		background: #0af;
		border: 3px solid #1a1a2e;
		box-shadow: 0 0 12px rgba(0, 170, 255, 0.4);
	}

	fluent-slider::part(track) {
		background: #333;
	}

	fluent-slider::part(fill) {
		background: #0af;
	}

	.accel-area {
		background: #16213e;
		border-radius: 12px;
		padding: 20px;
		text-align: center;
		cursor: pointer;
		user-select: none;
		min-height: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		transition: background 0.3s, border-color 0.3s;
		border: 2px solid transparent;
	}

	.accel-area.on {
		background: #0a2a4a;
		border-color: #0af;
	}

	.accel-icon {
		font-size: 2.5rem;
		margin-bottom: 8px;
		opacity: 0.6;
	}

	.accel-error {
		font-size: 0.75rem;
		color: #f44;
		display: none;
		background: #2a1111;
		border-radius: 8px;
		padding: 6px 10px;
		margin-top: 6px;
		border: 1px solid #f44;
	}

	.accel-error.visible {
		display: block;
	}

	.accel-hint {
		font-size: 0.85rem;
		color: #888;
		margin-top: 4px;
	}

	fluent-badge {
		margin-left: 8px;
	}

	canvas {
		max-height: 80px;
	}

	.status-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-top: 8px;
		padding-top: 12px;
		border-top: 1px solid #222;
		font-size: 0.8rem;
		color: #666;
	}

	.status-bar .connected {
		color: #0a0;
	}

	.status-bar .disconnected {
		color: #f44;
	}
`;class Mh{constructor(t,i,n){this.onAngle=t,this.onError=i,this.onToggle=n,this.handler=null,this.fired=!1,this.timer=null}enable(){if(this.onError(""),typeof DeviceOrientationEvent>"u"){this.onError("DeviceOrientation not supported");return}typeof DeviceOrientationEvent.requestPermission=="function"?DeviceOrientationEvent.requestPermission().then(t=>{t==="granted"?this.start():this.onError("Permission denied")}).catch(t=>this.onError("Perm error: "+t.message)):this.start()}disable(){this.onToggle(!1),this.timer!==null&&clearTimeout(this.timer),this.handler&&window.removeEventListener("deviceorientation",this.handler),this.handler=null}start(){this.onToggle(!0),this.fired=!1,this.timer=setTimeout(()=>{this.fired||this.onError("Sensor not responding. Try HTTPS or Firefox.")},3e3),this.handler=t=>{if(this.fired||(this.fired=!0,this.timer!==null&&clearTimeout(this.timer)),t.gamma===null||t.beta===null){this.onError("Sensor data null. Try another browser."),this.disable();return}const i=Math.round(90+(t.gamma??0));this.onAngle(Math.max(0,Math.min(180,i)))},window.addEventListener("deviceorientation",this.handler)}}var Eh=Object.defineProperty,Ih=Object.getOwnPropertyDescriptor,Qt=(e,t,i,n)=>{for(var s=n>1?void 0:n?Ih(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&Eh(t,i,s),s};let Dt=class extends Bh{constructor(){super(...arguments),this.angle=90,this.accelOn=!1,this.accelError="",this.connected=!1,this.lastSentLabel="",this.lastSent=-1}connectedCallback(){super.connectedCallback(),this.accel=new Mh(e=>{this.angle=e},e=>{this.accelError=e},e=>{this.accelOn=e}),this.setupCanvas(),this.drawCanvas(),setInterval(()=>this.sendAngle(),50)}setupCanvas(){if(!this.cv)return;const e=devicePixelRatio||1,t=this.cv.getBoundingClientRect(),i=Math.round(t.width)||this.cv.width,n=Math.round(t.height)||this.cv.height;this.cv.width=i*e,this.cv.height=n*e}toggleAccel(){this.accelOn?this.accel.disable():this.accel.enable()}angleChanged(){this.drawCanvas()}drawCanvas(){if(!this.cv)return;const e=this.ensureCtx();if(!e)return;const t=devicePixelRatio||1,i=this.cv.width,n=this.cv.height,s=i/t,r=n/t;e.clearRect(0,0,i,n),e.save(),e.scale(t,t);const o=s/2,a=r/2,l=16,c=-this.angle*Math.PI/180,h=o+Math.cos(c)*l,u=a+Math.sin(c)*l;e.strokeStyle="#333",e.lineWidth=2,e.beginPath(),e.arc(o,a,l,0,Math.PI*2),e.stroke(),e.strokeStyle="#555",e.lineWidth=1;for(let p=0;p<=180;p+=30){const g=-p*Math.PI/180;e.beginPath(),e.moveTo(o+Math.cos(g)*(l-4),a+Math.sin(g)*(l-4)),e.lineTo(o+Math.cos(g)*l,a+Math.sin(g)*l),e.stroke()}e.strokeStyle="#0af",e.lineWidth=3,e.beginPath(),e.moveTo(o,a),e.lineTo(h,u),e.stroke(),e.fillStyle="#0af",e.beginPath(),e.arc(h,u,4,0,Math.PI*2),e.fill(),e.fillStyle="#0af",e.font="12px system-ui",e.textAlign="center",e.fillText(`${this.angle}°`,o,r-8),e.fillStyle="#444",e.font="9px system-ui",e.textAlign="center",e.fillText("180°",o-l-14,a+4),e.fillText("0°",o+l+14,a+4),e.restore()}ensureCtx(){var t;if(this.ctx)return this.ctx;const e=this.cv||((t=this.shadowRoot)==null?void 0:t.querySelector("canvas"));return e?(this.cv=e,this.ctx=this.cv.getContext("2d"),this.ctx):null}sendAngle(){this.angle!==this.lastSent&&this.doSend()}doSend(){this.lastSent=this.angle,fetch("/api/angle",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:`angle=${this.angle}`}).then(e=>{e.ok&&(this.connected=!0,this.lastSentLabel=`Sent: ${this.angle}°`)}).catch(()=>{this.connected=!1,this.lastSentLabel="",this.lastSent=-1})}commitAngle(){this.doSend()}};Qt([ye],Dt.prototype,"angle",2);Qt([ye],Dt.prototype,"accelOn",2);Qt([ye],Dt.prototype,"accelError",2);Qt([ye],Dt.prototype,"connected",2);Qt([ye],Dt.prototype,"lastSentLabel",2);Dt=Qt([Vh({name:"servo-panel",template:Ph,styles:Lh,shadowOptions:{mode:"open"}})],Dt);qc();
