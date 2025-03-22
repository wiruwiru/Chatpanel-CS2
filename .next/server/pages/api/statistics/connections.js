"use strict";(()=>{var e={};e.id=836,e.ids=[836],e.modules={94:(e,t,n)=>{n.r(t),n.d(t,{config:()=>A,default:()=>u,routeModule:()=>d});var o={};n.r(o),n.d(o,{default:()=>c});var r=n(3480),a=n(8667),s=n(6435),i=n(8954);async function c(e,t){let n;if("GET"!==e.method)return t.status(405).json({message:"Method not allowed"});let{serverId:o,days:r,viewType:a}=e.query,s=parseInt(r)||7;n="hourly"===a?`
      WITH hourly_connections AS (
        SELECT 
          DATE_FORMAT(connectDate, '%Y-%m-%d %H:00:00') as hour,
          COUNT(*) as count
        FROM sa_statistics
        WHERE 
          ${"all"===o?"1=1":"serverId = ?"}
          AND connectDate >= DATE_SUB(NOW(), INTERVAL ? DAY)
        GROUP BY DATE_FORMAT(connectDate, '%Y-%m-%d %H:00:00')
        ORDER BY hour
      )
      SELECT 
        hour as timestamp,
        count
      FROM hourly_connections
    `:`
      WITH daily_connections AS (
        SELECT 
          DATE(connectDate) as date,
          COUNT(*) as count
        FROM sa_statistics
        WHERE 
          ${"all"===o?"1=1":"serverId = ?"}
          AND connectDate >= DATE_SUB(NOW(), INTERVAL ? DAY)
        GROUP BY DATE(connectDate)
        ORDER BY date
      )
      SELECT 
        DATE_FORMAT(date, '%Y-%m-%d') as timestamp,
        count
      FROM daily_connections
    `;try{let e=await i.A.getConnection(),[r]=await e.execute(n,"all"===o?[s]:[o,s]);return e.release(),t.status(200).json(r)}catch(e){return console.error("Database Error:",e),t.status(500).json({error:"Error fetching connection data"})}}let u=(0,s.M)(o,"default"),A=(0,s.M)(o,"config"),d=new r.PagesAPIRouteModule({definition:{kind:a.A.PAGES_API,page:"/api/statistics/connections",pathname:"/api/statistics/connections",bundlePath:"",filename:""},userland:o})},3480:(e,t,n)=>{e.exports=n(5600)},5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6435:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},8667:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return n}});var n=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},8954:(e,t,n)=>{n.d(t,{A:()=>r});let o=require("mysql2/promise"),r=n.n(o)().createPool({host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME,waitForConnections:!0,connectionLimit:10,queueLimit:0})}};var t=require("../../../webpack-api-runtime.js");t.C(e);var n=t(t.s=94);module.exports=n})();