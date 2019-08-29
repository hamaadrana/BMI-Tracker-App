module.exports = {
    calculateBMI: function (weight, member) {
    weight = parseFloat(weight);
    let height = parseFloat(member.height) / 100;

    if (height <= 0)
        return 0;
    else
        return (weight / ( height * height)).toFixed(2);

    },
    getBMICategory: function (bmi_value) {

        let category = "";
        switch (true) {

            case bmi_value > 0 && bmi_value < 15.0:
                category = "VERY SEVERELY UNDERWEIGHT";
                break;
            case bmi_value >= 15 && bmi_value < 16.0:
                category = "SEVERELY UNDERWEIGHT";
                break;
            case bmi_value >= 16 && bmi_value < 18.5:
                category = "UNDERWEIGHT";
                break;
            case bmi_value >= 18.5 && bmi_value < 25:
                category = "NORMAL";
                break;
            case bmi_value >= 25 && bmi_value < 30:
                category = "OVERWEIGHT";
                break;                break;
            case bmi_value >= 30 && bmi_value < 35:
                category = "MODERATELY OBESE";
                break;                break;
            case bmi_value >= 35 && bmi_value < 40:
                category = "SEVERELY OBESE";
                break;                break;
            case bmi_value >= 40:
                category = "VERY SEVERELY OBESE";
                break;
        }

        return category;


    },

    getDateString: function (dt){
        var DD = ("0" + dt.getDate()).slice(-2);
        var MM = ("0" + (dt.getMonth() + 1)).slice(-2);
        var YYYY = dt.getFullYear();

        return YYYY + "-" + MM + "-" + DD;
    },

    getcurrentDate: function () {
    var dt = new Date();
    var DD = ("0" + dt.getDate()).slice(-2);
    var MM = ("0" + (dt.getMonth() + 1)).slice(-2);
    var YYYY = dt.getFullYear();
    var hh = ("0" + dt.getHours()).slice(-2);
    var mm = ("0" + dt.getMinutes()).slice(-2);
    var ss = ("0" + dt.getSeconds()).slice(-2);
    return YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
    },

    getGoalStatus: function (goal, assessments) {
        let status;
        let d1 = new Date();
        let d2 = goal.date;
        d1 = this.getDateString(d1);
        if(d1 < d2){
            status = 'Open'
        }
        else if(assessments.length > 0 && d1 === d2){
            if(assessments[assessments.length-1].weight === goal.measurements.weight){
                status = 'Achieved';
            }
        }else{
            status = "Missed";
        }
        return status;
    }

};



