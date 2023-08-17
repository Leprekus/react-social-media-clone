
export function mergeObjects(a: any, b: any) {
    if(a === null || typeof a !== 'object') return b;
    if(b === null || typeof b !== 'object') return b;
    
    const obj = Array.isArray(a) ? [...a] : a;
    
    for(const key in b) {
      if(b.hasOwnProperty(key)) {
        obj[key] = mergeObjects(obj[key], b[key]);
      }
    }
    
    return obj;
  }

export function mergeFilterObjects(target: any, payload: any) {
  if (target === null || typeof target !== 'object') return target;
  if (payload === null || typeof payload !== 'object') return target;

  const obj = Array.isArray(target) ? [...target] : target;

  for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
          if (Array.isArray(obj[key]) && Array.isArray(payload[key])) {
              obj[key] = obj[key].filter((element: any) => !payload[key].includes(element));
          }
      }
  }

    return obj;
}

