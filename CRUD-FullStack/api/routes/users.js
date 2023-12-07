import express from "express";
import { addCli, deleteCli, getCli, updateCli } from "../controllers/user.js";
import { addProd, deleteProd, getProd, updateProd } from "../controllers/user.js";
import { produtos, avaliacao, auditoria } from "../controllers/user.js";

const router = express.Router()

router.get("/cliente/", getCli)

router.post("/cliente/", addCli)

router.put("/cliente/:id", updateCli)

router.delete("/cliente/:id", deleteCli)


router.get("/produto/", getProd)

router.post("/produto/", addProd)

router.put("/produto/:id", updateProd)

router.delete("/produto/:id", deleteProd)


router.get("/function01/", produtos)
router.get("/function02/", avaliacao)
router.get("/table/", auditoria)


export default router