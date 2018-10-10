export const updateObject = (oldObject, newPropsObject) => {
    return {
        ...oldObject,
        ...newPropsObject
    }
}