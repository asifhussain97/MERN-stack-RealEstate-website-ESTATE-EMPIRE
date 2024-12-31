import { Server } from "http";

const port = process.env.PORT;

const serverConfig = (server: Server) => {
  const startServer = () => {
    server.listen(port, () => {
      console.log(`server listen on ${port}`);
    });
  };
  return {
    startServer,
  };
};

export default serverConfig;