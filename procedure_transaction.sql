DELIMITER $$

PROCEDURE `updateFitnessAndNotifyDoctor`(
    IN patientIDParam INT,
    IN newCaloriesBurned REAL,
    IN newSteps INT,
    IN newSleepDuration REAL
)
BEGIN
    DECLARE assignedDoctorID INT;
    DECLARE criticalCondition BOOLEAN;
    DECLARE recurringIssuesDoctorID INT;

    START TRANSACTION;

    UPDATE Fitness
    SET caloriesBurned = newCaloriesBurned,
        steps = newSteps,
        sleepDuration = newSleepDuration,
        date = CURDATE()
    WHERE fitnessID = (
        SELECT fitnessID FROM Fitness WHERE patientID = patientIDParam ORDER BY date DESC LIMIT 1
    );

    SET criticalCondition = (newCaloriesBurned > 5000 OR newSteps < 100 OR newSleepDuration < 2);

    IF criticalCondition THEN
        SELECT d.docID INTO assignedDoctorID
        FROM Doctor d
        JOIN Patient p ON d.docID = p.patientID
        GROUP BY d.docID
        ORDER BY COUNT(p.patientID) ASC
        LIMIT 1;

        UPDATE Doctor
        SET docName = CONCAT(docName, ' - Critical Alert for Patient ID ', patientIDParam)
        WHERE docID = assignedDoctorID;

        SELECT d.docID INTO recurringIssuesDoctorID
        FROM Doctor d
        JOIN Patient p ON d.docID = p.patientID
        JOIN Fitness f ON p.patientID = f.patientID
        WHERE f.caloriesBurned > 5000 OR f.steps < 100 OR f.sleepDuration < 2
        GROUP BY d.docID
        ORDER BY COUNT(f.fitnessID) DESC
        LIMIT 1;

        UPDATE Doctor
        SET docName = CONCAT(docName, ' - Recurring Critical Fitness Issues Alert for Patient ID ', patientIDParam)
        WHERE docID = recurringIssuesDoctorID;
    END IF;

    COMMIT;

DELIMITER ;