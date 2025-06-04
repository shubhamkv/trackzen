import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-PE6PWBP9H6");
};

export const trackPageview = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
