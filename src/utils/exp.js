const ValidateTest = (name) => {
  const usernameExp = /^[가-힣]{2,10}$/;
  const passwordExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  const birthDateExp = /^\d{4}-\d{2}-\d{2}$/;
  const loginEmailExp = /^(.+)@(\S+)$/;
  const bodyFatExp = /^\d{2}$/;
  const muscleMassExp = /^\d{2}$/;
  const heightExp = /^\d{3}$/;
  const weightExp = /^\d{2,3}$/;

  switch (name) {
    case "userName":
      return usernameExp;

    case "birthDate":
      return birthDateExp;

    case "password":
      return passwordExp;

    case "password2":
      return passwordExp;

    case "loginEmail":
      return loginEmailExp;

    case "height":
      return heightExp;

    case "weight":
      return weightExp;

    case "bodyFat":
      return bodyFatExp;

    case "muscleMass":
      return muscleMassExp;

    default:
      break;
  }
};

export default ValidateTest;
