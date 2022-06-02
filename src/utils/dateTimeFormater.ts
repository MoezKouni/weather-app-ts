const padTo2Digits = (num: string) => {
  return num.toString().padStart(2, "0");
};

export const formatDate = (date: any) => {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
};


export const parseTime = (time: string) =>  {    
    let timeInt = parseInt(time);
    let minutes = time.substring(18);

    console.log(`${timeInt}:${minutes}`)
    return `${timeInt}:${minutes}`;
}