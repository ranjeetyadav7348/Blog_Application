//isLoggedIn=>

export const isLoggedIn = () => {
  let data = localStorage.getItem("data");

 // console.log("I am gonna check the local storage :",data)
  if (data != null) return true;
  else return false;
};

//doLogin=> data=>set to localstorage

export const doLogin = (data,next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next()
};

//doLogout=> remove from localStorage

export const doLogout = (next) => {
  localStorage.removeItem("data");
  next()
};

//get currentUser
export const getCurrentUserDetail = () => {

  
  if (isLoggedIn()) {
    const temp= JSON.parse(localStorage.getItem("data")).user;

    console.log("this is the way to check the methods: ",temp)

     return temp;
  } else {
    return undefined;
  }
};

export const getToken=()=>{
  if(isLoggedIn()){
    return JSON.parse(localStorage.getItem("data")).token
  }else{
    return null;
  }
}
