const http = require("http");

const { parseParams } = require("./shared/utils");

const routeController = require("./controllers/route.controller");

class HttpModule {
  routes = [];

  initialize = () => {
    this.register("get", "/routes", routeController.show);
    this.register("post", "/routes", routeController.store);

    http.createServer(this.handle).listen(process.env.PORT || 8000);
  };

  register = (method, path, handle) => {
    this.routes.push({
      method,
      path,
      handle,
      params: parseParams(path),
    });
  };

  handle = async (req, res) => {
    let finished = false;

    const handleNotFound = () => {
      finished = true;

      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({
          error: "The searched page was not found.",
        })
      );
      res.end();
    };

    const dispatch = (index, next) => {
      const route = this.routes[index];
      if (route.method.toUpperCase() === req.method) {
        const url = new URL(`http://a.b${req.url}`);
        const params = route.params(url.pathname);

        if (params) {
          let body = "";
          req.on("data", (data) => {
            body += data.toString();
          });

          req.on("end", async () => {
            const query = {};

            for (let [key, value] of new URLSearchParams(url.search)) {
              if (Array.isArray(query[key])) {
                query[key] = [...query[key], value];
              } else if (typeof query[key] === "string") {
                query[key] = [query[key], value];
              } else {
                query[key] = value;
              }
            }

            req.query = query;
            req.params = params;
            req.body = body !== "" ? JSON.parse(body) : {};

            res.status = (statusCode) => {
              res.statusCode = statusCode;
              return res;
            };

            res.json = (body) => {
              res.setHeader("Content-Type", "application/json");
              res.write(JSON.stringify(body));
              res.end();
            };

            await route.handle(req, res);
          });

          return null;
        }
      }

      return next();
    };

    let index = 0;
    if (index < this.routes.length) {
      const next = async () => {
        index++;
        if (!finished && index < this.routes.length) {
          dispatch(index, next);
        } else {
          handleNotFound();
        }
      };

      dispatch(index, next);
    }
  };
}

module.exports = new HttpModule();
