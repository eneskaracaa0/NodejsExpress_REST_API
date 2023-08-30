import Auth from '../models/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register= async (req,res)=>{


    try {
        const {username,email,password}=req.body
       const user=await Auth.findOne({email});

       if(user){
        return res.status(500).json({message:'Bu mail hesabı aktif olarak kullanılmaktadır.'});
       }

       if(password.length < 6){
        return res.status(500).json({message:'Parolanız 6 karakterden küçük'});

       }

       const passwordHash=await bcrypt.hash(password,12);

       const newUser=await Auth.create({username,email,password:passwordHash});

       const userToken= createToken(newUser._id)
       console.log(userToken);
    //    jwt.sign({id:newUser.id},process.env.SECRET_TOKEN,{expiresIn:'1h'});

       res.status(201).json({
        status:"OK",
        newUser,
        userToken
       })

        
    } catch (error) {
        return res.status(500).json({
            message:'Hata',
            error
        })
        
    }
    
}

const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await Auth.findOne({email});

        if(!user){
            res.status(500).json({message:"Böyle bir kullanıcı bulunamadı!"});
        }

        const comparePassword=await bcrypt.compare(password,user.password);
        if(!comparePassword){
                        res.status(500).json({message:"Parolanız yanlış"});

        }

        const token=createToken(user._id)
        res.cookie("jwt",token,{
                 httpOnly:true,
            maxAge:1000*60*60*24,
            }
            );
            console.log(token);
        // jwt.sign({id:user.id},process.env.SECRET_TOKEN,{expiresIn:'1h'});

        res.status(200).json({
            status:"OK",
            user,
            token
        })

        
    } catch (error) {
        
    }

 

}

 const createToken=(userId)=>{
    return jwt.sign({userId},process.env.SECRET_TOKEN,{expiresIn:'1d'})
  }

 export {register,login}