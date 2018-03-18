export const getValues = async (valuesEndpoint) => {
    var response = await fetch(valuesEndpoint)
    return await response.json()
}