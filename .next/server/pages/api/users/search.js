"use strict";(()=>{var e={};e.id=384,e.ids=[384],e.modules={3480:(e,s,a)=>{e.exports=a(5600)},5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6435:(e,s)=>{Object.defineProperty(s,"M",{enumerable:!0,get:function(){return function e(s,a){return a in s?s[a]:"then"in s&&"function"==typeof s.then?s.then(s=>e(s,a)):"function"==typeof s&&"default"===a?s:void 0}}})},8667:(e,s)=>{Object.defineProperty(s,"A",{enumerable:!0,get:function(){return a}});var a=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},8954:(e,s,a)=>{a.d(s,{A:()=>r});let t=require("mysql2/promise"),r=a.n(t)().createPool({host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME,waitForConnections:!0,connectionLimit:10,queueLimit:0})},9067:(e,s,a)=>{a.r(s),a.d(s,{config:()=>u,default:()=>c,routeModule:()=>p});var t={};a.r(t),a.d(t,{default:()=>l});var r=a(3480),n=a(8667),i=a(6435),o=a(8954);async function l(e,s){let a;if("GET"!==e.method)return s.status(405).json({error:"Method not allowed"});let{query:t}=e,r=Number.parseInt(t.page)||1,n=t.searchTerm||"";try{a=await o.A.getConnection();let e=`%${n}%`,t=`
      SELECT COUNT(*) as total FROM (
        SELECT playerId FROM sa_statistics
        WHERE playerId LIKE ? OR playerName LIKE ? OR playerIP LIKE ?
      ) as combined_users
    `,[i]=await a.execute(t,[,,,].fill(e)),l=i[0].total,c=Math.ceil(l/10),u=`
    SELECT 
      sa_s.playerId AS steamid64,
      sa_s.playerName COLLATE utf8mb4_unicode_ci AS name,
      sa_s.playerIP AS cs2_ip,
      UNIX_TIMESTAMP(MAX(sa_s.connectDate)) AS cs2_last_seen
    FROM sa_statistics sa_s
    WHERE sa_s.playerId LIKE ? OR sa_s.playerName LIKE ? OR sa_s.playerIP LIKE ? 
    GROUP BY sa_s.playerId, sa_s.playerName, sa_s.playerIP
    ORDER BY cs2_last_seen DESC LIMIT ? OFFSET ?
    `,[p]=await a.execute(u,[...[,,,].fill(e),10,(r-1)*10]);s.status(200).json({items:p.map(e=>({...e,cs2_last_seen:e.cs2_last_seen?new Date(1e3*e.cs2_last_seen).toISOString():null})),totalItems:l,totalPages:c,currentPage:r})}catch(e){console.error("Error in user search API:",e),s.status(500).json({error:"An error occurred while searching for users",details:e.message,sqlMessage:e.sqlMessage,sqlState:e.sqlState})}finally{a&&a.release()}}let c=(0,i.M)(t,"default"),u=(0,i.M)(t,"config"),p=new r.PagesAPIRouteModule({definition:{kind:n.A.PAGES_API,page:"/api/users/search",pathname:"/api/users/search",bundlePath:"",filename:""},userland:t})}};var s=require("../../../webpack-api-runtime.js");s.C(e);var a=s(s.s=9067);module.exports=a})();