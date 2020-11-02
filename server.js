const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(3000);

app.post('/', (req, res) => {
	const galnum = parseInt(req.body.galnum);
	const gallery_path = path.join(__dirname, '/img/gallery');	

	fs.readdir(gallery_path, function(err, items) {
		if(err) {
			res.status(500).send({ error: 'Something failed!' });
		}
		let images_count = items.length;	 
		let code = '';
	    for(let i = galnum; i < galnum + 6; i++) { 
			let file = path.join(gallery_path, '/gallery-' + i);
			
			if(fs.existsSync(file + '.webp')) {
				code += `<div class="gallery_item"><a data-fancybox="gallery" href="img/gallery/gallery-${i}.webp"><img src="img/gallery/gallery-${i}.webp"></a></div>`;
			} else if(fs.existsSync(file + '.jpg')) {
				code += `<div class="gallery_item"><a data-fancybox="gallery" href="img/gallery/gallery-${i}.jpg"><img src="img/gallery/gallery-${i}.jpg"></a></div>`;
			} else if(fs.existsSync(file + '.png')) {
				code += `<div class="gallery_item"><a data-fancybox="gallery" href="img/gallery/gallery-${i}.png"><img src="img/gallery/gallery-${i}.png"></a></div>`;
			} else {
				code +='<span class="tomach"></span>';
			}	
			if(i >= images_count){
				code += '<span class="tomach"></span>';
			};
		};
		res.send(code);
	});
	
});