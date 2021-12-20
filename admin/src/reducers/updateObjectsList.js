
const updateObject = (objectUpd, state) => {
  let objects = []
  state.objectsList.objects.forEach(object => {
    if (objectUpd.ID == object.ID) {
      objects.push(objectUpd)
    } else {
      objects.push(object)
    }
  });

  return {
    ...state.objectsList,
    objects: objects
  }

}

const deleteObject = (objectID, state) => {
  let objects = []
  state.objectsList.objects.forEach(object => {
    if (objectID != object.ID) {
      objects.push(object)
    }
  });

  return {
    ...state.objectsList,
    objects: objects
  }

}
const updateObjectsList = (state, action) => {

    if (state === undefined) {
      return {
        objects: undefined,
        activeObject: null,
        loading: true,
        error: null
      };
    }
  
    switch (action.type) {
      case 'FETCH_OBJECTS_REQUEST':
        return {
          objects: action.payload,
          activeObject: null,
          loading: true,
          error: null,
        };
  
      case 'FETCH_OBJECTS_SUCCESS':
        return {
          objects: action.payload,
          activeObject: action.payload[0],
          loading: false,
          error: null,
      };

      case 'FETCH_OBJECTS_FAILURE':
        return {
          objects: [],
          activeObject: null,
          loading: false,
          error: action.payload,
        };
      
      case 'ADD_NEW_OBJECT': 
        let newObjects = state.objectsList.objects;
        newObjects.push(action.payload);
        return {
          ...state.objectsList,
          objects: newObjects,
        }
      
      case 'SET_ACTIVE_OBJECT':
        return {
          ...state.objectsList,
          activeObject: action.payload,
      };

      case 'DELETE_OBJECT':
        console.log(state.objectsList.objects.filter((object) => action.payload != object.ID))
        return deleteObject(action.payload, state)
      
      case 'UPDATE_OBJECT':
        return updateObject(action.payload, state)
  
      default:
        return state.objectsList;
    }
  };
  
  export default updateObjectsList;