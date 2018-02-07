-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2016 at 05:34 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `isrc_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `academic_years`
--

CREATE TABLE IF NOT EXISTS `academic_years` (
`academic_id` int(11) NOT NULL,
  `academic_year` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE IF NOT EXISTS `account` (
`account_id` int(11) NOT NULL,
  `account_username` varchar(20) DEFAULT NULL,
  `account_password` varchar(20) DEFAULT NULL,
  `account_status` varchar(10) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `account_username`, `account_password`, `account_status`, `user_id`) VALUES
(1, 'admin', 'insan', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE IF NOT EXISTS `grades` (
`grade_id` int(11) NOT NULL,
  `grade_no` varchar(20) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`grade_id`, `grade_no`) VALUES
(3, 'Grade 5'),
(4, 'Grade 6'),
(5, '1st Year High School'),
(6, '2nd Year High School'),
(7, '3rd Year High School'),
(8, '4th Year High School'),
(9, 'Preparatory College'),
(16, 'Grade 3');

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE IF NOT EXISTS `sections` (
`section_id` int(11) NOT NULL,
  `section_name` varchar(20) DEFAULT NULL,
  `grade_id` int(11) DEFAULT NULL,
  `max_student` int(11) NOT NULL,
  `section_gender` enum('Male','Female') NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`section_id`, `section_name`, `grade_id`, `max_student`, `section_gender`) VALUES
(1, 'Abubacar', 3, 30, 'Male'),
(2, 'Omar', 3, 30, 'Female'),
(3, 'Othman', 3, 30, 'Male'),
(4, 'Ali', 3, 35, 'Female'),
(5, 'Section 1', 5, 32, 'Male'),
(6, 'Section 2', 5, 23, 'Female'),
(7, 'Abu Huraira', 4, 35, 'Male'),
(8, 'Husnie', 6, 35, 'Female'),
(9, 'Omair', 7, 35, 'Male'),
(10, 'Saifullah', 8, 35, 'Female'),
(11, 'Salman', 9, 35, 'Male'),
(12, 'Abbas', 16, 33, 'Male'),
(13, 'Aisha', 16, 33, 'Female');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE IF NOT EXISTS `students` (
`student_id` int(11) NOT NULL,
  `student_firstname` varchar(20) DEFAULT NULL,
  `student_middlename` varchar(20) DEFAULT NULL,
  `student_lastname` varchar(10) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  `academic_id` int(11) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `student_status` varchar(20) DEFAULT NULL,
  `student_db` date DEFAULT NULL,
  `student_pb` varchar(50) DEFAULT NULL,
  `student_contact` varchar(15) DEFAULT NULL,
  `student_pa` varchar(50) DEFAULT NULL,
  `student_ha` varchar(50) DEFAULT NULL,
  `student_school` varchar(50) DEFAULT NULL,
  `school_add` varchar(50) DEFAULT NULL,
  `student_guardian` varchar(50) DEFAULT NULL,
  `guardian_relation` varchar(20) DEFAULT NULL,
  `guardian_number` varchar(15) DEFAULT NULL,
  `guardian_add` varchar(50) DEFAULT NULL,
  `or_number` int(11) DEFAULT NULL,
  `date_enrolled` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `student_firstname`, `student_middlename`, `student_lastname`, `user_id`, `section_id`, `academic_id`, `gender`, `student_status`, `student_db`, `student_pb`, `student_contact`, `student_pa`, `student_ha`, `student_school`, `school_add`, `student_guardian`, `guardian_relation`, `guardian_number`, `guardian_add`, `or_number`, `date_enrolled`) VALUES
(1, 'TEST', 'TEST', 'TEST', 1, 3, NULL, 'Male', 'Paid', '2016-01-01', 'TEST', 'TEST', 'TEST', 'TEST', 'TEST', 'TEST', 'TEST', 'TEST', 'TEST', 'TEST', NULL, '2016-03-09 13:50:12'),
(2, 'HUSNIE', 'SAPHIA', 'EDRES', 1, 3, NULL, 'Male', 'Paid', '2016-02-04', 'Magonaya', '09210022111', 'Bo salam', 'Magonaya', 'MSU', 'marawi', 'edres i mohammad', 'father', '09127445001', 'bo salam', NULL, '2016-03-09 13:50:12'),
(3, 'Abdullah', 's', 'k', 1, 3, NULL, 'Male', 'Paid', '2016-12-31', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-03-09 13:50:12'),
(4, 'EDRES', 'I', 'Mohammad', NULL, 12, NULL, 'Male', 'Credit', '1970-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-03-09 13:50:12'),
(5, 'Abdullah', 'Imam', 'Mohammad', NULL, 1, NULL, 'Male', 'Paid', '1971-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-03-09 13:50:12'),
(6, 'Norolhudah', 'Saphia', 'Edres', NULL, 8, NULL, 'Femal', 'Paid', '2016-12-31', 'Magonaya', '09128332111', 'MSU', 'Magonaya', 'MSU-UTC', 'Marawi City', 'Edres I Mohammad', 'Father', '09128833777', 'MSU', NULL, '2016-03-09 13:50:12'),
(7, 'Rahima', 'Saro', 'Edres', NULL, 10, NULL, 'Female', 'Dependent', '2016-02-02', 'APMC', '09221144333', 'MSU', 'Marawi', 'ILS', 'MSU', 'EDRES', 'FATHER', '09228833222', 'MSU', NULL, '2016-03-09 13:50:12'),
(8, 'AMANIE', 'SAPHIA', 'EDRES', NULL, 5, NULL, 'Male', 'Credit', '2016-12-31', 'MAGONAYA', '09221188222', 'MSU', 'MAGONAYA', 'MSU-UTC', 'MARAWI', 'EDRES I MOHAMMAD', 'FATHER', '09883322888', 'MARAWI', NULL, '2016-03-09 13:50:12'),
(9, 'Mujahid', 'Saphia', 'Edres', NULL, 7, NULL, 'Male', 'Paid', '2006-12-31', 'Magonaya', '09221133444', 'MSU', 'Magonaya', 'MSU-ILS', 'MSU', 'Edres I Mohammad', 'Father', '09221188333', 'MSU', NULL, '2016-03-09 13:50:12'),
(10, 'Abdul-azis', 'Saphia', 'Edres', NULL, 3, NULL, 'Male', 'Dependent', '2008-02-02', 'Magonaya', '09228822222', 'Magonaya', 'Magonaya', 'MSU-ILS', 'MSU', NULL, NULL, NULL, NULL, NULL, '2016-03-09 13:50:12'),
(11, 'abdullah', 'khaerul', 'azzam', NULL, 5, NULL, 'Male', 'Paid', '2016-03-02', 'lilod marawi city', '0', NULL, '6th', NULL, 'marawi', 'samok', NULL, '1111111', NULL, NULL, '2016-03-09 13:50:12'),
(12, 'Norhana', 'Salic', 'Khaled', NULL, 10, NULL, 'Female', 'Paid', '1993-01-09', 'Magonaya', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-03-09 13:50:12'),
(13, 'sds', 'sda', 'sdas', NULL, 9, NULL, 'Male', 'Paid', '2016-02-04', 'mmmmm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2040, '2016-03-09 13:50:12'),
(14, 'aaaaa', 'aaaaaaa', 'aaaaaaaaaa', NULL, 5, NULL, 'Male', 'Paid', '2016-12-31', 'Maaaaaaa', NULL, 'Marawi City', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 201642880, '2016-03-09 13:50:12'),
(15, 'bbbbbbb', 'bbbbbbbbbbbb', 'bbbbbbbbbb', NULL, 6, NULL, 'Female', 'Paid', '2016-12-31', 'bbbbbbbbbbb', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 201642363, '2016-03-09 13:50:12'),
(16, 'ccccccccccc', 'ccccccccc', 'ccccccccc', NULL, 1, NULL, 'Male', 'Paid', '1976-01-31', 'cccccccccccccc', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2147483647, '2016-03-09 13:50:12'),
(22, 'dddd', 'dddddd', 'dddddd', NULL, 5, NULL, 'Male', 'Dependent', '2003-12-31', 'ddddddddd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2016422121, '2016-03-09 13:50:12'),
(23, 'eeee', 'eeeee', 'eeeee', 1, 6, NULL, 'Female', 'Paid', NULL, 'eeeeeeeeee', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 20165283, '2016-03-09 13:50:12'),
(24, 'qqqq', 'qqqq', 'qqqq', 1, 5, NULL, 'Male', 'Paid', '2016-03-09', 'qqqqq', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 201692652, '2016-03-09 13:50:12'),
(25, 'www', 'www', 'www', 1, 8, NULL, 'Female', 'Paid', '2016-12-31', 'eeewww', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 201692727, '2016-03-09 13:50:12'),
(26, 'dsad', 'sd', 'sd', 1, 8, NULL, 'Female', 'Paid', '2016-01-01', 'sdsad', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 201692728, '2016-03-09 13:50:12'),
(27, 's', NULL, NULL, 1, 12, NULL, 'Male', 'Pending', '2016-03-09', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 201692754, '2016-03-09 13:50:12'),
(28, 'eq', 'ewq', 'qwe', 1, 8, NULL, 'Female', 'Paid', '2016-03-09', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 201692826, '2016-03-09 13:50:12'),
(29, 'sajdjshb', 'jj', 'bmn', 1, 5, NULL, 'Male', 'Paid', '2016-12-31', 'sdsajdb', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 201692857, '2016-03-09 13:50:12'),
(30, 'Fatima', 'Saro', 'Edres', 1, 2, NULL, 'Female', 'Paid', '2016-03-09', 'APMC', '09127445001', 'MSU', 'MSU', 'MSU-ILS', 'MSU', 'Edres I Mohammad', 'Father', '09127581908', 'MSU', 201692130, '2016-03-09 13:50:12'),
(31, 'sadsakd', 'khjkhjkl', 'hjklhjklhk', 1, 5, NULL, 'Male', 'Paid', '2016-12-31', 'dkslfh', '0890890', 'jkbkbjhjhljjjjjjjjjh', 'ljkkkkkkkkkkkkkkkkkk', 'hjklh', 'jkhhjhhhhhhhhhhhhhhhhhhhhhhhhh', 'jhjlllllllllllllllllllllllllllllh', 'sadhaskhdjskhd', '908320948329084', 'sjdshfjdslhfsdjhfasjdhsajkd', 2016921317, '2016-03-09 13:50:12'),
(32, 'a', 'a', 'a', 1, 5, NULL, 'Male', 'Paid', '2016-12-31', 'w', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2016921343, '2016-03-09 13:50:12'),
(33, 'f', 'f', 'f', 1, 6, NULL, 'Female', 'Paid', '2016-12-31', 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2016921352, '2016-03-09 13:53:07'),
(34, 'TEST', 'TEST', 'TEST', 1, 5, NULL, 'Male', 'Paid', '2016-12-31', 'TEST', '9089898', 'TEST', 'TEST', 'TEST', 'TEST', 'TEST', 'TEST', '890890890', 'TEST', 2016921357, '2016-03-09 13:57:47'),
(35, 'C', 'C', 'C', 1, 5, NULL, 'Male', 'Paid', '2016-12-31', 'C', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 201692149, '2016-03-09 14:09:39'),
(36, 'pp', 'pp', 'pp', 1, 5, NULL, 'Male', 'Paid', '2016-12-31', NULL, 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 2016921418, '2016-03-09 14:19:07'),
(37, 'v', 'l', 'l', 1, 5, NULL, 'Male', 'Paid', '2016-12-31', 'dsd', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 2016921422, '2016-03-09 14:22:41'),
(38, 'Husnie', 'Saphia', 'Edres', 1, 5, NULL, 'Male', 'Paid', '2016-12-31', 'sakd;ljs', 'jsdj', 'kjsjdklj', 'kljklj;', 'jklj;lj', 'jkkhjkhjk', 'hjkhjkhjk', 'hjkhjkhjkh', 'jhjkhjkh', 'jkhjkhjkl', 2016921435, '2016-03-09 14:36:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`user_id` int(11) NOT NULL,
  `user_firstname` varchar(20) DEFAULT NULL,
  `user_middlename` varchar(20) DEFAULT NULL,
  `user_lastname` varchar(20) DEFAULT NULL,
  `user_position` varchar(20) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_firstname`, `user_middlename`, `user_lastname`, `user_position`) VALUES
(1, 'Husnie', 'Saphia', 'Edres', 'Registrar');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academic_years`
--
ALTER TABLE `academic_years`
 ADD PRIMARY KEY (`academic_id`);

--
-- Indexes for table `account`
--
ALTER TABLE `account`
 ADD PRIMARY KEY (`account_id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
 ADD PRIMARY KEY (`grade_id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
 ADD PRIMARY KEY (`section_id`), ADD KEY `grade_id` (`grade_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
 ADD PRIMARY KEY (`student_id`), ADD UNIQUE KEY `or_number` (`or_number`), ADD KEY `user_id` (`user_id`), ADD KEY `academic_id` (`academic_id`), ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `academic_years`
--
ALTER TABLE `academic_years`
MODIFY `academic_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
MODIFY `grade_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
MODIFY `section_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `sections`
--
ALTER TABLE `sections`
ADD CONSTRAINT `sections_ibfk_1` FOREIGN KEY (`grade_id`) REFERENCES `grades` (`grade_id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `sections` (`section_id`),
ADD CONSTRAINT `students_ibfk_3` FOREIGN KEY (`academic_id`) REFERENCES `academic_years` (`academic_id`),
ADD CONSTRAINT `students_ibfk_4` FOREIGN KEY (`section_id`) REFERENCES `sections` (`section_id`),
ADD CONSTRAINT `students_ibfk_5` FOREIGN KEY (`academic_id`) REFERENCES `academic_years` (`academic_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
