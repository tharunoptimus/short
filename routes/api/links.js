const express = require("express");
const app = express();
const router = express.Router();
const Link = require("../../schemas/LinkSchema");
app.use(express.urlencoded({extended: true}));
app.use(express.json())

router.post("/", async (req, res, next) => {
    if(!req.body.content) {
        console.log("Content Parameter not sent with the request!")
        return res.status(400);
    }
    
    var fullUrl = req.protocol + '://' + req.get('host');

    var postData = getShortUrl(req.body.content);
    if(postData == null) { console.log("Invalid URL!"); return res.status(400)}

    Link.create(postData)
    .then(async (newPost) => {
        var resource = {
            url: newPost.url,
            shortUrl: newPost.shortUrl,
            link: fullUrl + "/" + newPost.shortUrl
        }
        res.status(201).send(resource)
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(400)
    })
})

function getShortUrl (url) {
    if(isRealUrl(url)) {
        var postData = {
            url: url,
            shortUrl: getRandom()
        }
        return postData;
    }
    else {
        return null;
    }
}

function isRealUrl (url) {
    var regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return regex.test(url);
}

function getRandom () {
    var words = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var randomWord = "";
    for (var i = 0; i < 6; i++) {
        var randomPosition = Math.floor(Math.random() * words.length);
        randomWord += words.charAt(randomPosition);
    }
    return randomWord;
}

module.exports = router;