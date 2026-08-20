const tennetMiddleware = (req,res,next)=>{

    const tenantId = req.header("x-tenant-id");

    if(!tenantId){

        return res.status(400).json({

            message:"Tenant ID missing"

        });

    }

    req.tenantId = Number(tenantId);

    next();

}
module.exports = tennetMiddleware;