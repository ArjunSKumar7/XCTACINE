"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("../config/keys");
const serverConfig = (server) => {
    const startServer = () => {
        const port = parseInt(keys_1.configKeys.PORT, 10);
        server.listen(port, '0.0.0.0', () => {
            console.log(`Server started on http://localhost:${keys_1.configKeys.PORT}`);
        });
    };
    return startServer();
};
exports.default = serverConfig;
