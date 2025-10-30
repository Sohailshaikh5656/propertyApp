const userController = require("../controller/userController");
const userInstance = userController
const userRoute = (app)=>{
    app.post("/api/properties",userInstance.addProperties);
    app.get("/api/properties",userInstance.getProperties);
    // app.post("/api/login",userInstance.login)

}

module.exports = userRoute