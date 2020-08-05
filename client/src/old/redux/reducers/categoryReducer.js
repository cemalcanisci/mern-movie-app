const categories = {
    categories:[]
};

export default function category(state=categories,action){
    switch(action.type){
        case 'GET_CATEGORIES':
            if(action.payload.data.length){
            return {
                categories:[...action.payload.data]
            };

            }
            else{
                return {
                    categories:[],
                    isNullData :true}
                
            }
        default: return state;
    }
}