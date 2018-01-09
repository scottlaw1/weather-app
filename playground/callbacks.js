var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Apu'
  };

  setTimeout(() => {
    callback(user);
  },3000)
};

getUser(43, (userObject) =>{
  console.log(userObject);
})
