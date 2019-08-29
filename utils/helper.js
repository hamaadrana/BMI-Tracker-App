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


    }
};



