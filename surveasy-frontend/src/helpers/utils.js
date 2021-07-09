export const isEmpty = (obj) => {
    if(obj){
        if(Object.keys(obj).length === 0){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
