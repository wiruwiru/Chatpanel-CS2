"use strict";(()=>{var e={};e.id=982,e.ids=[982],e.modules={3480:(e,t,n)=>{e.exports=n(5600)},5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6435:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},8181:(e,t,n)=>{n.r(t),n.d(t,{config:()=>d,default:()=>u,routeModule:()=>A});var a={};n.r(a),n.d(a,{default:()=>c});var o=n(3480),r=n(8667),s=n(6435),i=n(8954);async function c(e,t){let n;if("GET"!==e.method)return t.status(405).json({message:"Method not allowed"});let{serverId:a,days:o,viewType:r}=e.query,s=parseInt(o)||7;n="hourly"===r?`
      WITH hourly_admin_connections AS (
        SELECT 
          DATE_FORMAT(connectDate, '%Y-%m-%d %H:00:00') as hour,
          COUNT(DISTINCT playerId) as count
        FROM sa_statistics
        WHERE 
          ${"all"===a?"1=1":"serverId = ?"}
          AND connectDate >= DATE_SUB(NOW(), INTERVAL ? DAY)
          AND flags IS NOT NULL
          AND flags != ''
        GROUP BY DATE_FORMAT(connectDate, '%Y-%m-%d %H:00:00')
        ORDER BY hour
      )
      SELECT 
        hour as timestamp,
        count
      FROM hourly_admin_connections
    `:`
      WITH daily_admin_connections AS (
        SELECT 
          DATE(connectDate) as date,
          COUNT(DISTINCT playerId) as count
        FROM sa_statistics
        WHERE 
          ${"all"===a?"1=1":"serverId = ?"}
          AND connectDate >= DATE_SUB(NOW(), INTERVAL ? DAY)
          AND flags IS NOT NULL
          AND flags != ''
        GROUP BY DATE(connectDate)
        ORDER BY date
      )
      SELECT 
        DATE_FORMAT(date, '%Y-%m-%d') as timestamp,
        count
      FROM daily_admin_connections
    `;try{let e=await i.A.getConnection(),[o]=await e.execute(n,"all"===a?[s]:[a,s]);return e.release(),t.status(200).json(o)}catch(e){return console.error("Database Error:",e),t.status(500).json({error:"Error fetching admin connection data"})}}let u=(0,s.M)(a,"default"),d=(0,s.M)(a,"config"),A=new o.PagesAPIRouteModule({definition:{kind:r.A.PAGES_API,page:"/api/statistics/admin-connections",pathname:"/api/statistics/admin-connections",bundlePath:"",filename:""},userland:a})},8667:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return n}});var n=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},8954:(e,t,n)=>{n.d(t,{A:()=>o});let a=require("mysql2/promise"),o=n.n(a)().createPool({host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME,waitForConnections:!0,connectionLimit:10,queueLimit:0})}};var t=require("../../../webpack-api-runtime.js");t.C(e);var n=t(t.s=8181);module.exports=n})();