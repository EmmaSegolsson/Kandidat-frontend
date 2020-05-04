
export const logoutHandler = (setLogin, setLoading) => {

  setLoading(true); 

  fetch("https://kandidat-test.herokuapp.com/logout/admin", {
        method: "GET",
        credentials: "include"
      })
        .then(response => {
          console.log(response, "hey")
          if(response.status === 200) {
            setLogin(false); 
            setLoading(false);
            console.log("kmr vi hit=")
          } else {
            const err = new Error(response.statusText)
            throw err
          }
        })
        .catch(err => {
          //felmeddelande: 
          setLoading(false) 
          console.error(err);
      })
};
