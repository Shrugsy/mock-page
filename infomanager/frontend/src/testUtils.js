export function applyActionToModelReducer(modelName, action, session){
    return session[modelName].reducer(action, session[modelName], session)
}