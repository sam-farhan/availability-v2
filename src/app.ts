import express from 'express';
import * as path from "path";
import EnvironmentVars from "./constants/EnvironmentVars";
import baseRoutes from "./routes/BaseRoutes"
import authRoutes from "./routes/AuthRoutes";
import userRoutes from "./routes/UserRoutes";
import squadRoutes from "./routes/SquadRoutes";
import availabilityRoutes from "./routes/AvailabilityRoutes";
import session from "express-session";
import favicon from 'serve-favicon';
import { AddMomentToLocals } from './middleware/MomentMiddleware';
import { AddUserSessionToLocals } from './middleware/UserSessionMiddleware';
import { CheckMaintenanceMode } from './middleware/MaintenanceModeMiddleware';

// **** Variables **** //

const app = express();

// **** Setup **** //

// Setup live reload when running in a development environment.
if (EnvironmentVars.ENVIRONMENT == "DEV") {
    var liveReload = require("livereload");
    const connectLiveReload = require("connect-livereload");

    // Setup live reload server.
    const liveReloadServer = liveReload.createServer();
    liveReloadServer.watch(path.join(__dirname, "views"));
    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });
    app.use(connectLiveReload());
    console.log("Running in development environment. Live reload enabled.");
}

// Setup session.
if (EnvironmentVars.SESSION.ACTIVE) {
    app.use(
        session({
            secret: EnvironmentVars.SESSION.SECRET,
            resave: true,
            saveUninitialized: true,
        })
    );
}
else
    console.log("Session not enabled as environment variable USE_SESSION is either not set or false.");

// Setup request parser for JSON.
app.use(express.json());

// ** Front-End Content ** //

// Favicon.
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Setup request parser for forms.
app.use(express.urlencoded({ extended: true }));

// Set location of views directory.
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(__dirname + "/public"));

// Include moment.js in page locals.
app.use(AddMomentToLocals);

// Include UserSession data in page locals.
app.use(AddUserSessionToLocals);

// If maintenance mode is enabled in environment vars,
// then only ever render the maintenance page.
app.use(CheckMaintenanceMode);

// Set view engine to ejs.
app.set("view engine", "ejs");

// ** Routing ** //
app.use('/', baseRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/availability', availabilityRoutes);
app.use(`/squad`, squadRoutes);
// 503.
app.get("/503", (req: express.Request, res: express.Response) => { 
    res.render("pages/errors/503");
});
// 404.
app.get("/404", (req: express.Request, res: express.Response) => { 
    res.render("pages/errors/404");
});
app.use((req: express.Request, res: express.Response) => { 
    res.status(404).render("pages/errors/404");
});

// Log environment variables.
console.log("================= CONFIGURATION =================");
console.log(JSON.stringify(EnvironmentVars, null, 4));
console.log("================= CONFIGURATION =================");

// ** Start Server ** //
const port = EnvironmentVars.APP.PORT;
app.listen(port, () => console.log(`Listening on port ${port}.`));