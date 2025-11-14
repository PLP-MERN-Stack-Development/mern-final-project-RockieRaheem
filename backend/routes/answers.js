import multer from "multer";
// Debug route for file upload
const debugUpload = multer({ dest: "uploads/" });
router.post("/test-upload", debugUpload.any(), (req, res) => {
  console.log("Test upload req.files:", req.files);
  res.json({ files: req.files });
});

router.get("/question/:questionId", getAnswersForQuestion);
router.get("/:id", getAnswerById);
router.post(
  "/",
  protect,
  checkStrikes,
  moderateContent,
  upload.any(),
  createAnswer
);
router.put("/:id/vote", protect, voteAnswer);
router.put("/:id/accept", protect, acceptAnswer);
router.put("/:id/verify", protect, authorize("teacher", "admin"), verifyAnswer);
router.delete("/:id", protect, deleteAnswer);

export default router;
