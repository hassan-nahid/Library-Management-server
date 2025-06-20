import { Router } from "express";
import bookRoute from "../Books/book.route";
import borrowRoute from "../Borrow/borrow.route";


const routes = Router();

routes.use("/api/books",bookRoute)
routes.use("/api/borrow",borrowRoute)


export default routes;