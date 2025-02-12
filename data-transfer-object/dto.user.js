class userDTO {
  constructor(user){
    this.id = user.id
    this.username = user.username
    this.email = user.email
    this.age = user.age
    this.city = user.city
    this.zipcode = user.zipcode
  }
}

module.exports = userDTO