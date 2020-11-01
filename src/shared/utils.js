module.exports = {
  parseRoute: (route) => {
    return route.replace(/\s/g, "").toUpperCase().split("-");
  },

  parseParams: (path) => {
    const pattern = path.split("/");

    return (pathToParse) => {
      const path = pathToParse.split("/");
      if (pattern.length !== path.length) {
        return null;
      }

      const params = {};
      for (let i = 1; i < pattern.length; i++) {
        const routePath = pattern[i];

        if (routePath[0] === ":") {
          const name = routePath.slice(1).trim();
          params[name] = path[i];
        } else if (routePath !== path[i]) {
          return null;
        }
      }

      return params;
    };
  },
};
