export const userData = [
    { userID: 1, username: "docJohn", password: "pass123", role: 0 },
    { userID: 2, username: "docEmily", password: "emily456", role: 0 },
    { userID: 3, username: "patAlex", password: "alex789", role: 1 },
    { userID: 4, username: "patMaria", password: "maria101", role: 1 },
    { userID: 5, username: "docSmith", password: "smith234", role: 0 },
    { userID: 6, username: "patJames", password: "james345", role: 1 },
    { userID: 7, username: "patSophia", password: "sophia567", role: 1 },
    { userID: 8, username: "docOlivia", password: "olivia890", role: 0 },
    { userID: 9, username: "patNoah", password: "noah123", role: 1 },
    { userID: 10, username: "docLiam", password: "liam456", role: 0 }
  ];
  
  export const patientData = [
    { patientID: 101, userID: 3, assignedDoctorID: 201, gender: 1, ageInYears: 25, ageInMonths: 0, pregnancyStatus: 0 },
    { patientID: 102, userID: 4, assignedDoctorID: 202, gender: 2, ageInYears: 30, ageInMonths: 3, pregnancyStatus: 1 },
    { patientID: 103, userID: 6, assignedDoctorID: 203, gender: 1, ageInYears: 40, ageInMonths: 0, pregnancyStatus: 0 },
    { patientID: 104, userID: 7, assignedDoctorID: 204, gender: 2, ageInYears: 22, ageInMonths: 8, pregnancyStatus: 0 },
    { patientID: 105, userID: 9, assignedDoctorID: 201, gender: 1, ageInYears: 28, ageInMonths: 0, pregnancyStatus: 0 }
  ];
  
  export const doctorData = [
    { docID: 201, userID: 1, docName: "Dr. John", specialization: "Cardiology" },
    { docID: 202, userID: 2, docName: "Dr. Emily", specialization: "Gynecology" },
    { docID: 203, userID: 5, docName: "Dr. Smith", specialization: "Neurology" },
    { docID: 204, userID: 8, docName: "Dr. Olivia", specialization: "Pediatrics" },
    { docID: 205, userID: 10, docName: "Dr. Liam", specialization: "Orthopedics" }
  ];
  