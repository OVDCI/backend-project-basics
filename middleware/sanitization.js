export const sanitizeName=(req, res, next)=>{
    const {firstName, lastName} = req.body;

    req.body.firstName= firstName.charAt(0).toUpperCase() + firstName.slice(1);
    req.body.lastName= lastName.charAt(0).toUpperCase() + lastName.slice(1);
    next();
};