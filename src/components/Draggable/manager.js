class Manager {
    constructor(props) {
        this.targetList = new Map();
    }

    register(obj) {
        let {id,...rest} = obj;
        this.targetList.set(id,rest);
    }

    unregister(obj) {
        let {id,...rest} = obj;
        this.targetList.delete(id);
    }

    //测试相交 
    checkIntersect = (draggableObj) => {
        let result = null;
        let intersectList = [];
        this.targetList.forEach((dimensionObj,id) => {
            if(checkIfIntersect(draggableObj,dimensionObj.dimensions)){
                result = id;
                let area = computeIntersectArea(draggableObj,dimensionObj.dimensions);
                intersectList.push({
                    id:id,
                    area:area,
                    dimensions:dimensionObj.dimensions
                })
            }
        })
        if(intersectList.length > 0){
            intersectList = intersectList.sort((obj1,obj2) => obj2.area - obj1.area);
            result = intersectList[0].id;
        }
        return result;
    }

    callAcceptFunc = (id,value) => {
        if(this.targetList.has(id)){
            let obj = this.targetList.get(id);
            let onWillAccept = obj.onWillAccept;
            let onAccept = obj.onAccept;
            if(onWillAccept(value)){
                onAccept(value);
                return true;
            }
            return false;
        }
    }

}

export default new Manager();


function checkIfIntersect(obj1,obj2){
    let { x:x1,y:y1,width:width1,height:height1} = obj1;
    let { x:x2,y:y2,width:width2,height:height2} = obj2;
    if( x1 + width1 < x2 || x1 > x2 + width2 || y1 + height1 < y2 || y1 > y2 + height2 ){
        return false
    }else{
        return true
    }
}

function computeIntersectArea(obj1,obj2){
    let { x:x1,y:y1,width:width1,height:height1} = obj1;
    let { x:x2,y:y2,width:width2,height:height2} = obj2;
    let area;
    if(x1 > x2 && y1 > y2){
        area = (width2 -(x1 - x2))*(height2-(y1 - y2));
    }else if(x1 > x2 && y1 < y2){
        area = (width2 - (x1 - x2))*(height1-(y2 - y1));
    }else if(x1 < x2 && y1 > y2){
        area = (width1 - (x2 - x1))*(height2-(y1-y2));
    }else if(x1 < x2 && y1 < y2){
        area = (width1 - (x2 - x1))*(height1-(y2-y1));
    }else{
        area = 0
    }
    return area;
}

// interface Dimension{
//     x,
//     y,
//     width,
//     height
// }