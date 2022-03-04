export default ({ bcrypt }) => {
  const saltRounds = 10;
  const hash = (password) => bcrypt.hashSync(password, saltRounds);
  const isHashMatched = (password, hashValue) => bcrypt.compareSync(password, hashValue);

  return {
    hash,
    isHashMatched,
  };
};
