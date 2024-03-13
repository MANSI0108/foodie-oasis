 const errorHandler = (err, req, res, next) => {
   
     const error = err.message
     const stack = err.stack
   
      res.json({ 
         Message:error,
         Stack:stack
      })
   };
   
module.exports = errorHandler;