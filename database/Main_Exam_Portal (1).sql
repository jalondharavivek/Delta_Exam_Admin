CREATE TABLE `student` (
  `student_id` int PRIMARY KEY,
  `name` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `contact` varchar(255),
  `gender` varchar(255),
  `address` varchar(255),
  `city` varchar(255),
  `state_id` int,
  `student_status` varchar(255),
  `college_id` int,
  `created_date` timestamp
);

CREATE TABLE `colleges` (
  `college_id` int PRIMARY KEY AUTO_INCREMENT,
  `college_name` varchar(255),
  `created_date` timestamp
);

CREATE TABLE `user_login` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255),
  `password` varchar(255),
  `role` varchar(255),
  `user_login_status` varchar(255),
  `created_date` timestamp
);

CREATE TABLE `category` (
  `category_id` int PRIMARY KEY AUTO_INCREMENT,
  `category_name` varchar(255),
  `category_status` varchar(255),
  `created_date` timestamp
);

CREATE TABLE `exam` (
  `exam_id` int PRIMARY KEY AUTO_INCREMENT,
  `exam_name` varchar(255),
  `total_questions` int,
  `exam_time` varchar(255),
  `exam_access_code` varchar(255),
  `user_id` int,
  `exam_status` varchar(255),
  `exam_date` date,
  `category_name` text,
  `created_date` timestamp
);

CREATE TABLE `exam_category` (
  `exam_category_id` int PRIMARY KEY AUTO_INCREMENT,
  `exam_id` int,
  `category_id` int,
  `exam_category_status` varchar(20),
  `created_date` timestamp
);

CREATE TABLE `questions` (
  `question_id` int PRIMARY KEY AUTO_INCREMENT,
  `question_text` text,
  `option_a` text,
  `option_b` text,
  `option_c` text,
  `option_d` text,
  `answer` text,
  `description` text,
  `question status` varchar(255),
  `category_id` int
);

CREATE TABLE `user_answers` (
  `answer_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `exam_id` int,
  `question_id` int,
  `user_answers` text,
  `marks` int
);

CREATE TABLE `state` (
  `state_id` int PRIMARY KEY AUTO_INCREMENT,
  `state_name` varchar(255)
);

CREATE TABLE `city` (
  `city_id` int PRIMARY KEY AUTO_INCREMENT,
  `city_name` varchar(255),
  `state_id` int
);

CREATE TABLE `result` (
  `result_id` int PRIMARY KEY AUTO_INCREMENT,
  `answer_id` int,
  `student_answer` text,
  `correct_answer` text
);

ALTER TABLE `student` ADD FOREIGN KEY (`state_id`) REFERENCES `state` (`state_id`);

ALTER TABLE `student` ADD FOREIGN KEY (`college_id`) REFERENCES `colleges` (`college_id`);

ALTER TABLE `exam` ADD FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`);

ALTER TABLE `exam_category` ADD FOREIGN KEY (`exam_id`) REFERENCES `exam` (`exam_id`);

ALTER TABLE `exam_category` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

ALTER TABLE `questions` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

ALTER TABLE `user_answers` ADD FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`);

ALTER TABLE `user_answers` ADD FOREIGN KEY (`exam_id`) REFERENCES `exam` (`exam_id`);

ALTER TABLE `user_answers` ADD FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`);

ALTER TABLE `city` ADD FOREIGN KEY (`state_id`) REFERENCES `state` (`state_id`);

ALTER TABLE `result` ADD FOREIGN KEY (`answer_id`) REFERENCES `user_answers` (`answer_id`);
