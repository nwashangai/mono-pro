import container from '../../../container';
import * as Types from '../types';

export default (controller: any) => {
  const { errorWatch } = container.cradle;
  return (req: Types.RequestObj, res: typeof Types.Response) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('Authorization'),
        'User-Agent': req.get('User-Agent')
      }
    };
    errorWatch(controller, httpRequest)
      .then((httpResponse: typeof Types.Response) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type('json');
        res
          .status(httpResponse.statusCode || 200)
          .send(httpResponse.data || {});
      })
      .catch(() => res.status(500).send('System failiure'));
  };
};
