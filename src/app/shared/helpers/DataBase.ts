

interface ISingUpProps{
  name: string;
  password: string;
  colors: string[];
};
export class DataBase{

  singUp({name, password, colors}: ISingUpProps){
    const userRepeat = localStorage.getItem(name);
    if(userRepeat) 
      return { error: 'user repeat' };

    const templedUserData = {
      password: password,
      colors: colors,
    };

    const templedUserString = JSON.stringify(templedUserData);
    localStorage.setItem(name, templedUserString);

    return { error: false };
  };

  login(name: string, password: string){
    const userString = localStorage.getItem(name);
    if(!userString)
      return { error: true, msg: 'user not existed' };

    const userData = JSON.parse(userString);
    if(userData.password === password)
      return { error: false, colors: userData.colors };

    return { error: true, msg: 'password incorrect' };
  };

  remove(name: string){
    localStorage.removeItem(name);
  };

};
