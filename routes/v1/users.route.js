const express = require("express");
const usersController = require("../../controllers/usersController");

const router = express.Router();

router
  .route("/all")
  /**
   * @api {get} /tools All Users
   * @apiDescription Get all the Users
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization User's access token
   *
   * @apiParam {Number{1-}}.........[page-1].....List page
   * @apiParam {Number{1-100}}.........[limit=10] Users per page
   *
   * @apiSuccess {Object[]} all the Users
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Unauthorized 403) Forbidden Only admins can access the data
   */
  .get(usersController.getAllUsers);
router.route("/random").get(usersController.getARandomUser);
router.route("/save").post(usersController.saveAUser);
router.route("/update/:id").patch(usersController.updateAUser);
router.route("/bulk-update").patch(usersController.updateBulkUser);
router.route("/delete/:id").delete(usersController.deleteUser);

module.exports = router;
