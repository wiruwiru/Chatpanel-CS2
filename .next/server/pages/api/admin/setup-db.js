"use strict";(()=>{var e={};e.id=633,e.ids=[633],e.modules={666:e=>{e.exports=require("cookie")},829:e=>{e.exports=require("jsonwebtoken")},3480:(e,a,t)=>{e.exports=t(5600)},5466:(e,a,t)=>{t.r(a),t.d(a,{config:()=>u,default:()=>T,routeModule:()=>A});var n={};t.r(n),t.d(n,{default:()=>l});var o=t(3480),E=t(8667),r=t(6435),i=t(666),s=t(829),c=t(9404);async function l(e,a){if("POST"!==e.method)return a.status(405).json({message:"Method not allowed"});let t=(0,i.parse)(e.headers.cookie||"").session;if(!t)return a.status(401).json({message:"Unauthorized"});try{return(0,s.verify)(t,process.env.SESSION_SECRET),await (0,c.dv)(),a.status(200).json({message:"Database setup completed"})}catch(e){return console.error("Error in database setup:",e),a.status(500).json({message:"Internal server error",error:e.message})}}let T=(0,r.M)(n,"default"),u=(0,r.M)(n,"config"),A=new o.PagesAPIRouteModule({definition:{kind:E.A.PAGES_API,page:"/api/admin/setup-db",pathname:"/api/admin/setup-db",bundlePath:"",filename:""},userland:n})},5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6435:(e,a)=>{Object.defineProperty(a,"M",{enumerable:!0,get:function(){return function e(a,t){return t in a?a[t]:"then"in a&&"function"==typeof a.then?a.then(a=>e(a,t)):"function"==typeof a&&"default"===t?a:void 0}}})},8667:(e,a)=>{Object.defineProperty(a,"A",{enumerable:!0,get:function(){return t}});var t=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},8954:(e,a,t)=>{t.d(a,{A:()=>o});let n=require("mysql2/promise"),o=t.n(n)().createPool({host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME,waitForConnections:!0,connectionLimit:10,queueLimit:0})},9404:(e,a,t)=>{t.d(a,{Nk:()=>s,dv:()=>r,zj:()=>i});var n=t(8954);let o=!1;async function E(e,a,t){try{await e.execute(t),console.log(`Table ${a} created or already exists`)}catch(e){if("ER_TABLE_EXISTS_ERROR"!==e.code)throw console.error(`Error creating table ${a}:`,e),e}}async function r(){let e;if(!o)try{e=await n.A.getConnection(),await E(e,"chatpanel_config",`CREATE TABLE IF NOT EXISTS chatpanel_config (
        id INT AUTO_INCREMENT PRIMARY KEY,
        config_key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`);let[a]=await e.execute("SELECT value FROM chatpanel_config WHERE config_key = 'DB_INITIALIZED'");if(a.length>0&&"true"===a[0].value){console.log("Database already initialized, skipping setup"),o=!0;return}for(let{key:a,value:t}of(console.log("Initializing database..."),await E(e,"chatpanel_authorized",`CREATE TABLE IF NOT EXISTS chatpanel_authorized (
        id INT AUTO_INCREMENT PRIMARY KEY,
        steam_id VARCHAR(255) UNIQUE NOT NULL,
        role VARCHAR(255) NOT NULL DEFAULT 'owner',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`),await E(e,"chatpanel_users",`CREATE TABLE IF NOT EXISTS chatpanel_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        steam_id VARCHAR(255) UNIQUE NOT NULL,
        last_login TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`),await E(e,"chatpanel_roles",`CREATE TABLE IF NOT EXISTS chatpanel_roles (
        id int(11) NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        description text,
        is_system boolean NOT NULL DEFAULT false,
        created_at timestamp NULL DEFAULT current_timestamp(),
        PRIMARY KEY (id),
        UNIQUE KEY name (name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`),await E(e,"chatpanel_pages",`CREATE TABLE IF NOT EXISTS chatpanel_pages (
        id int(11) NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        display_name varchar(255) NOT NULL,
        description text,
        created_at timestamp NULL DEFAULT current_timestamp(),
        PRIMARY KEY (id),
        UNIQUE KEY name (name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`),await E(e,"chatpanel_role_pages",`CREATE TABLE IF NOT EXISTS chatpanel_role_pages (
        id int(11) NOT NULL AUTO_INCREMENT,
        role_id int(11) NOT NULL,
        page_id int(11) NOT NULL,
        created_at timestamp NULL DEFAULT current_timestamp(),
        PRIMARY KEY (id),
        UNIQUE KEY role_page (role_id, page_id),
        FOREIGN KEY (role_id) REFERENCES chatpanel_roles(id) ON DELETE CASCADE,
        FOREIGN KEY (page_id) REFERENCES chatpanel_pages(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`),[{key:"SERVER_OPTIONS",value:'[{"value":"1","label":"RETAKE #1"},{"value":"2","label":"RETAKE #2"},{"value":"3","label":"RETAKE #3"}]'},{key:"IMAGE_URL",value:"/logo.png"}]))await e.execute("INSERT IGNORE INTO chatpanel_config (config_key, value) VALUES (?, ?)",[a,t]);let[t]=await e.execute("SELECT id FROM chatpanel_roles WHERE name = 'owner'");0===t.length&&(await e.execute(`INSERT INTO chatpanel_roles (name, description, is_system) VALUES 
         ('owner', 'Full access to all features including role management', true);`),console.log("Inserted owner role"));let[r]=await e.execute("SELECT COUNT(*) as count FROM chatpanel_pages");0===r[0].count&&(await e.execute(`INSERT INTO chatpanel_pages (name, display_name, description) VALUES 
         ('dashboard', 'Dashboard', 'Access to the admin dashboard'),
         ('statistics', 'Statistics', 'Access to view statistics'),
         ('search', 'Player Search', 'Access to search for players'),
         ('chatlog', 'Chat Logs', 'Access to view chat logs'),
         ('roles', 'Role Management', 'Access to manage roles (owner only)');`),console.log("Inserted default pages"),await e.execute(`INSERT INTO chatpanel_role_pages (role_id, page_id)
         SELECT 
           (SELECT id FROM chatpanel_roles WHERE name = 'owner'), 
           id 
         FROM chatpanel_pages;`),console.log("Assigned pages to owner role")),await e.execute("INSERT INTO chatpanel_config (config_key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?",["DB_INITIALIZED","true","true"]),o=!0,console.log("Database setup completed successfully")}catch(e){throw console.error("Error setting up database:",e),e}finally{e&&e.release()}}async function i(){let e;try{e=await n.A.getConnection();let[a]=await e.execute("SELECT * FROM chatpanel_config");return a.reduce((e,a)=>(e[a.config_key]=a.value,e),{})}catch(e){throw console.error("Error getting config:",e),e}finally{e&&e.release()}}async function s(e,a){let t;try{t=await n.A.getConnection(),await t.execute("INSERT INTO chatpanel_config (config_key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?",[e,a,a])}catch(e){throw console.error("Error setting config:",e),e}finally{t&&t.release()}}}};var a=require("../../../webpack-api-runtime.js");a.C(e);var t=a(a.s=5466);module.exports=t})();