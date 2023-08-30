import jwt  from'jsonwebtoken';

const auth=async(req,res,next)=>{
try {

    const token=req.cookies.jwt;

    if(token){
        jwt.verify(token,process.env.SECRET_TOKEN,(err)=>{
            if(err){
                res.redirect('/login');
            }else{
                next();
            }
        })
    }
    
} catch (error) {
    res.status(401).json({error})
    
}
}

export default auth