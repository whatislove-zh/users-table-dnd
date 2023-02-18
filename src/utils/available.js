export const removedColumnUtil = (user, removedColumn) => {
  const userCopy = JSON.parse(JSON.stringify(user));

  removedColumn.forEach((element) => {
    delete userCopy[element];
  });

  return [Object.keys(userCopy), userCopy];
};