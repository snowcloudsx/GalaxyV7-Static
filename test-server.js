const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = 'C:\\Users\\dev\\Desktop\\msad35\\GalaxyV7-Static';
const MIME = {
  '.html':'text/html','.js':'application/javascript','.mjs':'application/javascript',
  '.cjs':'application/javascript','.css':'text/css','.svg':'image/svg+xml',
  '.json':'application/json','.wasm':'application/wasm','.map':'application/json',
  '.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.ttf':'font/ttf',
  '.otf':'font/otf','.woff':'font/woff','.woff2':'font/woff2'
};
http.createServer((req,res)=>{
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(ROOT, urlPath);
  fs.stat(filePath,(err,st)=>{
    if(!err && st.isFile()){
      res.statusCode=200;
      res.setHeader('Content-Type', MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream');
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.statusCode=200;
      res.setHeader('Content-Type','text/html');
      fs.createReadStream(path.join(ROOT,'404.html')).pipe(res);
    }
  });
}).listen(8765,()=>console.log('http://localhost:8765'));
