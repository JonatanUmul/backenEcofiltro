// sapSession.js
let sessionId = null;
let routeId = null;

export const setSapSession = (id, route) => {
  sessionId = id;
  routeId = route;
};

export const getSapSession = () => ({
  sessionId,
  routeId
});
