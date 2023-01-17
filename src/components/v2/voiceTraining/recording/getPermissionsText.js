const getPermissionsText = (firstName, lastName) => {
  const name = `${firstName} ${lastName}`;
  const text = `I hereby verify that I, ${name}, am currently speaking, and that I'd like my script to create an overdubbed version of my voice. I understand that this overdubbed voice can be used to create speech that sounds like my voice`;
  return text;
};

export default getPermissionsText
