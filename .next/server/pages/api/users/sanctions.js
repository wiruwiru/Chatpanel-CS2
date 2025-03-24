"use strict";(()=>{var e={};e.id=650,e.ids=[650],e.modules={3480:(e,t,r)=>{e.exports=r(5600)},5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6435:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},8667:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return r}});var r=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},8954:(e,t,r)=>{r.d(t,{A:()=>a});let n=require("mysql2/promise"),a=r.n(n)().createPool({host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME,waitForConnections:!0,connectionLimit:10,queueLimit:0})},9218:(e,t,r)=>{r.r(t),r.d(t,{config:()=>l,default:()=>u,routeModule:()=>c});var n={};r.r(n),r.d(n,{default:()=>d});var a=r(3480),s=r(8667),i=r(6435),o=r(8954);async function d(e,t){let r;if("GET"!==e.method)return t.status(405).json({error:"Method not allowed"});let{steamids:n}=e.query;if(!n)return t.status(400).json({error:"No steamids provided"});let a=n.split(",");try{r=await o.A.getConnection();let e=`
      SELECT 
        id, 
        player_name, 
        player_steamid, 
        admin_name, 
        reason, 
        duration, 
        created, 
        ends, 
        status
      FROM sa_bans
      WHERE player_steamid IN (${a.map(()=>"?").join(",")})
      ORDER BY created DESC
    `,n=`
      SELECT 
        id, 
        player_name, 
        player_steamid, 
        admin_name, 
        reason, 
        duration, 
        created, 
        ends, 
        type, 
        status
      FROM sa_mutes
      WHERE player_steamid IN (${a.map(()=>"?").join(",")})
      ORDER BY created DESC
    `,[s]=await r.execute(e,a),[i]=await r.execute(n,a),d={},u={};return s.forEach(e=>{d[e.player_steamid]||(d[e.player_steamid]=[]),d[e.player_steamid].push({...e,created:e.created?new Date(e.created).toISOString():null,ends:e.ends?new Date(e.ends).toISOString():null})}),i.forEach(e=>{u[e.player_steamid]||(u[e.player_steamid]=[]),u[e.player_steamid].push({...e,created:e.created?new Date(e.created).toISOString():null,ends:e.ends?new Date(e.ends).toISOString():null})}),t.status(200).json({bans:d,mutes:u})}catch(e){return console.error("Error fetching user sanctions:",e),t.status(500).json({error:"An error occurred while fetching user sanctions",details:e.message})}finally{r&&r.release()}}let u=(0,i.M)(n,"default"),l=(0,i.M)(n,"config"),c=new a.PagesAPIRouteModule({definition:{kind:s.A.PAGES_API,page:"/api/users/sanctions",pathname:"/api/users/sanctions",bundlePath:"",filename:""},userland:n})}};var t=require("../../../webpack-api-runtime.js");t.C(e);var r=t(t.s=9218);module.exports=r})();