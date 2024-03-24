class ErrorCustom extends Error{
    constructor(massege,status,codeError){
        super(massege || 'not finde error');
        this.StatusCode=status || 500;
        this.massege=massege;
       
        this.codeError = getcodeerror(this.message)
      


        Error.captureStackTrace(this,this.constructor);

    }
}

getcodeerror=(msg)=>{
    if( msg.includes('connect EHOSTUNREACH')){
        return '105';
    }else if(msg.includes('Access denied for user')){
        return '104'
    }
    else{
        return '0000'
    }
}




module.exports=ErrorCustom;