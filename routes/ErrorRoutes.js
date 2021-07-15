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
	var link = await Link.findOne({ shortUrl: shortUrl }, { new: true });
	if (link == null) {
		res.status(404).render("error", {
			error: "This shortened link does not exist in our servers!",
		});
	}
	res.redirect(link.url);
});
module.exports = router;