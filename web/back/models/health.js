class Health {
    constructor(data) {
      this.id = data.id;
      this.personId = data.personId;
      this.heartRate = data.heartRate;
      this.systolicBloodPressure = data.systolicBloodPressure;
      this.diastolicBloodPressure = data.diastolicBloodPressure;
      this.bloodSugar = data.bloodSugar;
      this.ckmb = data.ckmb;
      this.troponin1 = data.troponin1;
      this.troponin2 = data.troponin2;
      this.result = data.result;
    }}

    module.exports = Health;
