"use strict";(self.webpackChunkdvbetter=self.webpackChunkdvbetter||[]).push([[1296],{1296:(v,c,h)=>{h.r(c),h.d(c,{KEYBOARD_DID_CLOSE:()=>y,KEYBOARD_DID_OPEN:()=>b,copyVisualViewport:()=>i,keyboardDidClose:()=>n,keyboardDidOpen:()=>D,keyboardDidResize:()=>f,resetKeyboardAssist:()=>u,setKeyboardClose:()=>a,setKeyboardOpen:()=>d,startKeyboardAssist:()=>g,trackViewportChanges:()=>p});const b="ionKeyboardDidShow",y="ionKeyboardDidHide";let r={},t={},o=!1;const u=()=>{r={},t={},o=!1},g=e=>{E(e),e.visualViewport&&(t=i(e.visualViewport),e.visualViewport.onresize=()=>{p(e),D()||f(e)?d(e):n(e)&&a(e)})},E=e=>{e.addEventListener("keyboardDidShow",s=>d(e,s)),e.addEventListener("keyboardDidHide",()=>a(e))},d=(e,s)=>{K(e,s),o=!0},a=e=>{O(e),o=!1},D=()=>!o&&r.width===t.width&&(r.height-t.height)*t.scale>150,f=e=>o&&!n(e),n=e=>o&&t.height===e.innerHeight,K=(e,s)=>{const C=new CustomEvent(b,{detail:{keyboardHeight:s?s.keyboardHeight:e.innerHeight-t.height}});e.dispatchEvent(C)},O=e=>{const s=new CustomEvent(y);e.dispatchEvent(s)},p=e=>{r=Object.assign({},t),t=i(e.visualViewport)},i=e=>({width:Math.round(e.width),height:Math.round(e.height),offsetTop:e.offsetTop,offsetLeft:e.offsetLeft,pageTop:e.pageTop,pageLeft:e.pageLeft,scale:e.scale})}}]);