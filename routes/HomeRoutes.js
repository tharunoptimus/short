const express = require("express");
const app = express();
const router = express.Router();
const Link = require("../schemas/LinkSchema");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.get("/", (req, res, next) => {
	var payload = {
		pageTitle: "Home",
	};
	res.status(200).render("home", payload);
});

router.get("/:shortUrl", async (req, res, next) => {
	var shortUrl = req.params.shortUrl;
	var link = await Link.findOne({ shortUrl: shortUrl })
		.then((link) => {
			if (link != null && link) {
				res.redirect(checkAndSendHttps(link.url));
				return;
			}
			res.render("error");
		})
		.catch((err) => {
			console.log(err);
			res.render("error");
		});
});

function checkAndSendHttps(url) {
	if (url.indexOf("http://") === -1 && url.indexOf("https://") === -1) {
		url = "https://" + url;
	}
	return url;
}

module.exports = router;