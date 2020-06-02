
const resolveObjPath = (o,s) =>{
    if (typeof(o) != "object"){
        return false;
    }
        s = s.replace(/\[(\w+)]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        const a = s.split('.');
        for (let i = 0, n = a.length; i < n; ++i) {
            let k = a[i];
            if(typeof(o) === "object" && o != null ) {
                if (typeof (o) === "object" && k in o) {
                    o = o[k];
                } else {
                    return;
                }
            } else {
                return;
            }
        }
        return o;
};
export {resolveObjPath};
