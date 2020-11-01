module.exports = {
  parseRoute: (route) => {
    return route.replace(/\s/g, "").toUpperCase().split("-");
  },
};
