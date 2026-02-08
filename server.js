const http = require('http');
const fs = require('fs');
const path = require('path');   
const PORT = 3000;

const showPage = (path, res, statusCode) => {

    fs.readFile(path, (err, data) => {
        if(err) {
            res.writeHead(500);
            res.end("Server Error")
            return;
        }
        res.writeHead(statusCode, {'content-type': 'text/html'})
        res.write(data);
        res.end();
    })
}

const server = http.createServer((req, res) => {

    if(req.url === '/styles/style.css') {
        fs.readFile('./styles/style.css', (err, data) => {
            if(err) {
                res.writeHead(500)
                res.end();
                return;
            }
            res.writeHead(200, {'content-type' : 'text/css'});
            res.end(data);
        });

        return;
    }

    if(req.url === '/images/laundry-img-01.png') {
        fs.readFile('./images/laundry-img-01.png', (err, data) => {
            if(err) {
                res.writeHead(500)
                res.end("server error...")
                return;
            }
            res.writeHead(200, {'content-type' : 'image'});
            res.end(data);
        })
        return;
    }


    if(req.url === '/' || req.url === '/home') {
        showPage('./pages/home.html', res, 200);
    } else if(req.url === '/about-us') {
        showPage('./pages/about-us.html', res, 200);
    } else if(req.url === '/contact-us') {
        showPage('./pages/contact-us.html', res, 200);
    } else {
        showPage('./pages/404.html', res, 404);
    }
});

server.listen(PORT, () => {
    console.log(`Server is up and running at http://localhost:${PORT}`)
});