module.exports = {
    calculateBMI: function (weight, member) {
    weight = parseFloat(weight);
    let height = parseFloat(member.height) / 100;

    if (height <= 0)
        return 0;
    else
        return (weight / ( height * height)).toFixed(2);

    }
};



