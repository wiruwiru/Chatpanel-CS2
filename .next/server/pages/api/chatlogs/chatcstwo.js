"use strict";(()=>{var e={};e.id=783,e.ids=[783],e.modules={3480:(e,t,a)=>{e.exports=a(5600)},5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6435:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,a){return a in t?t[a]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,a)):"function"==typeof t&&"default"===a?t:void 0}}})},6693:(e,t,a)=>{a.r(t),a.d(t,{config:()=>i,default:()=>u,routeModule:()=>d});var r={};a.r(r),a.d(r,{default:()=>l});var s=a(3480),n=a(8667),c=a(6435),o=a(8954);async function l(e,t){if("GET"!==e.method)return t.status(405).json({error:"Method not allowed"});let a=parseInt(e.query.page)||1,r=e.query.steamId||"",s=e.query.serverId||"",n=e.query.team||"",c=e.query.message||"",l=e.query.fromDate||"",u=e.query.toDate||"",i=e.query.steamIdNameIpFilter||"";try{let e=await o.A.getConnection();try{let o="1 = 1",d=[];r&&(o+=" AND cl.playerSteam64 = ?",d.push(r)),s&&(o+=" AND cl.serverId LIKE ?",d.push(`%${s}%`)),i&&(o+=` AND (cl.playerSteam64 LIKE ? OR cl.playerName LIKE ? OR 
          (SELECT st.playerIP 
           FROM sa_statistics st 
           WHERE st.playerId = cl.playerSteam64 
           ORDER BY st.connectDate DESC 
           LIMIT 1) LIKE ?)`,d.push(`%${i}%`,`%${i}%`,`%${i}%`)),n&&(o+=" AND cl.team LIKE ?",d.push(`%${n}%`)),c&&(o+=" AND cl.message LIKE ?",d.push(`%${c}%`)),l&&(o+=" AND cl.created >= ?",d.push(l)),u&&(o+=" AND cl.created <= ?",d.push(u));let[p]=await e.execute(`SELECT COUNT(*) as total 
         FROM sa_chatlogs cl 
         WHERE ${o}`,d),E=p[0].total,m=Math.ceil(E/20),[A]=await e.execute(`SELECT 
          cl.id,
          cl.serverId,
          cl.playerSteam64,
          cl.playerName,
          cl.message,
          cl.team,
          DATE_FORMAT(cl.created, "%Y-%m-%d %H:%i:%s") as created,
          (SELECT st.playerIP 
           FROM sa_statistics st 
           WHERE st.playerId = cl.playerSteam64 
           ORDER BY st.connectDate DESC 
           LIMIT 1) as lastIP
         FROM sa_chatlogs cl
         WHERE ${o}
         ORDER BY cl.created DESC 
         LIMIT ? OFFSET ?`,[...d,20,(a-1)*20]);return e.release(),t.status(200).json({items:A,totalItems:E,totalPages:m,currentPage:a})}catch(a){return e.release(),console.error("Database query error:",a),t.status(500).json({error:"Failed to fetch messages"})}}catch(e){return console.error("Database connection error:",e),t.status(500).json({error:"Database connection failed"})}}let u=(0,c.M)(r,"default"),i=(0,c.M)(r,"config"),d=new s.PagesAPIRouteModule({definition:{kind:n.A.PAGES_API,page:"/api/chatlogs/chatcstwo",pathname:"/api/chatlogs/chatcstwo",bundlePath:"",filename:""},userland:r})},8667:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return a}});var a=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},8954:(e,t,a)=>{a.d(t,{A:()=>s});let r=require("mysql2/promise"),s=a.n(r)().createPool({host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME,waitForConnections:!0,connectionLimit:10,queueLimit:0})}};var t=require("../../../webpack-api-runtime.js");t.C(e);var a=t(t.s=6693);module.exports=a})();