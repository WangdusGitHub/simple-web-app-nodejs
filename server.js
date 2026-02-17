
const http = require('http');
// adding fs for reading the files
const fs = require('fs');

//setting the PORT to 3000
const PORT = 3000;

// instead of writing the same code multiple times, i made a function for rendering the page according to user request;
const showPage = (path, res, statusCode) => {
    // reading the file
    fs.readFile(path, (err, data) => {
        // handling error
        if(err) {
            res.writeHead(500);
            res.end("Server Error")
            return;
        }
        // setting status code and content-type
        res.writeHead(statusCode, {'content-type': 'text/html'})
        //writting the data in webpage
        res.write(data);
        res.end();
    })
}

// Creating the server
const server = http.createServer((req, res) => {

    // sending CSS file to client
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

    // sending Laundry image to client
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

    // Handling url
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

// listening to the server
server.listen(PORT, () => {
    console.log(`Server is up and running at http://localhost:${PORT}`)
});