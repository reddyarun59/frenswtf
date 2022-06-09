const express = require('express');
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require('../controllers/chat');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router()

router.route("/").get(protect, fetchChats).post(protect, accessChat)

router.route("/group").post(protect, createGroupChat)

router.route("/rename").put(protect, renameGroup)

router.route("/group-add").put(protect, addToGroup)

router.route("/group-remove").put(protect, removeFromGroup)


module.exports=router