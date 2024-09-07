/**
 * Converts a FormData instance to a json object
 * Eg:
 *  const formData = new FormData();
 *  formData.append('name', 'Alice');
 *  formData.append('hobbies', 'reading');
 *  formData.append('hobbies', 'writing');
 *  formData.append('emptyField', '');
 *  toObject(formData);
 *
 *  {name: 'Alice', hobbies: ['reading', 'writing'], emptyField: ''}
 *
 * @param {FormData} val - FormData instance to convert to an object
 */
function toObject <T extends Record<string, unknown>> (form:FormData):T {
    if (!(form instanceof FormData)) throw new Error('formdata/toObject: Value is not an instance of FormData');

    const acc:Record<string, unknown> = {};
    form.forEach((value, key) => {
        if (acc[key] !== undefined) {
            if (Array.isArray(acc[key])) {
                (acc[key] as Array<unknown>).push(value);
            } else {
                acc[key] = [acc[key], value];
            }
        } else {
            acc[key] = value;
        }
    });
    return acc as T;
}

export {toObject, toObject as default};
