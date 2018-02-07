<?php

	// Initialize the third party tool | UPLOAD by CODEGUY
	require_once 'Upload/Autoloader.php';
    Upload\Autoloader::register();	

    // 

	if(isset($_FILES['file'])){
		
		/* $location = '/opt/lampp/htdocs/emrs/stuff/'; */
		$location = 'htdocs/emrs/stuff/'; 

		$storage = new \Upload\Storage\FileSystem($location);
		$file = new \Upload\File('file', $storage);
		
		$file->addValidations(array(

		    // Ensure file is one of these file types
		    // new \Upload\Validation\Mimetype('image/png'),
		    // new \Upload\Validation\Mimetype('image/jpg'),
		    // new \Upload\Validation\Mimetype('image/jpeg'),
		    // new \Upload\Validation\Mimetype('application/pdf'),
		    // new \Upload\Validation\Mimetype('application/doc'),
		    // new \Upload\Validation\Mimetype('application/docx'),
		    // new \Upload\Validation\Mimetype('application/ppt'),

			// Ensure file is one of these file types
	    	new \Upload\Validation\Mimetype(array('image/png', 'image/jpg', 'image/jpeg', 'application/pdf', 'application/doc', 'application/docx', 'application/ppt')),

	    	// Ensure file is no larger than 5M (use "B", "K", M", or "G")
	    	new \Upload\Validation\Size('500M')
		));

		// Try to upload file
		try {
		    // Success!
		    $file->upload();
		    echo 'success';
		} catch (\Exception $e) {
		    // Fail!
		    $errors = $file->getErrors();
			echo ($e->getMessage());
		}
	}
?>
