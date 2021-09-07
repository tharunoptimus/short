const express = require("express")
const crypto = require("crypto")
const app = express()
const router = express.Router()
const Link = require("../../schemas/LinkSchema")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

router.post("/", async (req, res, next) => {
	if (!req.body.content) {
		console.log("Content Parameter not sent with the request!")
		return res.status(400)
	}

	var fullUrl = req.protocol + "://" + req.get("host")

	var postData = getShortUrl(req.body.content)
	if (postData == null) {
		console.log("Invalid URL!")
		return res.status(400)
	}

	Link.create(postData)
		.then(async (newPost) => {
			var resource = {
				url: newPost.url,
				shortUrl: newPost.shortUrl,
				link: fullUrl + "/" + newPost.shortUrl,
			}
			res.status(201).send(resource)
		})
		.catch((error) => {
			console.log(error)
			res.sendStatus(400)
		})
})

function getShortUrl(url) {
	if (isRealUrl(url)) {
		var postData = {
			url: url,
			shortUrl: getRandom(),
		}
		return postData
	} else {
		return null
	}
}

function isRealUrl(url) {
	var regex =
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
	return regex.test(url)
}


function generateForCustomCharacters(length, characters) {
    const characterCount = characters.length
    const maxValidSelector = Math.floor(0x10000 / characterCount) * characterCount - 1
    const entropyLength = 2 * Math.ceil(1.1 * length)
    let string = ""
    let stringLength = 0

    while (stringLength < length) {
        const entropy = crypto.randomBytes(entropyLength)
        let entropyPosition = 0

        while (entropyPosition < entropyLength && stringLength < length) {
            const entropyValue = entropy.readUInt16LE(entropyPosition)
            entropyPosition += 2
            if (entropyValue > maxValidSelector) {
                continue
            }

            string += characters[entropyValue % characterCount]
            stringLength++
        }
    }

    return string
}

function getRandom() {
    let characters =
	"AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzaAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0918273645546372819".split(
		""
	)
    return generateForCustomCharacters(6, characters)
}

module.exports = router
