import{c as L,aC as g,bf as M,j as t,bg as v,a as N}from"./ra-BdzMzRm7.js";import{l as _,a as k,b as F}from"./utils-BQYvhQQZ.js";import{F as I}from"./matches-CU2r43ac.js";import{J as d,a as l}from"./react-admin-utils-DxX8TBuX.js";import{a2 as O,a3 as S,a4 as u,a5 as q,a6 as J,a7 as f,a8 as A,a9 as z,aa as E,ab as D,ac as B,ad as C,ae as H,af as $,ag as w,ah as G,ai as U,aj as V,ak as K,al as X,am as Q,an as W,ao as Y,p as Z}from"./react-admin-YFQLaSRa.js";import{i as ee,h as te}from"./mui-DXdGyifB.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const h of n.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&a(h)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();var y={},b=L;y.createRoot=b.createRoot,y.hydrateRoot=b.hydrateRoot;const c=(r,e={})=>{const s="/api";return e.headers=e.headers||new Headers({Accept:"application/json"}),e.headers.set("X-GripMock-RequestInternal","92b4d5a9-c74b-4ac0-989c-717f80acba22"),M(`${s}${r}`,e)},re=(r,e)=>{const s=new I(r,{keys:Object.keys(e),includeScore:!0});for(const a of Object.values(e))console.log("$fuse",a,s.search(a));return r},se=(r,e)=>{const{fuse:s}=e;return delete e.fuse,Object.keys(e).length>0&&(r=k(r,F(e))),s!==void 0&&(r=re(r,s)),r},m=(r,e,s)=>{if(e===void 0&&s===void 0)return r;const{field:a,order:o}=s;return _(se(r,e),[a],[o.toLowerCase()])},oe={getList:async(r,e)=>{const{page:s,perPage:a}=e.pagination,{field:o,order:n}=e.sort,h={sort:JSON.stringify([o,n]),range:JSON.stringify([(s-1)*a,s*a-1]),filter:JSON.stringify(e.filter)},R=`/${r}?${g.stringify(h)}`,{json:p}=await c(R);return console.log("$list",p,e),{data:m(p,e.filter,e.sort),total:p.length}},getOne:async(r,e)=>{const{json:s}=await c(`/${r}/${e.id}`);return{data:s}},getMany:async(r,e)=>{const s={filter:JSON.stringify({ids:e.ids})},a=`/${r}?${g.stringify(s)}`,{json:o}=await c(a);return{data:m(o,e.filter,e.sort)}},getManyReference:async(r,e)=>{const s=`/${r}/${e.id}/${e.target}`,{json:a}=await c(s);return{data:m(a,e.filter,e.sort),total:a.length}},create:async(r,e)=>(await c(`/${r}`,{method:"POST",body:JSON.stringify(e.data)}),{data:e.data}),update:async(r,e)=>(await c(`/${r}`,{method:"POST",body:JSON.stringify(e.data)}),{id:e.data.id,data:e.data}),updateMany:async(r,e)=>(await c(`/${r}`,{method:"POST",body:JSON.stringify(e.data)}),{data:[]}),delete:async(r,e)=>{const s=`/${r}/batchDelete`;return await c(s,{method:"POST",body:JSON.stringify([e.id])}),{data:[]}},deleteMany:async(r,e)=>{const s=`/${r}/batchDelete`;return await c(s,{method:"POST",body:JSON.stringify(e.ids)}),{data:[]}}},ae=(r,e)=>{const s=document.createElement("a");s.setAttribute("href",encodeURI(`data:application/json;charset=utf-8,${r}`)),s.setAttribute("download",e),s.click()},ne=r=>{ae(JSON.stringify(r,null,"  "),"export.json")},ie=()=>t.jsx(O,{exporter:ne,children:t.jsxs(S,{rowClick:"show",children:[t.jsx(u,{source:"id",sortable:!0}),t.jsx(u,{source:"service",sortable:!0}),t.jsx(u,{source:"method",sortable:!0}),t.jsx(d,{source:"headers",sortable:!1,reactJsonOptions:{theme:i()}}),t.jsx(d,{source:"input",sortable:!1,reactJsonOptions:{theme:i()}}),t.jsx(d,{source:"output",sortable:!1,reactJsonOptions:{theme:i()}})]})}),ce=()=>t.jsx(q,{children:t.jsxs(J,{children:[t.jsx(f,{source:"service"}),t.jsx(f,{source:"method"}),t.jsx(l,{source:"headers",reactJsonOptions:{theme:i()}}),t.jsx(l,{source:"input",reactJsonOptions:{theme:i()}}),t.jsx(l,{source:"output",reactJsonOptions:{theme:i()}})]})}),ue=()=>t.jsx(A,{children:t.jsxs(J,{children:[t.jsx(f,{source:"id"}),t.jsx(f,{source:"service"}),t.jsx(f,{source:"method"}),t.jsx(l,{source:"headers",reactJsonOptions:{theme:i()}}),t.jsx(l,{source:"input",reactJsonOptions:{theme:i()}}),t.jsx(l,{source:"output",reactJsonOptions:{theme:i()}})]})}),de=()=>t.jsx(z,{children:t.jsxs(E,{children:[t.jsx(u,{source:"id",sortable:!0}),t.jsx(u,{source:"service",sortable:!0}),t.jsx(u,{source:"method",sortable:!0}),t.jsx(d,{source:"headers",sortable:!1,reactJsonOptions:{theme:i()}}),t.jsx(d,{source:"input",sortable:!1,reactJsonOptions:{theme:i()}}),t.jsx(d,{source:"output",sortable:!1,reactJsonOptions:{theme:i()}})]})}),i=()=>{const[r]=D();return r==="dark"?"monokai":"rjv-default"},le=()=>t.jsx(O,{children:t.jsxs(S,{bulkActionButtons:!1,children:[t.jsx(u,{source:"id"}),t.jsx(u,{source:"package"}),t.jsx(u,{source:"name"}),t.jsx(B,{source:"methods",sortable:!1,children:t.jsx(C,{linkType:!1,children:t.jsx(H,{source:"name"})})})]})});var x={},he=w;Object.defineProperty(x,"__esModule",{value:!0});var T=x.default=void 0,fe=he($()),pe=t;T=x.default=(0,fe.default)((0,pe.jsx)("path",{d:"M2 20h20v-4H2zm2-3h2v2H4zM2 4v4h20V4zm4 3H4V5h2zm-4 7h20v-4H2zm2-3h2v2H4z"}),"Storage");var j={},me=w;Object.defineProperty(j,"__esModule",{value:!0});var P=j.default=void 0,ye=me($()),xe=t;P=j.default=(0,ye.default)((0,xe.jsx)("path",{d:"M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5zm-1 6h2v2h-2zm0 4h2v6h-2z"}),"PrivacyTip");const je={...G,palette:{primary:ee,secondary:te,error:U,contrastThreshold:3,tonalOffset:.2}},ge=()=>t.jsxs(Q,{toolbar:t.jsx(W,{}),children:[t.jsx(Y,{}),t.jsx(Z,{flex:"-1",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden",variant:"h6",color:"inherit",id:"react-admin-logo",children:"GripMock UI"})]}),ve=r=>t.jsx(X,{...r,appBar:ge}),be=()=>t.jsxs(V,{disableTelemetry:!0,dataProvider:oe,layout:ve,theme:je,darkTheme:K,children:[t.jsx(v,{icon:P,name:"services",list:le}),t.jsx(v,{icon:T,name:"stubs",list:ie,edit:ue,show:de,create:ce})]});y.createRoot(document.getElementById("root")).render(t.jsx(N.StrictMode,{children:t.jsx(be,{})}));