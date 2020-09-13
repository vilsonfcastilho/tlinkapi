// transforming piperiver json to bling order xml
import jsonxml from 'jsontoxml';

// eslint-disable-next-line @typescript-eslint/ban-types
const createOrder = (data: object) => {
  const xmlObject = jsonxml({ data });

  return xmlObject;
};

export default createOrder;
