import React from "react";
import confirm from "reactstrap-confirm";


const confirmAjaxError = async  (exception) => {
    const status_code = exception.response.status;
    if (status_code >= 400 && status_code <= 600) {
        const {data:{error = false} = {}} = exception.response;

        await confirm({
            title: `Server Error ${status_code}  - ${exception.config.url}`,
            message: <div>
                <p>
                    {error ? error: exception.message}
                </p>
            </div>,

            confirmText: 'OK',
            confirmColor: 'info',
            cancelText: null
        });
    }
};
export{confirmAjaxError}

const  confirmAjaxResponse = async  (res,title = "response") => {
    const {data:{error = false} = {}} = res
    if (error) {
        await confirm({
            title: "Error - " + title,
            message: error,

            confirmText: 'Ok!',
            confirmColor: 'info',
            cancelText: null
        });
    }
};
export {confirmAjaxResponse};
