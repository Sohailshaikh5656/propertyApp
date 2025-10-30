let simpleLogin = {
    username : "required|string",
    phone : "required|digits:10",
    email : 'required|email',
    password : 'required|regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/',
    os_version : "required",
    app_version : "required",
    device_type : "required|in:A,I",
    latitude : "required|string",
    longitude : "required|string",
    address : "required|string"
}

let property = {
    title : "required|string",
    type : "required|string",
    location : "required|string",
    price: "required|numeric|min:2000",
    short:"required|string",
    image : "required|string",
    description : "required|string"
}


module.exports = {simpleLogin,property
};
