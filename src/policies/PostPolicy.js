const { User } = require('../database/models/index');

module.exports = {
    show: ( req, res, next) => {
    let msg = "No estas autorizado para ver la publicacion";
    isAuthorized(req,res,msg,next);
        },
    update: ( req, res, next) => {
    let msg = "No estas autorizado para actualizar la publicacion";
    isAuthorized(req,res,msg,next);
        },
    delete: ( req, res, next) => {
    let msg = "No estas autorizado para eliminar la publicacion";
    isAuthorized(req,res,msg,next);
        },
    }
    function isAuthorized(req, res, msg,next) {
        let result;
        if(req.user.id === req.post.userId || User.isAdmin(req.user.roles)) {
            next();
        }else {
            result = { success: false, msg: msg};
            return res.status(401).json(result);
        }
    }
