module.exports = {
  successResponse: (res, httpCode, ...rest) => {
    res.status(httpCode).send(rest);
    res.end();
    return;
  },
  errorResponse: (res, httpCode, ...rest) => {
    res.status(httpCode).send(rest);
    res.end();
    return;
  },
};
