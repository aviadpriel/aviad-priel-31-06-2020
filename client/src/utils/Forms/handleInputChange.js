import {action} from "mobx";

const handleInputChange = action( (self = {},form_name = "form") => event => {
    const target = event.target;
    // console.log("form",self[form_name],target);

    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    switch (target.type) {
        case "select-multiple":
        {
            const options = target.options;
            let values = [];
            for (let i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    values.push(options[i].value);
                }
            }
            self[form_name] = window._.set(self[form_name] ,name,values);
            break;
        }
        case "file":{

            const files = target.files;
            self[form_name] = window._.set(self[form_name] ,name,[...files]);
            break;
        }
        case "number":{

        }
        default: {

            self[form_name] = window._.set(self[form_name] ,name,value);

        }
    }
});

export {handleInputChange}
