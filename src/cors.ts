import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const whiteList = [process.env.FRONTEND_URL];

    console.log(process.env.FRONTEND_URL)
    console.log(origin);
    if (whiteList.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error("Cors error"));
  },
};
