-- CreateTable
CREATE TABLE `club` (
    `cid` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `club_email_key`(`email`),
    PRIMARY KEY (`cid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `counsellor` (
    `cid` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `counsellor_email_key`(`email`),
    PRIMARY KEY (`cid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `did` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`did`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_student` (
    `esid` INTEGER NOT NULL AUTO_INCREMENT,
    `points` INTEGER NOT NULL,
    `student_id` INTEGER NOT NULL,
    `event_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `event_id`(`event_id`),
    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`esid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `eid` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `points` INTEGER NOT NULL,
    `venue` VARCHAR(255) NULL,
    `start_time` TIMESTAMP(0) NULL,
    `end_time` TIMESTAMP(0) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `club_id` INTEGER NOT NULL,

    INDEX `club_id`(`club_id`),
    PRIMARY KEY (`eid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `sid` INTEGER NOT NULL AUTO_INCREMENT,
    `usn` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `department_id` INTEGER NOT NULL,
    `counsellor_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `points` INTEGER NULL,

    UNIQUE INDEX `students_usn_key`(`usn`),
    UNIQUE INDEX `students_email_key`(`email`),
    INDEX `counsellor_id`(`counsellor_id`),
    INDEX `department_id`(`department_id`),
    PRIMARY KEY (`sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event_student` ADD CONSTRAINT `event_student_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students`(`sid`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `event_student` ADD CONSTRAINT `event_student_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events`(`eid`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`club_id`) REFERENCES `club`(`cid`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department`(`did`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`counsellor_id`) REFERENCES `counsellor`(`cid`) ON DELETE RESTRICT ON UPDATE RESTRICT;
