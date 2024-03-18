const isOwner = async(req,res,next)=>{
    const role = req.user.role


    if(role != "owner"){
        const err = new Error("You Are Not a Owner")
        err.statusCode = 401
        next(err)
    }
    
  next()

}

const connection = async function (cb){
  const client = await pool.connect();
  try{
    await cb();

  }
  catch (err) {
    next(err)
  } finally {
    client.release()

  }
 
}

module.exports = {isOwner,connection};