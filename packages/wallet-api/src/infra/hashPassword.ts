import bcrypt from 'bcrypt';

export default () => {
  const saltRounds = 10;
  const hash = (password: string) => bcrypt.hashSync(password, saltRounds);
  const isHashMatched = (password: string, hashValue: string) =>
    bcrypt.compareSync(password, hashValue);

  return {
    hash,
    isHashMatched
  };
};
