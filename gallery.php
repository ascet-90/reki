<?php 

$galnum = (int)$_POST['galnum'];
$dir = __DIR__.'/img/gallery';
$images = scandir($dir, 1);
$allimgs = count($images)-2;

$code1 ='';


	for($i = $galnum; $i<$galnum+6; $i++){
		$file = __DIR__.'/img/gallery/gallery-'.$i;
		if(file_exists($file.'.png')){
			$code.= '<div class="gallery_item"><a data-fancybox="gallery" href="img/gallery/gallery-'.$i.'.png"><img src="img/gallery/gallery-'.$i.'.png"></a></div>';
		}else if(file_exists($file.'.jpg')){
			$code.= '<div class="gallery_item"><a data-fancybox="gallery" href="img/gallery/gallery-'.$i.'.jpg"><img src="img/gallery/gallery-'.$i.'.jpg"></a></div>';
		}else{
			$code.='<span class="tomach"></span>';
		};
		if($i >= $allimgs){
			$code.='<span class="tomach"></span>';
		};
	};

echo $code;

?>