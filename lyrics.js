const timeString = (str) => {
  const arr = str.split(":");
  const mins = Number(arr[0]);
  const secs = Number(arr[1]);

  return mins * 60 + secs;
};

console.log(timeString("00:99.77"));
