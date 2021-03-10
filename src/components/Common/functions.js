export const formatter = (num) => {
    if (num < 10) {
        return "0".concat(num)
    }
    return num;
};
export const formatString = (string) => {
    return string.split(" ").map(str => str.charAt(0) + str.toLowerCase().slice(1) + " ");
};

export const departuresCount = (number) => {
    let str = number.toString();
    let lastNumber = str.charAt(str.length-1);
    let preLastNumber = str.charAt(str.length-2);

    if (lastNumber === "1" && (str.length===1 || (preLastNumber === "0" && str.length>2) || preLastNumber !== "1")) {
        return "рейс";
    }
    if ((lastNumber > 1 && lastNumber < 5) && (preLastNumber !== "1")) {
        return "рейса";
    }
    else return "рейсов";
};

export const dateConvertor = (date) => {
    let convertedDate = new Date(Date.parse(date)).toDateString();
    let convertedTime = new Date(Date.parse(date)).toTimeString().split(":");
    return convertedDate + " - " + convertedTime[0]+":" + convertedTime[1];
}