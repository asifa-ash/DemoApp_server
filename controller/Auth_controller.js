import UserModel from "../model/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    
  const { username, password } = req.body;
  const sault = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, sault);
  req.body.password = hashPassword;
  try {
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) {
      return res.status(200).json({ message: "user already exist" });
    } else {
      const newUser = UserModel(req.body);
      const user = await newUser.save();
      const { firstname, lastname, username } = user;
      const data = { firstname, lastname, username };

      return res
        .status(201)
        .json({ message: "user registered successfully", data
    });
    }
  } catch (error) {
    console.log(error);
  }
};

// login

export const login = async (req, res) => {
    console.log(req.body,"vvvvvvvvv");
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });
    console.log(user,"nmnmnmn");
    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if(!validity){
        res.status(400).json("wrong Password");

      }else{
        res.status(200).json({user,message:"successfully login"})

      }
    }else{
        res.status(404).json("user not fount")
    }
  } catch (error) {
    res.status(500).json(error)
  }
};
