<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';
require_once 'config.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();

$app->get('/check_session', function() {
    
    if (!isset($_SESSION)) {
        session_start();
    }
    
    $sess = array();
    if(isset($_SESSION['accountID']))
    {

        $sess["aID"] = $_SESSION['accountID'];
        // $sess["aType"] = $_SESSION['accountType'];
        $sess["uID"] = $_SESSION['userID'];
        $sess["status"] = 'success';
    }
    else
    {
        $sess["aID"] = '';
        // $sess["aType"] = 'Guest';
        $sess["uID"] = '';
        $sess["status"] = 'error';
    }
    $response["ID"] = $sess['aID'];
    // $response["Type"] = $sess['aType'];
    $response["user_id"] = $sess['uID'];
    $response["status"] = $sess['status'];

    echoResponse(200, $response);
});

$app -> post('/check_account', function() use ($app) {
    require_once 'passwordHash.php';
    $data = json_decode($app->request->getBody());
    verifyRequiredParams(array('username', 'password'),$data->account);
    $response = array();
    $users = array();
    $password = $data->account->password;
    $username = $data->account->username;
    $conn = getConnection();
    $stmt = $conn->prepare("SELECT * FROM account
                            WHERE account_username='$username' AND account_password='$password' 
                            LIMIT 1");
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($result as $row => $user) {
        $users['accountID'] = $user['account_id'];
        $users['username'] = $user['account_username'];
        $users['password'] = $user['account_password'];
        $users['status'] = $user['account_status'];
        $users['userID'] = $user['user_id'];
    }
    if ($result != NULL) {

        if(($users['password']===$password) && $users['username']===$username){
        $response['status'] = "success";
        $response['message'] = 'Logged in successfully.';
        $response['accountID'] = $users['accountID'];
        $response['userID'] = $users['userID'];
        if (!isset($_SESSION)) {
            session_start();
        }

        $_SESSION['accountID'] = $users['accountID'];
        $_SESSION['userID'] = $users['userID'];
        } else {
            $response['status'] = "error";
            $response['message'] = 'Login failed. Incorrect credentials';
        }
    }else {
            $response['status'] = "error";
            $response['message'] = 'No such user is registered';
        }
    echoResponse(200, $response);
});
    
$app->get('/get_level', function() { 
    
    try{    
            $conn = getConnection();

            $sql = (" SELECT * FROM grades ORDER BY grade_no ASC");
            
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "No data found.";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data selected from database";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->get('/get_level_section', function() { 
    
    try{    
            $conn = getConnection();

            $sql = ("SELECT grades.grade_id, grades.grade_no, sections.section_name, max_student, sections.section_id, sections.section_gender FROM grades
                    INNER JOIN sections ON grades.grade_id = sections.grade_id
                    ORDER BY grades.grade_id ASC");
            
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "No data found.";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data selected from database";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->get('/get_section', function() { 
    
    try{    
            // $data = json_decode($app->request->getBody());
            // verifyRequiredParams(array('level', 'gender'),$data->param);
            // print ($data);
            // $level = $data->param->level;
            // $gender = $data->param->gender;
            // echo ($level);
            $conn = getConnection();
            $sql = ("SELECT * FROM sections");    
            
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "No data found.";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data selected from database";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->get('/get_students', function() { 
    
    try{    
            // $data = json_decode($app->request->getBody());
            // verifyRequiredParams(array('level', 'gender'),$data->param);
            // print ($data);
            // $level = $data->param->level;
            // $gender = $data->param->gender;
            // echo ($level);
            $conn = getConnection();
            $sql = ("SELECT * FROM students a, users b WHERE a.user_id = b.user_id ORDER BY a.student_firstname");    
            
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "No data found.";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data selected from database";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->get('/count_enrolled', function() { 
    
    try{    
            // $data = json_decode($app->request->getBody());
            // verifyRequiredParams(array('level', 'gender'),$data->param);
            // print ($data);
            // $level = $data->param->level;
            // $gender = $data->param->gender;
            // echo ($level);
            $conn = getConnection();
            $sql = ("SELECT count(student_id) AS count FROM students");    
            
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "No data found.";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data selected from database";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->get('/count_enrolled', function() { 
    
    try{    
            // $data = json_decode($app->request->getBody());
            // verifyRequiredParams(array('level', 'gender'),$data->param);
            // print ($data);
            // $level = $data->param->level;
            // $gender = $data->param->gender;
            // echo ($level);
            $conn = getConnection();
            $sql = ("SELECT count(student_id) AS count FROM students");    
            
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "No data found.";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data selected from database";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->get('/count_dependent', function() { 
    
    try{    
            // $data = json_decode($app->request->getBody());
            // verifyRequiredParams(array('level', 'gender'),$data->param);
            // print ($data);
            // $level = $data->param->level;
            // $gender = $data->param->gender;
            // echo ($level);
            $conn = getConnection();
            $sql = ("SELECT count(student_id) AS count FROM students WHERE student_status = 'Dependent'");    
            
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "No data found.";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data selected from database";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->get('/count_pending', function() { 
    
    try{    
            // $data = json_decode($app->request->getBody());
            // verifyRequiredParams(array('level', 'gender'),$data->param);
            // print ($data);
            // $level = $data->param->level;
            // $gender = $data->param->gender;
            // echo ($level);
            $conn = getConnection();
            $sql = ("SELECT count(student_id) AS count FROM students WHERE student_status = 'Pending'");    
            
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "No data found.";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data selected from database";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->get('/count_student/:id', function($id) { 
    
    try{    
            $conn = getConnection();
            $sql = ("SELECT count(student_id) AS no_student FROM students WHERE section_id = {$id}");    
            
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "No data found.";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data selected from database";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->get('/get_students/:id', function($id) { 
    
    try{    
            $conn = getConnection();
            $sql = ("SELECT * FROM students T1, sections T2, grades T3 WHERE T1.section_id = {$id} AND T2.section_id = {$id} AND T2.grade_id = T3.grade_id");    
            
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "No data found.";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data selected from database";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->get('/get_student/:id', function($id) { 
    
    try{    
            $conn = getConnection();
            $sql = ("SELECT * FROM students T1, sections T2, grades T3, users T4 WHERE T1.student_id = {$id} AND T1.section_id = T2.section_id AND T2.grade_id = T3.grade_id AND T1.user_id = T4.user_id");    
            
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "No data found.";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data selected from database";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->post('/enroll_student', function() use ($app) { 
    
    $data = json_decode($app->request->getBody());

    try{    
            $a= array();
            $c="";
            $v="";
            foreach ($data as $key => $value) {
                            # code...
                $c .= $key. ", ";
                $v .= ":".$key. ", ";
                $a[":".$key] = $value;
            }            

            $c = rtrim($c, ', ');
            $v = rtrim($v, ', ');

            $sql = ("INSERT INTO students ($c) VALUES ($v)");    
            
            $conn = getConnection();
            $stmt = $conn->prepare($sql);
            $stmt->execute($a);
            $affected_rows = $stmt->rowCount();
            $last_inserted_id = $conn->lastInsertId();
            $response["lastInsertedId"] = $last_inserted_id;
            $response["status"] = "success";
            $response["message"] = "Data selected from database";
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'INSERT Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->post('/add_gradelevel', function() use ($app) { 
    
    $data = json_decode($app->request->getBody());

    try{    
            $a= array();
            $c="";
            $v="";
            foreach ($data as $key => $value) {
                            # code...
                $c .= $key. ", ";
                $v .= ":".$key. ", ";
                $a[":".$key] = $value;
            }            

            $c = rtrim($c, ', ');
            $v = rtrim($v, ', ');

            $sql = ("INSERT INTO grades ($c) VALUES ($v)");    
            
            $conn = getConnection();
            $stmt = $conn->prepare($sql);
            $stmt->execute($a);
            $affected_rows = $stmt->rowCount();
            $last_inserted_id = $conn->lastInsertId();
            $response["last_inserted_id"] = $last_inserted_id;
            $response["status"] = "success";
            $response["message"] = "Data selected from database";
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'INSERT Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->post('/add_user', function() use ($app) { 
    
    $data = json_decode($app->request->getBody());

    try{    
            $a= array();
            $c="";
            $v="";
            foreach ($data as $key => $value) {
                            # code...
                $c .= $key. ", ";
                $v .= ":".$key. ", ";
                $a[":".$key] = $value;
            }            

            $c = rtrim($c, ', ');
            $v = rtrim($v, ', ');

            $sql = ("INSERT INTO users ($c) VALUES ($v)");    
            
            $conn = getConnection();
            $stmt = $conn->prepare($sql);
            $stmt->execute($a);
            $affected_rows = $stmt->rowCount();
            $last_inserted_id = $conn->lastInsertId();
            $response["last_inserted_id"] = $last_inserted_id;
            $response["status"] = "success";
            $response["message"] = "Data selected from database";
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'INSERT Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->post('/add_account', function() use ($app) { 
    
    $data = json_decode($app->request->getBody());

    try{    
            $a= array();
            $c="";
            $v="";
            foreach ($data as $key => $value) {
                            # code...
                $c .= $key. ", ";
                $v .= ":".$key. ", ";
                $a[":".$key] = $value;
            }            

            $c = rtrim($c, ', ');
            $v = rtrim($v, ', ');

            $sql = ("INSERT INTO account ($c) VALUES ($v)");    
            
            $conn = getConnection();
            $stmt = $conn->prepare($sql);
            $stmt->execute($a);
            $affected_rows = $stmt->rowCount();
            $last_inserted_id = $conn->lastInsertId();
            $response["last_inserted_id"] = $last_inserted_id;
            $response["status"] = "success";
            $response["message"] = "Data selected from database";
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'INSERT Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->post('/add_section', function() use ($app) { 
    
    $data = json_decode($app->request->getBody());

    try{    
            $a= array();
            $c="";
            $v="";
            foreach ($data as $key => $value) {
                            # code...
                $c .= $key. ", ";
                $v .= ":".$key. ", ";
                $a[":".$key] = $value;
            }            

            $c = rtrim($c, ', ');
            $v = rtrim($v, ', ');

            $sql = ("INSERT INTO sections ($c) VALUES ($v)");    
            
            $conn = getConnection();
            $stmt = $conn->prepare($sql);
            $stmt->execute($a);
            $affected_rows = $stmt->rowCount();
            $last_inserted_id = $conn->lastInsertId();
            $response["last_inserted_id"] = $last_inserted_id;
            $response["status"] = "success";
            $response["message"] = "Data selected from database";
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'INSERT Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->put('/edit_student/:id', function($id) use ($app) { 
    
    $data = json_decode($app->request->getBody());
    try{    
            $a = array();
            $c= "";
            $v="";
            foreach ($data as $key => $value) {
                # code...
                // $c .=$key. ":".$key.", ";
                $c .= $key. " = :".$key.", ";
                // $v .=":".$key. ", ";
                $a[":".$key] = $value;
                // a[":".$key] = $value;
            }
            $c = rtrim($c, ', ');
            // $v = rtrim($v, ', ');
            $conn = getConnection();
            $stmt = $conn->prepare("UPDATE students SET $c WHERE student_id = {$id}");
            $stmt->execute($a);
            $affected_rows = $stmt->rowCount();
            if($affected_rows<=0){
                $response["status"] = "warning";
                $response["message"] = "No row updated";
            }else{
                $response["status"] = "success";
                $response["message"] = $affected_rows." row(s) updated in database";
            }
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        echoResponse(200, $response);
});

$app->get('/logout', function() {
    if (!isset($_SESSION)) {
    session_start();
    }
    
    if(isSet($_SESSION['accountID']))
    
    {
        unset($_SESSION['accountID']);
        unset($_SESSION['userID']);
        $info='info';
        if(isSet($_COOKIE[$info]))
        {
            setcookie ($info, '', time() - $cookie_time);
        }
        $msg="Logged Out Successfully...";
    }
    else
    {
        $msg = "Not logged in...";
    }
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);

});

$app->get('/create_tables', function() {
    $dsn = 'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8';
    try {
        $myfile = fopen("../../../assets/db/isrc_db.txt", "r") or die ("Unable to open file!");
        $conn = new PDO($dsn, DB_USERNAME, DB_PASSWORD);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->exec("CREATE TABLE IF NOT EXISTS `academic_years` (`academic_id` int(11) NOT NULL,`academic_year` int(5) DEFAULT NULL);
                    CREATE TABLE IF NOT EXISTS `account` (`account_id` int(11) NOT NULL,`account_username` varchar(20) DEFAULT NULL,`account_password` varchar(20) DEFAULT NULL,`account_status` varchar(10) DEFAULT NULL,`user_id` int(11) DEFAULT NULL);
                    CREATE TABLE IF NOT EXISTS `grades` (`grade_id` int(11) NOT NULL,`grade_no` varchar(20) DEFAULT NULL);
                    CREATE TABLE IF NOT EXISTS `sections` (`section_id` int(11) NOT NULL,`section_name` varchar(20) DEFAULT NULL,`grade_id` int(11) DEFAULT NULL,`max_student` int(11) NOT NULL,`section_gender` enum('Male','Female') NOT NULL);
                    CREATE TABLE IF NOT EXISTS `students` (`student_id` int(11) NOT NULL,`student_firstname` varchar(20) DEFAULT NULL,`student_middlename` varchar(20) DEFAULT NULL,`student_lastname` varchar(10) DEFAULT NULL,`user_id` int(11) DEFAULT NULL,`section_id` int(11) DEFAULT NULL,`academic_id` int(11) DEFAULT NULL,`gender` varchar(10) DEFAULT NULL,`student_status` varchar(20) DEFAULT NULL,`student_db` date DEFAULT NULL,`student_pb` varchar(50) DEFAULT NULL,`student_contact` varchar(15) DEFAULT NULL,`student_pa` varchar(50) DEFAULT NULL,`student_ha` varchar(50) DEFAULT NULL,`student_school` varchar(50) DEFAULT NULL,`school_add` varchar(50) DEFAULT NULL,`student_guardian` varchar(50) DEFAULT NULL,`guardian_relation` varchar(20) DEFAULT NULL,`guardian_number` varchar(15) DEFAULT NULL,`guardian_add` varchar(50) DEFAULT NULL,`or_number` varchar(20) DEFAULT NULL,`date_enrolled` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);
                    CREATE TABLE IF NOT EXISTS `users` (`user_id` int(11) NOT NULL,`user_firstname` varchar(20) DEFAULT NULL,`user_middlename` varchar(20) DEFAULT NULL,`user_lastname` varchar(20) DEFAULT NULL,`user_position` varchar(20) DEFAULT NULL);
                    INSERT INTO `users` (`user_id`, `user_firstname`, `user_middlename`, `user_lastname`, `user_position`) VALUES(1, 'admin', 'admin', 'admin', 'Registrar');
                    INSERT INTO `account` (`account_id`, `account_username`, `account_password`, `account_status`, `user_id`) VALUES(1, 'admin', 'admin', NULL, 1);
                    ALTER TABLE `academic_years`ADD PRIMARY KEY (`academic_id`);
                    ALTER TABLE `account`ADD PRIMARY KEY (`account_id`), ADD KEY `user_id` (`user_id`);ALTER TABLE `grades`ADD PRIMARY KEY (`grade_id`);
                    ALTER TABLE `sections`ADD PRIMARY KEY (`section_id`), ADD KEY `grade_id` (`grade_id`);
                    ALTER TABLE `students`ADD PRIMARY KEY (`student_id`), ADD UNIQUE KEY `or_number` (`or_number`), ADD KEY `user_id` (`user_id`), ADD KEY `academic_id` (`academic_id`), ADD KEY `section_id` (`section_id`);
                    ALTER TABLE `users`ADD PRIMARY KEY (`user_id`);
                    ALTER TABLE `academic_years`MODIFY `academic_id` int(11) NOT NULL AUTO_INCREMENT;
                    ALTER TABLE `account`MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
                    ALTER TABLE `grades`MODIFY `grade_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
                    ALTER TABLE `sections`MODIFY `section_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
                    ALTER TABLE `students`MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=74;
                    ALTER TABLE `users`MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
                    ALTER TABLE `account`ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
                    ALTER TABLE `sections`ADD CONSTRAINT `sections_ibfk_1` FOREIGN KEY (`grade_id`) REFERENCES `grades` (`grade_id`);
                    ALTER TABLE `students`ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
                                ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `sections` (`section_id`),
                                ADD CONSTRAINT `students_ibfk_3` FOREIGN KEY (`academic_id`) REFERENCES `academic_years` (`academic_id`),
                                ADD CONSTRAINT `students_ibfk_4` FOREIGN KEY (`section_id`) REFERENCES `sections` (`section_id`),
                                ADD CONSTRAINT `students_ibfk_5` FOREIGN KEY (`academic_id`) REFERENCES `academic_years` (`academic_id`);");
        $response["status"] = "success";
        $response["message"] = 'Database successfully created.';
    } catch (PDOException $e) {
        $response["status"] = "error";
        $response["message"] = 'Connection failed: ' . $e->getMessage();
        echoResponse(200, $response);
        exit;
    }
    echoResponse(200, $response);
});

$app->get('/create_database', function() {
    $dsn = 'mysql:host='.DB_HOST.';dbname=test;charset=utf8';
    try {
        $conn = new PDO($dsn, DB_USERNAME, DB_PASSWORD);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "CREATE DATABASE isrc_db";
        $conn->exec($sql);
        $response["status"] = "success";
        $response["message"] = 'Database successfully created.';
    } catch (PDOException $e) {
        $response["status"] = "error";
        $response["message"] = 'Connection failed: ' . $e->getMessage();
        echoResponse(200, $response);
        exit;
    }
    echoResponse(200, $response);
});

$app->get('/check_connection', function() {
    $dsn = 'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8';
    try {
        $conn = new PDO($dsn, DB_USERNAME, DB_PASSWORD);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $response["status"] = 'success';
        $response['message'] = "Successfully connected.";
    } catch (PDOException $e) {
        $response["status"] = "error";
        $response["message"] = 'Connection failed: ' . $e->getMessage();
        echoResponse(200, $response);
        exit;
    }
    echoResponse(200, $response);
});

function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

function getConnection() {
    $dsn = 'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8';
    try {

        $db = new PDO($dsn, DB_USERNAME, DB_PASSWORD, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    } catch (PDOException $e) {
        $response["status"] = "error";
        $response["message"] = 'Connection failed: ' . $e->getMessage();
        $response["data"] = null;
        echoResponse(200, $response);
        exit;
    }
    return $db;
}

function getOneRecord($query) {
    
    $db = getConnection();

    $r = $db -> query($query. 'LIMIT 1');
    $r->execute();
    $result = $r->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

function verifyRequiredParams($required_fields,$request_params) {
    $error = false;
    $error_fields = "";
    foreach ($required_fields as $field) {
        if (!isset($request_params->$field) || strlen(trim($request_params->$field)) <= 0) {
            $error = true;
            $error_fields .= $field . ', ';
        }
    }

    if ($error) {
        // Required field(s) are missing or empty
        // echo error json and stop the app
        $response = array();
        $response["status"] = "error";
        $response["message"] = 'Required field(s) ' . substr($error_fields, 0, -2) . ' is missing or empty';
        echoResponse(200, $response);
        exit;
    }
}

$app->run();
?>