const geoip = require("geoip-lite");
module.exports = {
  fetchLocationUsingIP: async (ipAddress) => {
    return new Promise((resolve, reject) => {
      const location = geoip.lookup(ipAddress);
      if (location !== null && Object.keys(location).length > 0)
        resolve({ status: true, latitude: geo.ll[0], longitude: geo.ll[1] });
      else resolve({ status: false, latitude: "local", longitude: "local" });
    });
  },
};
